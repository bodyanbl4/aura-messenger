import React, { useState, useEffect, useRef } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signInWithCustomToken
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import {
  Search,
  MessageCircle,
  ChevronLeft,
  Send,
  Settings as UserIcon,
  LogOut,
  Camera,
  ChevronRight,
  Globe,
  Mic,
  Square,
  Check,
  CheckCheck,
  Paperclip,
  Trash,
  Trash2,
  Bell,
  X
} from 'lucide-react';

// --- 🔑 КОНФИГУРАЦИЯ FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyBI5cMQ-zwjU1s4je2zzqBPpepSfBy0mKg",
  authDomain: "aura-748c8.firebaseapp.com",
  projectId: "aura-748c8",
  storageBucket: "aura-748c8.firebasestorage.app",
  messagingSenderId: "654947850743",
  appId: "1:654947850743:web:91991c4c3d818ed20f36f2",
  measurementId: "G-9X9QMW22Z1"
};

const envConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : firebaseConfig;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'aura-pro-v26';
const app = !getApps().length ? initializeApp(envConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export default function App() {
  // --- СОСТОЯНИЯ ---
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [user, setUser] = useState(null);
  const [view, setView] = useState('chats'); // 'chats', 'chat_room', 'settings'
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [formData, setFormData] = useState({ username: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [authStep, setAuthStep] = useState('login');
  const [globalError, setGlobalError] = useState(null);

  // Медиа & Запись
  const [mode, setMode] = useState('voice'); // 'voice' или 'video'
  const [isRecording, setIsRecording] = useState(null);
  const [recTime, setRecTime] = useState(0);
  const [contextMenu, setContextMenu] = useState(null);

  const scrollRef = useRef();
  const fileInputRef = useRef(null);
  const mediaRecorder = useRef(null);
  const videoPreviewRef = useRef(null);
  const audioChunks = useRef([]);
  const activeStream = useRef(null);
  const pressTimer = useRef(null);
  const isHolding = useRef(false);

  // --- ИНИЦИАЛИЗАЦИЯ И FIREBASE ---
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else { await signInAnonymously(auth); }
      } catch (e) { console.error(e); }
    };

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setFirebaseUser(u);
      if (u) {
        const saved = localStorage.getItem('aura_user');
        if (saved) { try { setUser(JSON.parse(saved)); } catch (e) { localStorage.removeItem('aura_user'); } }
      } else { initAuth(); }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!firebaseUser) return;

    // Подписка на пользователей
    const unsubUsers = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'users'), (s) => {
      const users = s.docs.map(d => ({ id: d.id, ...d.data() }));
      setAllUsers(users);
      if (user) {
        const me = users.find(u => u.username === user.username);
        if (me && JSON.stringify(me) !== JSON.stringify(user)) {
          setUser(me);
          localStorage.setItem('aura_user', JSON.stringify(me));
        }
      }
    });

    // Подписка на сообщения
    const unsubMsgs = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), (s) => {
      setMessages(s.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => a.ts - b.ts));
    });

    return () => { unsubUsers(); unsubMsgs(); };
  }, [firebaseUser, user?.username]);

  // Скролл вниз при новых сообщениях
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, view, selectedPeer]);

  // Фикс черного экрана при записи видео
  useEffect(() => {
    if (activeStream.current && videoPreviewRef.current && isRecording === 'video') {
      videoPreviewRef.current.srcObject = activeStream.current;
      videoPreviewRef.current.onloadedmetadata = () => {
        videoPreviewRef.current.play().catch(console.error);
      };
    }
  }, [isRecording]);

  // --- ЛОГИКА АВТОРИЗАЦИИ ---
  const handleAuth = async () => {
    const { username, password, name } = formData;
    if (!username || !password) return;
    setLoading(true);
    try {
      const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', username.toLowerCase().trim());
      const snap = await getDoc(userRef);
      if (authStep === 'reg') {
        if (snap.exists()) {
          setGlobalError("Пользователь уже существует!");
          setTimeout(() => setGlobalError(null), 3000);
          return setLoading(false);
        }
        const newUser = {
          username: username.toLowerCase().trim(),
          password,
          name: name || username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
          privacy: 'online'
        };
        await setDoc(userRef, newUser);
        setUser(newUser);
        localStorage.setItem('aura_user', JSON.stringify(newUser));
      } else {
        if (snap.exists() && snap.data().password === password) {
          setUser(snap.data());
          localStorage.setItem('aura_user', JSON.stringify(snap.data()));
        } else {
          setGlobalError("Неверный логин или пароль!");
          setTimeout(() => setGlobalError(null), 3000);
        }
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const updateProfile = async (updates) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', user.username);
      await updateDoc(userRef, updates);
    } catch (e) { console.error("Update fail:", e); }
  };

  // --- ЛОГИКА СООБЩЕНИЙ И МЕДИА ---
  const sendMessage = async (val, type = 'text') => {
    if (!val.trim() && type === 'text') return;
    try {
      if (val.length > 950000) {
        setGlobalError("Файл слишком большой.");
        setTimeout(() => setGlobalError(null), 3000);
        return;
      }
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
        text: val,
        uid: user.username,
        to: selectedPeer.username,
        ts: Date.now(),
        name: user.name,
        type,
        hiddenFor: []
      });
      setInput('');
    } catch (e) {
      setGlobalError("Ошибка отправки.");
      setTimeout(() => setGlobalError(null), 3000);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => sendMessage(reader.result, 'image');
    reader.readAsDataURL(file);
  };

  const deleteMessage = async (deleteType) => {
    if (!contextMenu) return;
    const { msgId } = contextMenu;
    const msgRef = doc(db, 'artifacts', appId, 'public', 'data', 'messages', msgId);

    try {
      if (deleteType === 'both') {
        await deleteDoc(msgRef);
      } else {
        const msg = messages.find(m => m.id === msgId);
        if (msg) {
          await updateDoc(msgRef, { hiddenFor: [...(msg.hiddenFor || []), user.username] });
        }
      }
    } catch (e) { console.error("Delete error:", e); }
    setContextMenu(null);
  };

  // --- ЗАПИСЬ КРУЖКОВ И ГОЛОСОВЫХ ---
  const startMediaRecording = async (type) => {
    try {
      const constraints = {
        audio: true,
        video: type === 'video' ? { facingMode: 'user', width: 300, height: 300 } : false
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      activeStream.current = stream;

      const options = { mimeType: type === 'video' ? 'video/webm;codecs=vp8' : 'audio/webm' };
      mediaRecorder.current = new MediaRecorder(stream, options);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = e => {
        if (e.data.size > 0) audioChunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        if (mediaRecorder.current.cancelRecord) {
          // Если отменено, не отправляем
          stream.getTracks().forEach(t => t.stop());
          activeStream.current = null;
          return;
        }

        const blob = new Blob(audioChunks.current, { type: type === 'video' ? 'video/webm' : 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          sendMessage(reader.result, type === 'video' ? 'video_circle' : 'voice');
          stream.getTracks().forEach(t => t.stop());
          activeStream.current = null;
        };
        reader.readAsDataURL(blob);
      };

      mediaRecorder.current.start();
      setIsRecording(type);
      setRecTime(0);
      const t = setInterval(() => setRecTime(p => p + 1), 1000);
      mediaRecorder.current.timer = t;
    } catch (e) {
      setGlobalError("Нет доступа к камере/микрофону");
      setTimeout(() => setGlobalError(null), 3000);
    }
  };

  const stopMediaRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      clearInterval(mediaRecorder.current.timer);
      setIsRecording(null);
    }
  };

  const cancelMediaRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.cancelRecord = true; // Флаг для отмены
      mediaRecorder.current.stop();
      clearInterval(mediaRecorder.current.timer);
      setIsRecording(null);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // --- ОБРАБОТЧИКИ НАЖАТИЙ (ТАП И УДЕРЖАНИЕ) ---
  const handlePointerDown = (e) => {
    isHolding.current = false;
    pressTimer.current = setTimeout(() => {
      isHolding.current = true;
      startMediaRecording(mode);
    }, 300); // 300мс = удержание
  };

  const handlePointerUp = () => {
    clearTimeout(pressTimer.current);
    if (isHolding.current) {
      stopMediaRecording(); // Завершаем и отправляем
    } else {
      // Одиночный тап - переключаем режим
      setMode(prev => prev === 'voice' ? 'video' : 'voice');
    }
    isHolding.current = false;
  };

  // --- ФИЛЬТРАЦИЯ СООБЩЕНИЙ ---
  const currentMessages = messages.filter(m => {
    if (!selectedPeer) return false;
    // Исключаем удаленные "только для меня"
    if (m.hiddenFor && m.hiddenFor.includes(user.username)) return false;

    if (selectedPeer.username === 'global') return m.to === 'global';
    return (m.uid === user.username && m.to === selectedPeer.username) ||
        (m.uid === selectedPeer.username && m.to === user.username);
  });

  // --- ЭКРАН АВТОРИЗАЦИИ ---
  if (!user) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#f0f0f0] font-sans">
          {globalError && <div className="absolute top-10 bg-red-500 text-white px-6 py-3 rounded-2xl shadow-lg z-50 animate-in slide-in-from-top">{globalError}</div>}
          <div className="bg-white p-8 rounded-3xl shadow-xl w-[90%] max-w-[400px] animate-in zoom-in-95">
            <div className="w-20 h-20 bg-[#007aff] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
              <Send size={40} className="text-white ml-2" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-6">{authStep === 'reg' ? 'Регистрация' : 'Вход в Telegram'}</h2>
            <div className="space-y-4 flex flex-col">
              <input
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 outline-none transition-all text-[16px]"
                  placeholder="Логин"
                  onChange={e => setFormData({...formData, username: e.target.value})}
              />
              <input
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 outline-none transition-all text-[16px]"
                  type="password"
                  placeholder="Пароль"
                  onChange={e => setFormData({...formData, password: e.target.value})}
              />
              {authStep === 'reg' && (
                  <input
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 outline-none transition-all text-[16px]"
                      placeholder="Ваше имя"
                      onChange={e => setFormData({...formData, name: e.target.value})}
                  />
              )}
              <button
                  className="w-full py-3.5 bg-[#007aff] text-white rounded-2xl font-bold text-[17px] active:scale-[0.98] transition-all shadow-md mt-2"
                  onClick={handleAuth}
                  disabled={loading}
              >
                {loading ? 'Загрузка...' : 'Продолжить'}
              </button>
              <button
                  className="text-[#007aff] font-semibold mt-4 py-2"
                  onClick={() => setAuthStep(authStep === 'reg' ? 'login' : 'reg')}
              >
                {authStep === 'reg' ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Создать'}
              </button>
            </div>
          </div>
        </div>
    );
  }

  // --- ГЛАВНЫЙ ЭКРАН ПРИЛОЖЕНИЯ ---
  return (
      <div className="flex flex-col h-screen bg-[#000] font-sans justify-center items-center overflow-hidden">
        {globalError && <div className="fixed top-10 bg-red-500 text-white px-6 py-3 rounded-2xl shadow-lg z-[9999] animate-in slide-in-from-top">{globalError}</div>}

        {/* Окно "телефона" */}
        <div className="w-full max-w-[500px] h-full bg-[#f2f2f7] relative flex flex-col overflow-hidden shadow-2xl">

          {/* --- ЭКРАН СПИСКА ЧАТОВ --- */}
          {view === 'chats' && (
              <div className="flex flex-col h-full bg-white animate-in slide-in-from-left-4 duration-300">
                <div className="pt-12 pb-2 px-4 bg-white/80 backdrop-blur-2xl border-b border-gray-200 z-10 sticky top-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-500 font-medium text-[17px]">Изм.</span>
                    <span className="font-bold text-[17px]">Чаты</span>
                    <span className="text-blue-500"><Search size={22} /></span>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto pb-20">
                  {/* Общий чат */}
                  <button
                      className="w-full flex items-center px-4 py-2 hover:bg-gray-50 transition-colors active:bg-gray-100"
                      onClick={() => { setSelectedPeer({name: 'Общий чат', username: 'global', privacy: 'online'}); setView('chat_room'); }}
                  >
                    <div className="w-[60px] h-[60px] bg-gradient-to-tr from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-3 shadow-sm shrink-0">
                      <Globe size={30} color="white"/>
                    </div>
                    <div className="flex-1 text-left border-b border-gray-100 py-3">
                      <div className="flex justify-between items-baseline">
                        <b className="text-[17px] font-semibold">Общий чат</b>
                      </div>
                      <div className="text-[15px] text-gray-500 truncate mt-0.5">Глобальная беседа</div>
                    </div>
                  </button>

                  {/* Список пользователей */}
                  {allUsers.filter(u => u.username !== user.username).map(u => (
                      <button
                          key={u.username}
                          className="w-full flex items-center px-4 py-2 hover:bg-gray-50 transition-colors active:bg-gray-100"
                          onClick={() => { setSelectedPeer(u); setView('chat_room'); }}
                      >
                        <img src={u.avatar} className="w-[60px] h-[60px] rounded-full object-cover mr-3 shadow-sm shrink-0 border border-gray-100" alt="avatar" />
                        <div className="flex-1 text-left border-b border-gray-100 py-3">
                          <div className="flex justify-between items-baseline">
                            <b className="text-[17px] font-semibold">{u.name}</b>
                          </div>
                          <div className="text-[15px] text-gray-500 truncate mt-0.5">@{u.username}</div>
                        </div>
                      </button>
                  ))}
                </div>
              </div>
          )}

          {/* --- ЭКРАН НАСТРОЕК --- */}
          {view === 'settings' && (
              <div className="flex flex-col h-full bg-[#f2f2f7] animate-in slide-in-from-right-4 duration-300">
                <div className="pt-12 pb-4 px-4 bg-white border-b border-gray-200 z-10 sticky top-0 flex justify-center items-center">
                  <span className="font-bold text-[17px]">Настройки</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
                    <div className="relative inline-block mb-3">
                      <img src={user.avatar} className="w-[100px] h-[100px] rounded-full object-cover border border-gray-200" alt="me" />
                    </div>
                    <h3 className="text-xl font-bold">{user.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">@{user.username}</p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                      <span className="text-[16px]">Статус сети</span>
                      <select
                          value={user.privacy || 'online'}
                          onChange={(e) => updateProfile({ privacy: e.target.value })}
                          className="bg-transparent text-[#007aff] font-medium text-[16px] outline-none text-right"
                      >
                        <option value="online">В сети</option>
                        <option value="recently">Был(а) недавно</option>
                      </select>
                    </div>
                    <button
                        onClick={() => { localStorage.clear(); window.location.reload(); }}
                        className="w-full px-4 py-3 flex items-center text-red-500 hover:bg-red-50"
                    >
                      <LogOut size={20} className="mr-3"/>
                      <span className="text-[16px] font-medium">Выйти из аккаунта</span>
                    </button>
                  </div>
                  <p className="text-xs text-center text-gray-400">Настройка «Был(а) недавно» скроет ваше точное присутствие от других.</p>
                </div>
              </div>
          )}

          {/* --- ЭКРАН ЧАТА --- */}
          {view === 'chat_room' && selectedPeer && (
              <div className="flex flex-col h-full bg-[#e6ebf0] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-fixed z-20 absolute inset-0 animate-in slide-in-from-right duration-300">

                {/* Header Чата */}
                <div className="bg-white/85 backdrop-blur-xl border-b border-gray-300 h-20 pt-8 flex items-center px-2 shrink-0 z-30 shadow-sm">
                  <button onClick={() => setView('chats')} className="text-[#007aff] flex items-center p-1 w-20">
                    <ChevronLeft size={32} />
                    <span className="text-[17px] -ml-1">Назад</span>
                  </button>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="font-semibold text-[17px] leading-tight">{selectedPeer.name}</div>
                    <div className={`text-[12px] ${selectedPeer.privacy === 'recently' ? 'text-gray-500' : 'text-[#007aff]'}`}>
                      {selectedPeer.username === 'global' ? 'чат' : (selectedPeer.privacy === 'recently' ? 'был(а) недавно' : 'в сети')}
                    </div>
                  </div>
                  <div className="w-20 flex justify-end pr-2">
                    <img src={selectedPeer.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedPeer.username}`} className="w-9 h-9 rounded-full object-cover border border-gray-200" alt="peer" />
                  </div>
                </div>

                {/* Область сообщений */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2 pb-6">
                  {currentMessages.length === 0 && (
                      <div className="text-center text-black/40 text-sm mt-10 bg-white/50 w-fit mx-auto px-4 py-1.5 rounded-full">Нет сообщений</div>
                  )}
                  {currentMessages.map((m) => (
                      <div
                          key={m.id}
                          onContextMenu={(e) => { e.preventDefault(); setContextMenu({ x: e.pageX, y: e.pageY, msgId: m.id }); }}
                          className={`flex ${m.uid === user.username ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                      >
                        <div className={`max-w-[80%] px-3 py-1.5 rounded-[18px] shadow-sm relative ${
                            m.type === 'image' ? 'p-1 bg-transparent shadow-none' :
                                m.uid === user.username ? 'bg-[#e1ffc7] rounded-tr-[4px]' : 'bg-white rounded-tl-[4px]'
                        }`}>
                          {/* Имя отправителя в глобальном чате */}
                          {selectedPeer.username === 'global' && m.uid !== user.username && m.type !== 'image' && (
                              <div className="text-[12px] font-bold mb-0.5 text-[#007aff]">{m.name}</div>
                          )}

                          {/* Рендер контента */}
                          {m.type === 'video_circle' ? (
                              <div className="w-56 h-56 rounded-full overflow-hidden border-[3px] border-[#e1ffc7] shadow-md bg-black relative">
                                <video src={m.text} autoPlay loop muted playsInline className="w-full h-full object-cover scale-x-[-1]" />
                              </div>
                          ) : m.type === 'voice' ? (
                              <div className="flex items-center space-x-3 py-1 pr-6 min-w-[160px]">
                                <div className="bg-[#007aff] rounded-full p-2 text-white shadow-sm"><Mic size={18} fill="white" /></div>
                                <div className="flex-1">
                                  <audio src={m.text} controls className="hidden" id={`audio-${m.id}`} />
                                  <div className="h-[3px] w-full bg-blue-200 rounded-full cursor-pointer" onClick={() => document.getElementById(`audio-${m.id}`).play()}>
                                    <div className="h-full w-0 bg-[#007aff] rounded-full"></div>
                                  </div>
                                  <div className="text-[11px] text-[#007aff] mt-1 font-medium">Голосовое</div>
                                </div>
                              </div>
                          ) : m.type === 'image' ? (
                              <img src={m.text} alt="Вложение" className="max-w-[240px] max-h-[300px] rounded-2xl object-cover shadow-sm border border-gray-200" />
                          ) : (
                              <p className="text-[16px] leading-[1.3] pr-10 text-black whitespace-pre-wrap word-break">{m.text}</p>
                          )}

                          {/* Время и статус */}
                          <div className={`absolute bottom-1 right-2 flex items-center space-x-1 ${m.type === 'image' ? 'bg-black/40 text-white px-1.5 rounded-full bottom-2 right-2 backdrop-blur-sm' : ''}`}>
                      <span className={`text-[10px] ${m.type === 'image' ? 'text-white' : 'text-green-800/60'}`}>
                        {new Date(m.ts).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                      </span>
                            {m.uid === user.username && (
                                m.read ? <CheckCheck size={12} className={m.type === 'image' ? 'text-white' : 'text-[#34C759]'} /> : <Check size={12} className={m.type === 'image' ? 'text-white' : 'text-[#34C759]'} />
                            )}
                          </div>
                        </div>
                      </div>
                  ))}
                </div>

                {/* ОВЕРЛЕЙ ЗАПИСИ (HUD) */}
                {isRecording && (
                    <div className="absolute inset-x-0 bottom-24 z-[150] flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
                      <div className="bg-white/90 backdrop-blur-xl rounded-full pl-2 pr-6 py-2 shadow-2xl border border-gray-200 flex items-center space-x-4">
                        {isRecording === 'video' ? (
                            <div className="w-24 h-24 bg-black rounded-full overflow-hidden border-4 border-[#007aff] shadow-inner shrink-0">
                              <video ref={videoPreviewRef} autoPlay muted playsInline className="w-full h-full object-cover scale-x-[-1]" />
                            </div>
                        ) : (
                            <div className="w-14 h-14 bg-[#007aff] rounded-full flex items-center justify-center shrink-0">
                              <Mic size={28} className="text-white animate-pulse" fill="white" />
                            </div>
                        )}
                        <div className="flex flex-col items-start min-w-[100px]">
                          <div className="flex items-center space-x-2 text-red-500 font-bold text-lg">
                            <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                            <span className="font-mono">{formatTime(recTime)}</span>
                          </div>
                          <button onClick={cancelMediaRecording} className="text-[14px] text-gray-500 font-medium mt-1 hover:text-red-500 transition-colors">Отменить</button>
                        </div>
                      </div>
                    </div>
                )}

                {/* INPUT BAR */}
                <div className="bg-[#f6f6f6] border-t border-gray-300 px-2 py-2 flex items-end space-x-2 pb-safe z-40 relative">
                  <button className="p-2 text-[#8e8e93] active:text-[#007aff] transition-colors relative" onClick={() => fileInputRef.current?.click()}>
                    <Paperclip size={26} />
                    <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleFileUpload} />
                  </button>

                  <div className="flex-1 bg-white border border-gray-300 rounded-[20px] min-h-[36px] px-3 py-1.5 flex items-center">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Сообщение"
                    className="w-full focus:outline-none text-[17px] bg-transparent resize-none max-h-24 overflow-y-auto"
                    rows={1}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(input);
                      }
                    }}
                />
                  </div>

                  {input.trim() ? (
                      <button
                          onClick={() => sendMessage(input)}
                          className="p-1.5 bg-[#007aff] text-white rounded-full transition-transform active:scale-90 mb-0.5 shadow-sm"
                      >
                        <Send size={20} fill="white" className="ml-0.5" />
                      </button>
                  ) : (
                      <button
                          onPointerDown={handlePointerDown}
                          onPointerUp={handlePointerUp}
                          className={`p-2 transition-all duration-200 mb-0.5 ${isRecording ? 'text-red-500 scale-125' : 'text-[#8e8e93]'}`}
                      >
                        {mode === 'voice' ? <Mic size={26} /> : <Camera size={26} />}
                      </button>
                  )}
                </div>

                {/* Меню действий с сообщением (Контекстное меню) */}
                {contextMenu && (
                    <>
                      <div className="fixed inset-0 z-[290] bg-black/10" onClick={() => setContextMenu(null)} />
                      <div
                          className="absolute z-[300] bg-white/95 backdrop-blur-2xl border border-gray-200 rounded-2xl shadow-2xl w-56 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                          style={{ top: Math.min(contextMenu.y - 60, window.innerHeight - 150), left: Math.min(contextMenu.x - 50, window.innerWidth - 240) }}
                      >
                        <button onClick={() => deleteMessage('me')} className="w-full flex items-center px-4 py-3.5 text-[15px] text-gray-800 hover:bg-gray-100 border-b border-gray-100">
                          <Trash size={18} className="mr-3 text-gray-400" /> Удалить у меня
                        </button>
                        <button onClick={() => deleteMessage('both')} className="w-full flex items-center px-4 py-3.5 text-[15px] text-red-600 hover:bg-red-50 font-medium">
                          <Trash2 size={18} className="mr-3" /> Удалить у всех
                        </button>
                      </div>
                    </>
                )}

              </div>
          )}

          {/* --- НИЖНЯЯ ПАНЕЛЬ НАВИГАЦИИ (TAB BAR) --- */}
          {view !== 'chat_room' && (
              <div className="h-[84px] bg-white/85 backdrop-blur-2xl border-t border-gray-200 flex justify-around pt-2 pb-safe shrink-0 z-30">
                <button
                    className={`flex flex-col items-center flex-1 ${view === 'chats' ? 'text-[#007aff]' : 'text-[#8e8e93]'}`}
                    onClick={() => setView('chats')}
                >
                  <MessageCircle size={28} className={view === 'chats' ? 'fill-current' : ''} />
                  <span className="text-[10px] font-medium mt-1">Чаты</span>
                </button>
                <button
                    className={`flex flex-col items-center flex-1 ${view === 'settings' ? 'text-[#007aff]' : 'text-[#8e8e93]'}`}
                    onClick={() => setView('settings')}
                >
                  <UserIcon size={28} className={view === 'settings' ? 'fill-current' : ''} />
                  <span className="text-[10px] font-medium mt-1">Настройки</span>
                </button>
              </div>
          )}

        </div>
      </div>
  );
}