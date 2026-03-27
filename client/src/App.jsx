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
  Trash2,
  Pin,
  Smile,
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

// Анимированные стикеры (Google Noto Animated)
const ANIMATED_STICKERS = [
  'https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.gif', // Смех
  'https://fonts.gstatic.com/s/e/notoemoji/latest/2764_fe0f/512.gif', // Сердце
  'https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/512.gif', // Огонь
  'https://fonts.gstatic.com/s/e/notoemoji/latest/1f60e/512.gif', // Крутой
  'https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.gif', // Вечеринка
  'https://fonts.gstatic.com/s/e/notoemoji/latest/1f44d/512.gif', // Лайк
  'https://fonts.gstatic.com/s/e/notoemoji/latest/1f62d/512.gif', // Плач
  'https://fonts.gstatic.com/s/e/notoemoji/latest/1f92f/512.gif', // Взрыв мозга
];

// --- СТИЛИ ---
const auraStyles = (isDark) => `
  :root { 
    --ios-blue: #007AFF; 
    --ios-bg: ${isDark ? '#000000' : '#F2F2F7'};
    --card-bg: ${isDark ? '#1C1C1E' : '#FFFFFF'};
    --text-main: ${isDark ? '#FFFFFF' : '#000000'};
    --text-sec: #8E8E93;
    --sep: ${isDark ? '#38383A' : '#C6C6C8'};
    --nav-bg: ${isDark ? 'rgba(28, 28, 30, 0.75)' : 'rgba(255, 255, 255, 0.75)'};
    --bubble-me: var(--ios-blue);
    --bubble-me-text: #FFFFFF;
  }
  
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #000; color: var(--text-main); overflow: hidden; }
  
  .app-container { width: 100vw; height: 100vh; display: flex; justify-content: center; background: #000; }
  .phone-screen { 
    width: 100%; max-width: 500px; height: 100%; background: var(--ios-bg); 
    position: relative; display: flex; flex-direction: column; overflow: hidden; 
  }
  .view-container { flex: 1; display: flex; flex-direction: column; height: 100%; animation: slideIn 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); position: relative; }
  
  @keyframes slideIn { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes popIn { 
    0% { transform: scale(0.95) translateY(10px); opacity: 0; } 
    100% { transform: scale(1) translateY(0); opacity: 1; } 
  }
  @keyframes pulseGlow { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
  @keyframes stickerPop { 0% { transform: scale(0.5); opacity: 0; } 50% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
  
  .ios-input { 
    width: 100%; padding: 14px 16px; border-radius: 12px; 
    border: 1.5px solid var(--sep); background: ${isDark ? '#2C2C2E' : '#FFFFFF'}; 
    color: var(--text-main); font-size: 16px; outline: none; transition: all 0.2s; 
  }
  .btn-primary { 
    width: 100%; padding: 16px; background: var(--ios-blue); color: white; 
    border: none; border-radius: 16px; font-weight: 700; font-size: 17px; cursor: pointer; transition: transform 0.1s;
  }
  .btn-primary:active { transform: scale(0.97); }
  
  .glass-panel {
    background: var(--nav-bg); 
    backdrop-filter: blur(25px) saturate(180%); 
    -webkit-backdrop-filter: blur(25px) saturate(180%);
  }

  .nav-bar { 
    padding: 55px 16px 15px; border-bottom: 0.5px solid var(--sep); display: flex; align-items: center; 
    justify-content: space-between; position: sticky; top: 0; z-index: 50; 
  }
  .ios-list { background: var(--card-bg); margin: 16px; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
  .ios-item { 
    display: flex; align-items: center; padding: 12px 16px; cursor: pointer; transition: background 0.2s;
    border: none; background: none; text-align: left; width: 100%; color: var(--text-main); position: relative; 
  }
  .ios-item:active { background: ${isDark ? '#2C2C2E' : '#E5E5EA'}; }
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
    animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
    box-shadow: 0 1px 2px rgba(0,0,0,0.1); transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .bubble-me { background: var(--bubble-me); color: var(--bubble-me-text); align-self: flex-end; border-bottom-right-radius: 4px; }
  .bubble-other { background: var(--card-bg); color: var(--text-main); align-self: flex-start; border-bottom-left-radius: 4px; }
  
  .circle-video { width: 220px; height: 220px; border-radius: 50%; object-fit: cover; border: 3px solid ${isDark ? '#31A24C' : '#E1FFC7'}; background: #000; transform: scaleX(-1); }
  
  .sticker-img { width: 120px; height: 120px; object-fit: contain; animation: stickerPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); }
  .attachment-img { max-width: 240px; max-height: 300px; border-radius: 12px; object-fit: cover; display: block; }

  .tab-bar { 
    height: 85px; border-top: 0.5px solid var(--sep); display: flex; justify-content: space-around; 
    padding-top: 10px; flex-shrink: 0; z-index: 100; 
  }
  .tab-item { display: flex; flex-direction: column; align-items: center; gap: 4px; color: var(--text-sec); cursor: pointer; border: none; background: none; flex: 1; transition: transform 0.1s;}
  .tab-item:active { transform: scale(0.9); }
  .tab-item.active { color: var(--ios-blue); }
  
  .avatar { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; flex-shrink: 0; border: 0.5px solid var(--sep); background: #eee; }
  .avatar-huge { width: 110px; height: 110px; border-radius: 50%; object-fit: cover; margin: 0 auto 10px; border: 3px solid var(--ios-blue); display: block; background: #eee; cursor: pointer; transition: transform 0.2s; }
  .avatar-huge:active { transform: scale(0.95); }
  
  .error-toast { 
    position: absolute; top: 100px; left: 20px; right: 20px; background: rgba(255, 59, 48, 0.9); backdrop-filter: blur(10px); color: white; 
    padding: 12px; border-radius: 12px; text-align: center; z-index: 3000; animation: slideInUp 0.3s ease; font-weight: bold; box-shadow: 0 4px 15px rgba(255,59,48,0.3);
  }
  @keyframes slideInUp { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  /* Эффект размытия для контекстного меню Telegram */
  .blur-overlay {
    position: fixed; inset: 0; background: ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)'}; 
    backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
    z-index: 2000; animation: fadeIn 0.2s ease; cursor: pointer;
  }
  @keyframes fadeIn { from { opacity: 0; backdrop-filter: blur(0px); } to { opacity: 1; backdrop-filter: blur(12px); } }

  .context-menu-popup {
    position: absolute; background: var(--card-bg); border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); 
    width: 220px; z-index: 2005; overflow: hidden; animation: popIn 0.2s ease; border: 1px solid var(--sep);
  }
  .context-menu-btn {
    width: 100%; padding: 14px 16px; background: none; border: none; border-bottom: 0.5px solid var(--sep);
    color: var(--text-main); font-size: 16px; text-align: left; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: background 0.1s;
  }
  .context-menu-btn:active { background: ${isDark ? '#2C2C2E' : '#F2F2F7'}; }
  .context-menu-btn.danger { color: #FF3B30; }

  /* Логотип Акаши */
  .akashi-logo {
    width: 90px; height: 90px; background: #0a0a0a; border-radius: 24px; margin: 0 auto 25px;
    display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;
    box-shadow: 0 0 30px rgba(220,38,38,0.4); border: 1px solid rgba(239,68,68,0.2);
  }
  .akashi-glow {
    position: absolute; inset: 0; background: rgba(220,38,38,0.25); filter: blur(15px); border-radius: 50%;
  }

  /* Скроллбар для стикеров */
  .sticker-panel::-webkit-scrollbar { height: 0px; }
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

  // Состояния для медиа и UI
  const [mode, setMode] = useState('voice');
  const [isRecording, setIsRecording] = useState(null);
  const [recTime, setRecTime] = useState(0);
  const [contextMenu, setContextMenu] = useState(null); // { item, type: 'message'|'chat', rect }
  const [showStickers, setShowStickers] = useState(false);

  const scrollRef = useRef();
  const fileInputRef = useRef(null);
  const avatarInputRef = useRef(null);
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
  }, [messages, view, selectedPeer, showStickers]);

  // Фикс черного экрана при записи
  useEffect(() => {
    if (activeStream.current && videoPreviewRef.current && isRecording === 'video') {
      videoPreviewRef.current.srcObject = activeStream.current;
      videoPreviewRef.current.onloadedmetadata = () => {
        videoPreviewRef.current.play().catch(e => console.error("Play error", e));
      };
    }
  }, [isRecording]);

  const showError = (msg) => {
    setGlobalError(msg);
    setTimeout(() => setGlobalError(null), 3000);
  };

  const handleAuth = async () => {
    const { username, password, name } = formData;
    if (!username || !password) return showError("Введите логин и пароль");
    setLoading(true);
    try {
      const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', username.toLowerCase().trim());
      const snap = await getDoc(userRef);

      if (authStep === 'reg') {
        if (snap.exists()) {
          showError("Пользователь уже существует! Войдите.");
        } else {
          const newUser = {
            username: username.toLowerCase().trim(), password, name: name || username,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
            privacy: 'online', pinnedChats: []
          };
          await setDoc(userRef, newUser);
          setUser(newUser); localStorage.setItem('aura_user', JSON.stringify(newUser));
        }
      } else {
        if (snap.exists()) {
          if (snap.data().password === password) {
            setUser(snap.data()); localStorage.setItem('aura_user', JSON.stringify(snap.data()));
          } else {
            showError("Неверный пароль!");
          }
        } else {
          showError("Аккаунт не найден! Зарегистрируйтесь.");
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

  // Изменение аватара с компрессией (чтобы не превышать лимит базы)
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 200;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
        updateProfile({ avatar: compressedBase64 });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const sendMessage = async (val, type = 'text') => {
    if (!val.trim() && type === 'text') return;
    try {
      if (val.length > 950000) return showError("Файл слишком большой.");
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
        text: val, uid: user.username, to: selectedPeer.username, ts: Date.now(), name: user.name, type, hiddenFor: [], isPinned: false
      });
      setInput('');
      setShowStickers(false);
    } catch (e) {
      showError("Ошибка отправки.");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => sendMessage(reader.result, 'image');
    reader.readAsDataURL(file);
  };

  // --- ОБРАБОТЧИКИ КОНТЕКСТНОГО МЕНЮ И ЗАКРЕПЛЕНИЯ ---
  const openContextMenu = (e, item, type) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setContextMenu({ item, type, rect });
  };

  const closeContextMenu = () => setContextMenu(null);

  const deleteMessage = async (deleteType) => {
    if (!contextMenu || contextMenu.type !== 'message') return;
    const msgRef = doc(db, 'artifacts', appId, 'public', 'data', 'messages', contextMenu.item.id);
    try {
      if (deleteType === 'both') {
        await deleteDoc(msgRef);
      } else {
        await updateDoc(msgRef, { hiddenFor: [...(contextMenu.item.hiddenFor || []), user.username] });
      }
    } catch (e) { console.error(e); }
    closeContextMenu();
  };

  const togglePinMessage = async () => {
    if (!contextMenu || contextMenu.type !== 'message') return;
    const msgRef = doc(db, 'artifacts', appId, 'public', 'data', 'messages', contextMenu.item.id);
    try {
      await updateDoc(msgRef, { isPinned: !contextMenu.item.isPinned });
    } catch (e) { console.error(e); }
    closeContextMenu();
  };

  const togglePinChat = async () => {
    if (!contextMenu || contextMenu.type !== 'chat') return;
    const peerUsername = contextMenu.item.username;
    const currentPinned = user.pinnedChats || [];
    const isPinned = currentPinned.includes(peerUsername);
    const newPinned = isPinned ? currentPinned.filter(u => u !== peerUsername) : [...currentPinned, peerUsername];
    await updateProfile({ pinnedChats: newPinned });
    closeContextMenu();
  };

  // --- МЕДИА (КРУЖКИ И ГОЛОСОВЫЕ) ---
  const startMediaRecording = async (type) => {
    try {
      const constraints = { audio: true, video: type === 'video' ? { facingMode: 'user', width: 300, height: 300 } : false };
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
      showError("Нет доступа к камере или микрофону");
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

  // ЛОГИКА ТАПА И УДЕРЖАНИЯ ДЛЯ КНОПКИ ЗАПИСИ
  const handlePointerDown = (e) => {
    e.preventDefault();
    isHolding.current = false;
    pressTimer.current = setTimeout(() => {
      isHolding.current = true;
      startMediaRecording(mode);
    }, 300);
  };

  const handlePointerUp = (e) => {
    e.preventDefault();
    clearTimeout(pressTimer.current);
    if (isHolding.current) {
      stopMediaRecording();
    } else {
      setMode(prev => prev === 'voice' ? 'video' : 'voice');
    }
    isHolding.current = false;
  };

  // Фильтрация и сортировка
  const currentMessages = messages.filter(m => {
    if (!selectedPeer) return false;
    if (m.hiddenFor && m.hiddenFor.includes(user.username)) return false;
    if (selectedPeer.username === 'global') return m.to === 'global';
    return (m.uid === user.username && m.to === selectedPeer.username) ||
        (m.uid === selectedPeer.username && m.to === user.username);
  });

  const pinnedMessageInChat = currentMessages.filter(m => m.isPinned).pop(); // Берем последнее закрепленное

  const sortedUsers = allUsers.filter(u => u.username !== user.username).sort((a, b) => {
    const aPin = user.pinnedChats?.includes(a.username);
    const bPin = user.pinnedChats?.includes(b.username);
    if (aPin && !bPin) return -1;
    if (!aPin && bPin) return 1;
    return 0;
  });

  // Вспомогательный рендер сообщения для повторного использования (в чате и в блюре)
  const renderMessageContent = (m, isClone = false) => {
    const isMine = m.uid === user.username;
    const isSticker = m.type === 'sticker';
    const isImage = m.type === 'image';

    let contentStyle = { padding: isImage || isSticker ? 4 : '8px 12px', background: isImage || isSticker ? 'transparent' : '', boxShadow: isImage || isSticker ? 'none' : '' };
    if (isClone) contentStyle.margin = 0; // Сброс отступов для клона

    return (
        <div className={`chat-bubble ${isMine ? 'bubble-me' : 'bubble-other'} ${isClone ? 'cloned-bubble' : ''}`} style={contentStyle}
             onContextMenu={!isClone ? (e) => openContextMenu(e, m, 'message') : undefined}
             onTouchStart={!isClone ? (e) => {
               pressTimer.current = setTimeout(() => openContextMenu(e, m, 'message'), 500);
             } : undefined}
             onTouchEnd={!isClone ? () => clearTimeout(pressTimer.current) : undefined}
             onTouchMove={!isClone ? () => clearTimeout(pressTimer.current) : undefined}
        >
          {selectedPeer?.username === 'global' && !isMine && !isImage && !isSticker && <div style={{fontSize: 12, fontWeight: 700, marginBottom: 2, color: 'var(--ios-blue)'}}>{m.name}</div>}

          {m.type === 'video_circle' ? (
              <video src={m.text} controls={!isClone} autoPlay loop muted={isClone} playsInline className="circle-video" />
          ) : m.type === 'voice' ? (
              <div style={{display: 'flex', alignItems: 'center', gap: 10, minWidth: 150}}>
                <div style={{background: isMine ? 'rgba(255,255,255,0.2)' : 'var(--ios-blue)', borderRadius: '50%', padding: 8}}><Mic size={16} color={isMine ? "white" : "white"} /></div>
                <div>
                  {!isClone && <audio src={m.text} style={{display: 'none'}} id={`audio-${m.id}`} />}
                  <div style={{height: 3, width: 80, background: 'rgba(0,0,0,0.2)', borderRadius: 2, cursor: 'pointer'}} onClick={() => !isClone && document.getElementById(`audio-${m.id}`).play()}>
                    <div style={{height: '100%', width: 0, background: isMine ? 'white' : 'var(--ios-blue)'}}></div>
                  </div>
                  <div style={{fontSize: 11, marginTop: 4, opacity: 0.8}}>Голосовое</div>
                </div>
              </div>
          ) : isImage ? (
              <img src={m.text} className="attachment-img" alt="вложение" />
          ) : isSticker ? (
              <img src={m.text} className="sticker-img" alt="стикер" />
          ) : (
              <div>{m.text}</div>
          )}

          <div style={{fontSize: 10, opacity: 0.7, textAlign: 'right', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 3, position: isImage || isSticker ? 'absolute' : 'relative', bottom: isImage || isSticker ? 10 : 0, right: isImage || isSticker ? 10 : 0, background: isImage || isSticker ? 'rgba(0,0,0,0.4)' : 'none', color: isImage || isSticker ? 'white' : 'inherit', padding: isImage || isSticker ? '2px 8px' : 0, borderRadius: 10, backdropFilter: isImage || isSticker ? 'blur(5px)' : 'none'}}>
            {m.isPinned && <Pin size={10} style={{marginRight: 2}} />}
            {new Date(m.ts).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
            {isMine && (m.read ? <CheckCheck size={12} /> : <Check size={12} />)}
          </div>
        </div>
    );
  };

  if (!user) return (
      <div className="app-container">
        <style>{auraStyles(isDark)}</style>
        <div style={{width: '100%', maxWidth: 400, padding: 30, background: 'var(--card-bg)', borderRadius: 24, alignSelf: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', animation: 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'}}>
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
                <div className="nav-bar glass-panel">
                  <div style={{fontSize: 32, fontWeight: 800}}>Чаты</div>
                  <Edit3 size={24} color="var(--ios-blue)" />
                </div>
                <div style={{padding: '10px 16px 12px'}}>
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
                  {sortedUsers.map(u => {
                    const isPinned = user.pinnedChats?.includes(u.username);
                    return (
                        <button key={u.username} className="ios-item"
                                onClick={() => { setSelectedPeer(u); setView('chat_room'); }}
                                onContextMenu={(e) => openContextMenu(e, u, 'chat')}
                                onTouchStart={(e) => { pressTimer.current = setTimeout(() => openContextMenu(e, u, 'chat'), 500); }}
                                onTouchEnd={() => clearTimeout(pressTimer.current)}
                                onTouchMove={() => clearTimeout(pressTimer.current)}
                        >
                          <img src={u.avatar} className="avatar" style={{marginRight: 14}} />
                          <div style={{flex: 1}}>
                            <b style={{fontSize: 17, display: 'flex', alignItems: 'center', gap: 5}}>
                              {u.name} {isPinned && <Pin size={14} color="var(--text-sec)" />}
                            </b>
                            <div style={{fontSize: 14, color: 'var(--text-sec)'}}>@{u.username}</div>
                          </div>
                          <ChevronRight size={18} color="#C6C6C8" />
                        </button>
                    )
                  })}
                </div>
              </div>
          )}

          {/* --- ЭКРАН НАСТРОЕК --- */}
          {view === 'settings' && (
              <div className="view-container">
                <div className="nav-bar glass-panel"><div style={{fontSize: 32, fontWeight: 800}}>Настройки</div></div>
                <div className="ios-list" style={{padding: '24px 0'}}>
                  <div style={{textAlign: 'center', position: 'relative'}}>
                    <div style={{position: 'relative', display: 'inline-block'}}>
                      <img src={user.avatar} className="avatar-huge" onClick={() => avatarInputRef.current?.click()} alt="Profile" />
                      <div style={{position: 'absolute', bottom: 10, right: -5, background: 'var(--ios-blue)', borderRadius: '50%', padding: 6, border: '3px solid var(--card-bg)', pointerEvents: 'none'}}>
                        <Camera size={16} color="white" />
                      </div>
                      <input type="file" hidden ref={avatarInputRef} accept="image/*" onChange={handleAvatarChange} />
                    </div>
                    <h3 style={{fontSize: 22, fontWeight: 800, marginTop: 10}}>{user.name}</h3>
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

                {/* Header Чата со стеклом */}
                <div className="nav-bar glass-panel" style={{paddingTop: 45, paddingBottom: 10, flexDirection: 'column', alignItems: 'stretch'}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <button onClick={() => setView('chats')} style={{background: 'none', border: 'none', color: 'var(--ios-blue)', cursor: 'pointer', display: 'flex', alignItems: 'center'}}><ChevronLeft size={34} /></button>
                    <div style={{textAlign: 'center', flex: 1}}>
                      <b style={{fontSize: 17, display: 'block'}}>{selectedPeer.name}</b>
                      <div style={{fontSize: 12, color: selectedPeer.privacy === 'recently' && selectedPeer.username !== 'global' ? 'var(--text-sec)' : '#34C759', fontWeight: 600}}>
                        {selectedPeer.username === 'global' ? 'чат' : (selectedPeer.privacy === 'recently' ? 'был(а) недавно' : 'в сети')}
                      </div>
                    </div>
                    <img src={selectedPeer.avatar || ''} className="avatar" style={{width: 38, height: 38}} />
                  </div>

                  {/* Закрепленное сообщение */}
                  {pinnedMessageInChat && (
                      <div style={{marginTop: 10, padding: '6px 10px', background: 'rgba(0,122,255,0.1)', borderRadius: 8, borderLeft: '3px solid var(--ios-blue)', display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer'}} onClick={() => scrollRef.current?.scrollTo({top: 0, behavior: 'smooth'})}>
                        <div style={{flex: 1, overflow: 'hidden'}}>
                          <div style={{fontSize: 13, fontWeight: 'bold', color: 'var(--ios-blue)'}}>Закреплённое сообщение</div>
                          <div style={{fontSize: 13, color: 'var(--text-sec)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>{pinnedMessageInChat.type === 'image' ? 'Фотография' : pinnedMessageInChat.type === 'sticker' ? 'Стикер' : pinnedMessageInChat.type.includes('video') ? 'Видеосообщение' : pinnedMessageInChat.text}</div>
                        </div>
                      </div>
                  )}
                </div>

                {/* Сообщения */}
                <div ref={scrollRef} className="chat-scroll">
                  <div style={{flex: 1}}></div>
                  {currentMessages.map((m) => (
                      <React.Fragment key={m.id}>
                        {renderMessageContent(m)}
                      </React.Fragment>
                  ))}
                </div>

                {/* ОВЕРЛЕЙ ЗАПИСИ (HUD) */}
                {isRecording && (
                    <div style={{position: 'absolute', bottom: 85, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 150}}>
                      <div className="glass-panel" style={{borderRadius: 40, padding: '8px 20px 8px 8px', display: 'flex', alignItems: 'center', gap: 15, boxShadow: '0 10px 25px rgba(0,0,0,0.2)', border: '1px solid var(--sep)'}}>
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

                {/* ПАНЕЛЬ СТИКЕРОВ */}
                {showStickers && (
                    <div className="sticker-panel glass-panel" style={{position: 'absolute', bottom: 65, left: 0, right: 0, height: 200, zIndex: 40, borderTop: '0.5px solid var(--sep)', overflowX: 'auto', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 16}}>
                      {ANIMATED_STICKERS.map((url, i) => (
                          <img key={i} src={url} style={{width: 70, height: 70, cursor: 'pointer', flexShrink: 0, transition: 'transform 0.1s'}} onClick={() => sendMessage(url, 'sticker')} onMouseDown={e => e.target.style.transform='scale(0.8)'} onMouseUp={e => e.target.style.transform='scale(1)'} alt="sticker" />
                      ))}
                    </div>
                )}

                {/* ВВОД СООБЩЕНИЙ */}
                <div className="glass-panel" style={{padding: '10px 16px 25px', display: 'flex', gap: 10, alignItems: 'flex-end', borderTop: '0.5px solid var(--sep)', position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50}}>
                  <button style={{background: 'none', border: 'none', color: 'var(--text-sec)', cursor: 'pointer', paddingBottom: 6}} onClick={() => fileInputRef.current?.click()}>
                    <Paperclip size={26} />
                    <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleFileUpload} />
                  </button>

                  <div style={{flex: 1, position: 'relative', display: 'flex', alignItems: 'center'}}>
                 <textarea
                     style={{width: '100%', padding: '9px 40px 9px 16px', borderRadius: 20, border: `1px solid var(--sep)`, background: isDark ? '#2C2C2E' : '#FFFFFF', color: 'var(--text-main)', fontSize: 16, outline: 'none', resize: 'none', maxHeight: 100}}
                     rows={1}
                     value={input} onChange={e => setInput(e.target.value)}
                     placeholder="Сообщение"
                     onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                 />
                    <button style={{position: 'absolute', right: 10, background: 'none', border: 'none', color: showStickers ? 'var(--ios-blue)' : 'var(--text-sec)', cursor: 'pointer', bottom: 6}} onClick={() => setShowStickers(!showStickers)}>
                      <Smile size={24} />
                    </button>
                  </div>

                  {input.trim() ? (
                      <button onClick={() => sendMessage(input)} style={{background: 'var(--ios-blue)', borderRadius: '50%', width: 36, height: 36, border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: 2}}><Send size={18}/></button>
                  ) : (
                      <button
                          onPointerDown={handlePointerDown}
                          onTouchStart={handlePointerDown}
                          onPointerUp={handlePointerUp}
                          onTouchEnd={handlePointerUp}
                          onPointerLeave={handlePointerUp}
                          style={{background: 'none', border: 'none', color: isRecording ? '#FF3B30' : 'var(--text-sec)', cursor: 'pointer', paddingBottom: 6, transform: isRecording ? 'scale(1.2)' : 'scale(1)', transition: '0.2s'}}
                      >
                        {mode === 'voice' ? <Mic size={26}/> : <Camera size={26}/>}
                      </button>
                  )}
                </div>
              </div>
          )}

          {/* --- КОНТЕКСТНОЕ МЕНЮ (Эффект блюра поверх всего) --- */}
          {contextMenu && (
              <div className="blur-overlay" onClick={closeContextMenu}>

                {/* Отрисовка клона сообщения поверх блюра */}
                {contextMenu.type === 'message' && (
                    <div style={{ position: 'absolute', top: contextMenu.rect.top, left: contextMenu.rect.left, width: contextMenu.rect.width, zIndex: 2001, transform: 'scale(1.02)', transition: 'transform 0.2s' }}>
                      {renderMessageContent(contextMenu.item, true)}
                    </div>
                )}

                {/* Меню опций */}
                <div className="context-menu-popup" style={{
                  top: contextMenu.type === 'message'
                      ? Math.min(contextMenu.rect.bottom + 15, window.innerHeight - 150)
                      : Math.min(contextMenu.rect.bottom - 20, window.innerHeight - 120),
                  left: contextMenu.type === 'message'
                      ? (contextMenu.item.uid === user.username ? 'auto' : contextMenu.rect.left)
                      : Math.max(20, contextMenu.rect.left + 50),
                  right: contextMenu.type === 'message' && contextMenu.item.uid === user.username ? window.innerWidth - contextMenu.rect.right : 'auto'
                }} onClick={e => e.stopPropagation()}>

                  {contextMenu.type === 'message' ? (
                      <>
                        <button className="context-menu-btn" onClick={togglePinMessage}>
                          <Pin size={18} /> {contextMenu.item.isPinned ? 'Открепить' : 'Закрепить'}
                        </button>
                        <button className="context-menu-btn danger" onClick={() => deleteMessage('me')}>
                          <Trash size={18} /> Удалить у меня
                        </button>
                        {contextMenu.item.uid === user.username && (
                            <button className="context-menu-btn danger" onClick={() => deleteMessage('both')} style={{borderBottom: 'none'}}>
                              <Trash2 size={18} /> Удалить у всех
                            </button>
                        )}
                      </>
                  ) : (
                      <>
                        <button className="context-menu-btn" onClick={togglePinChat} style={{borderBottom: 'none'}}>
                          <Pin size={18} /> {user.pinnedChats?.includes(contextMenu.item.username) ? 'Открепить чат' : 'Закрепить чат'}
                        </button>
                      </>
                  )}
                </div>
              </div>
          )}

          {/* --- НИЖНЯЯ ПАНЕЛЬ НАВИГАЦИИ (TAB BAR) --- */}
          {view !== 'chat_room' && (
              <div className="tab-bar glass-panel">
                <button className={`tab-item ${view === 'chats' ? 'active' : ''}`} onClick={() => setView('chats')}><MessageCircle size={28} /><span>Чаты</span></button>
                <button className={`tab-item ${view === 'settings' ? 'active' : ''}`} onClick={() => setView('settings')}><UserIcon size={28} /><span>Настройки</span></button>
              </div>
          )}

        </div>
      </div>
  );
}