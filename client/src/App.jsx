import React, { useState, useEffect, useRef } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, onSnapshot, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import {
  Search, MessageCircle, ChevronLeft, Send, User as UserIcon, LogOut, Moon,
  Camera, ChevronRight, Globe, Edit3, Mic, Check, CheckCheck, Paperclip,
  Trash, Trash2, Pin, Smile, Forward, Phone, Video, X, PhoneMissed, PhoneIncoming,
  RefreshCw, Lock, Pause, Play
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
const appId = typeof __app_id !== 'undefined' ? __app_id : 'aura-pro-v28';
const app = !getApps().length ? initializeApp(envConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// WebRTC STUN серверы
const rtcServers = {
  iceServers: [
    { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }
  ]
};

// Анимированные стикеры
const ANIMATED_STICKERS = [
  'https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.gif',
  'https://fonts.gstatic.com/s/e/notoemoji/latest/2764_fe0f/512.gif',
  'https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/512.gif',
  'https://fonts.gstatic.com/s/e/notoemoji/latest/1f60e/512.gif',
  'https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.gif',
  'https://fonts.gstatic.com/s/e/notoemoji/latest/1f44d/512.gif',
  'https://fonts.gstatic.com/s/e/notoemoji/latest/1f92f/512.gif',
  'https://fonts.gstatic.com/s/e/notoemoji/latest/1f47d/512.gif',
];

const auraStyles = (isDark) => `
  :root { 
    --ios-blue: #007AFF; 
    --ios-bg: ${isDark ? '#000000' : '#F2F2F7'};
    --card-bg: ${isDark ? '#1C1C1E' : '#FFFFFF'};
    --text-main: ${isDark ? '#FFFFFF' : '#000000'};
    --text-sec: #8E8E93;
    --sep: ${isDark ? '#38383A' : '#C6C6C8'};
    --nav-bg: ${isDark ? 'rgba(28, 28, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)'};
    --bubble-me: var(--ios-blue);
    --bubble-me-text: #FFFFFF;
  }
  
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0; padding: 0; }
  body { 
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
    background: #000; color: var(--text-main); 
    overflow: hidden; 
    position: fixed; inset: 0; 
    overscroll-behavior: none; touch-action: none; 
  }
  
  .app-container { width: 100vw; height: 100vh; display: flex; justify-content: center; background: #000; overscroll-behavior: none; }
  .phone-screen { width: 100%; max-width: 500px; height: 100%; background: var(--ios-bg); position: relative; display: flex; flex-direction: column; overflow: hidden; overscroll-behavior: none; }
  .view-container { flex: 1; display: flex; flex-direction: column; height: 100%; animation: slideIn 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); position: relative; overflow: hidden; touch-action: pan-y; }
  
  @keyframes slideIn { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes popIn { 0% { transform: scale(0.95) translateY(10px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
  @keyframes pulseGlow { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
  @keyframes callPulse { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.8); opacity: 0; } }
  
  .ios-input { width: 100%; padding: 14px 16px; border-radius: 12px; border: 1.5px solid var(--sep); background: ${isDark ? '#2C2C2E' : '#FFFFFF'}; color: var(--text-main); font-size: 16px; outline: none; }
  .btn-primary { width: 100%; padding: 16px; background: var(--ios-blue); color: white; border: none; border-radius: 16px; font-weight: 700; font-size: 17px; cursor: pointer; }
  .btn-primary:active { transform: scale(0.97); }
  
  .glass-panel { background: var(--nav-bg); backdrop-filter: blur(25px) saturate(180%); -webkit-backdrop-filter: blur(25px) saturate(180%); }
  .nav-bar { padding: 55px 16px 15px; border-bottom: 0.5px solid var(--sep); display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
  .ios-list { background: var(--card-bg); margin: 16px; border-radius: 12px; overflow: hidden; }
  .ios-item { display: flex; align-items: center; padding: 12px 16px; cursor: pointer; border: none; background: none; text-align: left; width: 100%; color: var(--text-main); position: relative; }
  .ios-item:active { background: ${isDark ? '#2C2C2E' : '#E5E5EA'}; }
  .ios-item:not(:last-child)::after { content: ''; position: absolute; left: 70px; right: 0; bottom: 0; height: 0.5px; background: var(--sep); }
  
  .chat-scroll { flex: 1; overflow-y: auto; padding: 12px 16px 100px; display: flex; flex-direction: column; gap: 8px; background: ${isDark ? '#000' : '#E6EBF0'}; background-image: ${isDark ? 'none' : "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')"}; background-attachment: fixed; touch-action: pan-y; -webkit-overflow-scrolling: touch; }
  
  .chat-bubble { max-width: 80%; width: fit-content; padding: 8px 12px; border-radius: 18px; font-size: 16px; position: relative; word-wrap: break-word; line-height: 1.3; animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 1px 2px rgba(0,0,0,0.1); user-select: none; }
  .bubble-me { background: var(--bubble-me); color: var(--bubble-me-text); align-self: flex-end; border-bottom-right-radius: 4px; }
  .bubble-other { background: var(--card-bg); color: var(--text-main); align-self: flex-start; border-bottom-left-radius: 4px; }
  
  .system-bubble { align-self: center; background: rgba(0,0,0,0.3); color: white; padding: 6px 14px; border-radius: 16px; font-size: 13px; font-weight: 500; backdrop-filter: blur(10px); margin: 10px 0; text-align: center; max-width: 90%; }
  .circle-video-wrap { width: 220px; height: 220px; border-radius: 50%; overflow: hidden; border: 3px solid ${isDark ? '#31A24C' : '#E1FFC7'}; background: #000; position: relative; cursor: pointer; flex-shrink: 0; }
  .circle-video-wrap video { width: 100%; height: 100%; object-fit: cover; transform: scaleX(-1); pointer-events: none; }
  .unread-dot { position: absolute; bottom: 20px; right: 20px; width: 14px; height: 14px; background: white; border-radius: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.5); border: 2px solid var(--ios-blue); }
  
  .reaction-badge { position: absolute; bottom: -10px; right: -10px; background: var(--card-bg); border-radius: 12px; padding: 2px 6px; font-size: 14px; box-shadow: 0 2px 5px rgba(0,0,0,0.2); border: 1px solid var(--sep); cursor: pointer; transition: transform 0.1s; }
  .reaction-badge:active { transform: scale(0.9); }
  
  .sticker-img-3d { 
    width: 120px; height: 120px; object-fit: contain; animation: popIn 0.4s; 
    filter: drop-shadow(0 12px 20px rgba(0,0,0,0.4)) saturate(1.4) contrast(1.15); 
  }
  
  .attachment-img { max-width: 240px; max-height: 300px; border-radius: 12px; object-fit: cover; display: block; }
  .tab-bar { height: 85px; border-top: 0.5px solid var(--sep); display: flex; justify-content: space-around; padding-top: 10px; flex-shrink: 0; z-index: 100; }
  .tab-item { display: flex; flex-direction: column; align-items: center; gap: 4px; color: var(--text-sec); cursor: pointer; border: none; background: none; flex: 1; }
  .tab-item.active { color: var(--ios-blue); }
  
  .avatar { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; flex-shrink: 0; border: 0.5px solid var(--sep); background: #eee; }
  .avatar-huge { width: 110px; height: 110px; border-radius: 50%; object-fit: cover; margin: 0 auto; display: block; background: #eee; border: 3px solid var(--ios-blue); }
  
  .error-toast { position: absolute; top: 100px; left: 20px; right: 20px; background: rgba(255, 59, 48, 0.9); backdrop-filter: blur(10px); color: white; padding: 12px; border-radius: 12px; text-align: center; z-index: 3000; animation: slideInUp 0.3s ease; font-weight: bold; }
  @keyframes slideInUp { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .blur-overlay { position: fixed; inset: 0; background: ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)'}; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); z-index: 2000; animation: fadeIn 0.2s ease; display: flex; justify-content: center; align-items: center; }
  @keyframes fadeIn { from { opacity: 0; backdrop-filter: blur(0px); } to { opacity: 1; backdrop-filter: blur(12px); } }
  .context-menu-popup { background: var(--card-bg); border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); overflow: hidden; border: 1px solid var(--sep); }
  .context-menu-btn { width: 100%; padding: 14px 16px; background: none; border: none; border-bottom: 0.5px solid var(--sep); color: var(--text-main); font-size: 16px; text-align: left; display: flex; align-items: center; gap: 12px; cursor: pointer; }
  .context-menu-btn:active { background: ${isDark ? '#2C2C2E' : '#F2F2F7'}; }
  .context-menu-btn.danger { color: #FF3B30; }
  .akashi-logo { width: 90px; height: 90px; background: #0a0a0a; border-radius: 24px; margin: 0 auto 25px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; box-shadow: 0 0 30px rgba(220,38,38,0.4); border: 1px solid rgba(239,68,68,0.2); }
  .akashi-glow { position: absolute; inset: 0; background: rgba(220,38,38,0.25); filter: blur(15px); border-radius: 50%; }
  .call-ring { position: absolute; inset: 0; border-radius: 50%; background: var(--ios-blue); z-index: 0; animation: callPulse 2s infinite ease-out; }
  .local-video-pip { position: absolute; bottom: 120px; right: 20px; width: 100px; height: 140px; border-radius: 16px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.4); border: 2px solid rgba(255,255,255,0.2); z-index: 10000; background: #000; animation: popIn 0.5s ease; }
  .local-video-pip video { width: 100%; height: 100%; object-fit: cover; transform: scaleX(-1); }
`;

export default function App() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(localStorage.getItem('aura_dark') === 'true');
  const [view, setView] = useState('chats');
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [callLogs, setCallLogs] = useState([]);
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({ username: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [authStep, setAuthStep] = useState('login');
  const [globalError, setGlobalError] = useState(null);

  // Состояния для записи кружков и голосовых
  const [mode, setMode] = useState('voice');
  const [isRecording, setIsRecording] = useState(null);
  const [recTime, setRecTime] = useState(0);
  const [cameraFacing, setCameraFacing] = useState('user');
  const [isLocked, setIsLocked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [contextMenu, setContextMenu] = useState(null);
  const [showStickers, setShowStickers] = useState(false);
  const [forwardMsg, setForwardMsg] = useState(null);

  // --- ЗВОНКИ ---
  const [activeCall, setActiveCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [callDuration, setCallDuration] = useState(0);

  const scrollRef = useRef();
  const fileInputRef = useRef(null);
  const avatarInputRef = useRef(null);
  const mediaRecorder = useRef(null);
  const videoPreviewRef = useRef(null);
  const audioChunks = useRef([]);
  const activeStream = useRef(null);
  const remoteStream = useRef(null);
  const peerConnection = useRef(null);
  const callVideoRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteAudioRef = useRef(null);

  const pressTimer = useRef(null);
  const callTimer = useRef(null);
  const isHolding = useRef(false);
  const startY = useRef(0);
  const startX = useRef(0);
  const lastTapRef = useRef(0);

  // ИНИЦИАЛИЗАЦИЯ
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (e) { console.error("Ошибка аутентификации:", e); }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setFirebaseUser(u);
      if (u) {
        const saved = localStorage.getItem('aura_user');
        if (saved) {
          try { setUser(JSON.parse(saved)); }
          catch (e) { localStorage.removeItem('aura_user'); }
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // ПОДГРУЗКА ДАННЫХ
  useEffect(() => {
    if (!firebaseUser) return;

    const unsubU = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'users'), (s) => {
      const users = s.docs.map(d => ({ id: d.id, ...d.data() }));
      setAllUsers(users);
    }, (err) => console.error("Ошибка загрузки пользователей:", err));

    const unsubM = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), (s) => {
      setMessages(s.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => a.ts - b.ts));
    }, (err) => console.error("Ошибка загрузки сообщений:", err));

    const unsubLogs = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'call_logs'), (s) => {
      setCallLogs(s.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => b.ts - a.ts));
    }, (err) => console.error("Ошибка загрузки истории вызовов:", err));

    return () => { unsubU(); unsubM(); unsubLogs(); };
  }, [firebaseUser]);

  useEffect(() => {
    if (user && allUsers.length > 0) {
      const me = allUsers.find(u => u.username === user.username);
      if (me && JSON.stringify(me) !== JSON.stringify(user)) {
        setUser(me);
        localStorage.setItem('aura_user', JSON.stringify(me));
      }
    }
  }, [allUsers, user?.username]);

  useEffect(() => {
    if (isRecording === 'video' && videoPreviewRef.current && activeStream.current) {
      videoPreviewRef.current.srcObject = activeStream.current;
    }
  }, [isRecording, cameraFacing, activeStream.current]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'artifacts', appId, 'public', 'data', 'call_signals'), where('callee', '==', user.username), where('status', '==', 'calling'));
    const unsubCalls = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        if (change.type === 'added') {
          setIncomingCall({ id: change.doc.id, ...data });
        }
        if (change.type === 'modified' && data.status !== 'calling') setIncomingCall(null);
        if (change.type === 'removed') setIncomingCall(null);
      });
    }, (err) => console.error("Ошибка сигналов вызова:", err));
    return () => unsubCalls();
  }, [user?.username]);

  useEffect(() => {
    if (activeCall?.status === 'connected') {
      if (activeCall.type === 'video') {
        if (localVideoRef.current && activeStream.current) localVideoRef.current.srcObject = activeStream.current;
        if (callVideoRef.current && remoteStream.current) callVideoRef.current.srcObject = remoteStream.current;
      }
      if (activeCall.type === 'voice') {
        if (remoteAudioRef.current && remoteStream.current) remoteAudioRef.current.srcObject = remoteStream.current;
      }
    }
  }, [activeCall?.status, activeCall?.type]);

  const showError = (msg) => { setGlobalError(msg); setTimeout(() => setGlobalError(null), 3000); };

  // 🛡 ЗАЩИТА АВТОРИЗАЦИИ: Санитайзер логина + Отлов сетевых ошибок
  const handleAuth = async () => {
    const { username, password, name } = formData;
    if (!username || !password) return showError("Введите логин и пароль");
    setLoading(true);

    try {
      // Убираем случайные пробелы, которые ломают базу данных
      const safeUsername = username.toLowerCase().replace(/\s+/g, '');

      if (safeUsername.length < 3) {
        setLoading(false);
        return showError("Логин должен быть от 3 символов без пробелов");
      }

      const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', safeUsername);
      const snap = await getDoc(userRef);

      if (authStep === 'reg') {
        if (snap.exists()) { showError("Пользователь уже существует! Войдите."); }
        else {
          const newUser = {
            username: safeUsername, password, name: name || safeUsername,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${safeUsername}`, privacy: 'online', pinnedChats: []
          };
          await setDoc(userRef, newUser);
          setUser(newUser);
          localStorage.setItem('aura_user', JSON.stringify(newUser));

          await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
            text: `${name || safeUsername} перешел в Aura! 🎉`, uid: 'system', to: 'global', ts: Date.now(),
            name: 'Aura System', type: 'system', hiddenFor: [], isPinned: false, read: true, watched: true, reactions: {}
          });
        }
      } else {
        if (snap.exists() && snap.data().password === password) {
          setUser(snap.data());
          localStorage.setItem('aura_user', JSON.stringify(snap.data()));
        } else {
          showError("Неверный логин или пароль!");
        }
      }
    } catch (e) {
      console.error(e);
      showError("Ошибка соединения с сервером. Попробуйте еще раз.");
    }
    setLoading(false);
  };

  const updateProfile = async (updates) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', user.username);
      await updateDoc(userRef, updates);
    } catch (e) { console.error(e); }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 250;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        updateProfile({ avatar: canvas.toDataURL('image/jpeg', 0.8) });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const formatTime = (seconds) => { const m = Math.floor(seconds / 60); const s = seconds % 60; return `${m}:${s < 10 ? '0' : ''}${s}`; };

  const formatTimeOnly = (ts) => {
    if (!ts) return '';
    try { return new Date(ts).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); } catch(e) { return ''; }
  };

  // --- ЛОГИКА ЗАПИСИ МЕДИА ---
  const startMediaRecording = async (type) => {
    try {
      const constraints = { audio: true, video: type === 'video' ? { facingMode: cameraFacing, width: 400, height: 400 } : false };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      activeStream.current = stream;

      if (type === 'video' && videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
      }

      const options = { mimeType: type === 'video' ? 'video/webm;codecs=vp8' : 'audio/webm' };
      mediaRecorder.current = new MediaRecorder(stream, options);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = e => { if (e.data.size > 0) audioChunks.current.push(e.data); };

      mediaRecorder.current.onstop = () => {
        if (mediaRecorder.current.cancelRecord) { stream.getTracks().forEach(t => t.stop()); activeStream.current = null; return; }
        const blob = new Blob(audioChunks.current, { type: type === 'video' ? 'video/webm' : 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          sendMessage(reader.result, type === 'video' ? 'video_circle' : 'voice');
          stream.getTracks().forEach(t => t.stop()); activeStream.current = null;
        };
        reader.readAsDataURL(blob);
      };

      mediaRecorder.current.start();
      setIsRecording(type); setRecTime(0); setIsPaused(false);
      mediaRecorder.current.timer = setInterval(() => setRecTime(p => p + 1), 1000);
    } catch (e) { showError("Нет доступа к камере или микрофону"); }
  };

  const stopMediaRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      clearInterval(mediaRecorder.current.timer);
    }
    setIsRecording(null);
    setIsLocked(false);
    setIsPaused(false);
  };

  const cancelMediaRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.cancelRecord = true;
      mediaRecorder.current.stop();
      clearInterval(mediaRecorder.current.timer);
    }
    setIsRecording(null);
    setIsLocked(false);
    setIsPaused(false);
    isHolding.current = false;
  };

  const togglePause = () => {
    if (mediaRecorder.current) {
      if (mediaRecorder.current.state === 'recording') {
        mediaRecorder.current.pause();
        setIsPaused(true);
        clearInterval(mediaRecorder.current.timer);
      } else if (mediaRecorder.current.state === 'paused') {
        mediaRecorder.current.resume();
        setIsPaused(false);
        mediaRecorder.current.timer = setInterval(() => setRecTime(p => p + 1), 1000);
      }
    }
  };

  const flipCamera = async (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    const nextFacing = cameraFacing === 'user' ? 'environment' : 'user';
    setCameraFacing(nextFacing);

    if (isRecording === 'video' && activeStream.current) {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: nextFacing, width: 400, height: 400 } });
        const newVideoTrack = newStream.getVideoTracks()[0];
        const oldVideoTrack = activeStream.current.getVideoTracks()[0];

        if (oldVideoTrack) {
          activeStream.current.removeTrack(oldVideoTrack);
          oldVideoTrack.stop();
        }
        activeStream.current.addTrack(newVideoTrack);

        if (videoPreviewRef.current) {
          videoPreviewRef.current.srcObject = activeStream.current;
        }
      } catch (err) { console.error("Ошибка переворота камеры", err); }
    }
  };

  const handlePointerDown = (e) => {
    isHolding.current = false;
    setIsLocked(false);
    startY.current = e.clientY;
    startX.current = e.clientX;
    pressTimer.current = setTimeout(() => {
      isHolding.current = true;
      startMediaRecording(mode);
    }, 300);
  };

  const handlePointerMove = (e) => {
    if (isHolding.current && !isLocked) {
      if (startY.current - e.clientY > 50) {
        setIsLocked(true);
      } else if (startX.current - e.clientX > 60) {
        cancelMediaRecording();
      }
    }
  };

  const handlePointerUp = (e) => {
    clearTimeout(pressTimer.current);
    if (isLocked && isRecording) return;

    if (isHolding.current) {
      stopMediaRecording();
    } else {
      if (!isRecording) setMode(prev => prev === 'voice' ? 'video' : 'voice');
    }
    isHolding.current = false;
  };

  // --- 🛑 ГРАНИЦА АВТОРИЗАЦИИ 🛑 ---
  // Рендерим Логин Экран СРАЗУ, если user равен null.
  // Это предотвращает фатальные краши при обращении к user.username в фоновых процессах.
  if (!user) return (
      <div className="app-container">
        <style>{auraStyles(isDark)}</style>
        <div style={{width: '100%', maxWidth: 400, padding: 30, background: 'var(--card-bg)', borderRadius: 24, alignSelf: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', animation: 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'}}>
          {globalError && <div className="error-toast">{globalError}</div>}
          <div className="akashi-logo">
            <div className="akashi-glow"></div>
            <svg viewBox="0 0 100 100" style={{width: 60, height: 60, position: 'relative', zIndex: 10, filter: 'drop-shadow(0 0 8px rgba(255,0,0,1))'}} fill="none">
              <path d="M5 50 Q 50 15 95 50 Q 50 85 5 50 Z" stroke="#ef4444" strokeWidth="3" strokeOpacity="0.3" />
              <circle cx="50" cy="50" r="20" stroke="#ef4444" strokeWidth="4" strokeOpacity="0.9" fill="rgba(239,68,68,0.1)"/>
              <path d="M58 10 L40 52 L56 52 L38 90" stroke="#ff0000" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 style={{textAlign: 'center', marginBottom: 25, fontSize: 24, fontWeight: 800}}>Вход в Aura</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            <input className="ios-input" placeholder="Логин (без пробелов)" onChange={e => setFormData({...formData, username: e.target.value})} />
            <input className="ios-input" type="password" placeholder="Пароль" onChange={e => setFormData({...formData, password: e.target.value})} />
            {authStep === 'reg' && <input className="ios-input" placeholder="Ваше имя" onChange={e => setFormData({...formData, name: e.target.value})} />}
            <button className="btn-primary" style={{marginTop: 10}} onClick={handleAuth}>{loading ? 'Загрузка...' : 'Продолжить'}</button>
            <button style={{background: 'none', border: 'none', color: 'var(--ios-blue)', cursor: 'pointer', fontWeight: 600}} onClick={() => setAuthStep(authStep === 'reg' ? 'login' : 'reg')}>
              {authStep === 'reg' ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Создать'}
            </button>
          </div>
        </div>
      </div>
  );

  // --- 🟢 ЗОНА БЕЗОПАСНОСТИ 🟢 ---
  // Сюда код доходит ТОЛЬКО если пользователь 100% залогинен.
  // Никаких 'TypeError: Cannot read properties of null (reading username)' больше не будет!

  const sendMessage = async (val, type = 'text', forwardedFrom = null) => {
    if (!val.trim() && type === 'text') return;
    try {
      if (val.length > 950000) return showError("Файл слишком большой.");
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
        text: val, uid: user.username, to: selectedPeer.username, ts: Date.now(),
        name: user.name || user.username, type, hiddenFor: [], isPinned: false, read: false, watched: false,
        reactions: {}, forwardedFrom: forwardedFrom
      });
      setInput(''); setShowStickers(false);
    } catch (e) { showError("Ошибка отправки."); }
  };

  const handleReaction = async (emoji) => {
    if (!contextMenu || contextMenu.type !== 'message') return;
    const msg = contextMenu.item;
    const msgRef = doc(db, 'artifacts', appId, 'public', 'data', 'messages', msg.id);
    const currentReactions = { ...(msg.reactions || {}) };
    if (currentReactions[user.username] === emoji) {
      delete currentReactions[user.username];
    } else {
      currentReactions[user.username] = emoji;
    }
    await updateDoc(msgRef, { reactions: currentReactions }).catch(console.error);
    closeContextMenu();
  };

  const handleDoubleTap = (e, m) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      e.preventDefault();
      const msgRef = doc(db, 'artifacts', appId, 'public', 'data', 'messages', m.id);
      const currentReactions = { ...(m.reactions || {}) };
      if (currentReactions[user.username]) {
        delete currentReactions[user.username];
      } else {
        currentReactions[user.username] = '❤️';
      }
      updateDoc(msgRef, { reactions: currentReactions }).catch(console.error);
    }
    lastTapRef.current = now;
  };

  const openContextMenu = (e, item, type) => {
    e.preventDefault(); e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setContextMenu({ item, type, rect });
  };

  const closeContextMenu = () => setContextMenu(null);

  const deleteMessage = async (deleteType) => {
    if (!contextMenu || contextMenu.type !== 'message') return;
    const msgId = contextMenu.item.id;
    const msgRef = doc(db, 'artifacts', appId, 'public', 'data', 'messages', msgId);
    try {
      if (deleteType === 'both') {
        await deleteDoc(msgRef);
      } else {
        const currentHidden = contextMenu.item.hiddenFor || [];
        await updateDoc(msgRef, { hiddenFor: [...currentHidden, user.username] });
      }
    } catch (e) { console.error("Delete Error", e); }
    closeContextMenu();
  };

  const startCall = async (type) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: type === 'video' ? { facingMode: 'user' } : false });
      activeStream.current = stream;
      const pc = new RTCPeerConnection(rtcServers);
      peerConnection.current = pc;

      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      pc.ontrack = (event) => {
        remoteStream.current = event.streams[0];
        if (callVideoRef.current && type === 'video') callVideoRef.current.srcObject = event.streams[0];
        if (remoteAudioRef.current && type === 'voice') remoteAudioRef.current.srcObject = event.streams[0];
      };

      const callDocRef = doc(collection(db, 'artifacts', appId, 'public', 'data', 'call_signals'));
      const callId = callDocRef.id;

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'call_signals', callId, 'callerCandidates'), event.candidate.toJSON());
        }
      };

      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      await setDoc(callDocRef, {
        caller: user.username, callee: selectedPeer.username, type,
        offer: { type: offerDescription.type, sdp: offerDescription.sdp },
        status: 'calling', ts: Date.now()
      });

      setActiveCall({ id: callId, type, peer: selectedPeer, status: 'calling', isCaller: true });

      onSnapshot(callDocRef, (snapshot) => {
        const data = snapshot.data();
        if (!data) return;
        if (!pc.currentRemoteDescription && data.answer) {
          pc.setRemoteDescription(new RTCSessionDescription(data.answer));
          setActiveCall(prev => ({...prev, status: 'connected'}));
          callTimer.current = setInterval(() => setCallDuration(p => p + 1), 1000);
        }
        if (data.status === 'ended' || data.status === 'declined') endCallLocal();
      }, (err) => console.error("Ошибка активного звонка:", err));

      onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'call_signals', callId, 'calleeCandidates'), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') pc.addIceCandidate(new RTCIceCandidate(change.doc.data()));
        });
      }, (err) => console.error("Ошибка ICE (получатель):", err));
    } catch (e) { showError("Нет доступа к камере/микрофону для звонка"); }
  };

  const answerCall = async () => {
    if (!incomingCall) return;
    const { id: callId, type, offer, peer } = incomingCall;
    setIncomingCall(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: type === 'video' ? { facingMode: 'user' } : false });
      activeStream.current = stream;
      const pc = new RTCPeerConnection(rtcServers);
      peerConnection.current = pc;

      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      pc.ontrack = (event) => {
        remoteStream.current = event.streams[0];
        if (callVideoRef.current && type === 'video') callVideoRef.current.srcObject = event.streams[0];
        if (remoteAudioRef.current && type === 'voice') remoteAudioRef.current.srcObject = event.streams[0];
      };

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'call_signals', callId, 'calleeCandidates'), event.candidate.toJSON());
        }
      };

      const callDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'call_signals', callId);
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      await updateDoc(callDocRef, { answer: { type: answerDescription.type, sdp: answerDescription.sdp }, status: 'connected' });
      setActiveCall({ id: callId, type, peer, status: 'connected', isCaller: false });
      callTimer.current = setInterval(() => setCallDuration(p => p + 1), 1000);

      onSnapshot(callDocRef, (snapshot) => {
        if (snapshot.data()?.status === 'ended') endCallLocal();
      }, (err) => console.error("Ошибка ответа на звонок:", err));

      onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'call_signals', callId, 'callerCandidates'), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') pc.addIceCandidate(new RTCIceCandidate(change.doc.data()));
        });
      }, (err) => console.error("Ошибка ICE (звонящий):", err));
    } catch (e) { showError("Ошибка при ответе на звонок"); }
  };

  const declineCall = async () => {
    if (!incomingCall) return;
    await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'call_signals', incomingCall.id), { status: 'declined' });
    await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'call_logs'), {
      caller: incomingCall.caller, callee: user.username, type: incomingCall.type, status: 'missed', ts: Date.now(), duration: 0
    });
    setIncomingCall(null);
  };

  const endCall = async () => {
    if (activeCall) {
      const status = activeCall.status === 'calling' ? 'missed' : 'ended';
      await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'call_signals', activeCall.id), { status: 'ended' });
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'call_logs'), {
        caller: activeCall.isCaller ? user.username : activeCall.peer.username,
        callee: activeCall.isCaller ? activeCall.peer.username : user.username,
        type: activeCall.type, status: status, ts: Date.now(), duration: callDuration
      });
    }
    endCallLocal();
  };

  const endCallLocal = () => {
    if (peerConnection.current) { peerConnection.current.close(); peerConnection.current = null; }
    if (activeStream.current) { activeStream.current.getTracks().forEach(t => t.stop()); activeStream.current = null; }
    setActiveCall(null); setCallDuration(0); clearInterval(callTimer.current);
  };

  const getLastMessage = (peerUsername) => {
    if (peerUsername === 'global') {
      const globalMsgs = messages.filter(m => m.to === 'global' && !(m.hiddenFor || []).includes(user.username));
      return globalMsgs.length > 0 ? globalMsgs[globalMsgs.length - 1] : null;
    }
    const chatMsgs = messages.filter(m =>
        ((m.uid === user.username && m.to === peerUsername) || (m.uid === peerUsername && m.to === user.username)) &&
        !(m.hiddenFor || []).includes(user.username)
    );
    return chatMsgs.length > 0 ? chatMsgs[chatMsgs.length - 1] : null;
  };

  const getMessagePreview = (msg) => {
    if (!msg) return "";
    if (msg.type === 'text' || msg.type === 'system') return msg.text || '';
    if (msg.type === 'voice') return '🎤 Голосовое сообщение';
    if (msg.type === 'video_circle') return '📹 Видеосообщение';
    if (msg.type === 'image') return '🖼 Фотография';
    if (msg.type === 'sticker') return '✨ Стикер';
    return 'Вложение';
  };

  const togglePinMessage = async () => {
    if (!contextMenu || contextMenu.type !== 'message') return;
    await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'messages', contextMenu.item.id), { isPinned: !contextMenu.item.isPinned });
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

  const handleForwardStart = () => {
    setForwardMsg(contextMenu.item);
    setView('chats');
    closeContextMenu();
  };

  // Вычисления данных теперь 100% безопасны
  const filteredUsers = allUsers.filter(u => u.username !== user.username).filter(u => {
    if (!searchQuery) return true;
    const lowerQ = searchQuery.toLowerCase().replace('@', '').trim();
    return (u.name || '').toLowerCase().includes(lowerQ) || (u.username || '').toLowerCase().includes(lowerQ);
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase().replace('@', '').trim();
      const aExact = a.username?.toLowerCase() === q || a.name?.toLowerCase() === q;
      const bExact = b.username?.toLowerCase() === q || b.name?.toLowerCase() === q;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      const aStarts = a.username?.toLowerCase().startsWith(q) || a.name?.toLowerCase().startsWith(q);
      const bStarts = b.username?.toLowerCase().startsWith(q) || b.name?.toLowerCase().startsWith(q);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
    }

    const aPin = user.pinnedChats?.includes(a.username); const bPin = user.pinnedChats?.includes(b.username);
    if (aPin && !bPin) return -1; if (!aPin && bPin) return 1;
    const timeA = getLastMessage(a.username)?.ts || 0; const timeB = getLastMessage(b.username)?.ts || 0;
    return timeB - timeA;
  });

  const myCallLogs = callLogs.filter(l => l.caller === user.username || l.callee === user.username);

  const currentMessages = messages.filter(m => {
    if (!selectedPeer) return false;
    if (m.hiddenFor && m.hiddenFor.includes(user.username)) return false;
    if (selectedPeer.username === 'global') return m.to === 'global';
    return (m.uid === user.username && m.to === selectedPeer.username) || (m.uid === selectedPeer.username && m.to === user.username);
  });

  const renderMessageContent = (m, isClone = false) => {
    if (m.type === 'system') return <div key={m.id} className="system-bubble" style={{ margin: isClone ? 0 : '10px 0' }}>{m.text}</div>;
    const isMine = m.uid === user.username;
    const isSticker = m.type === 'sticker';
    const isImage = m.type === 'image';
    const isCircle = m.type === 'video_circle';

    let contentStyle = { padding: isImage || isSticker || isCircle ? 0 : '8px 12px', background: isImage || isSticker || isCircle ? 'transparent' : '', boxShadow: isImage || isSticker || isCircle ? 'none' : '' };
    if (isClone) contentStyle.margin = 0;

    return (
        <div className={`chat-bubble ${isMine ? 'bubble-me' : 'bubble-other'}`} style={contentStyle}
             onContextMenu={!isClone ? (e) => openContextMenu(e, m, 'message') : undefined}
             onTouchStart={!isClone ? (e) => { pressTimer.current = setTimeout(() => openContextMenu(e, m, 'message'), 500); } : undefined}
             onClick={!isClone ? (e) => handleDoubleTap(e, m) : undefined}
             onTouchEnd={!isClone ? () => clearTimeout(pressTimer.current) : undefined}
             onTouchMove={!isClone ? () => clearTimeout(pressTimer.current) : undefined}
        >
          {m.forwardedFrom && <div style={{fontSize: 12, color: isMine ? 'rgba(255,255,255,0.8)' : 'var(--ios-blue)', marginBottom: 4, display: 'flex', alignItems: 'center'}}><Forward size={12} className="mr-1"/> Переслано от {m.forwardedFrom}</div>}
          {selectedPeer?.username === 'global' && !isMine && !isImage && !isSticker && !isCircle && <div style={{fontSize: 12, fontWeight: 700, marginBottom: 2, color: 'var(--ios-blue)'}}>{m.name || 'User'}</div>}

          {isCircle ? (
              <div className="circle-video-wrap">
                <video src={m.text || ''} onClick={!isClone ? (e) => { e.target.paused ? e.target.play() : e.target.pause(); if(!m.watched && !isMine) updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'messages', m.id), { watched: true }).catch(console.error); } : undefined} playsInline loop={false} />
                {!isMine && !m.watched && !isClone && <div className="unread-dot"></div>}
              </div>
          ) : m.type === 'voice' ? (
              <div style={{display: 'flex', alignItems: 'center', gap: 10, minWidth: 150}}>
                <div style={{background: isMine ? 'rgba(255,255,255,0.2)' : 'var(--ios-blue)', borderRadius: '50%', padding: 8}}><Mic size={16} color="white" /></div>
                <div>
                  {!isClone && <audio src={m.text || ''} style={{display: 'none'}} id={`audio-${m.id}`} />}
                  <div style={{height: 3, width: 80, background: 'rgba(0,0,0,0.2)', borderRadius: 2, cursor: 'pointer'}} onClick={() => { if(!isClone){ const a = document.getElementById(`audio-${m.id}`); if(a) a.play().catch(console.error); } }}>
                    <div style={{height: '100%', width: 0, background: isMine ? 'white' : 'var(--ios-blue)'}}></div>
                  </div>
                  <div style={{fontSize: 11, marginTop: 4, opacity: 0.8}}>Голосовое</div>
                </div>
              </div>
          ) : isImage ? (
              <img src={m.text || ''} className="attachment-img" alt="вложение" />
          ) : isSticker ? (
              <img src={m.text || ''} className="sticker-img-3d" alt="3d стикер" />
          ) : (
              <div>{m.text || ''}</div>
          )}

          <div style={{fontSize: 10, opacity: 0.7, textAlign: 'right', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 3, position: isImage || isSticker || isCircle ? 'absolute' : 'relative', bottom: isImage || isSticker || isCircle ? 10 : 0, right: isImage || isSticker || isCircle ? (isCircle ? 30 : 10) : 0, background: isImage || isSticker || isCircle ? 'rgba(0,0,0,0.4)' : 'none', color: isImage || isSticker || isCircle ? 'white' : 'inherit', padding: isImage || isSticker || isCircle ? '2px 8px' : 0, borderRadius: 10}}>
            {m.isPinned && <Pin size={10} style={{marginRight: 2}} />}
            {formatTimeOnly(m.ts)}
            {isMine && (m.read ? <CheckCheck size={12} /> : <Check size={12} />)}
          </div>

          {m.reactions && typeof m.reactions === 'object' && Object.keys(m.reactions).length > 0 && !isClone && (
              <div className="reaction-badge">{Array.from(new Set(Object.values(m.reactions))).join(' ')}</div>
          )}
        </div>
    );
  };

  return (
      <div className="app-container">
        <style>{auraStyles(isDark)}</style>
        <div className="phone-screen">
          {forwardMsg && (
              <div style={{position: 'absolute', top: 0, left: 0, right: 0, background: 'var(--ios-blue)', color: 'white', padding: 10, textAlign: 'center', zIndex: 1000, fontWeight: 'bold', animation: 'slideIn 0.3s ease'}}>
                Выберите чат для пересылки...
                <button onClick={() => setForwardMsg(null)} style={{background: 'none', border: 'none', color: 'white', position: 'absolute', right: 10, top: 10}}><X size={20}/></button>
              </div>
          )}

          {incomingCall && !activeCall && (() => {
            const callerPeer = allUsers.find(u => u.username === incomingCall?.caller) || { name: incomingCall?.caller, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${incomingCall?.caller}` };
            return (
                <div style={{position: 'absolute', inset: 0, zIndex: 10000, background: isDark ? 'rgba(28,28,30,0.95)' : 'rgba(255,255,255,0.95)', backdropFilter: 'blur(40px)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 80, paddingBottom: 60, animation: 'fadeIn 0.3s ease'}}>
                  <div style={{color: 'var(--text-main)', fontSize: 32, fontWeight: 'bold'}}>{callerPeer.name}</div>
                  <div style={{color: 'var(--text-sec)', fontSize: 18, marginTop: 8}}>{incomingCall.type === 'video' ? 'Входящий видеозвонок...' : 'Входящий аудиозвонок...'}</div>
                  <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{position: 'relative', width: 160, height: 160}}>
                      <div className="call-ring"></div>
                      <img src={callerPeer.avatar} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', position: 'relative', zIndex: 10, border: '4px solid var(--ios-blue)'}} alt="caller" />
                    </div>
                  </div>
                  <div style={{display: 'flex', gap: 60, marginBottom: 20}}>
                    <button onClick={declineCall} style={{background: '#FF3B30', width: 72, height: 72, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px rgba(255,59,48,0.4)'}}>
                      <Phone size={36} color="white" style={{transform: 'rotate(135deg)'}} />
                    </button>
                    <button onClick={answerCall} style={{background: '#34C759', width: 72, height: 72, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px rgba(52,199,89,0.4)', animation: 'popIn 0.5s infinite alternate'}}>
                      <Phone size={36} color="white" />
                    </button>
                  </div>
                </div>
            );
          })()}

          {activeCall && (
              <div style={{position: 'absolute', inset: 0, zIndex: 9999, background: isDark ? 'rgba(28,28,30,0.85)' : 'rgba(255,255,255,0.85)', backdropFilter: 'blur(40px)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 60, paddingBottom: 40, animation: 'fadeIn 0.3s ease'}}>
                <audio ref={remoteAudioRef} autoPlay />
                {activeCall.type === 'video' && activeCall.status === 'connected' && (
                    <div className="local-video-pip">
                      <video ref={localVideoRef} autoPlay muted playsInline />
                    </div>
                )}
                <div style={{color: 'var(--text-main)', fontSize: 32, fontWeight: 'bold', textShadow: '0 2px 10px rgba(0,0,0,0.2)'}}>{activeCall.peer?.name}</div>
                <div style={{color: 'var(--text-main)', fontSize: 18, marginTop: 8, opacity: 0.8}}>
                  {activeCall.status === 'calling' ? 'Звонок...' : `На связи ${formatTime(callDuration)}`}
                </div>
                <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: 20}}>
                  {activeCall.type === 'video' && activeCall.status === 'connected' ? (
                      <video ref={callVideoRef} autoPlay playsInline style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: 24, boxShadow: '0 20px 50px rgba(0,0,0,0.3)', transform: 'scaleX(-1)'}} />
                  ) : (
                      <div style={{position: 'relative', width: 160, height: 160}}>
                        {activeCall.status === 'calling' && <div className="call-ring"></div>}
                        <img src={activeCall.peer?.avatar} style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--ios-blue)', position: 'relative', zIndex: 10, boxShadow: '0 10px 30px rgba(0,0,0,0.3)'}} alt="caller" />
                      </div>
                  )}
                </div>
                <div style={{display: 'flex', gap: 40, marginBottom: 20}}>
                  <button onClick={endCall} style={{background: '#FF3B30', width: 72, height: 72, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px rgba(255,59,48,0.4)'}}>
                    <Phone size={36} color="white" style={{transform: 'rotate(135deg)'}} />
                  </button>
                </div>
              </div>
          )}

          {view === 'chats' && (
              <div className="view-container" style={{paddingTop: forwardMsg ? 40 : 0}}>
                <div className="nav-bar glass-panel"><div style={{fontSize: 32, fontWeight: 800}}>Чаты</div><Edit3 size={24} color="var(--ios-blue)" /></div>
                <div style={{padding: '10px 16px 12px'}}>
                  <div style={{background: isDark ? '#1C1C1E' : '#E3E3E8', borderRadius: 10, padding: 10, display: 'flex', alignItems: 'center', gap: 8}}>
                    <Search size={18} color="#8E8E93" />
                    <input placeholder="Поиск по имени или @нику" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{background: 'none', border: 'none', outline: 'none', color: 'var(--text-main)', width: '100%', fontSize: 16}} />
                  </div>
                </div>
                <div style={{flex: 1, overflowY: 'auto'}}>
                  {(!searchQuery || 'общий чат global'.includes(searchQuery.toLowerCase().trim())) && (() => {
                    const lastGlobal = getLastMessage('global');
                    return (
                        <button className="ios-item" onClick={() => { setSelectedPeer({name: 'Общий чат', username: 'global'}); setView('chat_room'); if(forwardMsg){ sendMessage(forwardMsg.text, forwardMsg.type, forwardMsg.name); setForwardMsg(null); } }}>
                          <div style={{background: 'var(--ios-blue)', width: 50, height: 50, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 14, flexShrink: 0}}><Globe size={26} color="white"/></div>
                          <div style={{flex: 1, minWidth: 0}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                              <b style={{fontSize: 17}}>Общий чат</b>
                              {lastGlobal && <span style={{fontSize: 12, color: 'var(--text-sec)'}}>{formatTimeOnly(lastGlobal.ts)}</span>}
                            </div>
                            <div style={{fontSize: 14, color: 'var(--text-sec)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{lastGlobal ? getMessagePreview(lastGlobal) : 'Групповая беседа'}</div>
                          </div>
                        </button>
                    );
                  })()}

                  {sortedUsers.map(u => {
                    const lastMsg = getLastMessage(u.username);
                    const isPinned = user.pinnedChats?.includes(u.username);
                    return (
                        <button key={u.username} className="ios-item"
                                onContextMenu={(e) => openContextMenu(e, u, 'chat')}
                                onTouchStart={(e) => { pressTimer.current = setTimeout(() => openContextMenu(e, u, 'chat'), 500); }}
                                onTouchEnd={() => clearTimeout(pressTimer.current)}
                                onTouchMove={() => clearTimeout(pressTimer.current)}
                                onClick={() => { setSelectedPeer(u); setView('chat_room'); if(forwardMsg){ sendMessage(forwardMsg.text, forwardMsg.type, forwardMsg.name); setForwardMsg(null); } }}>
                          <img src={u.avatar} className="avatar" style={{marginRight: 14}} alt="avatar" />
                          <div style={{flex: 1, minWidth: 0}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                              <b style={{fontSize: 17, display: 'flex', alignItems: 'center', gap: 5}}>{u.name} {isPinned && <Pin size={14} color="var(--text-sec)" />}</b>
                              {lastMsg && <span style={{fontSize: 12, color: 'var(--text-sec)'}}>{formatTimeOnly(lastMsg.ts)}</span>}
                            </div>
                            <div style={{fontSize: 14, color: 'var(--text-sec)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{lastMsg ? getMessagePreview(lastMsg) : `@${u.username}`}</div>
                          </div>
                          <ChevronRight size={18} color="#C6C6C8" style={{marginLeft: 10, flexShrink: 0}} />
                        </button>
                    )
                  })}
                </div>
              </div>
          )}

          {view === 'calls' && (
              <div className="view-container">
                <div className="nav-bar glass-panel"><div style={{fontSize: 32, fontWeight: 800}}>Звонки</div><Phone size={24} color="var(--ios-blue)" /></div>
                <div style={{flex: 1, overflowY: 'auto'}}>
                  {myCallLogs.length === 0 && <div style={{textAlign: 'center', color: 'var(--text-sec)', marginTop: 40}}>Нет истории звонков</div>}
                  {myCallLogs.map((log) => {
                    const isIncoming = log.callee === user.username;
                    const peerUsername = isIncoming ? log.caller : log.callee;
                    const peer = allUsers.find(u => u.username === peerUsername) || { name: peerUsername, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${peerUsername}` };
                    const Icon = log.status === 'missed' ? PhoneMissed : (isIncoming ? PhoneIncoming : Phone);
                    const color = log.status === 'missed' ? '#FF3B30' : (isIncoming ? 'var(--ios-blue)' : '#34C759');
                    return (
                        <div key={log.id} className="ios-item" style={{cursor: 'default'}}>
                          <img src={peer.avatar} className="avatar" style={{marginRight: 14}} alt="avatar" />
                          <div style={{flex: 1, minWidth: 0}}>
                            <b style={{fontSize: 17, color: log.status === 'missed' ? '#FF3B30' : 'inherit'}}>{peer.name}</b>
                            <div style={{fontSize: 14, color: 'var(--text-sec)', display: 'flex', alignItems: 'center', gap: 5, marginTop: 2}}>
                              <Icon size={14} color={color} />
                              {log.type === 'video' ? 'Видеозвонок' : 'Аудиозвонок'}
                              {log.status === 'missed' && ' (Пропущенный)'}
                            </div>
                          </div>
                          <div style={{textAlign: 'right'}}>
                            <div style={{fontSize: 13, color: 'var(--text-sec)'}}>{formatTimeOnly(log.ts)}</div>
                          </div>
                        </div>
                    )
                  })}
                </div>
              </div>
          )}

          {view === 'settings' && (
              <div className="view-container">
                <div className="nav-bar glass-panel"><div style={{fontSize: 32, fontWeight: 800}}>Настройки</div></div>
                <div className="ios-list" style={{padding: '24px 0'}}>
                  <div style={{textAlign: 'center', position: 'relative'}}>
                    <div style={{position: 'relative', display: 'inline-block'}}>
                      <img src={user.avatar} className="avatar-huge" onClick={() => avatarInputRef.current?.click()} alt="Profile" style={{cursor: 'pointer'}} />
                      <div style={{position: 'absolute', bottom: 10, right: -5, background: 'var(--ios-blue)', borderRadius: '50%', padding: 6, border: '3px solid var(--card-bg)', pointerEvents: 'none'}}><Camera size={16} color="white" /></div>
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

          {view === 'chat_room' && selectedPeer && (
              <div className="view-container" style={{position: 'absolute', inset: 0, zIndex: 20}}>
                <div className="nav-bar glass-panel" style={{paddingTop: 45, paddingBottom: 10, flexDirection: 'column', alignItems: 'stretch'}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <button onClick={() => setView('chats')} style={{background: 'none', border: 'none', color: 'var(--ios-blue)', cursor: 'pointer', display: 'flex', alignItems: 'center'}}><ChevronLeft size={34} /></button>
                    <div style={{textAlign: 'center', flex: 1}}><b style={{fontSize: 17, display: 'block'}}>{selectedPeer.name}</b></div>
                    <div style={{display: 'flex', gap: 15, paddingRight: 5}}>
                      {selectedPeer.username !== 'global' && (
                          <>
                            <button onClick={() => startCall('voice')} style={{background:'none', border:'none', color:'var(--ios-blue)', cursor:'pointer'}}><Phone size={24}/></button>
                            <button onClick={() => startCall('video')} style={{background:'none', border:'none', color:'var(--ios-blue)', cursor:'pointer'}}><Video size={26}/></button>
                          </>
                      )}
                    </div>
                  </div>
                </div>

                <div ref={scrollRef} className="chat-scroll">
                  <div style={{flex: 1}}></div>
                  {currentMessages.map((m) => <React.Fragment key={m.id}>{renderMessageContent(m)}</React.Fragment>)}
                </div>

                {isRecording === 'video' ? (
                    <div style={{
                      position: 'absolute', inset: 0, zIndex: 3000,
                      background: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)',
                      backdropFilter: 'blur(15px)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      animation: 'fadeIn 0.2s ease',
                      pointerEvents: isLocked ? 'auto' : 'none'
                    }}>
                      <div style={{
                        width: 280, height: 280, borderRadius: '50%', overflow: 'hidden',
                        border: '5px solid var(--ios-blue)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                        position: 'relative',
                        transform: !isLocked ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                      }}>
                        <video ref={videoPreviewRef} autoPlay muted playsInline
                               style={{width: '100%', height: '100%', objectFit: 'cover', transform: cameraFacing === 'user' ? 'scaleX(-1)' : 'scaleX(1)'}} />
                      </div>

                      <div style={{marginTop: 30, display: 'flex', alignItems: 'center', gap: 10, color: '#FF3B30', fontWeight: 'bold', fontSize: 28, textShadow: '0 2px 10px rgba(0,0,0,0.2)'}}>
                        {isPaused ? <span style={{color: 'white', opacity: 0.8, fontSize: 24}}>Пауза</span> : <div style={{width: 14, height: 14, borderRadius: '50%', background: '#FF3B30', animation: 'pulseGlow 1s infinite'}} />}
                        {formatTime(recTime)}
                      </div>

                      {isLocked ? (
                          <div style={{display: 'flex', alignItems: 'center', gap: 40, marginTop: 40, animation: 'popIn 0.3s ease'}}>
                            <button onClick={cancelMediaRecording} style={{background: '#FF3B30', color: 'white', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 5px 15px rgba(255,59,48,0.4)'}}>
                              <Trash2 size={28} />
                            </button>
                            <button onClick={togglePause} style={{background: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--sep)', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.1)'}}>
                              {isPaused ? <Play size={28}/> : <Pause size={28}/>}
                            </button>
                            <button onClick={flipCamera} style={{background: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--sep)', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.1)'}}>
                              <RefreshCw size={28} />
                            </button>
                            <button onClick={() => { stopMediaRecording(); setIsLocked(false); }} style={{background: 'var(--ios-blue)', color: 'white', borderRadius: '50%', width: 70, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,122,255,0.4)'}}>
                              <Send size={32} />
                            </button>
                          </div>
                      ) : (
                          <div style={{marginTop: 40, color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.8}}>
                            <Lock size={28} style={{marginBottom: 10}} />
                            <span style={{fontSize: 16, fontWeight: 500}}>Свайп вверх для фиксации</span>
                            <span style={{fontSize: 14, fontWeight: 400, opacity: 0.6, marginTop: 5}}>Свайп влево для отмены</span>
                          </div>
                      )}
                    </div>
                ) : isRecording === 'voice' ? (
                    <div style={{position: 'absolute', bottom: 85, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 150}}>
                      <div className="glass-panel" style={{borderRadius: 40, padding: isLocked ? '10px 20px' : '8px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '90%', maxWidth: 400, boxShadow: '0 10px 25px rgba(0,0,0,0.2)', border: '1px solid var(--sep)'}}>

                        {isLocked ? (
                            <>
                              <button onClick={cancelMediaRecording} style={{background: 'none', border: 'none', cursor: 'pointer', padding: 8}}><Trash2 size={24} color="#FF3B30"/></button>
                              <div style={{display: 'flex', alignItems: 'center', gap: 10, color: '#FF3B30', fontWeight: 'bold', fontSize: 18}}>
                                {isPaused ? <span style={{color: 'var(--text-sec)', fontSize: 16}}>Пауза</span> : <div style={{width: 10, height: 10, borderRadius: '50%', background: '#FF3B30', animation: 'pulseGlow 1s infinite'}} />}
                                {formatTime(recTime)}
                              </div>
                              <button onClick={togglePause} style={{background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'var(--ios-blue)'}}>
                                {isPaused ? <Play size={24} fill="var(--ios-blue)"/> : <Pause size={24} fill="var(--ios-blue)"/>}
                              </button>
                              <button onClick={() => { stopMediaRecording(); setIsLocked(false); }} style={{background: 'var(--ios-blue)', color: 'white', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer'}}>
                                <Send size={20} />
                              </button>
                            </>
                        ) : (
                            <>
                              <div style={{display: 'flex', alignItems: 'center', gap: 15}}>
                                <div style={{width: 10, height: 10, borderRadius: '50%', background: '#FF3B30', animation: 'pulseGlow 1s infinite'}} />
                                <span style={{color: '#FF3B30', fontWeight: 'bold', fontSize: 18}}>{formatTime(recTime)}</span>
                              </div>
                              <div style={{color: 'var(--text-sec)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, animation: 'slideIn 0.3s'}}>
                                <ChevronLeft size={16}/> Влево отмена
                              </div>
                              <div style={{width: 40, height: 40, borderRadius: '50%', background: 'var(--ios-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'popIn 0.3s'}}>
                                <Mic size={20} color="white" />
                              </div>
                            </>
                        )}

                      </div>
                    </div>
                ) : null}

                {showStickers && (
                    <div className="glass-panel" style={{position: 'absolute', bottom: 65, left: 0, right: 0, height: 180, zIndex: 40, overflowX: 'auto', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 16}}>
                      {ANIMATED_STICKERS.map((url, i) => <img key={i} src={url} className="sticker-img-3d" style={{width: 80, height: 80, cursor: 'pointer'}} onClick={() => sendMessage(url, 'sticker')} alt="sticker" />)}
                    </div>
                )}

                <div className="glass-panel" style={{padding: '10px 16px 25px', display: 'flex', gap: 10, alignItems: 'flex-end', borderTop: '0.5px solid var(--sep)', position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50}}>
                  <button style={{background: 'none', border: 'none', color: 'var(--text-sec)', cursor: 'pointer', paddingBottom: 6}} onClick={() => fileInputRef.current?.click()}>
                    <Paperclip size={26} /><input type="file" hidden ref={fileInputRef} accept="image/*" onChange={e => { const f = e.target.files[0]; if(f){ const r = new FileReader(); r.onload=()=>sendMessage(r.result,'image'); r.readAsDataURL(f); } }} />
                  </button>

                  <div style={{flex: 1, position: 'relative', display: 'flex', alignItems: 'center'}}>
                    <textarea style={{width: '100%', padding: '9px 40px 9px 16px', borderRadius: 20, border: `1px solid var(--sep)`, background: isDark ? '#2C2C2E' : '#FFFFFF', color: 'var(--text-main)', fontSize: 16, outline: 'none', resize: 'none', maxHeight: 100}} rows={1} value={input} onChange={e => setInput(e.target.value)} placeholder="Сообщение" onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }} />
                    <button style={{position: 'absolute', right: 10, background: 'none', border: 'none', color: showStickers ? 'var(--ios-blue)' : 'var(--text-sec)', cursor: 'pointer', bottom: 6}} onClick={() => setShowStickers(!showStickers)}><Smile size={24} /></button>
                  </div>

                  {input.trim() ? (
                      <button onClick={() => sendMessage(input)} style={{background: 'var(--ios-blue)', borderRadius: '50%', width: 36, height: 36, border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: 2}}><Send size={18}/></button>
                  ) : (
                      <button
                          onPointerDown={handlePointerDown}
                          onPointerMove={handlePointerMove}
                          onPointerUp={handlePointerUp}
                          onPointerLeave={handlePointerUp}
                          onPointerCancel={handlePointerUp}
                          style={{
                            touchAction: 'none',
                            background: 'none', border: 'none',
                            color: isRecording ? '#FF3B30' : 'var(--text-sec)',
                            cursor: 'pointer', paddingBottom: 6,
                            transform: isRecording && !isLocked ? 'scale(1.2)' : 'scale(1)',
                            transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                          }}
                      >
                        <div style={{ transition: 'transform 0.3s ease', transform: `rotate(${mode === 'video' ? '360deg' : '0deg'})` }}>
                          {mode === 'voice' ? <Mic size={26}/> : <Camera size={26}/>}
                        </div>
                      </button>
                  )}
                </div>
              </div>
          )}

          {contextMenu && (
              <div className="blur-overlay" onClick={closeContextMenu}>
                {contextMenu.type === 'message' && (() => {
                  const isMine = contextMenu.item.uid === user.username;
                  return (
                      <div style={{
                        position: 'absolute',
                        top: Math.max(50, contextMenu.rect.top - 60),
                        [isMine ? 'right' : 'left']: isMine ? (window.innerWidth - contextMenu.rect.right) : contextMenu.rect.left,
                        zIndex: 2001,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isMine ? 'flex-end' : 'flex-start',
                        maxWidth: '85vw'
                      }} onClick={e => e.stopPropagation()}>

                        <div className="glass-panel" style={{display: 'flex', gap: 12, padding: '10px 16px', borderRadius: 30, marginBottom: 8, boxShadow: '0 10px 25px rgba(0,0,0,0.2)'}}>
                          {['❤️', '👍', '👎', '😂', '😮', '😢'].map(e => (
                              <span key={e} onClick={() => handleReaction(e)} style={{fontSize: 26, cursor: 'pointer', transition: 'transform 0.1s'}} onMouseDown={(e)=>e.target.style.transform='scale(1.2)'} onMouseUp={(e)=>e.target.style.transform='scale(1)'}>{e}</span>
                          ))}
                        </div>

                        <div style={{transform: 'scale(1.02)', transformOrigin: isMine ? 'right center' : 'left center', transition: 'transform 0.2s', zIndex: 2}}>
                          {renderMessageContent(contextMenu.item, true)}
                        </div>

                        <div className="context-menu-popup" style={{position: 'relative', marginTop: 12, left: 0, top: 0, right: 0, width: 250, zIndex: 2}}>
                          <button className="context-menu-btn" onClick={togglePinMessage}><Pin size={18} /> {contextMenu.item.isPinned ? 'Открепить' : 'Закрепить'}</button>
                          <button className="context-menu-btn" onClick={handleForwardStart}><Forward size={18} /> Переслать</button>
                          <button className="context-menu-btn danger" onClick={() => deleteMessage('me')}><Trash size={18} /> Удалить у себя</button>
                          {isMine && <button className="context-menu-btn danger" onClick={() => deleteMessage('both')} style={{borderBottom: 'none'}}><Trash2 size={18} /> Удалить у всех</button>}
                        </div>

                      </div>
                  );
                })()}

                {contextMenu.type === 'chat' && (
                    <div className="context-menu-popup" style={{ top: Math.min(contextMenu.rect.bottom - 20, window.innerHeight - 120), left: Math.max(20, contextMenu.rect.left + 50) }} onClick={e => e.stopPropagation()}>
                      <button className="context-menu-btn" onClick={togglePinChat} style={{borderBottom: 'none'}}><Pin size={18} /> {user.pinnedChats?.includes(contextMenu.item.username) ? 'Открепить чат' : 'Закрепить чат'}</button>
                    </div>
                )}
              </div>
          )}

          {view !== 'chat_room' && (
              <div className="tab-bar glass-panel">
                <button className={`tab-item ${view === 'chats' ? 'active' : ''}`} onClick={() => setView('chats')}><MessageCircle size={28} /><span>Чаты</span></button>
                <button className={`tab-item ${view === 'calls' ? 'active' : ''}`} onClick={() => setView('calls')}><Phone size={28} /><span>Звонки</span></button>
                <button className={`tab-item ${view === 'settings' ? 'active' : ''}`} onClick={() => setView('settings')}><UserIcon size={28} /><span>Настройки</span></button>
              </div>
          )}
        </div>
      </div>
  );
}