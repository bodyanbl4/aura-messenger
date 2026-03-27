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
  User as UserIcon,
  LogOut,
  Moon,
  Camera,
  ChevronRight,
  Globe,
  Edit3,
  Mic,
  Check,
  CheckCheck,
  Paperclip,
  Trash,
  Trash2
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

// --- СТИЛИ (PURE CSS КАК В ТВОЕМ ОРИГИНАЛЕ) ---
const auraStyles = (isDark) => `
  :root { 
    --ios-blue: #007AFF; 
    --ios-bg: ${isDark ? '#000000' : '#F2F2F7'};
    --card-bg: ${isDark ? '#1C1C1E' : '#FFFFFF'};
    --text-main: ${isDark ? '#FFFFFF' : '#000000'};
    --text-sec: #8E8E93;
    --sep: ${isDark ? '#38383A' : '#C6C6C8'};
    --nav-bg: ${isDark ? 'rgba(28, 28, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)'};
    --bubble-me: ${isDark ? '#31A24C' : '#E1FFC7'};
    --bubble-me-text: ${isDark ? '#FFFFFF' : '#000000'};
  }
  
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #000; color: var(--text-main); overflow: hidden; }
  
  .app-container { width: 100vw; height: 100vh; display: flex; justify-content: center; background: #000; }
  .phone-screen { 
    width: 100%; max-width: 500px; height: 100%; background: var(--ios-bg); 
    position: relative; display: flex; flex-direction: column; overflow: hidden; 
  }
  .view-container { flex: 1; display: flex; flex-direction: column; height: 100%; animation: slideIn 0.3s ease; position: relative; }
  
  @keyframes slideIn { from { transform: translateX(30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes popIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  @keyframes pulseGlow { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
  
  .ios-input { 
    width: 100%; padding: 14px 16px; border-radius: 12px; 
    border: 1.5px solid var(--sep); background: ${isDark ? '#2C2C2E' : '#FFFFFF'}; 
    color: var(--text-main); font-size: 16px; outline: none; transition: all 0.2s; 
  }
  .btn-primary { 
    width: 100%; padding: 16px; background: var(--ios-blue); color: white; 
    border: none; border-radius: 16px; font-weight: 700; font-size: 17px; cursor: pointer; 
  }
  .nav-bar { 
    padding: 55px 16px 15px; background: var(--nav-bg); backdrop-filter: blur(25px); 
    border-bottom: 0.5px solid var(--sep); display: flex; align-items: center; 
    justify-content: space-between; position: sticky; top: 0; z-index: 50; 
  }
  .ios-list { background: var(--card-bg); margin: 16px; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
  .ios-item { 
    display: flex; align-items: center; padding: 12px 16px; cursor: pointer; 
    border: none; background: none; text-align: left; width: 100%; color: var(--text-main); position: relative; 
  }
  .ios-item:not(:last-child)::after { content: ''; position: absolute; left: 70px; right: 0; bottom: 0; height: 0.5px; background: var(--sep); }
  
  .chat-scroll { 
    flex: 1; overflow-y: auto; padding: 12px 16px 100px; display: flex; flex-direction: column; gap: 8px; 
    background: ${isDark ? '#000' : '#E6EBF0'}; 
    background-image: ${isDark ? 'none' : "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')"};
    background-attachment: fixed;
  }
  
  .chat-bubble { 
    max-width: 80%; width: fit-content; padding: 8px 12px; border-radius: 18px; font-size: 16px; 
    position: relative; word-wrap: break-word; line-height: 1.3; word-break: break-word; 
    animation: popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
    box-shadow: 0 1px 2px rgba(0,0,0,0.1); 
  }
  .bubble-me { background: var(--bubble-me); color: var(--bubble-me-text); align-self: flex-end; border-bottom-right-radius: 4px; }
  .bubble-other { background: var(--card-bg); color: var(--text-main); align-self: flex-start; border-bottom-left-radius: 4px; }
  
  .circle-video { width: 220px; height: 220px; border-radius: 50%; object-fit: cover; border: 3px solid ${isDark ? '#31A24C' : '#E1FFC7'}; background: #000; transform: scaleX(-1); }
  
  .tab-bar { 
    height: 85px; background: var(--nav-bg); backdrop-filter: blur(25px); 
    border-top: 0.5px solid var(--sep); display: flex; justify-content: space-around; 
    padding-top: 10px; flex-shrink: 0; z-index: 100; 
  }
  .tab-item { display: flex; flex-direction: column; align-items: center; gap: 4px; color: var(--text-sec); cursor: pointer; border: none; background: none; flex: 1; }
  .tab-item.active { color: var(--ios-blue); }
  
  .avatar { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; flex-shrink: 0; border: 0.5px solid var(--sep); background: #eee; }
  .avatar-huge { width: 110px; height: 110px; border-radius: 50%; object-fit: cover; margin: 0 auto 10px; border: 3px solid var(--ios-blue); display: block; background: #eee; }
  
  .error-toast { 
    position: absolute; top: 100px; left: 20px; right: 20px; background: #FF3B30; color: white; 
    padding: 12px; border-radius: 12px; text-align: center; z-index: 2000; animation: slideInUp 0.3s ease; font-weight: bold; box-shadow: 0 4px 15px rgba(255,59,48,0.3);
  }
  @keyframes slideInUp { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  .attachment-img { max-width: 240px; max-height: 300px; border-radius: 12px; object-fit: cover; display: block; }
  
  /* Стили логотипа Акаши */
  .akashi-logo {
    width: 90px; height: 90px; background: #0a0a0a; border-radius: 24px; margin: 0 auto 25px;
    display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;
    box-shadow: 0 0 30px rgba(220,38,38,0.4); border: 1px solid rgba(239,68,68,0.2);
  }
  .akashi-glow {
    position: absolute; inset: 0; background: rgba(220,38,38,0.25); filter: blur(15px); border-radius: 50%;
  }
`;

export default function App() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(localStorage.getItem('aura_dark') === 'true');
  const [view, setView] = useState('chats');
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [formData, setFormData] = useState({ username: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [authStep, setAuthStep] = useState('login');
  const [globalError, setGlobalError] = useState(null);

  // Состояния для медиа
  const [mode, setMode] = useState('voice');
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
    const unsubU = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'users'), (s) => {
      const users = s.docs.map(d => ({ id: d.id, ...d.data() }));
      setAllUsers(users);
      if (user) {
        const me = users.find(u => u.username === user.username);
        if (me && JSON.stringify(me) !== JSON.stringify(user)) {
          setUser(me); localStorage.setItem('aura_user', JSON.stringify(me));
        }
      }
    });
    const unsubM = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), (s) => {
      setMessages(s.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => a.ts - b.ts));
    });
    return () => { unsubU(); unsubM(); };
  }, [firebaseUser, user?.username]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, view, selectedPeer]);

  // ФИКС ЧЕРНОГО ЭКРАНА: Привязываем поток к элементу video сразу как начинается запись
  useEffect(() => {
    if (activeStream.current && videoPreviewRef.current && isRecording === 'video') {
      videoPreviewRef.current.srcObject = activeStream.current;
      videoPreviewRef.current.onloadedmetadata = () => {
        videoPreviewRef.current.play().catch(e => console.error("Play error", e));
      };
    }
  }, [isRecording]);

  const handleAuth = async () => {
    const { username, password, name } = formData;
    if (!username || !password) {
      setGlobalError("Введите логин и пароль");
      setTimeout(() => setGlobalError(null), 3000);
      return;
    }
    setLoading(true);
    try {
      const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', username.toLowerCase().trim());
      const snap = await getDoc(userRef);

      if (authStep === 'reg') {
        if (snap.exists()) {
          setGlobalError("Пользователь уже существует! Войдите.");
          setTimeout(() => setGlobalError(null), 3000);
          return setLoading(false);
        }
        const newUser = {
          username: username.toLowerCase().trim(), password, name: name || username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
          privacy: 'online'
        };
        await setDoc(userRef, newUser);
        setUser(newUser); localStorage.setItem('aura_user', JSON.stringify(newUser));
      } else {
        // Улучшенная логика входа, чтобы не писало просто "неверно"
        if (snap.exists()) {
          if (snap.data().password === password) {
            setUser(snap.data()); localStorage.setItem('aura_user', JSON.stringify(snap.data()));
          } else {
            setGlobalError("Неверный пароль!");
            setTimeout(() => setGlobalError(null), 3000);
          }
        } else {
          setGlobalError("Аккаунт не найден! Зарегистрируйтесь.");
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
    } catch (e) { console.error(e); }
  };

  const sendMessage = async (val, type = 'text') => {
    if (!val.trim() && type === 'text') return;
    try {
      if (val.length > 950000) {
        setGlobalError("Файл слишком большой.");
        setTimeout(() => setGlobalError(null), 3000);
        return;
      }
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
        text: val, uid: user.username, to: selectedPeer.username, ts: Date.now(), name: user.name, type, hiddenFor: []
      });
      setInput('');
    } catch (e) {
      setGlobalError("Ошибка отправки.");
      setTimeout(() => setGlobalError(null), 3000);
    }
  };

  // СКРЕПКА: Отправка изображений с жестким ограничением размера
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => sendMessage(reader.result, 'image');
    reader.readAsDataURL(file);
  };

  // УДАЛЕНИЕ СООБЩЕНИЙ (У себя / У всех)
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
    } catch (e) { console.error(e); }
    setContextMenu(null);
  };

  // ЛОГИКА КАМЕРЫ И МИКРОФОНА
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

      mediaRecorder.current.ondataavailable = e => { if (e.data.size > 0) audioChunks.current.push(e.data); };

      mediaRecorder.current.onstop = () => {
        if (mediaRecorder.current.cancelRecord) {
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
      mediaRecorder.current.timer = setInterval(() => setRecTime(p => p + 1), 1000);
    } catch (e) {
      setGlobalError("Нет доступа к камере");
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
      mediaRecorder.current.cancelRecord = true;
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

  // ЛОГИКА УДЕРЖАНИЯ И ТАПА
  const handlePointerDown = () => {
    isHolding.current = false;
    pressTimer.current = setTimeout(() => {
      isHolding.current = true;
      startMediaRecording(mode);
    }, 300);
  };

  const handlePointerUp = () => {
    clearTimeout(pressTimer.current);
    if (isHolding.current) {
      stopMediaRecording();
    } else {
      setMode(prev => prev === 'voice' ? 'video' : 'voice');
    }
    isHolding.current = false;
  };

  const currentMessages = messages.filter(m => {
    if (!selectedPeer) return false;
    if (m.hiddenFor && m.hiddenFor.includes(user.username)) return false;
    if (selectedPeer.username === 'global') return m.to === 'global';
    return (m.uid === user.username && m.to === selectedPeer.username) ||
        (m.uid === selectedPeer.username && m.to === user.username);
  });

  if (!user) return (
      <div className="app-container">
        <style>{auraStyles(isDark)}</style>
        <div style={{width: '100%', maxWidth: 400, padding: 30, background: 'var(--card-bg)', borderRadius: 24, alignSelf: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', animation: 'popIn 0.4s ease'}}>
          {globalError && <div className="error-toast">{globalError}</div>}

          {/* Логотип Aura (Глаз Акаши) */}
          <div className="akashi-logo">
            <div className="akashi-glow"></div>
            <svg viewBox="0 0 100 100" style={{width: 60, height: 60, position: 'relative', zIndex: 10, filter: 'drop-shadow(0 0 8px rgba(255,0,0,1))'}} fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 50 Q 50 15 95 50 Q 50 85 5 50 Z" stroke="#ef4444" strokeWidth="3" strokeOpacity="0.3" />
              <circle cx="50" cy="50" r="20" stroke="#ef4444" strokeWidth="4" strokeOpacity="0.9" fill="rgba(239,68,68,0.1)"/>
              <path d="M58 10 L40 52 L56 52 L38 90" stroke="#ff0000" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h2 style={{textAlign: 'center', marginBottom: 25, fontSize: 24, fontWeight: 800}}>
            {authStep === 'reg' ? 'Регистрация в Aura' : 'Вход в Aura'}
          </h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            <input className="ios-input" placeholder="Логин" onChange={e => setFormData({...formData, username: e.target.value})} />
            <input className="ios-input" type="password" placeholder="Пароль" onChange={e => setFormData({...formData, password: e.target.value})} />
            {authStep === 'reg' && <input className="ios-input" placeholder="Ваше имя" onChange={e => setFormData({...formData, name: e.target.value})} />}
            <button className="btn-primary" style={{marginTop: 10}} onClick={handleAuth} disabled={loading}>{loading ? 'Загрузка...' : 'Продолжить'}</button>
            <button style={{background: 'none', border: 'none', color: 'var(--ios-blue)', marginTop: 15, cursor: 'pointer', fontWeight: 600, fontSize: 15}} onClick={() => setAuthStep(authStep === 'reg' ? 'login' : 'reg')}>
              {authStep === 'reg' ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Создать'}
            </button>
          </div>
        </div>
      </div>
  );

  return (
      <div className="app-container">
        <style>{auraStyles(isDark)}</style>
        <div className="phone-screen">
          {globalError && <div className="error-toast">{globalError}</div>}

          {/* --- ЭКРАН ЧАТОВ --- */}
          {view === 'chats' && (
              <div className="view-container">
                <div className="nav-bar">
                  <div style={{fontSize: 32, fontWeight: 800}}>Чаты</div>
                  <Edit3 size={24} color="var(--ios-blue)" />
                </div>
                <div style={{padding: '0 16px 12px'}}>
                  <div style={{background: isDark ? '#1C1C1E' : '#E3E3E8', borderRadius: 10, padding: 10, display: 'flex', alignItems: 'center', gap: 8}}>
                    <Search size={18} color="#8E8E93" />
                    <input placeholder="Поиск" style={{background: 'none', border: 'none', outline: 'none', color: 'var(--text-main)', width: '100%', fontSize: 16}} />
                  </div>
                </div>
                <div style={{flex: 1, overflowY: 'auto'}}>
                  <button className="ios-item" onClick={() => { setSelectedPeer({name: 'Общий чат', username: 'global'}); setView('chat_room'); }}>
                    <div style={{background: 'var(--ios-blue)', width: 50, height: 50, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 14}}><Globe size={26} color="white"/></div>
                    <div style={{flex: 1}}><b style={{fontSize: 17}}>Общий чат</b><div style={{fontSize: 14, color: 'var(--text-sec)'}}>Групповая беседа</div></div>
                  </button>
                  {allUsers.filter(u => u.username !== user.username).map(u => (
                      <button key={u.username} className="ios-item" onClick={() => { setSelectedPeer(u); setView('chat_room'); }}>
                        <img src={u.avatar} className="avatar" style={{marginRight: 14}} />
                        <div style={{flex: 1}}><b style={{fontSize: 17}}>{u.name}</b><div style={{fontSize: 14, color: 'var(--text-sec)'}}>@{u.username}</div></div>
                        <ChevronRight size={18} color="#C6C6C8" />
                      </button>
                  ))}
                </div>
              </div>
          )}

          {/* --- ЭКРАН НАСТРОЕК --- */}
          {view === 'settings' && (
              <div className="view-container">
                <div className="nav-bar"><div style={{fontSize: 32, fontWeight: 800}}>Настройки</div></div>
                <div className="ios-list" style={{padding: '24px 0'}}>
                  <div style={{textAlign: 'center'}}>
                    <img src={user.avatar} className="avatar-huge" key={user.avatar} />
                    <h3 style={{fontSize: 22, fontWeight: 800}}>{user.name}</h3>
                    <p style={{color: 'var(--text-sec)', fontSize: 15}}>@{user.username}</p>
                  </div>
                </div>
                <div className="ios-list">
                  <div className="ios-item" style={{display: 'flex', justifyContent: 'space-between', cursor: 'default'}}>
                    <span>Статус в сети</span>
                    <select value={user.privacy || 'online'} onChange={e => updateProfile({ privacy: e.target.value })} style={{background: 'transparent', border: 'none', color: 'var(--ios-blue)', fontSize: 16, outline: 'none'}}>
                      <option value="online">В сети</option>
                      <option value="recently">Был(а) недавно</option>
                    </select>
                  </div>
                  <button className="ios-item" onClick={() => { setIsDark(!isDark); localStorage.setItem('aura_dark', !isDark); }}>
                    <div style={{background: '#5856D6', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, color: 'white'}}><Moon size={18}/></div>
                    <div style={{flex: 1}}>Темная тема</div>
                    <div style={{color: 'var(--text-sec)'}}>{isDark ? 'Вкл' : 'Выкл'}</div>
                  </button>
                  <button className="ios-item" onClick={() => { localStorage.clear(); window.location.reload(); }} style={{color: '#FF3B30'}}>
                    <div style={{background: '#FF3B30', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, color: 'white'}}><LogOut size={18}/></div>
                    Выйти
                  </button>
                </div>
              </div>
          )}

          {/* --- ЭКРАН ЧАТА --- */}
          {view === 'chat_room' && selectedPeer && (
              <div className="view-container" style={{position: 'absolute', inset: 0, zIndex: 20}}>
                {/* Header Чата */}
                <div className="nav-bar" style={{paddingTop: 45}}>
                  <button onClick={() => setView('chats')} style={{background: 'none', border: 'none', color: 'var(--ios-blue)', cursor: 'pointer', display: 'flex', alignItems: 'center'}}><ChevronLeft size={34} /></button>
                  <div style={{textAlign: 'center', flex: 1}}>
                    <b style={{fontSize: 17, display: 'block'}}>{selectedPeer.name}</b>
                    <div style={{fontSize: 12, color: selectedPeer.privacy === 'recently' && selectedPeer.username !== 'global' ? 'var(--text-sec)' : '#34C759', fontWeight: 600}}>
                      {selectedPeer.username === 'global' ? 'чат' : (selectedPeer.privacy === 'recently' ? 'был(а) недавно' : 'в сети')}
                    </div>
                  </div>
                  <img src={selectedPeer.avatar || ''} className="avatar" style={{width: 38, height: 38}} />
                </div>

                {/* Сообщения */}
                <div ref={scrollRef} className="chat-scroll">
                  <div style={{flex: 1}}></div>
                  {currentMessages.map((m) => (
                      <div key={m.id} className={`chat-bubble ${m.uid === user.username ? 'bubble-me' : 'bubble-other'}`} style={{padding: m.type === 'image' ? 4 : '8px 12px', background: m.type === 'image' ? 'transparent' : '', boxShadow: m.type === 'image' ? 'none' : ''}} onContextMenu={(e) => { e.preventDefault(); setContextMenu({ x: e.pageX, y: e.pageY, msgId: m.id }); }}>

                        {selectedPeer.username === 'global' && m.uid !== user.username && m.type !== 'image' && <div style={{fontSize: 12, fontWeight: 700, marginBottom: 2, color: 'var(--ios-blue)'}}>{m.name}</div>}

                        {m.type === 'video_circle' ? (
                            <video src={m.text} controls autoPlay loop playsInline className="circle-video" />
                        ) : m.type === 'voice' ? (
                            <div style={{display: 'flex', alignItems: 'center', gap: 10, minWidth: 150}}>
                              <div style={{background: 'var(--ios-blue)', borderRadius: '50%', padding: 8}}><Mic size={16} color="white" /></div>
                              <div>
                                <audio src={m.text} controls style={{display: 'none'}} id={`audio-${m.id}`} />
                                <div style={{height: 3, width: 80, background: 'rgba(0,0,0,0.2)', borderRadius: 2, cursor: 'pointer'}} onClick={() => document.getElementById(`audio-${m.id}`).play()}>
                                  <div style={{height: '100%', width: 0, background: 'var(--ios-blue)'}}></div>
                                </div>
                                <div style={{fontSize: 11, marginTop: 4, opacity: 0.7}}>Голосовое</div>
                              </div>
                            </div>
                        ) : m.type === 'image' ? (
                            <img src={m.text} className="attachment-img" />
                        ) : (
                            <div>{m.text}</div>
                        )}

                        <div style={{fontSize: 10, opacity: 0.6, textAlign: 'right', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 3, position: m.type === 'image' ? 'absolute' : 'relative', bottom: m.type === 'image' ? 10 : 0, right: m.type === 'image' ? 10 : 0, background: m.type === 'image' ? 'rgba(0,0,0,0.5)' : 'none', color: m.type === 'image' ? 'white' : 'inherit', padding: m.type === 'image' ? '2px 8px' : 0, borderRadius: 10}}>
                          {new Date(m.ts).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                          {m.uid === user.username && (m.read ? <CheckCheck size={12} /> : <Check size={12} />)}
                        </div>
                      </div>
                  ))}
                </div>

                {/* ОВЕРЛЕЙ ЗАПИСИ (HUD) */}
                {isRecording && (
                    <div style={{position: 'absolute', bottom: 85, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 150}}>
                      <div style={{background: 'var(--nav-bg)', backdropFilter: 'blur(20px)', borderRadius: 40, padding: '8px 20px 8px 8px', display: 'flex', alignItems: 'center', gap: 15, boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid var(--sep)'}}>
                        {isRecording === 'video' ? (
                            <div style={{width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--ios-blue)'}}>
                              <video ref={videoPreviewRef} autoPlay muted playsInline style={{width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)'}} />
                            </div>
                        ) : (
                            <div style={{width: 50, height: 50, borderRadius: '50%', background: 'var(--ios-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                              <Mic size={24} color="white" />
                            </div>
                        )}
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <div style={{display: 'flex', alignItems: 'center', gap: 8, color: '#FF3B30', fontWeight: 'bold', fontSize: 18}}>
                            <div style={{width: 10, height: 10, borderRadius: '50%', background: '#FF3B30', animation: 'pulseGlow 1s infinite'}} />
                            {formatTime(recTime)}
                          </div>
                          <button onClick={cancelMediaRecording} style={{background: 'none', border: 'none', color: 'var(--text-sec)', fontSize: 14, marginTop: 4, cursor: 'pointer', textAlign: 'left', outline: 'none'}}>Отменить</button>
                        </div>
                      </div>
                    </div>
                )}

                {/* ВВОД СООБЩЕНИЙ */}
                <div style={{padding: '10px 16px 25px', background: 'var(--nav-bg)', backdropFilter: 'blur(25px)', display: 'flex', gap: 10, alignItems: 'flex-end', borderTop: '0.5px solid var(--sep)', position: 'absolute', bottom: 0, left: 0, right: 0}}>
                  <button style={{background: 'none', border: 'none', color: 'var(--text-sec)', cursor: 'pointer', paddingBottom: 6}} onClick={() => fileInputRef.current?.click()}>
                    <Paperclip size={26} />
                    <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleFileUpload} />
                  </button>

                  <textarea
                      style={{flex: 1, padding: '9px 16px', borderRadius: 20, border: `1px solid var(--sep)`, background: isDark ? '#2C2C2E' : '#FFFFFF', color: 'var(--text-main)', fontSize: 16, outline: 'none', resize: 'none', maxHeight: 100}}
                      rows={1}
                      value={input} onChange={e => setInput(e.target.value)}
                      placeholder="Сообщение"
                      onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                  />

                  {input.trim() ? (
                      <button onClick={() => sendMessage(input)} style={{background: 'var(--ios-blue)', borderRadius: '50%', width: 36, height: 36, border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: 2}}><Send size={18}/></button>
                  ) : (
                      <button
                          onPointerDown={handlePointerDown}
                          onPointerUp={handlePointerUp}
                          onPointerLeave={handlePointerUp}
                          style={{background: 'none', border: 'none', color: isRecording ? '#FF3B30' : 'var(--text-sec)', cursor: 'pointer', paddingBottom: 6, transform: isRecording ? 'scale(1.2)' : 'scale(1)', transition: '0.2s'}}
                      >
                        {mode === 'voice' ? <Mic size={26}/> : <Camera size={26}/>}
                      </button>
                  )}
                </div>

                {/* КОНТЕКСТНОЕ МЕНЮ (Удаление) */}
                {contextMenu && (
                    <>
                      <div style={{position: 'fixed', inset: 0, zIndex: 290}} onClick={() => setContextMenu(null)} />
                      <div style={{
                        position: 'absolute', top: Math.min(contextMenu.y - 60, window.innerHeight - 150), left: Math.min(contextMenu.x - 50, window.innerWidth - 200),
                        background: 'var(--card-bg)', border: '1px solid var(--sep)', borderRadius: 16, boxShadow: '0 10px 25px rgba(0,0,0,0.2)', zIndex: 300, overflow: 'hidden', width: 200
                      }}>
                        <button style={{width: '100%', padding: '12px 16px', background: 'none', border: 'none', borderBottom: '1px solid var(--sep)', color: 'var(--text-main)', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer'}} onClick={() => deleteMessage('me')}>
                          <Trash size={18} color="var(--text-sec)" /> Удалить у меня
                        </button>
                        <button style={{width: '100%', padding: '12px 16px', background: 'none', border: 'none', color: '#FF3B30', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer'}} onClick={() => deleteMessage('both')}>
                          <Trash2 size={18} color="#FF3B30" /> Удалить у всех
                        </button>
                      </div>
                    </>
                )}
              </div>
          )}

          {/* --- НИЖНЯЯ ПАНЕЛЬ НАВИГАЦИИ (TAB BAR) --- */}
          {view !== 'chat_room' && (
              <div className="tab-bar">
                <button className={`tab-item ${view === 'chats' ? 'active' : ''}`} onClick={() => setView('chats')}><MessageCircle size={28} /><span>Чаты</span></button>
                <button className={`tab-item ${view === 'settings' ? 'active' : ''}`} onClick={() => setView('settings')}><UserIcon size={28} /><span>Настройки</span></button>
              </div>
          )}

        </div>
      </div>
  );
}