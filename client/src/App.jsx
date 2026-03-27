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
  updateDoc
} from 'firebase/firestore';
import {
  Search, MessageCircle, ChevronLeft, Send, Phone, Plus,
  User as UserIcon, LogOut, Video, Moon, Sun, Camera,
  ChevronRight, Bell, Shield, Smartphone, Globe, MoreHorizontal, Edit3, Mic, Save, Square, Play,
  Check, CheckCheck, X, Trash2
} from 'lucide-react';

// --- 🔑 ТВОЯ КОНФИГУРАЦИЯ FIREBASE ---
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

const auraStyles = (isDark) => `
  :root { 
    --ios-blue: #007AFF; 
    --ios-bg: ${isDark ? '#000000' : '#F2F2F7'};
    --card-bg: ${isDark ? '#1C1C1E' : '#FFFFFF'};
    --text-main: ${isDark ? '#FFFFFF' : '#000000'};
    --text-sec: #8E8E93;
    --sep: ${isDark ? '#38383A' : '#C6C6C8'};
    --nav-bg: ${isDark ? 'rgba(28, 28, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)'};
  }
  
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #000; color: var(--text-main); overflow: hidden; }
  
  .app-container { width: 100vw; height: 100vh; display: flex; justify-content: center; background: #000; }
  .phone-screen { 
    width: 100%; max-width: 500px; height: 100%; background: var(--ios-bg); 
    position: relative; display: flex; flex-direction: column; overflow: hidden; 
  }

  /* Плавные переходы страниц */
  .view-container { 
    flex: 1; display: flex; flex-direction: column; height: 100%; 
    animation: slideIn 0.3s cubic-bezier(0.32, 0.72, 0, 1);
  }
  @keyframes slideIn { from { transform: translateX(30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

  /* Карточка авторизации */
  .auth-wrap { flex: 1; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .auth-card { 
    background: var(--card-bg); width: 100%; max-width: 360px; padding: 40px 24px; 
    border-radius: 32px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); 
    display: flex; flex-direction: column; 
  }
  
  .input-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; width: 100%; }
  .input-label { font-size: 13px; font-weight: 600; color: var(--text-sec); margin-left: 4px; }
  .ios-input { 
    width: 100%; padding: 14px 16px; border-radius: 12px; 
    border: 1.5px solid var(--sep); background: ${isDark ? '#2C2C2E' : '#FFFFFF'}; 
    color: var(--text-main); font-size: 16px; outline: none; transition: border-color 0.2s;
  }
  .ios-input:focus { border-color: var(--ios-blue); }

  .btn-primary { 
    width: 100%; padding: 16px; background: var(--ios-blue); color: white; 
    border: none; border-radius: 16px; font-weight: 700; font-size: 17px; cursor: pointer; 
    transition: transform 0.1s; 
  }
  .btn-primary:active { transform: scale(0.96); }

  /* Навигация */
  .nav-bar { 
    padding: 55px 16px 15px; background: var(--nav-bg); backdrop-filter: blur(25px); 
    border-bottom: 0.5px solid var(--sep); display: flex; align-items: center; 
    justify-content: space-between; position: sticky; top: 0; z-index: 50; 
  }
  .nav-title { font-size: 32px; font-weight: 800; letter-spacing: -0.5px; }
  
  /* Списки iOS */
  .ios-list { background: var(--card-bg); margin: 16px; border-radius: 12px; overflow: hidden; }
  .ios-item { 
    display: flex; align-items: center; padding: 12px 16px; cursor: pointer; 
    transition: background 0.2s; border: none; background: none; text-align: left; 
    width: 100%; color: var(--text-main); position: relative; 
  }
  .ios-item:active { background: ${isDark ? '#2C2C2E' : '#E5E5EA'}; }
  .ios-item:not(:last-child)::after { 
    content: ''; position: absolute; left: 70px; right: 0; bottom: 0; height: 0.5px; background: var(--sep); 
  }

  /* Чат */
  .chat-scroll { 
    flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; 
    background: ${isDark ? '#000' : '#F2F2F7'}; 
  }
  .chat-bubble { 
    max-width: 75%; padding: 10px 14px; border-radius: 18px; font-size: 16px; 
    position: relative; word-wrap: break-word; line-height: 1.4; margin-bottom: 4px; 
    animation: bubblePop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  @keyframes bubblePop { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  .bubble-me { background: var(--ios-blue); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
  .bubble-other { background: ${isDark ? '#1C1C1E' : '#FFFFFF'}; color: var(--text-main); align-self: flex-start; border-bottom-left-radius: 4px; }

  /* Нижнее меню - ФИКСИРОВАННОЕ */
  .tab-bar { 
    height: 85px; background: var(--nav-bg); backdrop-filter: blur(25px); 
    border-top: 0.5px solid var(--sep); display: flex; justify-content: space-around; 
    padding-top: 10px; flex-shrink: 0;
  }
  .tab-item { 
    display: flex; flex-direction: column; align-items: center; gap: 4px; 
    color: var(--text-sec); cursor: pointer; border: none; background: none; 
  }
  .tab-item.active { color: var(--ios-blue); }

  /* Уведомление внутри приложения */
  .toast {
    position: absolute; top: 60px; left: 16px; right: 16px; background: var(--card-bg); 
    padding: 12px 16px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    display: flex; align-items: center; gap: 12px; z-index: 999;
    animation: toastIn 0.4s ease forwards;
  }
  @keyframes toastIn { from { transform: translateY(-100px); } to { transform: translateY(0); } }

  .voice-record-btn {
    width: 40px; height: 40px; border-radius: 50%; display: flex; 
    align-items: center; justify-content: center; background: #FF3B30; color: white;
    animation: pulse 1.5s infinite;
  }
  @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
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
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({ username: '', password: '', name: '', bio: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [authStep, setAuthStep] = useState('login');

  // Голос и Уведомления
  const [isRecording, setIsRecording] = useState(false);
  const [toast, setToast] = useState(null);
  const [recTime, setRecTime] = useState(0);

  const scrollRef = useRef();
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  // 1. Инициализация и Auth
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

  // 2. Синхронизация данных и Real-time уведомления
  useEffect(() => {
    if (!firebaseUser) return;

    const unsubUsers = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'users'), (s) => {
      setAllUsers(s.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    const unsubMsgs = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), (s) => {
      const msgsData = s.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => a.ts - b.ts);

      // Логика уведомлений для новых сообщений
      if (messages.length > 0 && msgsData.length > messages.length) {
        const lastMsg = msgsData[msgsData.length - 1];
        if (lastMsg.uid !== user?.username && (lastMsg.to === user?.username || lastMsg.to === 'global')) {
          showNotification(lastMsg);
        }
      }
      setMessages(msgsData);
    });

    return () => { unsubUsers(); unsubMsgs(); };
  }, [firebaseUser, messages.length, user?.username]);

  // 3. Автоматическая пометка прочитанным
  useEffect(() => {
    if (view === 'chat_room' && selectedPeer && user && selectedPeer.username !== 'global') {
      const unread = messages.filter(m => m.uid === selectedPeer.username && m.to === user.username && !m.read);
      unread.forEach(async (msg) => {
        const msgRef = doc(db, 'artifacts', appId, 'public', 'data', 'messages', msg.id);
        await updateDoc(msgRef, { read: true });
      });
    }
  }, [view, selectedPeer, messages, user]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, view, selectedPeer]);

  const showNotification = (msg) => {
    // Внутренний тост
    if (view !== 'chat_room' || selectedPeer?.username !== msg.uid) {
      setToast({ name: msg.name, text: msg.type === 'voice' ? '🎙 Голосовое сообщение' : msg.text });
      setTimeout(() => setToast(null), 3000);

      // Браузерное уведомление
      if (Notification.permission === 'granted') {
        new Notification(`Aura: ${msg.name}`, { body: msg.text, icon: 'https://cdn-icons-png.flaticon.com/512/733/733579.png' });
      }
    }
  };

  const handleAuth = async () => {
    const { username, password, name } = formData;
    if (!username || !password) return setErrorMsg("Заполните поля");
    setLoading(true); setErrorMsg('');
    try {
      const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', username.toLowerCase().trim());
      const snap = await getDoc(userRef);
      if (authStep === 'reg') {
        if (snap.exists()) { setLoading(false); return setErrorMsg("Логин занят"); }
        const newUser = {
          username: username.toLowerCase().trim(), password, name: name || username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
          bio: 'В Aura'
        };
        await setDoc(userRef, newUser);
        loginSuccess(newUser);
      } else {
        if (!snap.exists() || snap.data().password !== password) { setLoading(false); return setErrorMsg("Ошибка входа"); }
        loginSuccess(snap.data());
      }
    } catch (e) { setErrorMsg("Ошибка базы данных"); setLoading(false); }
  };

  const loginSuccess = (u) => {
    setUser(u);
    localStorage.setItem('aura_user', JSON.stringify(u));
    setLoading(false);
  };

  const updateProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', user.username);
      const updates = { name: formData.name || user.name, bio: formData.bio || user.bio };
      await updateDoc(userRef, updates);
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('aura_user', JSON.stringify(updatedUser));
      setView('settings');
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const sendMessage = async (val, type = 'text') => {
    if (!val.trim() && type === 'text') return;
    if (!user || !selectedPeer) return;
    await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
      text: val, uid: user.username, to: selectedPeer.username, ts: Date.now(), name: user.name, read: false, type
    });
    setInput('');
  };

  // Логика записи голоса
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];
      mediaRecorder.current.ondataavailable = e => audioChunks.current.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => sendMessage(reader.result, 'voice');
      };
      mediaRecorder.current.start();
      setIsRecording(true);
      setRecTime(0);
      const timer = setInterval(() => setRecTime(prev => prev + 1), 1000);
      mediaRecorder.current.onstart = () => { mediaRecorder.current.timer = timer; };
    } catch (e) { alert("Нет доступа к микрофону"); }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      clearInterval(mediaRecorder.current.timer);
      setIsRecording(false);
    }
  };

  const currentMessages = messages.filter(m => {
    if (!selectedPeer) return false;
    if (selectedPeer.username === 'global') return m.to === 'global';
    return (m.uid === user.username && m.to === selectedPeer.username) ||
        (m.uid === selectedPeer.username && m.to === user.username);
  });

  if (!user) return (
      <div className="app-container">
        <style>{auraStyles(isDark)}</style>
        <div className="auth-wrap">
          <div className="auth-card">
            <div style={{width: 70, height: 70, background: '#007AFF', borderRadius: 20, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><MessageCircle color="white" size={36} /></div>
            <h2>{authStep === 'reg' ? 'Регистрация' : 'Вход в Aura'}</h2>
            {errorMsg && <div className="error-msg">{errorMsg}</div>}
            <div className="input-group"><span className="input-label">Логин</span><input className="ios-input" placeholder="ivan_aura" onChange={e => setFormData({...formData, username: e.target.value})} /></div>
            <div className="input-group"><span className="input-label">Пароль</span><input className="ios-input" type="password" placeholder="••••••••" onChange={e => setFormData({...formData, password: e.target.value})} /></div>
            {authStep === 'reg' && <div className="input-group"><span className="input-label">Ваше имя</span><input className="ios-input" placeholder="Александр" onChange={e => setFormData({...formData, name: e.target.value})} /></div>}
            <button className="btn-primary" onClick={handleAuth} disabled={loading}>{loading ? '...' : 'Продолжить'}</button>
            <button style={{background: 'none', border: 'none', color: '#007AFF', marginTop: 20, cursor: 'pointer', fontWeight: 600}} onClick={() => setAuthStep(authStep === 'reg' ? 'login' : 'reg')}>
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

          {toast && (
              <div className="toast" onClick={() => setView('chats')}>
                <div style={{background: '#007AFF', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}><MessageCircle size={20}/></div>
                <div style={{flex: 1}}><b>{toast.name}</b><div style={{fontSize: 13, opacity: 0.8}}>{toast.text}</div></div>
              </div>
          )}

          <div style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
            {view === 'chats' && (
                <div className="view-container">
                  <div className="nav-bar"><div className="nav-title">Чаты</div><Edit3 size={24} color="#007AFF" /></div>
                  <div style={{padding: '0 16px 16px'}}><div style={{background: isDark ? '#1C1C1E' : '#E3E3E8', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px'}}><Search size={18} color="#8E8E93" /><input placeholder="Поиск" style={{background: 'none', border: 'none', outline: 'none', color: 'var(--text-main)', width: '100%', fontSize: 16}} value={search} onChange={e => setSearch(e.target.value)} /></div></div>
                  <div style={{flex: 1, overflowY: 'auto'}}>
                    <button className="ios-item" onClick={() => { setSelectedPeer({name: 'Общий чат', username: 'global'}); setView('chat_room'); }}>
                      <div style={{background: '#007AFF', width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 14}}><Globe size={26} color="white"/></div>
                      <div style={{flex: 1}}><div style={{display: 'flex', justifyContent: 'space-between'}}><b style={{fontSize: 17}}>Общий чат</b><span style={{fontSize: 12, color: 'var(--text-sec)'}}>Online</span></div><div style={{fontSize: 14, color: 'var(--text-sec)'}}>Групповая беседа</div></div>
                      <ChevronRight size={18} color="#C6C6C8" />
                    </button>
                    {allUsers.filter(u => u.username !== user.username && u.username.includes(search.toLowerCase())).map(u => (
                        <button key={u.username} className="ios-item" onClick={() => { setSelectedPeer(u); setView('chat_room'); }}>
                          <img src={u.avatar} className="avatar" />
                          <div style={{flex: 1}}><b style={{fontSize: 17}}>{u.name}</b><div style={{fontSize: 14, color: 'var(--text-sec)'}}>@{u.username}</div></div>
                          <ChevronRight size={18} color="#C6C6C8" />
                        </button>
                    ))}
                  </div>
                </div>
            )}

            {view === 'settings' && (
                <div className="view-container">
                  <div className="nav-bar"><div className="nav-title">Настройки</div></div>
                  <div className="ios-list">
                    <button className="ios-item" onClick={() => { setFormData({name: user.name, bio: user.bio}); setView('profile_edit'); }}>
                      <img src={user.avatar} className="avatar" style={{width: 60, height: 60}} />
                      <div style={{flex: 1}}><div style={{fontSize: 20, fontWeight: 700}}>{user.name}</div><div style={{color: 'var(--text-sec)'}}>@{user.username}</div></div>
                      <ChevronRight size={18} color="#C6C6C8" />
                    </button>
                  </div>
                  <div className="ios-list">
                    <button className="ios-item" onClick={() => { setIsDark(!isDark); localStorage.setItem('aura_dark', !isDark); }}><div style={{background: '#5856D6', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, color: 'white'}}>{isDark ? <Sun size={18}/> : <Moon size={18}/>}</div><div style={{flex: 1}}>Темная тема</div><div style={{color: 'var(--text-sec)'}}>{isDark ? 'Вкл' : 'Выкл'}</div></button>
                    <button className="ios-item" onClick={() => Notification.requestPermission()}><div style={{background: '#FF9500', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, color: 'white'}}><Bell size={18}/></div><div style={{flex: 1}}>Уведомления</div><div style={{fontSize: 12, color: 'var(--text-sec)'}}>{Notification.permission === 'granted' ? 'Вкл' : 'Выкл'}</div></button>
                  </div>
                  <div className="ios-list">
                    <button className="ios-item" onClick={() => { localStorage.clear(); window.location.reload(); }}><div style={{background: '#FF3B30', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, color: 'white'}}><LogOut size={18}/></div><div style={{flex: 1, color: '#FF3B30', fontWeight: 600}}>Выйти</div></button>
                  </div>
                </div>
            )}

            {view === 'profile_edit' && (
                <div className="view-container">
                  <div className="nav-bar"><button onClick={() => setView('settings')} style={{background: 'none', border: 'none', color: '#007AFF', display: 'flex', alignItems: 'center', cursor: 'pointer'}}><ChevronLeft size={30}/></button><div style={{fontWeight: 700}}>Изменить профиль</div><button onClick={updateProfile} style={{background: 'none', border: 'none', color: '#007AFF', fontWeight: 600}}>{loading ? '...' : 'Готово'}</button></div>
                  <div style={{textAlign: 'center', padding: 30}}><img src={user.avatar} style={{width: 100, height: 100, borderRadius: '50%', marginBottom: 15, border: '2px solid var(--ios-blue)'}}/><div style={{color: '#007AFF', fontSize: 14, fontWeight: 600}}>Изменить аватар</div></div>
                  <div className="ios-list">
                    <div className="ios-item"><input className="ios-input" style={{border: 'none', padding: 0}} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Имя" /></div>
                    <div className="ios-item"><input className="ios-input" style={{border: 'none', padding: 0}} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} placeholder="О себе" /></div>
                  </div>
                </div>
            )}

            {view === 'chat_room' && selectedPeer && (
                <div className="view-container" style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                  <div className="nav-bar">
                    <button onClick={() => setView('chats')} style={{background: 'none', border: 'none', color: '#007AFF', display: 'flex', alignItems: 'center'}}><ChevronLeft size={34} /><span style={{fontSize: 17}}>Назад</span></button>
                    <div style={{textAlign: 'center'}}><b style={{fontSize: 17}}>{selectedPeer.name}</b><div style={{fontSize: 11, color: '#34C759', fontWeight: 600}}>в сети</div></div>
                    {selectedPeer.avatar ? <img src={selectedPeer.avatar} style={{width: 36, height: 36, borderRadius: '50%'}}/> : <div style={{width: 36}}></div>}
                  </div>

                  <div ref={scrollRef} className="chat-scroll">
                    <div style={{flex: 1}}></div>
                    {currentMessages.map((m, i) => (
                        <div key={m.id || i} className={`chat-bubble ${m.uid === user.username ? 'bubble-me' : 'bubble-other'}`}>
                          {selectedPeer.username === 'global' && m.uid !== user.username && <div style={{fontSize: 11, fontWeight: 700, marginBottom: 2, color: '#FF9500'}}>{m.name}</div>}
                          {m.type === 'voice' ? <audio src={m.text} controls style={{width: 200, height: 35, marginTop: 5}} /> : <div>{m.text}</div>}
                          <div style={{display: 'flex', justifyContent: 'flex-end', gap: 4, marginTop: 2}}>
                            <span style={{fontSize: 10, opacity: 0.6}}>{m.ts ? new Date(m.ts).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}</span>
                            {m.uid === user.username && selectedPeer.username !== 'global' && (m.read ? <CheckCheck size={12} color="#34C759"/> : <Check size={12} color="#FFF"/>)}
                          </div>
                        </div>
                    ))}
                  </div>

                  <div style={{padding: '10px 16px 35px', background: 'var(--nav-bg)', backdropFilter: 'blur(25px)', display: 'flex', gap: 10, alignItems: 'center', borderTop: '0.5px solid var(--sep)'}}>
                    {isRecording ? (
                        <div style={{flex: 1, display: 'flex', alignItems: 'center', background: isDark ? '#2C2C2E' : '#E5E5EA', padding: '10px 15px', borderRadius: 20, gap: 10}}>
                          <div className="voice-record-btn"><Mic size={18}/></div>
                          <span style={{fontWeight: 600, color: '#FF3B30'}}>{Math.floor(recTime / 60)}:{String(recTime % 60).padStart(2, '0')}</span>
                          <div style={{flex: 1, height: 2, background: '#FF3B30', opacity: 0.3}}></div>
                          <button onClick={stopRecording} style={{background: 'none', border: 'none', color: '#FF3B30'}}><Square size={20}/></button>
                        </div>
                    ) : (
                        <>
                          <Plus size={28} color="#007AFF" />
                          <input style={{flex: 1, padding: '11px 16px', borderRadius: 22, border: 'none', background: isDark ? '#2C2C2E' : '#FFFFFF', color: 'var(--text-main)', fontSize: 16, outline: 'none'}} value={input} onChange={e => setInput(e.target.value)} placeholder="Сообщение" onKeyDown={e => e.key === 'Enter' && sendMessage(input)} />
                          {input.trim() ? (
                              <button onClick={() => sendMessage(input)} style={{background: '#007AFF', borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer'}}><Send size={18} color="white" /></button>
                          ) : <button onMouseDown={startRecording} onTouchStart={startRecording} style={{background: 'none', border: 'none'}}><Mic size={26} color="#8E8E93" /></button>}
                        </>
                    )}
                  </div>
                </div>
            )}
          </div>

          {view !== 'chat_room' && (
              <div className="tab-bar">
                <button className={`tab-item ${view === 'chats' ? 'active' : ''}`} onClick={() => setView('chats')}><MessageCircle size={28} /><span style={{fontSize: 11}}>Чаты</span></button>
                <button className={`tab-item ${view === 'settings' || view === 'profile_edit' ? 'active' : ''}`} onClick={() => setView('settings')}><UserIcon size={28} /><span style={{fontSize: 11}}>Настройки</span></button>
              </div>
          )}
        </div>
      </div>
  );
}