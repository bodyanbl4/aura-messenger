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
  Check, CheckCheck, X, Heart, ThumbsUp, Flame, Laugh
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

  .view-container { flex: 1; display: flex; flex-direction: column; height: 100%; animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
  @keyframes slideIn { from { transform: translateX(30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes popIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }

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
    flex: 1; overflow-y: auto; padding: 12px 16px; display: flex; flex-direction: column; gap: 8px;
    background: ${isDark ? '#000' : '#F2F2F7'}; 
  }
  .chat-bubble { 
    max-width: 80%; width: fit-content; padding: 10px 14px; border-radius: 18px; font-size: 16px; 
    position: relative; word-wrap: break-word; line-height: 1.4; word-break: break-word;
    animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 1px 2px rgba(0,0,0,0.08);
  }
  .bubble-me { background: var(--ios-blue); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
  .bubble-other { background: ${isDark ? '#1C1C1E' : '#FFFFFF'}; color: var(--text-main); align-self: flex-start; border-bottom-left-radius: 4px; }

  .circle-video { width: 220px; height: 220px; border-radius: 50%; object-fit: cover; border: 3px solid var(--ios-blue); box-shadow: 0 4px 15px rgba(0,0,0,0.2); background: #000; }
  
  .recording-preview-overlay {
    position: absolute; inset: 0; background: rgba(0,0,0,0.7); z-index: 1000;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    backdrop-filter: blur(10px);
  }

  .recording-circle {
    width: 280px; height: 280px; border-radius: 50%; border: 4px solid #FF3B30;
    overflow: hidden; box-shadow: 0 0 40px rgba(255,59,48,0.4); background: #000;
  }
  
  .tab-bar { 
    height: 85px; background: var(--nav-bg); backdrop-filter: blur(25px); 
    border-top: 0.5px solid var(--sep); display: flex; justify-content: space-around; 
    padding-top: 10px; flex-shrink: 0; z-index: 100;
  }
  .tab-item { 
    display: flex; flex-direction: column; align-items: center; gap: 4px; 
    color: var(--text-sec); cursor: pointer; border: none; background: none; flex: 1;
  }
  .tab-item.active { color: var(--ios-blue); }

  .avatar { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; flex-shrink: 0; border: 0.5px solid var(--sep); }
  .avatar-huge { width: 110px; height: 110px; border-radius: 50%; object-fit: cover; margin: 0 auto 10px; border: 3px solid var(--ios-blue); display: block; background: #eee; }
  
  .reaction-picker {
    position: absolute; background: var(--card-bg); border-radius: 24px; 
    padding: 8px 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); display: flex; gap: 12px;
    z-index: 200; top: -55px; animation: popIn 0.2s ease;
  }
  .reaction-badge {
    position: absolute; bottom: -8px; right: 10px; background: var(--card-bg); 
    border-radius: 12px; padding: 2px 6px; font-size: 11px; border: 1px solid var(--sep);
    display: flex; gap: 3px; align-items: center;
  }

  .error-toast {
    position: absolute; top: 100px; left: 20px; right: 20px; background: #FF3B30; color: white;
    padding: 12px; border-radius: 12px; text-align: center; z-index: 2000; animation: slideInUp 0.3s ease;
  }
  @keyframes slideInUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
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
  const [formData, setFormData] = useState({ username: '', password: '', name: '', bio: '' });
  const [loading, setLoading] = useState(false);
  const [authStep, setAuthStep] = useState('login');
  const [activeReactionId, setActiveReactionId] = useState(null);
  const [globalError, setGlobalError] = useState(null);

  const [isRecording, setIsRecording] = useState(null);
  const [recTime, setRecTime] = useState(0);

  const scrollRef = useRef();
  const mediaRecorder = useRef(null);
  const videoPreviewRef = useRef(null);
  const audioChunks = useRef([]);
  const activeStream = useRef(null);

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
    onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'users'), (s) => {
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
    onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), (s) => {
      setMessages(s.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => a.ts - b.ts));
    });
  }, [firebaseUser]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, view, selectedPeer]);

  const handleAuth = async () => {
    const { username, password, name } = formData;
    if (!username || !password) return;
    setLoading(true);
    try {
      const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', username.toLowerCase().trim());
      const snap = await getDoc(userRef);
      if (authStep === 'reg') {
        if (snap.exists()) return setLoading(false);
        const newUser = {
          username: username.toLowerCase().trim(), password, name: name || username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
          bio: 'В Aura'
        };
        await setDoc(userRef, newUser);
        setUser(newUser); localStorage.setItem('aura_user', JSON.stringify(newUser));
      } else {
        if (snap.exists() && snap.data().password === password) {
          setUser(snap.data()); localStorage.setItem('aura_user', JSON.stringify(snap.data()));
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

  const onAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => updateProfile({ avatar: reader.result });
    reader.readAsDataURL(file);
  };

  const sendMessage = async (val, type = 'text') => {
    if (!val.trim() && type === 'text') return;
    try {
      if (val.length > 950000) {
        setGlobalError("Сообщение слишком большое.");
        setTimeout(() => setGlobalError(null), 3000);
        return;
      }
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
        text: val, uid: user.username, to: selectedPeer.username, ts: Date.now(), name: user.name, type, reactions: {}
      });
      setInput('');
    } catch (e) {
      setGlobalError("Ошибка отправки.");
      setTimeout(() => setGlobalError(null), 3000);
    }
  };

  const addReaction = async (msgId, emoji) => {
    const msgRef = doc(db, 'artifacts', appId, 'public', 'data', 'messages', msgId);
    const msg = messages.find(m => m.id === msgId);
    const reactions = { ...(msg.reactions || {}) };
    reactions[user.username] = emoji;
    await updateDoc(msgRef, { reactions });
    setActiveReactionId(null);
  };

  const startMediaRecording = async (type) => {
    try {
      const constraints = {
        audio: true,
        video: type === 'video' ? {
          width: { ideal: 400 },
          height: { ideal: 400 },
          facingMode: 'user'
        } : false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      activeStream.current = stream;

      if (type === 'video' && videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
      }

      const options = { mimeType: type === 'video' ? 'video/webm;codecs=vp8' : 'audio/webm' };
      mediaRecorder.current = new MediaRecorder(stream, options);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = e => {
        if (e.data.size > 0) audioChunks.current.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
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
      alert("Нет доступа к камере");
    }
  };

  const stopMediaRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      clearInterval(mediaRecorder.current.timer);
      setIsRecording(null);
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
          <div className="auth-card" style={{animation: 'popIn 0.5s ease'}}>
            <div style={{width: 70, height: 70, background: 'var(--ios-blue)', borderRadius: 20, margin: '0 auto 25px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,122,255,0.2)'}}><MessageCircle color="white" size={36} /></div>
            <h2 style={{textAlign: 'center', marginBottom: 25}}>{authStep === 'reg' ? 'Регистрация' : 'Вход в Aura'}</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
              <input className="ios-input" placeholder="Логин" onChange={e => setFormData({...formData, username: e.target.value})} />
              <input className="ios-input" type="password" placeholder="Пароль" onChange={e => setFormData({...formData, password: e.target.value})} />
              {authStep === 'reg' && <input className="ios-input" placeholder="Ваше имя" onChange={e => setFormData({...formData, name: e.target.value})} />}
              <button className="btn-primary" style={{marginTop: 10}} onClick={handleAuth} disabled={loading}>{loading ? '...' : 'Продолжить'}</button>
              <button style={{background: 'none', border: 'none', color: 'var(--ios-blue)', marginTop: 15, cursor: 'pointer', fontWeight: 600}} onClick={() => setAuthStep(authStep === 'reg' ? 'login' : 'reg')}>
                {authStep === 'reg' ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Создать'}
              </button>
            </div>
          </div>
        </div>
      </div>
  );

  return (
      <div className="app-container">
        <style>{auraStyles(isDark)}</style>
        <div className="phone-screen">

          {globalError && <div className="error-toast">{globalError}</div>}

          {isRecording === 'video' && (
              <div className="recording-preview-overlay">
                <div className="recording-circle">
                  <video ref={videoPreviewRef} autoPlay muted playsInline style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                </div>
                <div style={{marginTop: 25, color: 'white', fontSize: 18, fontWeight: 700}}>Запись кружка... {recTime}с</div>
                <button onClick={stopMediaRecording} style={{marginTop: 30, background: '#FF3B30', color: 'white', border: 'none', padding: '16px 32px', borderRadius: 32, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10}}>
                  <Square size={20} fill="white" /> Стоп и отправить
                </button>
              </div>
          )}

          {view === 'chats' && (
              <div className="view-container">
                <div className="nav-bar"><div style={{fontSize: 32, fontWeight: 800}}>Чаты</div><Edit3 size={24} color="var(--ios-blue)" /></div>
                <div style={{padding: '0 16px 12px'}}><div style={{background: isDark ? '#1C1C1E' : '#E3E3E8', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '8px'}}><Search size={18} color="#8E8E93" /><input placeholder="Поиск" style={{background: 'none', border: 'none', outline: 'none', color: 'var(--text-main)', width: '100%', fontSize: 16}} /></div></div>
                <div style={{flex: 1, overflowY: 'auto'}}>
                  <button className="ios-item" onClick={() => { setSelectedPeer({name: 'Общий чат', username: 'global'}); setView('chat_room'); }}>
                    <div style={{background: 'var(--ios-blue)', width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 14}}><Globe size={26} color="white"/></div>
                    <div style={{flex: 1}}><b style={{fontSize: 17}}>Общий чат</b><div style={{fontSize: 14, color: 'var(--text-sec)'}}>Групповая беседа • Online</div></div>
                  </button>
                  {allUsers.filter(u => u.username !== user.username).map(u => (
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
                <div className="nav-bar"><div style={{fontSize: 32, fontWeight: 800}}>Настройки</div></div>
                <div className="ios-list" style={{padding: '24px 0'}}>
                  <div style={{textAlign: 'center'}}>
                    <div style={{position: 'relative', display: 'inline-block', marginBottom: 12}}>
                      <img src={user.avatar} className="avatar-huge" key={user.avatar} />
                      <label style={{position: 'absolute', bottom: 5, right: 0, background: 'var(--ios-blue)', borderRadius: '50%', padding: 8, cursor: 'pointer', border: '4px solid var(--card-bg)', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
                        <Camera size={18} color="white" />
                        <input type="file" hidden accept="image/*" onChange={onAvatarChange} />
                      </label>
                    </div>
                    <h3 style={{fontSize: 22, fontWeight: 800}}>{user.name}</h3>
                    <p style={{color: 'var(--text-sec)', fontSize: 15}}>@{user.username}</p>
                  </div>
                </div>
                <div className="ios-list">
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
              <div className="view-container">
                <div className="nav-bar">
                  <button onClick={() => setView('chats')} style={{background: 'none', border: 'none', color: 'var(--ios-blue)', cursor: 'pointer'}}><ChevronLeft size={34} /></button>
                  <div style={{textAlign: 'center', flex: 1}}>
                    <b style={{fontSize: 17, display: 'block'}}>{selectedPeer.name}</b>
                    <div style={{fontSize: 12, color: '#34C759', fontWeight: 600}}>в сети</div>
                  </div>
                  <img src={selectedPeer.avatar || ''} className="avatar" style={{width: 38, height: 38}} />
                </div>

                <div ref={scrollRef} className="chat-scroll">
                  <div style={{flex: 1}}></div>
                  {currentMessages.map((m) => (
                      <div
                          key={m.id}
                          className={`chat-bubble ${m.uid === user.username ? 'bubble-me' : 'bubble-other'}`}
                          onClick={() => setActiveReactionId(m.id === activeReactionId ? null : m.id)}
                      >
                        {selectedPeer.username === 'global' && m.uid !== user.username && <div style={{fontSize: 11, fontWeight: 700, marginBottom: 2, color: '#FF9500'}}>{m.name}</div>}

                        {m.type === 'video_circle' ? (
                            <video src={m.text} controls className="circle-video" playsInline />
                        ) : m.type === 'voice' ? (
                            <audio src={m.text} controls style={{width: 190, height: 35}} />
                        ) : <div style={{fontSize: 16}}>{m.text}</div>}

                        {activeReactionId === m.id && (
                            <div className="reaction-picker" style={{left: m.uid === user.username ? 'auto' : 0, right: m.uid === user.username ? 0 : 'auto'}}>
                              {['❤️', '👍', '🔥', '😂'].map(e => <span key={e} onClick={(ev) => { ev.stopPropagation(); addReaction(m.id, e); }} style={{fontSize: 22, cursor: 'pointer'}}>{e}</span>)}
                            </div>
                        )}

                        {m.reactions && Object.keys(m.reactions).length > 0 && (
                            <div className="reaction-badge">
                              {Array.from(new Set(Object.values(m.reactions))).map((emoji, i) => <span key={i}>{emoji}</span>)}
                              <span style={{marginLeft: 2, fontSize: 10, opacity: 0.7}}>{Object.keys(m.reactions).length}</span>
                            </div>
                        )}
                        <div style={{fontSize: 10, opacity: 0.5, textAlign: 'right', marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 3}}>
                          {new Date(m.ts).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                          {m.uid === user.username && (m.read ? <CheckCheck size={12} color="#34C759"/> : <Check size={12} />)}
                        </div>
                      </div>
                  ))}
                </div>

                <div style={{padding: '10px 16px 35px', background: 'var(--nav-bg)', backdropFilter: 'blur(25px)', display: 'flex', gap: 10, alignItems: 'center', borderTop: '0.5px solid var(--sep)'}}>
                  {isRecording === 'voice' ? (
                      <div style={{flex: 1, display: 'flex', alignItems: 'center', background: '#FF3B30', padding: '10px 16px', borderRadius: 24, color: 'white'}}>
                        <Mic size={18} style={{marginRight: 10}} />
                        <span style={{flex: 1, fontWeight: 600}}>Запись голоса... {recTime}с</span>
                        <button onClick={stopMediaRecording} style={{background: 'white', border: 'none', color: '#FF3B30', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Square size={14} fill="currentColor"/></button>
                      </div>
                  ) : (
                      <>
                        <button onClick={() => startMediaRecording('video')} style={{background: 'none', border: 'none', color: '#8E8E93', cursor: 'pointer'}}><Camera size={28}/></button>
                        <input
                            style={{flex: 1, padding: '11px 16px', borderRadius: 22, border: 'none', background: isDark ? '#2C2C2E' : '#FFFFFF', color: 'var(--text-main)', fontSize: 16, outline: 'none'}}
                            value={input} onChange={e => setInput(e.target.value)}
                            placeholder="Сообщение"
                            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                        />
                        {input.trim() ? (
                            <button onClick={() => sendMessage(input)} style={{background: 'var(--ios-blue)', borderRadius: '50%', width: 38, height: 38, border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}><Send size={18}/></button>
                        ) : <button onMouseDown={() => startMediaRecording('voice')} onTouchStart={() => startMediaRecording('voice')} style={{background: 'none', border: 'none', color: '#8E8E93', cursor: 'pointer'}}><Mic size={28}/></button>}
                      </>
                  )}
                </div>
              </div>
          )}

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