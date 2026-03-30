import React, { useState, useEffect, useRef, Component } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, onSnapshot, addDoc, updateDoc, deleteDoc, query, where, arrayUnion } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import {
  AlertTriangle, Zap, Search, Globe, MessageCircle, Phone, PhoneIncoming,
  PhoneForwarded, PhoneCall, ChevronLeft, Video, Info, Pin, X, Check,
  CheckCheck, File as FileIcon, Download, RefreshCw, Paperclip, Send,
  Camera, Mic, Image as ImageIcon, Music, Play, Pause, Settings, Eraser,
  MicOff as MicMute, Monitor, PhoneOff, Trash, Trash2, Reply, Edit3, Bell, Minimize, Maximize, Volume2, Heart, ThumbsUp, Smile, Frown, Sparkles
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
const RTC_SERVERS = {
  iceServers: [
    { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] },
    { urls: 'turn:openrelay.metered.ca:80', username: 'openrelayproject', credential: 'openrelayproject' }
  ]
};

// ==========================================
// 1. ЗАЩИТА ОТ КРАША
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

const compressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_SIZE = 800;
        let w = img.width, h = img.height;
        if (w > h && w > MAX_SIZE) { h *= MAX_SIZE / w; w = MAX_SIZE; }
        else if (h > MAX_SIZE) { w *= MAX_SIZE / h; h = MAX_SIZE; }
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.6));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};

// ==========================================
// 2. iOS СТИЛИ И АНИМАЦИИ
// ==========================================
const getAuraStyles = (theme) => {
  const isDark = theme === 'dark';
  const isLight = theme === 'light';
  return `
  :root { 
    --aura-red: #FF3B30; 
    --aura-red-glow: rgba(255, 59, 48, 0.4);
    --bg-main: ${isDark ? '#000000' : '#F2F2F7'};
    --bg-side: ${isDark ? '#111115' : '#FFFFFF'};
    --bg-card: ${isDark ? '#1C1C22' : '#FFFFFF'};
    --text-main: ${isLight ? '#000000' : '#FFFFFF'};
    --text-sec: #8E8E93;
    --border: ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'};
    --nav-bg: ${isDark ? 'rgba(17,17,21,0.95)' : 'rgba(255,255,255,0.95)'};
    --glass: blur(25px) saturate(180%);
    
    --bubble-me: ${isDark ? '#2B5278' : '#007AFF'}; 
    --bubble-me-text: #FFFFFF;
    --bubble-other: ${isDark ? '#1C1C1E' : '#E9E9EF'};
    --bubble-other-text: ${isDark ? '#FFFFFF' : '#000000'};
  }
  
  * { box-sizing: border-box; margin: 0; padding: 0; outline: none; -webkit-tap-highlight-color: transparent; }
  
  body, html { 
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", sans-serif; 
    background: var(--bg-main); color: var(--text-main); 
    overflow: hidden; height: 100vh; width: 100vw;
    position: fixed; inset: 0; overscroll-behavior: none; 
    user-select: none; -webkit-user-select: none; -webkit-touch-callout: none;
  }
  
  button { appearance: none !important; -webkit-appearance: none !important; background: transparent; border: none; cursor: pointer; transition: 0.2s; color: inherit; font-family: inherit; }
  input, textarea, select { appearance: none !important; -webkit-appearance: none !important; font-family: inherit; background: transparent; border: none; color: inherit; outline: none; user-select: text; -webkit-user-select: text; font-size: 16px; }
  
  ::-webkit-scrollbar { display: none; }
  
  .aura-viewport { display: flex; width: 100vw; height: 100vh; overflow: hidden; background: var(--bg-main); justify-content: center; position: relative; }
  
  /* iOS Auth Screen */
  .auth-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 100%); display: flex; align-items: center; justify-content: center; z-index: 100000; }
  .auth-card { background: rgba(20,20,30,0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255,59,48,0.3); padding: 40px 30px; border-radius: 48px; width: 90%; max-width: 380px; text-align: center; animation: slideUp 0.5s cubic-bezier(0.34, 1.2, 0.64, 1); }
  @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
  .logo-box { width: 90px; height: 90px; background: linear-gradient(135deg, #FF3B30, #FF6B5E); border-radius: 28px; margin: 0 auto 25px; display: flex; align-items: center; justify-content: center; box-shadow: 0 15px 35px rgba(255,59,48,0.3); animation: float 3s ease-in-out infinite; }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  
  /* iOS Layout */
  .app-container { display: flex; width: 100%; height: 100%; background: var(--bg-main); position: relative; }
  .sidebar { width: 100%; height: 100%; background: var(--bg-side); display: flex; flex-direction: column; flex-shrink: 0; z-index: 100; transition: transform 0.3s cubic-bezier(0.34, 1.2, 0.64, 1); }
  .main-stage { flex: 1; height: 100%; display: flex; justify-content: center; background: var(--bg-main); position: relative; }
  .chat-wrapper { flex: 1; display: flex; flex-direction: column; height: 100%; background: var(--bg-main); position: relative; animation: fadeIn 0.3s ease; }
  .media-panel { position: fixed; bottom: 0; left: 0; right: 0; background: var(--bg-card); border-radius: 24px 24px 0 0; display: flex; flex-direction: column; z-index: 300; animation: slideUp 0.3s ease; max-height: 80vh; overflow-y: auto; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  
  .sidebar.hide { transform: translateX(-100%); }
  .main-stage.hide { display: none; }
  
  /* iOS Nav Bar */
  .nav-bar { 
    height: calc(60px + env(safe-area-inset-top)); 
    padding-top: env(safe-area-inset-top);
    padding-left: 16px;
    padding-right: 16px;
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    border-bottom: 0.5px solid var(--border); 
    background: var(--nav-bg); 
    backdrop-filter: blur(20px);
    z-index: 10; 
    flex-shrink: 0; 
  }
  
  .tab-bar { 
    height: calc(75px + env(safe-area-inset-bottom)); 
    padding-bottom: env(safe-area-inset-bottom);
    border-top: 0.5px solid var(--border); 
    display: flex; 
    justify-content: space-around; 
    background: var(--bg-side); 
    flex-shrink: 0; 
    backdrop-filter: blur(20px);
  }
  
  .chat-input-wrapper { 
    padding: 12px 16px calc(20px + env(safe-area-inset-bottom)); 
    background: var(--bg-card); 
    border-top: 0.5px solid var(--border); 
    display: flex; 
    gap: 12px; 
    align-items: center; 
  }
  
  .tab-btn { 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    gap: 4px; 
    color: var(--text-sec); 
    flex: 1; 
    font-size: 11px; 
    font-weight: 500; 
    transition: all 0.2s ease;
  }
  .tab-btn.active { color: var(--aura-red); transform: translateY(-2px); }
  
  /* iOS Chat List */
  .list-item { 
    display: flex; 
    align-items: center; 
    padding: 12px 16px; 
    cursor: pointer; 
    border-bottom: 0.5px solid var(--border); 
    width: 100%; 
    text-align: left; 
    transition: background 0.2s ease; 
    background: var(--bg-side);
  }
  .list-item:active { background: rgba(255,59,48,0.1); transform: scale(0.98); }
  .list-item.active { background: rgba(255,59,48,0.12); border-left: 3px solid var(--aura-red); }
  .list-item.pinned { background: rgba(255,59,48,0.05); }
  
  .avatar { width: 52px; height: 52px; border-radius: 50%; object-fit: cover; background: #222; flex-shrink: 0; margin-right: 14px; }
  .status-dot { width: 12px; height: 12px; border-radius: 50%; background: #34C759; border: 2px solid var(--bg-side); position: absolute; bottom: 2px; right: 2px; box-shadow: 0 0 0 2px var(--bg-side); }
  
  /* iOS Messages */
  .chat-scroll { 
    flex: 1; 
    overflow-y: auto; 
    padding: 16px 12px; 
    display: flex; 
    flex-direction: column; 
    gap: 8px; 
    user-select: text; 
    touch-action: pan-y;
    scroll-behavior: smooth;
  }
  
  .bubble { 
    max-width: 80%; 
    padding: 10px 14px; 
    border-radius: 20px; 
    font-size: 16px; 
    line-height: 1.45; 
    position: relative; 
    animation: messageSlide 0.35s cubic-bezier(0.34, 1.2, 0.64, 1); 
    box-shadow: 0 1px 2px rgba(0,0,0,0.1); 
    cursor: pointer; 
  }
  
  @keyframes messageSlide { 
    0% { opacity: 0; transform: translateY(10px) scale(0.95); } 
    100% { opacity: 1; transform: translateY(0) scale(1); } 
  }
  
  .bubble-me { background: var(--bubble-me); color: var(--bubble-me-text); align-self: flex-end; border-bottom-right-radius: 4px; }
  .bubble-other { background: var(--bubble-other); color: var(--bubble-other-text); align-self: flex-start; border-bottom-left-radius: 4px; }
  
  /* iOS Typing Indicator */
  .typing-indicator { 
    display: flex; 
    gap: 4px; 
    padding: 10px 14px; 
    background: var(--bubble-other); 
    border-radius: 20px; 
    width: fit-content; 
    align-self: flex-start; 
    border-bottom-left-radius: 4px; 
    margin-bottom: 4px; 
  }
  .typing-dot { 
    width: 6px; 
    height: 6px; 
    background: var(--text-sec); 
    border-radius: 50%; 
    animation: typeBounce 1.4s infinite ease-in-out both; 
  }
  .typing-dot:nth-child(1) { animation-delay: -0.32s; }
  .typing-dot:nth-child(2) { animation-delay: -0.16s; }
  @keyframes typeBounce { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
  
  /* iOS Input */
  .premium-input { 
    flex: 1; 
    padding: 12px 16px; 
    border-radius: 24px; 
    background: var(--bg-main); 
    color: var(--text-main); 
    font-size: 16px; 
    border: 0.5px solid var(--border); 
    transition: 0.2s; 
  }
  .premium-input:focus { border-color: var(--aura-red); }
  
  /* iOS File Message */
  .file-message { display: flex; align-items: center; gap: 12px; padding: 8px; border-radius: 12px; background: rgba(0,0,0,0.1); transition: 0.2s; cursor: pointer; }
  .bubble-me .file-message { background: rgba(255,255,255,0.15); }
  .file-icon { width: 44px; height: 44px; border-radius: 50%; background: var(--aura-red); display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; }
  .file-name { font-size: 14px; font-weight: 500; word-break: break-word; }
  
  /* iOS Media */
  .circle-video { width: 200px; height: 200px; border-radius: 50%; overflow: hidden; background: #000; cursor: pointer; position: relative; } 
  .msg-image { max-width: 240px; border-radius: 16px; cursor: pointer; object-fit: cover; }   
  .voice-player { display: flex; align-items: center; gap: 12px; min-width: 180px; padding: 4px 0; }
  .voice-btn { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.15); transition: 0.2s; }
  .voice-progress { flex: 1; height: 3px; background: rgba(255,255,255,0.3); border-radius: 2px; position: relative; } 
  .voice-bar { height: 100%; border-radius: 2px; transition: width 0.1s linear; background: white; }
  
  .reply-preview { border-left: 3px solid var(--aura-red); padding: 6px 10px; margin-bottom: 6px; background: rgba(0,0,0,0.1); border-radius: 10px; font-size: 12px; }
  .edit-mode-bar { background: rgba(255,59,48,0.1); border-top: 0.5px solid var(--border); padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--aura-red); }
  
  /* iOS Call Overlay */
  .call-overlay { 
    position: fixed; 
    inset: 0; 
    background: #000000; 
    z-index: 150000; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    color: white; 
    transition: all 0.3s ease; 
  }
  
  .call-overlay.minimized { 
    inset: auto; 
    top: calc(50px + env(safe-area-inset-top)); 
    left: 16px; 
    right: 16px; 
    width: auto; 
    height: auto; 
    background: rgba(0,0,0,0.8); 
    backdrop-filter: blur(20px);
    border-radius: 40px;
    padding: 10px 16px;
    cursor: pointer;
  }
  
  .call-avatar-pulse { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid var(--aura-red); background: #111; }
  .call-avatar-wrapper.calling::before, .call-avatar-wrapper.calling::after { content: ''; position: absolute; inset: -8px; border-radius: 50%; border: 2px solid var(--aura-red); animation: ripple 2s infinite ease-out; }
  .call-avatar-wrapper.calling::after { animation-delay: 1s; }
  @keyframes ripple { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(1.8); opacity: 0; } }
  
  .call-bg-blob { 
    position: absolute; 
    width: 300px; 
    height: 300px; 
    background: radial-gradient(circle, rgba(255,59,48,0.3) 0%, rgba(0,0,0,0) 70%); 
    border-radius: 50%; 
    animation: pulseBlob 3s infinite alternate; 
    pointer-events: none; 
  }
  @keyframes pulseBlob { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(1.3); opacity: 0.8; } }
  
  .call-header-glass { 
    background: rgba(20,20,25,0.7); 
    backdrop-filter: blur(30px); 
    padding: 30px 40px; 
    border-radius: 48px; 
    border: 0.5px solid rgba(255,255,255,0.1); 
    text-align: center; 
    margin-bottom: 40px;
    animation: slideUp 0.4s ease;
  }
  
  .call-controls { 
    position: absolute; 
    bottom: calc(40px + env(safe-area-inset-bottom)); 
    left: 50%; 
    transform: translateX(-50%); 
    display: flex; 
    gap: 20px; 
    z-index: 20; 
    background: rgba(20,20,25,0.9); 
    padding: 12px 24px; 
    border-radius: 50px; 
    border: 0.5px solid rgba(255,255,255,0.1); 
    backdrop-filter: blur(20px); 
  }
  .btn-call { width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.15); transition: 0.2s; }
  .btn-call:active { transform: scale(0.92); }
  
  .device-wrapper { display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.5); padding: 6px 14px; border-radius: 24px; border: 0.5px solid rgba(255,255,255,0.1); }
  .call-device-select { background: transparent; color: white; padding: 2px; border: none; outline: none; font-size: 13px; max-width: 120px; }
  
  /* iOS Toast */
  .aura-toast { 
    position: fixed; 
    bottom: calc(20px + env(safe-area-inset-bottom)); 
    left: 16px; 
    right: 16px; 
    background: var(--bg-card); 
    backdrop-filter: blur(20px); 
    border: 0.5px solid var(--border); 
    border-radius: 20px; 
    padding: 12px 16px; 
    display: flex; 
    align-items: center; 
    gap: 12px; 
    z-index: 9999999; 
    box-shadow: 0 4px 20px rgba(0,0,0,0.2); 
    animation: toastSlide 0.4s cubic-bezier(0.34, 1.2, 0.64, 1); 
  }
  @keyframes toastSlide { 
    0% { transform: translateY(100px); opacity: 0; } 
    100% { transform: translateY(0); opacity: 1; } 
  }
  
  /* iOS Context Menu */
  .context-menu { 
    position: fixed; 
    background: var(--bg-card); 
    backdrop-filter: blur(20px); 
    border: 0.5px solid var(--border); 
    border-radius: 20px; 
    width: 220px; 
    overflow: hidden; 
    z-index: 5000; 
    animation: menuPop 0.2s ease; 
  }
  @keyframes menuPop { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
  .context-item { padding: 14px 18px; display: flex; align-items: center; gap: 12px; width: 100%; font-size: 15px; border-bottom: 0.5px solid var(--border); }
  .context-item:active { background: rgba(255,59,48,0.1); }
  
  .reactions-bar { display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
  .reaction-pill { background: rgba(0,0,0,0.15); padding: 4px 10px; border-radius: 20px; font-size: 13px; }
  .gallery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; padding: 0; }
  .gallery-img { width: 100%; aspect-ratio: 1; object-fit: cover; cursor: pointer; }
  .drag-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 300000; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 20px; backdrop-filter: blur(10px); }
  `;
};

// ==========================================
// КОМПОНЕНТЫ
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
        <img src={data.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${safeText(data.name)}`} style={{width:48, height:48, borderRadius:'50%'}} alt="av" />
        <div style={{flex:1, overflow:'hidden'}}>
          <b style={{display:'block', fontSize:15, color: 'var(--text-main)', marginBottom:2}}>{safeText(data.name)}</b>
          <p style={{fontSize:13, opacity:0.8, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{safeText(data.text)}</p>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onClose(); }}><X size={18} style={{opacity:0.5}} /></button>
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
        {!playing && <div style={{position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background: 'rgba(0,0,0,0.4)', zIndex:2}}><Play color="white" size={32} /></div>}
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
          {playing ? <Pause size={16} color="white" /> : <Play size={16} color="white" style={{marginLeft:2}} />}
        </button>
        <div className="voice-progress">
          <audio ref={audioRef} src={src} />
          <div className="voice-bar" style={{width:`${prog}%`, background: isMine ? 'white' : 'var(--aura-red)'}} />
        </div>
      </div>
  );
};

// ==========================================
// ГЛАВНЫЙ КОМПОНЕНТ (iOS адаптированный)
// ==========================================
function MainApp() {
  const [showUpdate, setShowUpdate] = useState({ active: false, message: '' });
  const [user, setUser] = useState(null);
  const [view, setView] = useState('chats');
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [callLogs, setCallLogs] = useState([]);
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
  const [uploadState, setUploadState] = useState({ active: false, progress: 0, fileName: '' });
  const uploadTaskRef = useRef(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const mediaRec = useRef(null);
  const audioChunks = useRef([]);
  const [timeTick, setTimeTick] = useState(0);
  const scrollRef = useRef();
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // iOS Notifications permission
  const [notificationPermission, setNotificationPermission] = useState('default');

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(perm => setNotificationPermission(perm));
    }
  }, []);

  const sendPushNotification = async (title, body, userId) => {
    if (notificationPermission !== 'granted') return;
    if (document.visibilityState === 'visible') return;

    try {
      const registration = await navigator.serviceWorker?.ready;
      if (registration) {
        await registration.showNotification(title, {
          body: body,
          icon: '/icon-192.png',
          badge: '/badge.png',
          vibrate: [200, 100, 200],
          data: { userId: userId }
        });
      } else {
        new Notification(title, { body: body, icon: '/icon-192.png' });
      }
    } catch (e) {
      console.log('Notification error:', e);
    }
  };

  // WebRTC Звонки с нативными уведомлениями
  const [callSession, setCallSession] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isCallMinimized, setIsCallMinimized] = useState(false);
  const [devices, setDevices] = useState({ audioIn: [], audioOut: [], videoIn: [] });
  const [selectedDevices, setSelectedDevices] = useState({ audioIn: '', audioOut: '', videoIn: '' });
  const [callState, setCallState] = useState({ micMuted: false, screenShare: false });
  const [remoteStreamConnected, setRemoteStreamConnected] = useState(false);
  const pcRef = useRef(null);
  const localStream = useRef(null);
  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);
  const ringtoneAudio = useRef(null);

  // Инициализация
  useEffect(() => {
    ringtoneAudio.current = new Audio(RINGTONE_SOUND);
    ringtoneAudio.current.loop = true;
    const tickInterval = setInterval(() => setTimeTick(t => t + 1), 20000);

    onAuthStateChanged(auth, async u => {
      if (!u) await signInAnonymously(auth);
      const cachedCreds = JSON.parse(localStorage.getItem('aura_creds') || '{}');
      if (cachedCreds.username) {
        try {
          const snap = await getDoc(doc(db, 'artifacts', appId, 'public', 'data', 'users', cachedCreds.username));
          if (snap.exists()) setUser(snap.data());
        } catch (e) {}
      }
    });

    const pingPresence = () => {
      const creds = JSON.parse(localStorage.getItem('aura_creds') || '{}');
      if (!creds.username) return;
      if (document.visibilityState === 'visible') {
        if (creds.showLastSeen === false) return;
        updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'users', creds.username), {
          status: 'online',
          lastActiveTS: Date.now()
        }).catch(()=>{});
      }
    };

    const handleVisibility = () => {
      const creds = JSON.parse(localStorage.getItem('aura_creds') || '{}');
      if (!creds.username) return;
      if (document.visibilityState === 'hidden') {
        updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'users', creds.username), {
          status: Date.now(),
          lastActiveTS: Date.now()
        }).catch(()=>{});
      } else {
        pingPresence();
      }
    };

    pingPresence();
    const pingInterval = setInterval(pingPresence, 20000);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('pagehide', handleVisibility);

    const unsubUpdate = onSnapshot(doc(db, 'artifacts', appId, 'public', 'data', 'system', 'config'), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data.forceUpdate === true || data.version > 1) {
          setShowUpdate({ active: true, message: data.message || 'Доступно обновление' });
        }
      }
    }, (error) => console.error(error));

    return () => {
      clearInterval(pingInterval);
      clearInterval(tickInterval);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pagehide', handleVisibility);
      unsubUpdate();
    };
  }, []);

  // Подписки
  useEffect(() => {
    if (!auth.currentUser || !user?.username) return;
    try {
      const cachedMsgs = localStorage.getItem('aura_msgs_cache');
      if (cachedMsgs) setMessages(JSON.parse(cachedMsgs));
    } catch(e){}

    const unsubU = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'users'), s => {
      setAllUsers(s.docs.map(d => d.data()));
    });

    const unsubM = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), s => {
      const newMsgs = s.docs.map(d => ({id: d.id, ...d.data()})).sort((a,b) => a.ts - b.ts);
      localStorage.setItem('aura_msgs_cache', JSON.stringify(newMsgs.slice(-150)));
      if (messages.length > 0 && newMsgs.length > messages.length) {
        const last = newMsgs[newMsgs.length - 1];
        if (last.uid !== user.username && (!selectedPeer || selectedPeer.username !== last.uid)) {
          let txt = last.type === 'text' ? last.text : last.type === 'image' ? '📷 Фото' : last.type === 'file' ? '📁 Файл' : '🎤 Медиа';
          setToast({ name: last.name, text: txt, avatar: allUsers.find(u => u.username === last.uid)?.avatar, uid: last.uid });
          sendPushNotification(last.name, txt, last.uid);
        }
      }
      setMessages(newMsgs);
    });

    const unsubL = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'calls'), s => {
      const logs = s.docs.map(d => ({id: d.id, ...d.data()}))
          .filter(c => c.caller === user.username || c.callee === user.username)
          .sort((a,b) => b.ts - a.ts);
      setCallLogs(logs);
    });

    const q = query(collection(db, 'artifacts', appId, 'public', 'data', 'calls'), where('callee', '==', user.username), where('status', '==', 'calling'));
    const unsubC = onSnapshot(q, s => {
      s.docChanges().forEach(change => {
        if (change.type === 'added') {
          const data = change.doc.data();
          const peer = allUsers.find(u => u.username === data.caller) || { name: data.caller };
          setCallSession({ id: change.doc.id, ...data, peer: peer, isInitiator: false });
          getMediaDevices();
          setRemoteStreamConnected(false);
          setIsCallMinimized(false);
          if(ringtoneAudio.current) ringtoneAudio.current.play().catch(()=>{});
          sendPushNotification("Входящий вызов Aura", `Звонит ${peer.name}`, data.caller);
        }
      });
    });

    return () => { unsubU(); unsubM(); unsubC(); unsubL(); };
  }, [user?.username, selectedPeer?.username, messages.length]);

  const peerIsTyping = selectedPeer && selectedPeer.username !== 'global' &&
      allUsers.find(u => u.username === selectedPeer.username)?.typingTo === user?.username;

  useEffect(() => {
    if (!user || !selectedPeer || messages.length === 0) return;
    const unread = messages.filter(m => m.to === user.username && m.uid === selectedPeer.username && !m.read);
    if (unread.length > 0) {
      unread.forEach(m => { updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'messages', m.id), { read: true }).catch(()=>{}); });
    }
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [messages, selectedPeer, user, isUploading, isRecording, peerIsTyping]);

  useEffect(() => {
    let interval;
    if (callSession && callSession.status === 'active') {
      interval = setInterval(() => setCallDuration(p => p + 1), 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [callSession?.status]);

  useEffect(() => {
    if (remoteVideoRef.current && selectedDevices.audioOut) {
      if (typeof remoteVideoRef.current.setSinkId === 'function') {
        remoteVideoRef.current.setSinkId(selectedDevices.audioOut).catch(err => {});
      }
    }
  }, [selectedDevices.audioOut, callSession?.status]);

  const getMediaDevices = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
      const devs = await navigator.mediaDevices.enumerateDevices();
      setDevices({
        audioIn: devs.filter(d => d.kind === 'audioinput') || [],
        audioOut: devs.filter(d => d.kind === 'audiooutput') || [],
        videoIn: devs.filter(d => d.kind === 'videoinput') || []
      });
      if(devs.length) {
        setSelectedDevices({
          audioIn: devs.find(d => d.kind === 'audioinput')?.deviceId || '',
          audioOut: devs.find(d => d.kind === 'audiooutput')?.deviceId || '',
          videoIn: devs.find(d => d.kind === 'videoinput')?.deviceId || ''
        });
      }
    } catch (e) {}
  };

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
        if (snap.exists() && snap.data().password === password) { setUser(snap.data()); }
        else return setErrorMsg("Неверный логин или пароль");
      }
      localStorage.setItem('aura_creds', JSON.stringify({username: safeU, password, showLastSeen: true}));
      updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'users', safeU), { status: 'online', lastActiveTS: Date.now() }).catch(()=>{});
    } catch (e) {
      setErrorMsg("Ошибка сервера");
    }
  };

  const cancelUpload = () => {
    if (uploadTaskRef.current) {
      uploadTaskRef.current.abort();
      uploadTaskRef.current = null;
    }
    setUploadState({ active: false, progress: 0, fileName: '' });
    setIsUploading(false);
  };

  async function uploadToSupabase(file) {
    setUploadState({ active: true, progress: 15, fileName: file.name || 'Медиафайл' });
    const fileName = `${Date.now()}_${file.name || 'media.webm'}`;
    setUploadState({ active: true, progress: 45, fileName: file.name || 'Медиафайл' });

    const response = await fetch(`https://fghqfzjphljuosmqzste.supabase.co/storage/v1/object/files/${fileName}`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sb_publishable_VddqU4_ZwSDcaPVvXh4zWA_rc-dHSnq',
        'apikey': 'sb_publishable_VddqU4_ZwSDcaPVvXh4zWA_rc-dHSnq',
        'Content-Type': file.type || 'application/octet-stream'
      },
      body: file
    });

    if (!response.ok) {
      throw new Error('Ошибка загрузки');
    }

    setUploadState({ active: true, progress: 85, fileName: file.name || 'Медиафайл' });
    const publicUrl = `https://fghqfzjphljuosmqzste.supabase.co/storage/v1/object/public/files/${fileName}`;
    setUploadState({ active: true, progress: 100, fileName: file.name || 'Медиафайл' });
    return publicUrl;
  }

  const handleDownload = async (e, url, fileName) => {
    e.stopPropagation();
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = blobUrl;
      a.download = fileName || 'download';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.open(url, '_blank');
    }
  };

  const handleTyping = (e) => {
    setInput(e.target.value);
    if (selectedPeer && selectedPeer.username !== 'global' && user) {
      updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'users', user.username), { typingTo: selectedPeer.username }).catch(()=>{});
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'users', user.username), { typingTo: null }).catch(()=>{});
      }, 1500);
    }
  };

  const sendMessage = async (val = input, type = 'text', blobData = null, ext = '', fileName = '') => {
    if (previewFile) {
      const fileToUpload = previewFile;
      setPreviewFile(null);
      if (input.trim()) {
        const targetPeer = selectedPeer ? selectedPeer.username : 'global';
        await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
          text: input, fileName: '', uid: user.username, to: targetPeer, ts: Date.now(),
          name: user.name || 'User', type: 'text', read: false, replyTo: replyTo ? { text: replyTo.text, name: replyTo.name } : null, reactions: {}
        });
        setInput('');
      }
      setIsUploading(true);
      try {
        if (fileToUpload.type.startsWith('image/')) {
          const compressedBase64 = await compressImage(fileToUpload);
          await sendMediaMessage(compressedBase64, 'image', fileToUpload.name);
        } else {
          const url = await uploadToSupabase(fileToUpload);
          if (url) {
            const targetPeer = selectedPeer ? selectedPeer.username : 'global';
            await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
              text: url, fileName: fileToUpload.name, uid: user.username, to: targetPeer, ts: Date.now(),
              name: user.name || 'User', type: 'file', read: false, replyTo: replyTo ? { text: replyTo.text, name: replyTo.name } : null, reactions: {}
            });
          }
        }
      } catch(e) {
        if (e.code !== 'storage/canceled') {
          console.error("Upload error:", e);
          alert("Ошибка загрузки файла");
        }
      } finally {
        setIsUploading(false);
        setUploadState({ active: false, progress: 0, fileName: '' });
        uploadTaskRef.current = null;
      }
      setReplyTo(null);
      return;
    }

    if (type === 'text' && (!val || typeof val !== 'string' || !val.trim())) return;

    if (editingMsg && type === 'text') {
      await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'messages', editingMsg.id), { text: val, edited: true });
      setEditingMsg(null); setInput(''); return;
    }

    try {
      let finalVal = val;
      const targetPeer = selectedPeer ? selectedPeer.username : 'global';
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
        text: finalVal, fileName: fileName || '', uid: user.username, to: targetPeer, ts: Date.now(),
        name: user.name || 'User', type, read: false, replyTo: replyTo ? { text: replyTo.text, name: replyTo.name } : null, reactions: {}
      });
      setInput(''); setReplyTo(null); setIsRecording(null);

      if (selectedPeer && selectedPeer.username !== 'global') {
        updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'users', user.username), { typingTo: null }).catch(()=>{});
        clearTimeout(typingTimeoutRef.current);
      }
    } catch (err) {
      if (err.code !== 'storage/canceled') console.error("Ошибка sendMessage:", err);
      setIsUploading(false);
      setUploadState({ active: false, progress: 0, fileName: '' });
      uploadTaskRef.current = null;
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); if(selectedPeer) setIsDraggingFile(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDraggingFile(false); };
  const handleDrop = async (e) => {
    e.preventDefault(); setIsDraggingFile(false);
    if (!selectedPeer) return;
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setPreviewFile(file);
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewFile(file);
    e.target.value = '';
  };
  const sendMediaMessage = async (urlOrBase64, type, fileName = '') => {
    const targetPeer = selectedPeer ? selectedPeer.username : 'global';
    await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
      text: urlOrBase64, fileName: fileName, uid: user.username, to: targetPeer, ts: Date.now(),
      name: user.name || 'User', type, read: false, replyTo: replyTo ? { text: replyTo.text, name: replyTo.name } : null, reactions: {}
    });
    setReplyTo(null);
  };

  const startMediaRecording = async (type) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: type === 'video' });
      mediaRec.current = new MediaRecorder(stream, { mimeType: type === 'video' ? 'video/webm;codecs=vp8' : 'audio/webm;codecs=opus' });
      audioChunks.current = [];
      mediaRec.current.ondataavailable = e => { if(e.data.size > 0) audioChunks.current.push(e.data); };
      mediaRec.current.onstop = async () => {
        const blob = new Blob(audioChunks.current, { type: type === 'video' ? 'video/webm' : 'audio/webm' });
        stream.getTracks().forEach(t => t.stop());
        setIsUploading(true);
        try {
          const file = new File([blob], type === 'video' ? 'video_message.webm' : 'voice_message.webm', { type: blob.type });
          const url = await uploadToSupabase(file);
          await sendMediaMessage(url, type === 'video' ? 'video_circle' : 'voice');
        } catch (e) {
          if (e.code !== 'storage/canceled') {
            console.error("Media upload error", e);
            alert("Ошибка отправки медиафайла");
          }
        } finally {
          setIsUploading(false);
        }
      };
      mediaRec.current.start();
      setIsRecording(type); setRecTime(0);
      const timer = setInterval(() => { setRecTime(p => p + 1); }, 1000);
      mediaRec.current.timer = timer;
    } catch (e) {}
  };
  const stopMediaRecording = (cancel = false) => {
    if (!mediaRec.current || mediaRec.current.state === 'inactive') { setIsRecording(null); return; }
    if (cancel) mediaRec.current.onstop = null;
    mediaRec.current.stop();
    clearInterval(mediaRec.current.timer);
    setIsRecording(null);
  };

  const checkIsOnline = (uData) => {
    if (!uData || uData.showLastSeen === false) return false;
    if (uData.status === 'online') {
      if (uData.lastActiveTS && (Date.now() - uData.lastActiveTS > 45000)) return false;
      return true;
    }
    return false;
  };
  const formatLastSeen = (uData) => {
    if (!uData || uData.showLastSeen === false) return 'был(а) недавно';
    if (checkIsOnline(uData)) return 'в сети';
    const offlineTime = (typeof uData.status === 'number') ? uData.status : (uData.lastActiveTS || Date.now());
    const diff = Math.floor((Date.now() - offlineTime) / 60000);
    if (diff < 1) return 'только что';
    if (diff < 60) return `${diff} мин. назад`;
    if (diff < 1440) return `${Math.floor(diff/60)} ч. назад`;
    return 'давно';
  };

  // WebRTC
  const startCall = async (type, targetPeer = selectedPeer) => {
    if (!targetPeer) return;
    await getMediaDevices();
    const callId = user.username + '_' + Date.now();
    setCallSession({ id: callId, status: 'calling', peer: targetPeer, type, isInitiator: true });
    setRemoteStreamConnected(false);
    setIsCallMinimized(false);
    try {
      const peerConnection = new RTCPeerConnection(RTC_SERVERS);
      pcRef.current = peerConnection;
      const constraints = { audio: selectedDevices.audioIn ? { deviceId: { exact: selectedDevices.audioIn } } : true, video: type === 'video' };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      localStream.current = stream;
      setTimeout(() => { if(localVideoRef.current) localVideoRef.current.srcObject = stream; }, 100);
      stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
      peerConnection.ontrack = event => { if (remoteVideoRef.current) { remoteVideoRef.current.srcObject = event.streams[0]; setRemoteStreamConnected(true); } };
      const callDoc = doc(db, 'artifacts', appId, 'public', 'data', 'calls', callId);
      const callerCandidatesCollection = collection(callDoc, 'callerCandidates');
      const calleeCandidatesCollection = collection(callDoc, 'calleeCandidates');
      peerConnection.onicecandidate = event => { if (event.candidate) addDoc(callerCandidatesCollection, event.candidate.toJSON()); };
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      await setDoc(callDoc, { caller: user.username, callee: targetPeer.username, status: 'calling', type, ts: Date.now(), offer: { type: offer.type, sdp: offer.sdp } });
      onSnapshot(callDoc, snapshot => {
        const data = snapshot.data();
        if (!data) return;
        if (data.status === 'ended' || data.status === 'rejected') { endCall(false); return; }
        if (data.answer && !peerConnection.currentRemoteDescription) { peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer)).catch(()=>{}); setCallSession(prev => ({ ...prev, status: 'active' })); }
      });
      onSnapshot(calleeCandidatesCollection, snapshot => { snapshot.docChanges().forEach(change => { if (change.type === 'added') peerConnection.addIceCandidate(new RTCIceCandidate(change.doc.data())).catch(()=>{}); }); });
    } catch (e) { endCall(true); }
  };

  const acceptCall = async () => {
    if (ringtoneAudio.current) { ringtoneAudio.current.pause(); ringtoneAudio.current.currentTime = 0; }
    setCallSession(prev => ({ ...prev, status: 'active' }));
    setRemoteStreamConnected(false);
    setIsCallMinimized(false);
    try {
      const peerConnection = new RTCPeerConnection(RTC_SERVERS);
      pcRef.current = peerConnection;
      const constraints = { audio: selectedDevices.audioIn ? { deviceId: { exact: selectedDevices.audioIn } } : true, video: callSession.type === 'video' };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      localStream.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
      peerConnection.ontrack = event => { if (remoteVideoRef.current) { remoteVideoRef.current.srcObject = event.streams[0]; setRemoteStreamConnected(true); } };
      const callDoc = doc(db, 'artifacts', appId, 'public', 'data', 'calls', callSession.id);
      const callerCandidatesCollection = collection(callDoc, 'callerCandidates');
      const calleeCandidatesCollection = collection(callDoc, 'calleeCandidates');
      peerConnection.onicecandidate = event => { if (event.candidate) addDoc(calleeCandidatesCollection, event.candidate.toJSON()); };
      const callData = (await getDoc(callDoc)).data();
      await peerConnection.setRemoteDescription(new RTCSessionDescription(callData.offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      await updateDoc(callDoc, { status: 'active', answer: { type: answer.type, sdp: answer.sdp } });
      onSnapshot(callDoc, snapshot => { if (snapshot.data()?.status === 'ended' || snapshot.data()?.status === 'rejected') endCall(false); });
      onSnapshot(callerCandidatesCollection, snapshot => { snapshot.docChanges().forEach(change => { if (change.type === 'added') peerConnection.addIceCandidate(new RTCIceCandidate(change.doc.data())).catch(()=>{}); }); });
    } catch (e) { endCall(true); }
  };

  const endCall = async (updateDb = true) => {
    if (ringtoneAudio.current) { ringtoneAudio.current.pause(); ringtoneAudio.current.currentTime = 0; }
    if (localStream.current) localStream.current.getTracks().forEach(t => t.stop());
    if (pcRef.current) pcRef.current.close();
    if (updateDb && callSession?.id) {
      const newStatus = callSession.status === 'calling' && !callSession.isInitiator ? 'rejected' : 'ended';
      await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'calls', callSession.id), { status: newStatus }).catch(()=>{});
    }
    setCallSession(null); setRemoteStreamConnected(false); setCallDuration(0); setIsCallMinimized(false);
  };

  const toggleMic = () => {
    if (localStream.current) {
      const audioTrack = localStream.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setCallState(prev => ({ ...prev, micMuted: !audioTrack.enabled }));
      }
    }
  };

  const toggleScreenShare = async () => {
    try {
      if (!callState.screenShare) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        if (localVideoRef.current) localVideoRef.current.srcObject = screenStream;
        const videoTrack = screenStream.getVideoTracks()[0];
        const sender = pcRef.current.getSenders().find(s => s.track?.kind === 'video');
        if (sender) sender.replaceTrack(videoTrack);
        setCallState(prev => ({ ...prev, screenShare: true }));
        videoTrack.onended = async () => {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          const vTrack = stream.getVideoTracks()[0];
          if (sender) sender.replaceTrack(vTrack);
          if (localVideoRef.current) localVideoRef.current.srcObject = stream;
          setCallState(prev => ({ ...prev, screenShare: false }));
        };
      } else {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        const videoTrack = stream.getVideoTracks()[0];
        const sender = pcRef.current.getSenders().find(s => s.track?.kind === 'video');
        if (sender) sender.replaceTrack(videoTrack);
        setCallState(prev => ({ ...prev, screenShare: false }));
      }
    } catch (e) {
      console.error(e);
    }
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

  if (!user) return (
      <div className="aura-viewport"><style>{getAuraStyles(theme)}</style><div className="auth-overlay"><div className="auth-card">
        <div className="logo-box"><Zap size={45} color="white" fill="white" /></div>
        <h1 style={{color:'white', fontSize:38, fontWeight:900, marginBottom:8}}>AURA</h1>
        <p style={{color:'#777', fontSize:15, marginBottom:40}}>Безопасность. Стиль. Будущее.</p>
        <div style={{width:'100%'}}>
          <input className="premium-input" placeholder="Логин" value={formData.username} onChange={e=>setFormData({...formData, username:e.target.value})} style={{marginBottom:12}} />
          <input className="premium-input" type="password" placeholder="Пароль" value={formData.password} onChange={e=>setFormData({...formData, password:e.target.value})} style={{marginBottom:12}} />
          {authStep === 'reg' && <input className="premium-input" placeholder="Отображаемое имя" value={formData.name} onChange={e=>setFormData({...formData, name:e.target.value})} style={{marginBottom:12}} />}
          {errorMsg && <p style={{color:'var(--aura-red)', marginBottom:12, fontSize:14}}>{errorMsg}</p>}
          <button className="btn-aura-action" onClick={handleAuth}>{authStep === 'login' ? 'ВОЙТИ В СИСТЕМУ' : 'СОЗДАТЬ АККАУНТ'}</button>
          <button onClick={()=>{setAuthStep(authStep==='login'?'reg':'login'); setErrorMsg("")}} style={{marginTop:20, color:'var(--aura-red)', fontWeight:800, fontSize:14}}>{authStep === 'login' ? 'У меня ещё нет аккаунта' : 'Уже есть аккаунт? Войти'}</button>
        </div></div></div></div>
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
      <div className="aura-viewport" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
        <style>{getAuraStyles(theme)}</style>
        {isDraggingFile && (<div className="drag-overlay"><Download size={60} color="var(--aura-red)" /><h2 style={{fontSize: 24, fontWeight: 700}}>Отпустите файл для отправки</h2></div>)}
        <div className="app-container">
          <div className={`sidebar ${selectedPeer && (view === 'chats' || view === 'calls') ? 'hide' : ''}`}>
            <div className="nav-bar">
              <div style={{display:'flex', alignItems:'center', gap:12}}><Zap size={28} color="var(--aura-red)" fill="var(--aura-red)" /><h2 style={{fontWeight:900, fontSize:24}}>Aura</h2></div>
              <Bell size={20} color="var(--aura-red)" style={{cursor:'pointer'}} />
            </div>
            {view === 'chats' && (
                <div style={{flex:1, display:'flex', flexDirection:'column', overflow:'hidden'}}>
                  <div style={{padding:16}}><div className="premium-input" style={{display:'flex', alignItems:'center', gap:10, padding:'10px 16px', borderRadius: 16}}><Search size={18} color="#8E8E93" /><input style={{width:'100%'}} placeholder="Поиск в Aura..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} /></div></div>
                  <div style={{flex:1, overflowY:'auto'}}>
                    <button className={`list-item ${selectedPeer?.username === 'global' ? 'active' : ''}`} onClick={() => setSelectedPeer({username:'global', name:'Общий чат', avatar:''})}><div style={{width:48, height:48, borderRadius:16, background:'var(--aura-red)', display:'flex', alignItems:'center', justifyContent:'center', marginRight:16, flexShrink:0}}><Globe size={24} color="white" /></div><div style={{flex:1}}><b>Общий чат</b><p style={{fontSize:13, opacity:0.6, margin:0}}>Весь мир Aura</p></div></button>
                    {sortedUsers.map(u => {
                      const unreadCount = messages.filter(m => m.uid === u.username && m.to === user.username && !m.read).length;
                      return (
                          <button key={u.username} className={`list-item ${selectedPeer?.username === u.username ? 'active' : ''} ${user.pinnedChats?.includes(u.username)?'pinned':''}`} onClick={() => setSelectedPeer(u)} onContextMenu={(e)=>{ e.preventDefault(); setContextMenu({type:'user', item:u, rect:e.currentTarget.getBoundingClientRect()}); }}>
                            <div style={{position:'relative'}}><img src={safeText(u.avatar)} className="avatar" alt="av" />{checkIsOnline(u) && <div className="status-dot" />}</div>
                            <div style={{flex:1, overflow:'hidden', display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 12}}><div style={{display:'flex', justifyContent:'space-between', alignItems: 'center'}}><b style={{fontSize:15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-main)'}}>{safeText(u.name)}</b><div style={{display: 'flex', alignItems: 'center', gap: 6}}>{unreadCount > 0 && <span style={{background:'#34C759', color:'white', padding:'2px 7px', borderRadius:10, fontSize:11, fontWeight:800}}>{unreadCount}</span>}{user.pinnedChats?.includes(u.username) && <Pin size={12} color="var(--text-sec)" />}</div></div><p style={{fontSize:13, color: checkIsOnline(u) ? '#34C759' : 'var(--text-sec)', margin:0}}>{formatLastSeen(u)}</p></div>
                          </button>
                      );
                    })}
                  </div>
                </div>
            )}
            {view === 'calls' && (
                <div style={{flex:1, overflowY:'auto', padding: 20}}>
                  <h3 style={{fontSize: 13, textTransform: 'uppercase', color: 'var(--text-sec)', marginBottom: 20, letterSpacing: 1}}>История звонков</h3>
                  {callLogs.length === 0 ? (
                      <div style={{textAlign: 'center', marginTop: 100, opacity: 0.3}}><Phone size={60} style={{margin: '0 auto 15px'}} /><p>Нет звонков</p></div>
                  ) : callLogs.map(log => {
                    const isIncoming = log.callee === user.username;
                    const peerName = isIncoming ? log.caller : log.callee;
                    const peerData = allUsers.find(u => u.username === peerName);
                    const isMissed = log.status === 'calling' || log.status === 'rejected' || (log.status === 'ended' && !log.answer);
                    return (
                        <div key={log.id} style={{display: 'flex', alignItems: 'center', gap: 15, marginBottom: 20}}>
                          <div style={{width: 44, height: 44, borderRadius: '50%', background: isMissed ? 'rgba(255,59,48,0.15)' : 'rgba(52,199,89,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{isIncoming ? <PhoneIncoming size={20} color={isMissed ? '#FF3B30' : '#34C759'}/> : <PhoneForwarded size={20} color={isMissed ? '#FF3B30' : '#34C759'}/>}</div>
                          <div style={{flex: 1, overflow: 'hidden'}}><div style={{fontSize: 16, fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{peerData ? safeText(peerData.name) : peerName}</div><div style={{fontSize: 13, color: 'var(--text-sec)', marginTop: 2}}>{log.ts ? new Date(log.ts).toLocaleString() : 'Неизвестно'}</div></div>
                          <button onClick={() => { const p = peerData || {username: peerName, name: peerName, avatar: ''}; setSelectedPeer(p); setView('chats'); }} style={{width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><MessageCircle size={16} color="var(--aura-red)" /></button>
                          <button onClick={() => { const p = peerData || {username: peerName, name: peerName, avatar: ''}; setSelectedPeer(p); setView('chats'); startCall(log.type || 'voice', p); }} style={{width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><PhoneCall size={16} color="var(--aura-red)" /></button>
                        </div>
                    );
                  })}
                </div>
            )}

            {showUpdate.active && (
                <div onClick={async () => {
                  if (window.__TAURI__) {
                    try {
                      const { checkUpdate, installUpdate } = window.__TAURI__.updater;
                      const { relaunch } = window.__TAURI__.process;
                      const update = await checkUpdate();
                      if (update.shouldUpdate) {
                        await installUpdate();
                        await relaunch();
                      }
                    } catch (e) {
                      alert("Ошибка обновления");
                    }
                  } else {
                    alert("Автообновление доступно только в нативной версии");
                  }
                }} style={{ background: 'var(--aura-red)', color: 'white', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                  <Download size={18} color="white" />
                  <div style={{flex:1}}><b>Обновление Aura</b><span style={{fontSize: 12, opacity: 0.85, display:'block'}}>{showUpdate.message || 'Нажмите для установки'}</span></div>
                </div>
            )}

            <div className="tab-bar">
              <button className={`tab-btn ${view==='chats'?'active':''}`} onClick={()=>{setView('chats'); setSelectedPeer(null);}}><MessageCircle size={24}/>Чаты</button>
              <button className={`tab-btn ${view==='calls'?'active':''}`} onClick={()=>{setView('calls'); setSelectedPeer(null);}}><Phone size={24}/>Звонки</button>
              <button className={`tab-btn ${view==='settings'?'active':''}`} onClick={()=>setView('settings')}><Settings size={24}/>Настройки</button>
            </div>
          </div>

          {(view === 'chats' || view === 'calls') && (
              <div className={`main-stage ${!selectedPeer ? 'hide' : ''}`}>
                {selectedPeer ? (
                    <div className="chat-wrapper">
                      <div className="nav-bar">
                        <div style={{display:'flex', alignItems:'center', gap:12}}>
                          <button onClick={()=>setSelectedPeer(null)} style={{color:'var(--aura-red)', padding:8}}><ChevronLeft size={28}/></button>
                          <img src={safeText(selectedPeer.avatar) || `https://api.dicebear.com/7.x/initials/svg?seed=${selectedPeer.username}`} className="avatar" style={{width:44, height:44, marginRight:0}} alt="p" />
                          <div><b style={{fontSize:17}}>{safeText(selectedPeer.name)}</b><span style={{fontSize:12, color: checkIsOnline(allUsers.find(u=>u.username===selectedPeer.username)) ? '#34C759' : 'var(--text-sec)'}}>{formatLastSeen(allUsers.find(u=>u.username===selectedPeer.username))}</span></div>
                        </div>
                        <div style={{display:'flex', gap:16}}>
                          <button onClick={()=>startCall('voice')}><Phone size={22} color="var(--aura-red)"/></button>
                          <button onClick={()=>startCall('video')}><Video size={24} color="var(--aura-red)"/></button>
                          <button onClick={()=>setShowMediaGallery(!showMediaGallery)}><Info size={22} color="var(--aura-red)"/></button>
                        </div>
                      </div>

                      {pinnedMsg && (
                          <button className="pinned-msg-bar" onClick={()=>scrollRef.current?.scrollTo(0,0)} style={{background:'var(--bg-card)', padding:'8px 16px', borderBottom:'0.5px solid var(--border)', display:'flex', alignItems:'center', gap:8}}>
                            <Pin size={14} color="var(--aura-red)" />
                            <div style={{flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontSize:13}}>{safeText(pinnedMsg.text)}</div>
                            <X size={14} onClick={(e)=>{ e.stopPropagation(); updateDoc(doc(db,'artifacts',appId,'public','data','messages',pinnedMsg.id), {isPinned: false}); }} />
                          </button>
                      )}

                      <div ref={scrollRef} className="chat-scroll">
                        <div style={{flex:1}} />
                        {chatMessages.filter(m => !(m.hiddenFor || []).includes(user.username)).map(m => (
                            <div key={m.id} className={`bubble ${m.uid===user.username?'bubble-me':'bubble-other'}`} onContextMenu={(e)=>{ e.preventDefault(); setContextMenu({type:'msg', id:m.id, rect:e.currentTarget.getBoundingClientRect(), item:m}); }}>
                              {m.uid !== user.username && selectedPeer.username === 'global' && <div style={{fontSize:11, fontWeight:800, marginBottom:4, color:'var(--aura-red)'}}>{safeText(m.name)}</div>}
                              {m.replyTo && <div className="reply-preview">Ответ: {safeText(m.replyTo.text)}</div>}
                              {m.type === 'video_circle' ? <VideoCirclePlayer msg={m} /> : m.type === 'voice' ? <VoicePlayer src={m.text} isMine={m.uid===user.username} /> : m.type === 'image' ? <img src={m.text} className="msg-image" onClick={()=> window.open(m.text,'_blank')} alt="img" /> : m.type === 'file' ? <div className="file-message" onClick={(e) => handleDownload(e, m.text, m.fileName)}><div className="file-icon"><FileIcon size={20}/></div><div className="file-name">{safeText(m.fileName || 'Файл')}</div><Download size={16} style={{marginLeft: 'auto', opacity: 0.7}} /></div> : <div style={{wordBreak: 'break-word'}}>{safeText(m.text)} {m.edited && <span style={{fontSize:10, opacity:0.5}}>(изм.)</span>}</div>}
                              <div style={{fontSize:10, opacity:0.6, textAlign:'right', marginTop:6}}>
                                {new Date(m.ts).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                                {m.uid===user.username && (m.read ? <CheckCheck size={14} color="#34C759" style={{marginLeft:4, verticalAlign:'middle'}} /> : <Check size={14} style={{marginLeft:4, verticalAlign:'middle'}} />)}
                              </div>
                              {m.reactions && Object.keys(m.reactions).length > 0 && (<div className="reactions-bar">{Object.values(m.reactions).filter(v=>v).map((v, i) => <span key={i} className="reaction-pill">{safeReaction(v)}</span>)}</div>)}
                            </div>
                        ))}

                        {peerIsTyping && (
                            <div className="typing-indicator">
                              <div className="typing-dot" />
                              <div className="typing-dot" />
                              <div className="typing-dot" />
                            </div>
                        )}

                        <div ref={messagesEndRef} style={{ height: 1 }} />
                      </div>

                      {replyTo && <div className="edit-mode-bar"><span>Ответ: {safeText(replyTo.text).substring(0,30)}...</span><button onClick={()=>setReplyTo(null)}><X size={16}/></button></div>}
                      {editingMsg && <div className="edit-mode-bar"><span>Редактирование...</span><button onClick={()=>setEditingMsg(null)}><X size={16}/></button></div>}

                      {previewFile && !isUploading && (
                          <div className="edit-mode-bar" style={{background: 'var(--bg-card)', margin: '0 16px', borderRadius: 16, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12}}>
                            <div style={{width: 40, height: 40, borderRadius: 8, background: 'var(--aura-red)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><FileIcon size={20} color="white" /></div>
                            <div style={{flex:1}}><div style={{fontSize: 13, fontWeight: 600}}>{previewFile.name}</div><div style={{fontSize: 11, color: 'var(--text-sec)'}}>{(previewFile.size / 1024 / 1024).toFixed(2)} MB</div></div>
                            <button onClick={() => setPreviewFile(null)}><X size={16} /></button>
                          </div>
                      )}

                      <div className="chat-input-wrapper">
                        {isUploading && uploadState.active ? (
                            <div style={{display:'flex', alignItems:'center', gap: 12, flex: 1}}>
                              <div style={{position: 'relative', width: 40, height: 40}}>
                                <svg width="40" height="40" viewBox="0 0 40 40" style={{transform: 'rotate(-90deg)'}}>
                                  <circle cx="20" cy="20" r="18" fill="none" stroke="var(--border)" strokeWidth="3" />
                                  <circle cx="20" cy="20" r="18" fill="none" stroke="var(--aura-red)" strokeWidth="3" strokeDasharray="113.097" strokeDashoffset={113.097 - (113.097 * uploadState.progress / 100)} strokeLinecap="round" />
                                </svg>
                                <button onClick={cancelUpload} style={{position: 'absolute', inset: 0, margin: 'auto', width: 24, height: 24, background: 'var(--bg-card)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><X size={12} /></button>
                              </div>
                              <div style={{flex:1}}><span style={{fontSize: 13}}>{uploadState.fileName}</span><span style={{fontSize: 11, display:'block', color: 'var(--text-sec)'}}>Загрузка... {Math.round(uploadState.progress)}%</span></div>
                            </div>
                        ) : isUploading ? (
                            <div style={{display: 'flex', justifyContent: 'center', width: '100%', padding: 12}}><RefreshCw color="var(--aura-red)" size={24} style={{animation: 'spin 1s linear infinite'}} /></div>
                        ) : (
                            <>
                              <button onClick={()=>{ document.getElementById('photo-upload').click(); }}><Paperclip size={24} color="var(--aura-red)" /></button>
                              <input type="file" id="photo-upload" accept="*/*" style={{display:'none'}} onChange={handleFileUpload} />
                              <input className="premium-input" value={input} onChange={handleTyping} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder={previewFile ? "Подпись..." : "Сообщение"} />
                              {input.trim() || editingMsg || previewFile ?
                                  <button onClick={()=>sendMessage()}><Send size={24} color="var(--aura-red)"/></button>
                                  :
                                  <div style={{display:'flex', gap:16}}>
                                    <button onClick={()=>startMediaRecording('video')}><Camera size={24} color="var(--aura-red)"/></button>
                                    <button onClick={()=>startMediaRecording('voice')}><Mic size={24} color="var(--aura-red)"/></button>
                                  </div>
                              }
                            </>
                        )}
                      </div>
                    </div>
                ) : (
                    <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', opacity:0.3}}><Zap size={200} fill="currentColor" /><h1 style={{fontSize:48, fontWeight:900}}>AURA</h1></div>
                )}

                {showMediaGallery && selectedPeer && (
                    <div className="media-panel">
                      <div className="nav-bar"><b>Медиа</b><button onClick={()=>setShowMediaGallery(false)}><X size={20} /></button></div>
                      <div style={{display:'flex', padding:12, gap:8, borderBottom:'0.5px solid var(--border)'}}>
                        <button onClick={()=>setGalleryTab('image')} style={{flex:1, padding:8, borderRadius:16, background: galleryTab === 'image' ? 'var(--aura-red)' : 'transparent', color: galleryTab === 'image' ? 'white' : 'var(--text-main)'}}>Фото</button>
                        <button onClick={()=>setGalleryTab('voice')} style={{flex:1, padding:8, borderRadius:16, background: galleryTab === 'voice' ? 'var(--aura-red)' : 'transparent', color: galleryTab === 'voice' ? 'white' : 'var(--text-main)'}}>Голос</button>
                      </div>
                      <div style={{flex:1, overflowY:'auto', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2, padding:4}}>
                        {chatMessages.filter(m => galleryTab === 'image' ? m.type === 'image' : m.type === 'voice' || m.type === 'video_circle').map(m => (
                            galleryTab === 'image'
                                ? <img key={m.id} src={safeText(m.text)} className="gallery-img" onClick={()=>window.open(m.text,'_blank')} alt="media" />
                                : <div key={m.id} style={{padding:8, background:'var(--bg-card)', borderRadius:12}}>{m.type === 'voice' ? <VoicePlayer src={m.text} isMine={false} /> : <VideoCirclePlayer msg={m} />}</div>
                        ))}
                      </div>
                    </div>
                )}
              </div>
          )}

          {view === 'settings' && (
              <div style={{flex:1, background:'var(--bg-main)', overflowY:'auto'}}>
                <div className="nav-bar"><button onClick={()=>setView('chats')}><ChevronLeft size={28}/></button><h2>Настройки</h2><div style={{width:32}}/></div>
                <div style={{textAlign:'center', padding:32}}>
                  <img src={safeText(user?.avatar)} className="avatar" style={{width:120, height:120, border:'3px solid var(--aura-red)', margin:'0 auto 20px'}} alt="me" />
                  <h2 style={{fontSize:28}}>{safeText(user?.name)}</h2>
                  <p style={{color:'var(--text-sec)', marginBottom:32}}>@{safeText(user?.username)}</p>

                  <div style={{maxWidth:400, margin:'0 auto', display:'flex', flexDirection:'column', gap:16}}>
                    <div style={{background:'var(--bg-card)', padding:20, borderRadius:24, border:'0.5px solid var(--border)'}}>
                      <label style={{fontSize:12, textTransform:'uppercase', color:'var(--text-sec)'}}>Уведомления</label>
                      <button onClick={() => { Notification.requestPermission().then(p => p === 'granted' && alert('Уведомления включены')); }} style={{marginTop:12, width:'100%', padding:14, borderRadius:20, background:'rgba(52,199,89,0.1)', color:'#34C759', display:'flex', alignItems:'center', justifyContent:'center', gap:8}}><Bell size={18}/> Разрешить уведомления</button>
                    </div>

                    <div style={{background:'var(--bg-card)', padding:20, borderRadius:24, border:'0.5px solid var(--border)'}}>
                      <label style={{fontSize:12, textTransform:'uppercase', color:'var(--text-sec)'}}>Оформление</label>
                      <div style={{display:'flex', gap:8, marginTop:12}}>
                        <button onClick={()=>{setTheme('light'); localStorage.setItem('aura_theme','light')}} style={{flex:1, padding:12, borderRadius:20, background:theme==='light'?'var(--aura-red)':'var(--bg-main)', color:theme==='light'?'#fff':'var(--text-main)'}}>Светлая</button>
                        <button onClick={()=>{setTheme('dark'); localStorage.setItem('aura_theme','dark')}} style={{flex:1, padding:12, borderRadius:20, background:theme==='dark'?'var(--aura-red)':'var(--bg-main)', color:theme==='dark'?'#fff':'var(--text-main)'}}>Тёмная</button>
                      </div>
                    </div>

                    <div style={{background:'var(--bg-card)', padding:20, borderRadius:24, border:'0.5px solid var(--border)'}}>
                      <label style={{fontSize:12, textTransform:'uppercase', color:'var(--text-sec)'}}>Приватность</label>
                      <div style={{display:'flex', justifyContent:'space-between', marginTop:12}}>
                        <span>Показывать время захода</span>
                        <div onClick={() => { const newVal = user.showLastSeen === false; setUser({...user, showLastSeen: newVal}); updateDoc(doc(db,'artifacts',appId,'public','data','users',user.username), { showLastSeen: newVal }); }} style={{ width: 48, height: 28, borderRadius: 14, background: user.showLastSeen !== false ? '#34C759' : 'rgba(255,255,255,0.2)', position: 'relative', cursor: 'pointer' }}>
                          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'white', position: 'absolute', top: 2, left: user.showLastSeen !== false ? 22 : 2, transition: 'left 0.2s' }} />
                        </div>
                      </div>
                    </div>

                    <button onClick={()=>{ localStorage.removeItem('aura_msgs_cache'); window.location.reload(); }} style={{padding:14, borderRadius:24, background:'rgba(255,59,48,0.1)', color:'#FF3B30', display:'flex', alignItems:'center', justifyContent:'center', gap:8}}><Eraser size={18}/> Очистить кэш</button>
                    <button onClick={()=>{ localStorage.clear(); window.location.reload(); }} style={{padding:14, borderRadius:24, background:'#FF3B30', color:'white', fontWeight:600}}>Выйти из аккаунта</button>
                  </div>
                </div>
              </div>
          )}

          {contextMenu && (
              <div style={{position:'fixed', inset:0, zIndex:5000}} onClick={()=>setContextMenu(null)}>
                <div className="context-menu" style={{top:contextMenu.rect.top, left: contextMenu.rect.left - 100}}>
                  {contextMenu.type === 'msg' ? (
                      <>
                        <div style={{display:'flex', gap:12, padding:12, borderBottom:'0.5px solid var(--border)', justifyContent:'center'}}>
                          {['❤️','👍','🔥','😮','😡'].map(emo => <button key={emo} onClick={()=>{ updateDoc(doc(db,'artifacts',appId,'public','data','messages',contextMenu.id), {[`reactions.${user.username}`]: emo}); setContextMenu(null); }} style={{fontSize:24}}>{emo}</button>)}
                        </div>
                        <button className="context-item" onClick={()=>{setReplyTo(contextMenu.item); setContextMenu(null);}}><Reply size={16}/> Ответить</button>
                        <button className="context-item" onClick={()=>{updateDoc(doc(db,'artifacts',appId,'public','data','messages',contextMenu.id), {isPinned: !contextMenu.item.isPinned}); setContextMenu(null);}}><Pin size={16}/> {contextMenu.item.isPinned ? 'Открепить' : 'Закрепить'}</button>
                        {contextMenu.item.uid === user.username && <button className="context-item" onClick={()=>{setEditingMsg(contextMenu.item); setInput(contextMenu.item.text); setContextMenu(null);}}><Edit3 size={16}/> Изменить</button>}
                        <button className="context-item danger" onClick={()=>{ updateDoc(doc(db,'artifacts',appId,'public','data','messages',contextMenu.id), {hiddenFor: arrayUnion(user.username)}); setContextMenu(null); }}><Trash size={16}/> Удалить у себя</button>
                        <button className="context-item danger" onClick={()=>{ deleteDoc(doc(db,'artifacts',appId,'public','data','messages',contextMenu.id)); setContextMenu(null); }}><Trash2 size={16}/> Удалить у всех</button>
                      </>
                  ) : (
                      <>
                        <button className="context-item" onClick={()=>{ togglePinChat(contextMenu.item.username); setContextMenu(null); }}><Pin size={16}/> {user.pinnedChats?.includes(contextMenu.item.username) ? 'Открепить' : 'Закрепить'}</button>
                        <button className="context-item danger" onClick={()=>{ deleteDialog(contextMenu.item.username, false); setContextMenu(null); }}><Trash size={16}/> Удалить у себя</button>
                        <button className="context-item danger" onClick={()=>{ deleteDialog(contextMenu.item.username, true); setContextMenu(null); }}><Trash2 size={16}/> Удалить у обоих</button>
                      </>
                  )}
                </div>
              </div>
          )}

          {/* iOS Call UI */}
          {callSession && (
              <div className={`call-overlay ${isCallMinimized ? 'minimized' : ''}`} onClick={() => isCallMinimized && setIsCallMinimized(false)}>
                {isCallMinimized ? (
                    <div style={{display:'flex', alignItems:'center', gap:12}}>
                      <PhoneCall size={18} />
                      <span>{callSession.status === 'active' ? `${Math.floor(callDuration/60).toString().padStart(2,'0')}:${(callDuration%60).toString().padStart(2,'0')}` : 'Звонок...'}</span>
                      <Maximize size={16} />
                    </div>
                ) : (
                    <>
                      <button onClick={() => setIsCallMinimized(true)} style={{position:'absolute', top: 'calc(20px + env(safe-area-inset-top))', left: 20, zIndex: 50, background: 'rgba(255,255,255,0.15)', padding: 10, borderRadius: '50%'}}><Minimize size={20} color="white" /></button>
                      <div className="call-bg-blob" />

                      {(!remoteStreamConnected || callSession.type !== 'video' || callSession.status === 'calling') && (
                          <div className="call-header-glass">
                            <div className={`call-avatar-wrapper ${callSession.status === 'calling' ? 'calling' : ''}`}>
                              <img src={callSession.peer?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${safeText(callSession.caller)}`} className="call-avatar-pulse" alt="avatar" />
                            </div>
                            <h2 style={{fontSize: 24, fontWeight: 700, marginTop: 16}}>{safeText(callSession.peer?.name || callSession.caller)}</h2>
                            <div style={{fontSize: 16, marginTop: 8}}>
                              {callSession.status === 'active'
                                  ? `${Math.floor(callDuration/60).toString().padStart(2,'0')}:${(callDuration%60).toString().padStart(2,'0')}`
                                  : (callSession.isInitiator ? 'Исходящий вызов...' : 'Входящий звонок...')}
                            </div>
                          </div>
                      )}

                      {devices?.audioIn?.length > 0 && (
                          <div className="device-wrapper" style={{position:'absolute', bottom: 140, zIndex: 20}}>
                            <Mic size={14} />
                            <select className="call-device-select" value={selectedDevices.audioIn || ''} onChange={e => setSelectedDevices(prev => ({...prev, audioIn: e.target.value}))}>
                              {devices.audioIn.map((d, idx) => <option key={d.deviceId || idx} value={d.deviceId}>{d.label || `Микрофон ${idx + 1}`}</option>)}
                            </select>
                          </div>
                      )}

                      <div className="call-controls">
                        <button className="btn-call" onClick={toggleMic} style={{background: callState.micMuted ? '#FF3B30' : 'rgba(255,255,255,0.2)'}}>
                          {callState.micMuted ? <MicMute size={24} /> : <Mic size={24} />}
                        </button>
                        {callSession.type === 'video' && (
                            <button className="btn-call" onClick={toggleScreenShare} style={{background: callState.screenShare ? 'var(--aura-red)' : 'rgba(255,255,255,0.2)'}}>
                              <Monitor size={24} />
                            </button>
                        )}
                        {!callSession.isInitiator && callSession.status === 'calling' && (
                            <button className="btn-call" onClick={acceptCall} style={{background:'#34C759'}}><Phone size={28} /></button>
                        )}
                        <button className="btn-call" onClick={()=>endCall()} style={{background:'#FF3B30'}}><PhoneOff size={28} /></button>
                      </div>
                    </>
                )}

                <video ref={remoteVideoRef} className="call-video-main" autoPlay playsInline style={{ display: isCallMinimized ? 'none' : 'block', opacity: remoteStreamConnected ? 1 : 0 }} />
                <video ref={localVideoRef} className="call-video-pip" autoPlay playsInline muted style={{ display: isCallMinimized ? 'none' : 'block' }} />
              </div>
          )}

          {isRecording && (
              <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.9)', zIndex:200000, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                <div style={{display:'flex', alignItems:'center', gap:15, marginBottom:20}}>
                  <div style={{width:16, height:16, background:'#FF3B30', borderRadius:'50%', animation:'pulse 1s infinite'}} />
                  <span style={{fontSize:48, fontWeight:800}}>{Math.floor(recTime/60)}:{(recTime%60).toString().padStart(2,'0')}</span>
                </div>
                {isRecording === 'video' && (
                    <div className="circle-video" style={{marginBottom:30, width: 280, height: 280}}>
                      <video ref={v => { if(v) v.srcObject = mediaRec.current?.stream; }} autoPlay muted style={{width:'100%', height:'100%', objectFit:'cover', transform:'scaleX(-1)'}} />
                    </div>
                )}
                <div style={{display:'flex', gap:30}}>
                  <button onClick={()=>{ stopMediaRecording(true); }} style={{background:'rgba(255,255,255,0.2)', padding:'14px 32px', borderRadius:30, fontWeight:700}}>ОТМЕНА</button>
                  <button onClick={()=>stopMediaRecording(false)} style={{background:'var(--aura-red)', padding:'14px 40px', borderRadius:30, fontWeight:800}}>ОТПРАВИТЬ</button>
                </div>
              </div>
          )}

          {toast && <AuraToast data={toast} onClose={()=>setToast(null)} onClick={()=>{ setSelectedPeer(allUsers.find(u=>u.username===toast.uid)); setView('chats'); setToast(null); }} />}
        </div>
      </div>
  );
}

export default function App() { return <ErrorBoundary><MainApp /></ErrorBoundary>; }