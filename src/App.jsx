import React, { useState, useEffect, useRef, Component } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, onSnapshot, addDoc, updateDoc, deleteDoc, query, where, arrayUnion } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import {
  Search, MessageCircle, ChevronLeft, Send, User as UserIcon, LogOut, Moon, Sun,
  Camera, ChevronRight, Globe, Edit3, Mic, Check, CheckCheck, Paperclip,
  Trash, Trash2, Pin, Smile, Forward, Phone, Video, X, PhoneMissed, PhoneIncoming,
  RefreshCw, Lock, Pause, Play, MonitorUp, MicOff, Settings, ShieldAlert,
  Zap, Sparkles, Bell, Info, UserPlus, PhoneCall, Image as ImageIcon, Volume2, RotateCcw,
  Palette, PhoneOff, MicOff as MicMute, MoreVertical, Maximize, Minimize, VolumeX,
  HardDrive, Eraser, Monitor, Reply, LayoutGrid, Music, Image as ImgIcon, AlertTriangle
} from 'lucide-react';

// --- 🔑 FIREBASE CONFIG ---
const firebaseConfig = {
  apiKey: "AIzaSyBI5cMQ-zwjU1s4je2zzqBPpepSfBy0mKg",
  authDomain: "aura-748c8.firebaseapp.com",
  projectId: "aura-748c8",
  storageBucket: "aura-748c8.firebasestorage.app",
  messagingSenderId: "654947850743",
  appId: "1:654947850743:web:91991c4c3d818ed20f36f2",
  measurementId: "G-9X9QMW22Z1"
};

const appId = 'aura-pro-v28';
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const NOTIFICATION_SOUND = 'https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3';
const RINGTONE_SOUND = 'https://assets.mixkit.co/active_storage/sfx/1359/1359-preview.mp3';

// ==========================================
// 1. ЗАЩИТА ОТ КРАША И БИТЫХ ДАННЫХ
// ==========================================
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error("Aura Guard:", error, errorInfo); }
  render() {
    if (this.state.hasError) return (
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100vh', background:'#050505', color:'white' }}>
          <AlertTriangle size={64} color="#FF3B30" style={{marginBottom: 20}} />
          <h2 style={{fontSize: 28, fontWeight: 800}}>Сбой компонента</h2>
          <p style={{opacity: 0.6, marginBottom: 30}}>Мы перехватили ошибку и спасли приложение от вылета.</p>
          <button onClick={() => { localStorage.removeItem('aura_msgs_cache'); this.setState({hasError: false}); window.location.reload(); }} style={{padding:'16px 32px', background:'#FF3B30', color:'white', borderRadius:20, border:'none', cursor:'pointer', fontWeight: 700}}>Очистить кэш и продолжить</button>
        </div>
    );
    return this.props.children;
  }
}

// Защита рендера текста (предотвращает фатальные ошибки)
const safeText = (val) => {
  if (typeof val === 'string') return val;
  if (typeof val === 'number') return String(val);
  if (val && typeof val === 'object') {
    if (val.text) return safeText(val.text);
    if (val.name) return safeText(val.name);
  }
  return '[Медиафайл]';
};

const safeReaction = (val) => {
  if (typeof val === 'string') return val;
  if (val && typeof val === 'object' && val.reaction) return val.reaction;
  return '';
};

// ==========================================
// 2. СТИЛИ (Жестко зафиксированные)
// ==========================================
const getAuraStyles = (theme) => {
  const isDark = theme === 'dark' || theme === 'mirror';
  const isMirror = theme === 'mirror';
  const isLight = theme === 'light';

  return `
  :root { 
    --aura-red: #FF3B30; 
    --aura-red-glow: rgba(255, 59, 48, 0.4);
    --bg-main: ${isMirror ? '#000000' : (isDark ? '#0A0A0C' : '#F2F2F7')};
    --bg-side: ${isMirror ? 'rgba(15,15,20,0.8)' : (isDark ? '#121214' : '#FFFFFF')};
    --bg-card: ${isMirror ? 'rgba(25,25,30,0.7)' : (isDark ? '#1C1C22' : '#FFFFFF')};
    --text-main: ${isLight ? '#000000' : '#FFFFFF'};
    --text-sec: #8E8E93;
    --border: ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'};
    --nav-bg: ${isMirror ? 'rgba(0,0,0,0.75)' : (isDark ? 'rgba(17,17,21,0.95)' : 'rgba(255,255,255,0.95)')};
    --glass: blur(25px) saturate(180%);
    --bubble-me: var(--aura-red);
    --bubble-other: ${isLight ? '#E9E9EF' : '#2C2C32'};
  }
  
  * { box-sizing: border-box; margin: 0; padding: 0; outline: none; -webkit-tap-highlight-color: transparent; }
  
  body, html { 
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif; 
    background: var(--bg-main); color: var(--text-main); 
    overflow: hidden; height: 100vh; width: 100vw;
    position: fixed; inset: 0; overscroll-behavior: none; user-select: none;
  }
  
  button { appearance: none !important; -webkit-appearance: none !important; background: transparent; border: none; cursor: pointer; transition: 0.2s; color: inherit; font-family: inherit; }
  input, textarea, select { appearance: none !important; -webkit-appearance: none !important; font-family: inherit; background: transparent; border: none; color: inherit; outline: none; }
  
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

  .aura-viewport { display: flex; width: 100vw; height: 100vh; overflow: hidden; background: var(--bg-main); justify-content: center; }

  /* --- AUTH --- */
  .auth-overlay { position: fixed; inset: 0; background: #050505; display: flex; align-items: center; justify-content: center; z-index: 100000; }
  .auth-card { background: var(--bg-card); border: 1px solid var(--border); padding: 40px; border-radius: 30px; width: 90%; max-width: 380px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.8); animation: fadeUp 0.4s ease; }
  @keyframes fadeUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }

  /* --- LAYOUT --- */
  .app-container { display: flex; width: 100%; max-width: 1400px; height: 100%; background: var(--bg-main); box-shadow: 0 0 50px rgba(0,0,0,0.5); position: relative; }
  .sidebar { width: 340px; height: 100%; background: var(--bg-side); border-right: 1px solid var(--border); display: flex; flex-direction: column; flex-shrink: 0; z-index: 100; transition: 0.3s; }
  .main-stage { flex: 1; height: 100%; display: flex; justify-content: center; background: var(--bg-main); position: relative; }
  .chat-wrapper { width: 100%; max-width: 900px; display: flex; flex-direction: column; height: 100%; background: var(--bg-main); position: relative; border-left: 1px solid var(--border); border-right: 1px solid var(--border); }
  .media-panel { width: 320px; background: var(--bg-side); border-left: 1px solid var(--border); display: flex; flex-direction: column; z-index: 90; animation: slideLeft 0.3s ease; }
  @keyframes slideLeft { from { transform: translateX(100%); } to { transform: translateX(0); } }

  @media (max-width: 800px) {
    .app-container { max-width: 100vw; }
    .sidebar { width: 100%; position: absolute; left: 0; top: 0; }
    .sidebar.hide { transform: translateX(-100%); }
    .main-stage { width: 100%; position: absolute; left: 0; top: 0; z-index: 200; }
    .main-stage.hide { transform: translateX(100%); }
    .chat-wrapper { border: none; }
    .media-panel { position: absolute; right: 0; top: 0; height: 100%; z-index: 300; }
  }

  /* --- UI COMPONENTS --- */
  .nav-bar { height: 65px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border); background: var(--nav-bg); backdrop-filter: var(--glass); z-index: 10; flex-shrink: 0; }
  .tab-bar { height: 60px; border-top: 1px solid var(--border); display: flex; justify-content: space-around; padding-bottom: 15px; background: var(--bg-side); flex-shrink: 0; }
  .tab-btn { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; color: var(--text-sec); flex: 1; font-size: 11px; font-weight: 600; }
  .tab-btn.active { color: var(--aura-red); }

  .list-item { display: flex; align-items: center; padding: 12px 20px; cursor: pointer; border-bottom: 1px solid var(--border); width: 100%; text-align: left; }
  .list-item:hover { background: rgba(255,255,255,0.03); }
  .list-item.active { background: rgba(255,59,48,0.1); border-left: 3px solid var(--aura-red); }
  .list-item.pinned { background: rgba(255,255,255,0.02); }
  
  .avatar { width: 46px; height: 46px; border-radius: 50%; object-fit: cover; background: #222; flex-shrink: 0; }
  .status-dot { width: 12px; height: 12px; border-radius: 50%; background: #34C759; border: 2px solid var(--bg-side); position: absolute; bottom: 0; right: 0; }

  /* --- MESSAGES --- */
  .chat-scroll { flex: 1; overflow-y: auto; padding: 20px 30px; display: flex; flex-direction: column; gap: 6px; user-select: text; touch-action: pan-y; }
  .bubble { max-width: 70%; padding: 10px 14px; border-radius: 18px; font-size: 15px; line-height: 1.4; position: relative; animation: msgIn 0.2s ease-out; cursor: pointer; }
  @keyframes msgIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  .bubble-me { background: var(--bubble-me); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
  .bubble-other { background: var(--bg-card); color: var(--text-main); align-self: flex-start; border-bottom-left-radius: 4px; border: 1px solid var(--border); }

  .premium-input { width: 100%; padding: 12px 18px; border-radius: 20px; background: var(--bg-card); color: var(--text-main); font-size: 15px; border: 1px solid var(--border); transition: 0.2s; }
  .premium-input:focus { border-color: var(--aura-red); }
  .btn-aura-action { background: var(--aura-red); color: white; padding: 14px; border-radius: 20px; font-weight: 600; width: 100%; font-size: 15px; }

  .reply-preview { border-left: 3px solid var(--aura-red); padding: 6px 12px; margin-bottom: 8px; background: rgba(0,0,0,0.2); border-radius: 8px; font-size: 13px; opacity: 0.8; }
  .edit-mode-bar { background: rgba(255,59,48,0.1); border-top: 1px solid var(--border); padding: 10px 25px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--aura-red); font-weight: 600; }

  /* --- MEDIA --- */
  .circle-video { width: 220px; height: 220px; border-radius: 50%; overflow: hidden; border: 3px solid var(--aura-red); background: #000; cursor: pointer; position: relative; }
  .msg-image { max-width: 280px; border-radius: 12px; cursor: pointer; border: 1px solid var(--border); object-fit: cover; }
  .voice-player { display: flex; align-items: center; gap: 12px; min-width: 200px; padding: 4px 0; }
  .voice-btn { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.15); }
  .voice-progress { flex: 1; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; position: relative; }
  .voice-bar { height: 100%; border-radius: 2px; background: white; transition: width 0.1s linear; }

  /* --- NOTIFICATIONS & MENUS --- */
  .aura-toast { position: fixed; bottom: 30px; right: 30px; background: var(--bg-card); backdrop-filter: var(--glass); border: 1px solid var(--aura-red); border-radius: 16px; padding: 12px 16px; width: 300px; display: flex; align-items: center; gap: 12px; z-index: 200000; box-shadow: 0 10px 30px rgba(0,0,0,0.5); animation: toastIn 0.4s ease; cursor: pointer; }
  @keyframes toastIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

  .context-menu { position: fixed; background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; width: 220px; box-shadow: 0 15px 35px rgba(0,0,0,0.6); z-index: 5000; animation: menuPop 0.2s ease; overflow: hidden; }
  @keyframes menuPop { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  .context-item { padding: 12px 16px; display: flex; align-items: center; gap: 12px; width: 100%; color: white; font-size: 14px; text-align: left; border-bottom: 1px solid var(--border); }
  .context-item:hover { background: rgba(255,59,48,0.1); color: var(--aura-red); }
  
  .reactions-bar { display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap; }
  .reaction-pill { background: rgba(0,0,0,0.2); padding: 4px 8px; border-radius: 12px; font-size: 12px; border: 1px solid var(--border); }

  /* --- CALLS (NEW JITSI ENGINE) --- */
  .call-overlay { position: fixed; inset: 0; background: #000; z-index: 150000; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; animation: fadeIn 0.3s; }
  .call-avatar-glow { width: 180px; height: 180px; border-radius: 50%; object-fit: cover; border: 3px solid var(--aura-red); box-shadow: 0 0 60px rgba(255, 59, 48, 0.4); animation: pulse 2s infinite; }
  
  @keyframes pulse { 0%, 100% { box-shadow: 0 0 40px rgba(255,59,48,0.4); } 50% { box-shadow: 0 0 80px rgba(255,59,48,0.8); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `;
};

// ==========================================
// КОМПОНЕНТЫ МЕДИА (ИЗ "РАБОТАЮЩЕЙ" ВЕРСИИ)
// ==========================================

const AuraToast = ({ data, onClose, onClick }) => {
  useEffect(() => {
    try {
      const audio = new Audio(NOTIFICATION_SOUND);
      audio.play().catch(() => {});
    } catch(e) {}
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, []);
  return (
      <div className="aura-toast" onClick={onClick}>
        <img src={data.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${safeText(data.name)}`} style={{width:40, height:40, borderRadius:'50%'}} alt="av" />
        <div style={{flex:1, overflow:'hidden'}}>
          <b style={{display:'block', fontSize:14, color: 'var(--aura-red)'}}>{safeText(data.name)}</b>
          <p style={{fontSize:13, opacity:0.8, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{safeText(data.text)}</p>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onClose(); }}><X size={16} style={{opacity:0.5}} /></button>
      </div>
  );
};

const VideoCirclePlayer = ({ msg }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  if (typeof msg.text !== 'string') return <div style={{color:'red', fontSize:12}}>Сбой видео</div>;
  return (
      <div className="circle-video" onClick={() => {
        if(!videoRef.current) return;
        if(playing) videoRef.current.pause(); else videoRef.current.play();
        setPlaying(!playing);
      }}>
        {!playing && <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background: 'rgba(0,0,0,0.3)', zIndex:2}}><Play color="white" size={40} /></div>}
        <video ref={videoRef} src={msg.text} playsInline loop style={{width:'100%', height:'100%', objectFit:'cover'}} />
      </div>
  );
};

const VoicePlayer = ({ src, isMine }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [prog, setProg] = useState(0);

  if (typeof src !== 'string') return <div style={{color:'red', fontSize:12}}>Сбой аудио</div>;
  useEffect(() => {
    const a = audioRef.current; if (!a) return;
    const upd = () => setProg((a.currentTime / (a.duration || 1)) * 100);
    a.addEventListener('timeupdate', upd);
    a.addEventListener('ended', () => setPlaying(false));
    return () => { a.removeEventListener('timeupdate', upd); };
  }, []);

  return (
      <div className="voice-player">
        <button className="voice-btn" onClick={() => { if(playing) audioRef.current.pause(); else audioRef.current.play(); setPlaying(!playing); }} style={{background: isMine ? 'rgba(255,255,255,0.2)' : 'var(--aura-red)'}}>
          {playing ? <Pause size={18} color="white" /> : <Play size={18} color="white" style={{marginLeft:2}} />}
        </button>
        <div className="voice-progress">
          <audio ref={audioRef} src={src} />
          <div className="voice-bar" style={{width:`${prog}%`, background: isMine ? 'white' : 'var(--aura-red)'}} />
        </div>
      </div>
  );
};

// ==========================================
// ГЛАВНЫЙ КОМПОНЕНТ
// ==========================================
function MainApp() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('chats');
  const [selectedPeer, setSelectedPeer] = useState(null);

  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [authStep, setAuthStep] = useState('login');
  const [formData, setFormData] = useState({ username: '', password: '', name: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('aura_theme') || 'dark');

  const [toast, setToast] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [editingMsg, setEditingMsg] = useState(null);
  const [showMediaGallery, setShowMediaGallery] = useState(false);
  const [galleryTab, setGalleryTab] = useState('image');

  const [isRecording, setIsRecording] = useState(null);
  const [recTime, setRecTime] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const mediaRec = useRef(null);
  const audioChunks = useRef([]);
  const scrollRef = useRef();

  // НОВЫЙ ДВИЖОК ЗВОНКОВ (Jitsi)
  const [callSession, setCallSession] = useState(null);
  const ringtoneAudio = useRef(null);

  // 1. ИНИЦИАЛИЗАЦИЯ
  useEffect(() => {
    ringtoneAudio.current = new Audio(RINGTONE_SOUND);
    ringtoneAudio.current.loop = true;

    onAuthStateChanged(auth, async u => {
      if (!u) await signInAnonymously(auth);
      const cachedCreds = localStorage.getItem('aura_creds');
      if (cachedCreds) {
        try {
          const { username } = JSON.parse(cachedCreds);
          const snap = await getDoc(doc(db, 'artifacts', appId, 'public', 'data', 'users', username));
          if (snap.exists()) {
            setUser(snap.data());
            updatePresence(username, 'online');
          }
        } catch (e) {}
      }
    });

    const handlePresence = () => {
      if (!user?.username) return;
      updatePresence(user.username, document.visibilityState === 'visible' ? 'online' : Date.now());
    };
    document.addEventListener('visibilitychange', handlePresence);
    return () => document.removeEventListener('visibilitychange', handlePresence);
  }, [user?.username]);

  const updatePresence = async (uName, status) => {
    if (!uName) return;
    await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'users', uName), { status, lastSeen: status === 'online' ? null : Date.now() }).catch(()=>{});
  };

  // 2. ПОДПИСКИ
  useEffect(() => {
    if (!auth.currentUser) return;

    try {
      const cachedMsgs = localStorage.getItem('aura_msgs_cache');
      if (cachedMsgs) setMessages(JSON.parse(cachedMsgs));
    } catch(e){}

    const unsubU = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'users'), s => setAllUsers(s.docs.map(d => d.data())));

    const unsubM = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), s => {
      const newMsgs = s.docs.map(d => ({id: d.id, ...d.data()})).sort((a,b) => a.ts - b.ts);
      localStorage.setItem('aura_msgs_cache', JSON.stringify(newMsgs.slice(-150)));

      if (messages.length > 0 && newMsgs.length > messages.length) {
        const last = newMsgs[newMsgs.length - 1];
        if (user && last.uid !== user.username && (!selectedPeer || selectedPeer.username !== last.uid)) {
          let txt = last.type === 'text' ? last.text : last.type === 'image' ? '📷 Фото' : '🎤 Медиа';
          setToast({ name: last.name, text: txt, avatar: allUsers.find(u => u.username === last.uid)?.avatar, uid: last.uid });
        }
      }
      setMessages(newMsgs);
    });

    // Слушатель звонков (Новая логика комнаты)
    if (user) {
      const q = query(collection(db, 'artifacts', appId, 'public', 'data', 'calls'), where('callee', '==', user.username), where('status', '==', 'calling'));
      const unsubC = onSnapshot(q, s => {
        s.docChanges().forEach(change => {
          if (change.type === 'added') {
            const data = change.doc.data();
            setCallSession({ id: change.doc.id, ...data, peer: allUsers.find(u => u.username === data.caller) || { name: data.caller }, isInitiator: false });
            if(ringtoneAudio.current) ringtoneAudio.current.play().catch(()=>{});
          }
        });
      });
      return () => { unsubU(); unsubM(); unsubC(); };
    }
    return () => { unsubU(); unsubM(); };
  }, [user?.username, selectedPeer?.username, messages.length]);

  // Слушатель статуса активного звонка
  useEffect(() => {
    if (!callSession?.id) return;
    const unsub = onSnapshot(doc(db, 'artifacts', appId, 'public', 'data', 'calls', callSession.id), snap => {
      const data = snap.data();
      if (!data) return;
      if (data.status === 'active' && callSession.status !== 'active') {
        setCallSession(prev => ({ ...prev, status: 'active' }));
      }
      if (data.status === 'ended') {
        endCall(false);
      }
    });
    return () => unsub();
  }, [callSession?.id]);

  useEffect(() => {
    if (!user || !selectedPeer || messages.length === 0) return;
    const unread = messages.filter(m => m.to === user.username && m.uid === selectedPeer.username && !m.read);
    if (unread.length > 0) {
      unread.forEach(m => { updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'messages', m.id), { read: true }).catch(()=>{}); });
    }
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, selectedPeer, user, isUploading, isRecording]);


  // 3. ФУНКЦИИ AUTH
  const handleAuth = async () => {
    const { username, password, name } = formData;
    if (!username || !password) return setErrorMsg("Заполните поля!");
    setErrorMsg("");
    const safeU = username.toLowerCase().trim();
    const uRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', safeU);
    try {
      if (authStep === 'reg') {
        const snap = await getDoc(uRef);
        if (snap.exists()) return setErrorMsg("Логин занят");
        const newUser = { username: safeU, password, name: name || safeU, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${safeU}`, status: 'online', showLastSeen: true, ts: Date.now(), pinnedChats: [], hiddenChats: [] };
        await setDoc(uRef, newUser);
        setUser(newUser);
      } else {
        const snap = await getDoc(uRef);
        if (snap.exists() && snap.data().password === password) {
          setUser(snap.data());
          updatePresence(safeU, 'online');
        } else return setErrorMsg("Неверный логин или пароль");
      }
      localStorage.setItem('aura_creds', JSON.stringify({username: safeU, password}));
    } catch (e) { setErrorMsg("Ошибка сервера"); }
  };

  // ОТПРАВКА МЕДИА В STORAGE
  const uploadToStorageSafe = async (blobData, type, ext) => {
    const folder = type === 'image' ? 'photos' : 'media';
    const fileRef = ref(storage, `artifacts/${appId}/public/data/${folder}/${user.username}_${Date.now()}.${ext}`);
    await uploadBytes(fileRef, blobData);
    return await getDownloadURL(fileRef);
  };

  const sendMessage = async (val = input, type = 'text', blobData = null, ext = '') => {
    if (type === 'text' && (!val || typeof val !== 'string' || !val.trim())) return;

    if (editingMsg && type === 'text') {
      await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'messages', editingMsg.id), { text: val, edited: true });
      setEditingMsg(null); setInput(''); return;
    }

    try {
      let finalVal = val;
      if (blobData) {
        setIsUploading(true);
        finalVal = await uploadToStorageSafe(blobData, type, ext);
        setIsUploading(false);
      } else if (typeof val !== 'string') {
        return; // Защита
      }

      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
        text: finalVal, uid: user.username, to: selectedPeer.username, ts: Date.now(),
        name: user.name, type, read: false, replyTo: replyTo ? { text: replyTo.text, name: replyTo.name } : null, reactions: {}
      });
      setInput(''); setReplyTo(null); setIsRecording(null);
    } catch (err) {
      console.error('Send error:', err);
      setIsUploading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop() || 'jpg';
    sendMessage('', 'image', file, ext);
    e.target.value = '';
  };

  const startMediaRecording = async (type) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: type === 'video' });
      mediaRec.current = new MediaRecorder(stream);
      audioChunks.current = [];
      mediaRec.current.ondataavailable = e => { if(e.data.size > 0) audioChunks.current.push(e.data); };
      mediaRec.current.onstop = async () => {
        const blob = new Blob(audioChunks.current, { type: type === 'video' ? 'video/webm' : 'audio/webm' });
        stream.getTracks().forEach(t => t.stop());
        setIsUploading(true);
        try {
          const url = await uploadToStorageSafe(blob, type, 'webm');
          await sendMessage(url, type === 'video' ? 'video_circle' : 'voice');
        } catch (e) { console.error(e); }
        setIsUploading(false);
      };
      mediaRec.current.start();
      setIsRecording(type); setRecTime(0);
      const timer = setInterval(() => {
        setRecTime(p => {
          if (p >= 14) { stopMediaRecording(false); return 0; }
          return p + 1;
        });
      }, 1000);
      mediaRec.current.timer = timer;
    } catch (e) { console.error("Mic/Cam Error:", e); }
  };

  const stopMediaRecording = (cancel = false) => {
    if (!mediaRec.current || mediaRec.current.state === 'inactive') {
      setIsRecording(null); return;
    }
    if (cancel) mediaRec.current.onstop = null;
    mediaRec.current.stop();
    clearInterval(mediaRec.current.timer);
    if (cancel) setIsRecording(null);
  };

  const togglePinChat = async (peerU) => {
    const pinned = user.pinnedChats || [];
    const newPinned = pinned.includes(peerU) ? pinned.filter(u => u !== peerU) : [...pinned, peerU];
    await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'users', user.username), { pinnedChats: newPinned });
    setUser({...user, pinnedChats: newPinned});
  };

  const deleteDialog = async (peerU, both) => {
    if (both) {
      messages.filter(m => (m.uid === user.username && m.to === peerU) || (m.uid === peerU && m.to === user.username))
          .forEach(m => deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'messages', m.id)));
    } else {
      const hidden = user.hiddenChats || [];
      await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'users', user.username), { hiddenChats: [...hidden, peerU] });
      setUser({...user, hiddenChats: [...hidden, peerU]});
    }
    setSelectedPeer(null);
  };

  const formatLastSeen = (uData) => {
    if (!uData || uData.showLastSeen === false) return 'был(а) недавно';
    if (uData.status === 'online') return 'в сети';
    if (!uData.status) return 'был(а) недавно';
    const diff = Math.floor((Date.now() - uData.status) / 60000);
    if (diff < 1) return 'только что';
    if (diff < 60) return `${diff} мин. назад`;
    if (diff < 1440) return `${Math.floor(diff/60)} ч. назад`;
    return 'давно';
  };

  // --- НОВАЯ СИСТЕМА ЗВОНКОВ (БЕЗ WEBRTC КРАШЕЙ) ---
  const startCall = async (type) => {
    const callId = Math.random().toString(36).substr(2, 9);
    const roomName = `AuraCall_${callId}_${Date.now()}`;
    setCallSession({ id: callId, room: roomName, status: 'calling', peer: selectedPeer, type, isInitiator: true });

    const callDoc = doc(db, 'artifacts', appId, 'public', 'data', 'calls', callId);
    await setDoc(callDoc, {
      caller: user.username, callee: selectedPeer.username, status: 'calling', type, room: roomName, ts: Date.now()
    });
  };

  const acceptCall = async () => {
    if (ringtoneAudio.current) { ringtoneAudio.current.pause(); ringtoneAudio.current.currentTime = 0; }
    await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'calls', callSession.id), { status: 'active' });
    setCallSession(prev => ({ ...prev, status: 'active' }));
  };

  const endCall = async (updateDb = true) => {
    if (ringtoneAudio.current) { ringtoneAudio.current.pause(); ringtoneAudio.current.currentTime = 0; }
    if (updateDb && callSession?.id) {
      await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'calls', callSession.id), { status: 'ended' }).catch(()=>{});
    }
    setCallSession(null);
  };


  // --- РЕНДЕР ---
  if (!user) return (
      <div className="aura-viewport">
        <style>{getAuraStyles(theme)}</style>
        <div className="auth-overlay">
          <div className="auth-card">
            <div className="logo-box"><Zap size={45} color="white" fill="white" /></div>
            <h1 style={{color:'white', fontSize:38, fontWeight:900, marginBottom:8}}>AURA</h1>
            <p style={{color:'#777', fontSize:15, marginBottom:40}}>Безопасность. Стиль. Будущее.</p>
            <div style={{width:'100%'}}>
              <input className="premium-input" placeholder="Логин" value={formData.username} onChange={e=>setFormData({...formData, username:e.target.value})} style={{marginBottom:12}} />
              <input className="premium-input" type="password" placeholder="Пароль" value={formData.password} onChange={e=>setFormData({...formData, password:e.target.value})} style={{marginBottom:12}} />
              {authStep === 'reg' && <input className="premium-input" placeholder="Отображаемое имя" value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} style={{marginBottom:12}} />}
              {errorMsg && <p style={{color:'var(--aura-red)', marginBottom:12, fontSize:14}}>{errorMsg}</p>}
              <button className="btn-aura-action" onClick={handleAuth}>{authStep === 'login' ? 'ВОЙТИ В СИСТЕМУ' : 'СОЗДАТЬ АККАУНТ'}</button>
              <button onClick={()=>{setAuthStep(authStep==='login'?'reg':'login'); setErrorMsg("")}} style={{marginTop:20, color:'var(--aura-red)', fontWeight:800, fontSize:14}}>
                {authStep === 'login' ? 'У меня ещё нет аккаунта' : 'Уже есть аккаунт? Войти'}
              </button>
            </div>
          </div>
        </div>
      </div>
  );

  const sortedUsers = [...allUsers]
      .filter(u => u.username !== user?.username && !(user?.hiddenChats || []).includes(u.username) && u.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a,b) => {
        const aPin = user?.pinnedChats?.includes(a.username) ? 1 : 0;
        const bPin = user?.pinnedChats?.includes(b.username) ? 1 : 0;
        return bPin - aPin;
      });

  const chatMessages = messages.filter(m => (selectedPeer?.username==='global'?m.to==='global':((m.uid===user?.username && m.to===selectedPeer?.username)||(m.uid===selectedPeer?.username && m.to===user?.username))));
  const pinnedMsg = chatMessages.find(m => m.isPinned);

  return (
      <div className="aura-viewport">
        <style>{getAuraStyles(theme)}</style>

        <div className="app-container">
          <div className={`sidebar ${selectedPeer && view === 'chats' ? 'hide' : ''}`}>
            <div className="nav-bar">
              <div style={{display:'flex', alignItems:'center', gap:12}}><Zap size={28} color="var(--aura-red)" fill="var(--aura-red)" /><h2 style={{fontWeight:900, fontSize:24}}>Aura</h2></div>
              <Bell size={20} color="var(--aura-red)" style={{cursor:'pointer'}} />
            </div>
            <div style={{padding:16}}>
              <div className="premium-input" style={{display:'flex', alignItems:'center', gap:10, padding:'10px 16px', borderRadius: 16}}>
                <Search size={18} color="#8E8E93" /><input style={{width:'100%'}} placeholder="Поиск в Aura..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} />
              </div>
            </div>
            <div style={{flex:1, overflowY:'auto'}}>
              <button className={`list-item ${selectedPeer?.username === 'global' ? 'active' : ''}`} onClick={() => setSelectedPeer({username:'global', name:'Общий чат', avatar:''})}>
                <div style={{width:48, height:48, borderRadius:16, background:'var(--aura-red)', display:'flex', alignItems:'center', justifyContent:'center', marginRight:16, flexShrink:0}}><Globe size={24} color="white" /></div>
                <div style={{flex:1}}><b>Общий чат</b><p style={{fontSize:13, opacity:0.6, margin:0}}>Весь мир Aura</p></div>
              </button>
              {sortedUsers.map(u => (
                  <button key={u.username} className={`list-item ${selectedPeer?.username === u.username ? 'active' : ''} ${user.pinnedChats?.includes(u.username)?'pinned':''}`} onClick={() => setSelectedPeer(u)} onContextMenu={(e)=>{ e.preventDefault(); setContextMenu({type:'user', item:u, rect:e.currentTarget.getBoundingClientRect()}); }}>
                    <div style={{position:'relative'}}>
                      <img src={safeText(u.avatar)} className="avatar" alt="av" />
                      {u.status === 'online' && u.showLastSeen !== false && <div className="status-dot" />}
                    </div>
                    <div style={{flex:1, overflow:'hidden'}}>
                      <div style={{display:'flex', justifyContent:'space-between'}}><b>{safeText(u.name)}</b> {user.pinnedChats?.includes(u.username) && <Pin size={12} color="var(--text-sec)" />}</div>
                      <p style={{fontSize:13, color:'var(--text-sec)', margin:0}}>{formatLastSeen(u)}</p>
                    </div>
                  </button>
              ))}
            </div>
            <div className="tab-bar">
              <button className={`tab-btn ${view==='chats'?'active':''}`} onClick={()=>{setView('chats'); setSelectedPeer(null);}}><MessageCircle size={24}/>Чаты</button>
              <button className={`tab-btn ${view==='settings'?'active':''}`} onClick={()=>setView('settings')}><Settings size={24}/>Настройки</button>
            </div>
          </div>

          {view === 'chats' && (
              <div className={`main-stage ${!selectedPeer ? 'hide' : ''}`}>
                {selectedPeer ? (
                    <div className="chat-wrapper">
                      <div className="nav-bar">
                        <div style={{display:'flex', alignItems:'center', gap:15}}>
                          <button className="md:hide" onClick={()=>setSelectedPeer(null)} style={{color:'var(--aura-red)'}}><ChevronLeft size={32}/></button>
                          <img src={safeText(selectedPeer.avatar) || `https://api.dicebear.com/7.x/initials/svg?seed=${selectedPeer.username}`} className="avatar" style={{width:40, height:40}} alt="p" />
                          <div><b style={{fontSize:17, display:'block'}}>{safeText(selectedPeer.name)}</b><span style={{fontSize:12, color:allUsers.find(u=>u.username===selectedPeer.username)?.status==='online'?'#34C759':'var(--text-sec)'}}>{formatLastSeen(allUsers.find(u=>u.username===selectedPeer.username))}</span></div>
                        </div>
                        <div style={{display:'flex', gap:20}}>
                          <button onClick={()=>startCall('voice')}><Phone size={22} color="var(--aura-red)"/></button>
                          <button onClick={()=>startCall('video')}><Video size={24} color="var(--aura-red)"/></button>
                          <button onClick={()=>setShowMediaGallery(!showMediaGallery)}><Info size={22} color="var(--aura-red)"/></button>
                        </div>
                      </div>

                      {pinnedMsg && (
                          <button className="pinned-msg-bar" onClick={()=>scrollRef.current.scrollTo(0,0)}>
                            <Pin size={16} color="var(--aura-red)" />
                            <div style={{flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontSize:13}}>{safeText(pinnedMsg.text)}</div>
                            <X size={16} opacity={0.5} onClick={(e)=>{ e.stopPropagation(); updateDoc(doc(db,'artifacts',appId,'public','data','messages',pinnedMsg.id), {isPinned: false}); }} />
                          </button>
                      )}

                      <div ref={scrollRef} className="chat-scroll">
                        <div style={{flex:1}} />
                        {chatMessages.filter(m => !(m.hiddenFor || []).includes(user.username)).map(m => {
                          return (
                              <div key={m.id} className={`bubble ${m.uid===user.username?'bubble-me':'bubble-other'}`} onContextMenu={(e)=>{ e.preventDefault(); setContextMenu({type:'msg', id:m.id, rect:e.currentTarget.getBoundingClientRect(), item:m}); }}>
                                {m.uid !== user.username && selectedPeer.username === 'global' && <div style={{fontSize:11, fontWeight:800, marginBottom:4, color:'var(--aura-red)'}}>{safeText(m.name)}</div>}
                                {m.replyTo && <div className="reply-preview">Ответ: {safeText(m.replyTo.text)}</div>}

                                {m.type === 'video_circle' ? <VideoCirclePlayer msg={m} /> :
                                    m.type === 'voice' ? <VoicePlayer src={m.text} isMine={m.uid===user.username} /> :
                                        m.type === 'image' ? <img src={m.text} className="msg-image" onClick={()=>window.open(m.text,'_blank')} alt="img" /> :
                                            <div style={{wordBreak: 'break-word'}}>{safeText(m.text)} {m.edited && <span style={{fontSize:10, opacity:0.5}}>(изм.)</span>}</div>}

                                <div style={{fontSize:10, opacity:0.6, textAlign:'right', marginTop:6}}>
                                  {new Date(m.ts).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                                  {m.uid===user.username && (m.read ? <CheckCheck size={14} color="#34C759" style={{marginLeft:4, verticalAlign:'middle'}} /> : <Check size={14} style={{marginLeft:4, verticalAlign:'middle'}} />)}
                                </div>
                                {m.reactions && Object.keys(m.reactions).length > 0 && (
                                    <div className="reactions-bar">
                                      {Object.values(m.reactions).filter(v=>v).map((v, i) => <span key={i} className="reaction-pill">{safeReaction(v)}</span>)}
                                    </div>
                                )}
                              </div>
                          );
                        })}
                      </div>

                      {replyTo && <div className="edit-mode-bar"><span>Ответ: {safeText(replyTo.text).substring(0,30)}...</span><button onClick={()=>setReplyTo(null)}><X size={16}/></button></div>}
                      {editingMsg && <div className="edit-mode-bar"><span>Редактирование...</span><button onClick={()=>setEditingMsg(null)}><X size={16}/></button></div>}

                      <div style={{padding:'20px 45px 55px', background:'var(--bg-card)', borderTop:'1px solid var(--border)', display:'flex', gap:15, alignItems:'center'}}>
                        {isUploading && <RefreshCw className="animate-spin" color="var(--aura-red)" size={24} />}
                        {!isUploading && (
                            <>
                              <button onClick={()=>{ document.getElementById('photo-upload').click(); }}><Paperclip size={26} color="var(--aura-red)" /></button>
                              <input type="file" id="photo-upload" accept="image/*" style={{display:'none'}} onChange={handleFileUpload} />
                              <input className="premium-input" value={input} onChange={e=>setInput(e.target.value)} placeholder="Сообщение..." onKeyDown={e=>e.key==='Enter' && sendMessage(input, 'text')} />
                              {input.trim() || editingMsg ? <button onClick={()=>sendMessage(input, 'text')}><Send size={24} color="var(--aura-red)"/></button> :
                                  <div style={{display:'flex', gap:20}}>
                                    <button onClick={()=>startMediaRecording('video')}><Camera size={26} color="var(--aura-red)"/></button>
                                    <button onClick={()=>startMediaRecording('voice')}><Mic size={26} color="var(--aura-red)"/></button>
                                  </div>
                              }
                            </>
                        )}
                      </div>
                    </div>
                ) : (
                    <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', opacity:0.04}}>
                      <Zap size={300} fill="currentColor" /><h1 style={{letterSpacing:25, fontSize:70, fontWeight:900}}>AURA</h1>
                    </div>
                )}

                {showMediaGallery && selectedPeer && (
                    <div className="media-panel">
                      <div className="nav-bar"><b style={{fontSize:15}}>Медиа история</b><button onClick={()=>setShowMediaGallery(false)}><X size={20} style={{opacity:0.5}} /></button></div>
                      <div style={{display:'flex', gap:10, padding:15, borderBottom:'1px solid var(--border)'}}>
                        <button style={{flex:1, background: galleryTab === 'image' ? 'rgba(255,59,48,0.1)' : 'transparent', color: galleryTab === 'image' ? 'var(--aura-red)' : 'var(--text-main)', padding:'8px', borderRadius:10, fontWeight:600}} onClick={()=>setGalleryTab('image')}><ImageIcon size={16} style={{marginRight:5, verticalAlign:'middle'}}/> Фото</button>
                        <button style={{flex:1, background: galleryTab === 'voice' ? 'rgba(255,59,48,0.1)' : 'transparent', color: galleryTab === 'voice' ? 'var(--aura-red)' : 'var(--text-main)', padding:'8px', borderRadius:10, fontWeight:600}} onClick={()=>setGalleryTab('voice')}><Music size={16} style={{marginRight:5, verticalAlign:'middle'}}/> Голос</button>
                      </div>
                      <div style={{flex:1, overflowY:'auto', padding:10, display:'grid', gridTemplateColumns: galleryTab === 'image' ? '1fr 1fr' : '1fr', gap:10, alignContent:'start'}}>
                        {chatMessages.filter(m => galleryTab === 'image' ? m.type === 'image' : m.type === 'voice' || m.type === 'video_circle').map(m => (
                            galleryTab === 'image'
                                ? <img key={m.id} src={safeText(m.text)} style={{width:'100%', aspectRatio:'1/1', objectFit:'cover', borderRadius:12, cursor:'pointer'}} onClick={()=>window.open(m.text,'_blank')} alt="img" />
                                : <div key={m.id} style={{background:'var(--bg-card)', padding:10, borderRadius:12}}>{m.type === 'voice' ? <VoicePlayer src={m.text} /> : <VideoCirclePlayer msg={m} />}</div>
                        ))}
                      </div>
                    </div>
                )}
              </div>
          )}

          {view === 'settings' && (
              <div style={{flex:1, background:'var(--bg-main)', display:'flex', flexDirection:'column'}}>
                <div className="nav-bar"><button onClick={()=>setView('chats')}><ChevronLeft size={32} color="var(--text-main)"/></button><h2>Настройки Aura</h2><div style={{width:32}}/></div>
                <div style={{flex:1, overflowY:'auto', padding:'40px 20px', textAlign:'center'}}>
                  <img src={safeText(user?.avatar)} className="avatar" style={{width:140, height:140, border:'4px solid var(--aura-red)', marginBottom:20, boxShadow:'0 10px 40px var(--aura-red-glow)'}} alt="me" />
                  <h2 style={{fontSize:32}}>{safeText(user?.name)}</h2>
                  <p style={{opacity:0.5, marginBottom:40}}>@{safeText(user?.username)}</p>

                  <div style={{maxWidth:600, margin:'0 auto', display:'grid', gap:20}}>
                    <div style={{background:'var(--bg-card)', padding:25, borderRadius:24, border:'1px solid var(--border)', textAlign:'left'}}>
                      <label style={{fontSize:12, textTransform:'uppercase', opacity:0.6, fontWeight:800, letterSpacing:1}}>Оформление</label>
                      <div style={{display:'flex', gap:10, marginTop:15}}>
                        <button onClick={()=>{setTheme('light'); localStorage.setItem('aura_theme','light')}} style={{flex:1, padding:14, borderRadius:16, border:'1px solid var(--border)', background:theme==='light'?'var(--aura-red)':'var(--bg-main)', color:theme==='light'?'#fff':'var(--text-main)', fontWeight:700}}>Light</button>
                        <button onClick={()=>{setTheme('dark'); localStorage.setItem('aura_theme','dark')}} style={{flex:1, padding:14, borderRadius:16, border:'1px solid var(--border)', background:theme==='dark'?'var(--aura-red)':'var(--bg-main)', color:theme==='dark'?'#fff':'var(--text-main)', fontWeight:700}}>Dark</button>
                        <button onClick={()=>{setTheme('mirror'); localStorage.setItem('aura_theme','mirror')}} style={{flex:1, padding:14, borderRadius:16, border:'1px solid var(--border)', background:theme==='mirror'?'var(--aura-red)':'var(--bg-main)', color:theme==='mirror'?'#fff':'var(--text-main)', fontWeight:700}}>Mirror</button>
                      </div>
                    </div>

                    <div style={{background:'var(--bg-card)', padding:25, borderRadius:24, border:'1px solid var(--border)', textAlign:'left'}}>
                      <label style={{fontSize:12, textTransform:'uppercase', opacity:0.6, fontWeight:800, letterSpacing:1}}>Приватность</label>
                      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:15}}>
                        <span style={{fontWeight:600}}>Показывать время захода</span>
                        <input type="checkbox" checked={user.showLastSeen !== false} onChange={(e) => updateDoc(doc(db,'artifacts',appId,'public','data','users',user.username), {showLastSeen: e.target.checked})} style={{width:20, height:20, accentColor:'var(--aura-red)'}} />
                      </div>
                    </div>

                    <div style={{background:'var(--bg-card)', padding:25, borderRadius:24, border:'1px solid var(--border)', textAlign:'left'}}>
                      <label style={{fontSize:12, textTransform:'uppercase', opacity:0.6, fontWeight:800, letterSpacing:1}}>Кэш и Данные</label>
                      <button onClick={()=>{ localStorage.removeItem('aura_msgs_cache'); window.location.reload(); }} style={{width:'100%', padding:16, marginTop:15, borderRadius:16, background:'rgba(255,59,48,0.1)', color:'#FF3B30', display:'flex', alignItems:'center', justifyContent:'center', gap:10, fontWeight:700}}><Eraser size={20}/> Очистить локальный кэш</button>
                    </div>

                    <button className="btn-aura-action" style={{background:'#FF3B30'}} onClick={()=>{localStorage.clear(); window.location.reload()}}>ВЫЙТИ ИЗ АККАУНТА</button>
                  </div>
                </div>
              </div>
          )}

          {/* --- КОНТЕКСТНОЕ МЕНЮ --- */}
          {contextMenu && (
              <div style={{position:'fixed', inset:0, zIndex:5000}} onClick={()=>setContextMenu(null)}>
                <div className="context-menu" style={{top:contextMenu.rect.top, left: contextMenu.type === 'msg' ? contextMenu.rect.left - 100 : contextMenu.rect.left + 50}}>
                  {contextMenu.type === 'msg' ? (
                      <>
                        <div style={{padding:'10px', display:'flex', gap:8, borderBottom:'1px solid var(--border)', justifyContent:'center'}}>
                          {['❤️','👍','🔥','😮','😡'].map(emo => <button key={emo} style={{fontSize:20}} onClick={()=>{ updateDoc(doc(db,'artifacts',appId,'public','data','messages',contextMenu.id), {[`reactions.${user.username}`]: emo}); setContextMenu(null); }}>{emo}</button>)}
                        </div>
                        <button className="context-item" onClick={()=>{setReplyTo(contextMenu.item); setContextMenu(null);}}><Reply size={16}/> Ответить</button>
                        <button className="context-item" onClick={()=>{updateDoc(doc(db,'artifacts',appId,'public','data','messages',contextMenu.id), {isPinned: !contextMenu.item.isPinned}); setContextMenu(null);}}><Pin size={16}/> {contextMenu.item.isPinned ? 'Открепить' : 'Закрепить'}</button>
                        {contextMenu.item.uid === user.username && <button className="context-item" onClick={()=>{setEditingMsg(contextMenu.item); setInput(typeof contextMenu.item.text === 'string' ? contextMenu.item.text : ''); setContextMenu(null);}}><Edit3 size={16}/> Изменить</button>}
                        <button className="context-item danger" onClick={()=>{ updateDoc(doc(db,'artifacts',appId,'public','data','messages',contextMenu.id), {hiddenFor: arrayUnion(user.username)}); setContextMenu(null); }}><Trash size={16}/> Удалить у себя</button>
                        {(contextMenu.item.uid === user.username || user.role === 'admin') && <button className="context-item danger" onClick={()=>{ deleteDoc(doc(db,'artifacts',appId,'public','data','messages',contextMenu.id)); setContextMenu(null); }}><Trash2 size={16}/> Удалить у всех</button>}
                      </>
                  ) : (
                      <>
                        <button className="context-item" onClick={()=>{ togglePinChat(contextMenu.item.username); setContextMenu(null); }}><Pin size={16}/> {user.pinnedChats?.includes(contextMenu.item.username) ? 'Открепить диалог' : 'Закрепить диалог'}</button>
                        <button className="context-item danger" onClick={()=>{ deleteDialog(contextMenu.item.username, false); setContextMenu(null); }}><Trash size={16}/> Удалить у себя</button>
                        <button className="context-item danger" onClick={()=>{ deleteDialog(contextMenu.item.username, true); setContextMenu(null); }}><Trash2 size={16}/> Удалить у обоих</button>
                      </>
                  )}
                </div>
              </div>
          )}

          {/* --- ЗВОНКИ (НОВЫЙ JITSI ДВИЖОК) --- */}
          {callSession && (
              <div className="call-overlay">
                {callSession.status === 'active' ? (
                    <div style={{width:'100%', height:'100%', position:'relative', background:'#000'}}>
                      <iframe
                          allow="camera; microphone; fullscreen; display-capture; autoplay"
                          src={`https://meet.jit.si/${callSession.room}#config.prejoinPageEnabled=false&userInfo.displayName="${user.name}"`}
                          style={{width:'100%', height:'100%', border:'none'}}
                          title="Aura Call"
                      />
                      <button onClick={() => endCall(true)} style={{position:'absolute', bottom:40, left:'50%', transform:'translateX(-50%)', background:'#FF3B30', padding:'15px 40px', borderRadius:30, color:'white', fontWeight:800, boxShadow:'0 10px 30px rgba(255,59,48,0.5)', zIndex:10}}>
                        Завершить звонок
                      </button>
                    </div>
                ) : (
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                      <img src={callSession.peer?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${safeText(callSession.caller)}`} className="call-avatar-glow" alt="c" />
                      <h2 style={{marginTop:30, fontSize:34, fontWeight:900}}>{safeText(callSession.peer?.name || callSession.caller)}</h2>
                      <p style={{fontSize:18, opacity:0.8, marginTop:10}}>{callSession.status === 'incoming' ? 'Входящий вызов Aura...' : 'Ожидание ответа...'}</p>

                      <div style={{display:'flex', gap:30, marginTop:50}}>
                        {callSession.isInitiator ? (
                            <button onClick={()=>endCall(true)} style={{background:'#FF3B30', width:70, height:70, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center'}}><PhoneOff size={32} color="white"/></button>
                        ) : (
                            <>
                              <button onClick={acceptCall} style={{background:'#34C759', width:70, height:70, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 10px 30px rgba(52,199,89,0.4)'}}><Phone size={32} color="white"/></button>
                              <button onClick={()=>endCall(true)} style={{background:'#FF3B30', width:70, height:70, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 10px 30px rgba(255,59,48,0.4)'}}><PhoneOff size={32} color="white"/></button>
                            </>
                        )}
                      </div>
                    </div>
                )}
              </div>
          )}

          {/* --- ЗАПИСЬ --- */}
          {isRecording && (
              <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.92)', zIndex:200000, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                <div style={{display:'flex', alignItems:'center', gap:15, marginBottom:20}}>
                  <div style={{width:16, height:16, background:'#FF3B30', borderRadius:'50%', animation:'pulse 1s infinite'}} />
                  <span style={{fontSize:40, fontWeight:800}}>{Math.floor(recTime/60)}:{(recTime%60).toString().padStart(2,'0')} / 15</span>
                </div>
                {isRecording === 'video' && (
                    <div className="circle-video" style={{marginBottom:30, width: 280, height: 280}}>
                      <video ref={v => { if(v) v.srcObject = mediaRec.current?.stream; }} autoPlay muted style={{width:'100%', height:'100%', objectFit:'cover', transform:'scaleX(-1)'}} />
                    </div>
                )}
                <div style={{display:'flex', gap:30}}>
                  <button onClick={()=>{ stopMediaRecording(true); }} style={{background:'rgba(255,255,255,0.1)', color:'white', padding:'16px 40px', borderRadius:25, fontWeight:700}}>ОТМЕНА</button>
                  <button onClick={()=>stopMediaRecording(false)} style={{background:'var(--aura-red)', color:'white', padding:'16px 50px', borderRadius:25, fontWeight:800, boxShadow:'0 10px 30px rgba(255,59,48,0.3)'}}>ОТПРАВИТЬ</button>
                </div>
              </div>
          )}

          {toast && <AuraToast data={toast} onClose={()=>setToast(null)} onClick={()=>{ setSelectedPeer(allUsers.find(u=>u.username===toast.uid)); setView('chats'); setToast(null); }} />}
        </div>
      </div>
  );
}

export default function App() { return <ErrorBoundary><MainApp /></ErrorBoundary>; }