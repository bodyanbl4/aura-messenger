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

  /* Анимации */
  .view-container { flex: 1; display: flex; flex-direction: column; height: 100%; animation: slideIn 0.3s ease-out; }
  @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

  .auth-card { 
    background: var(--card-bg); width: 100%; max-width: 360px; padding: 40px 24px; 
    border-radius: 32px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); 
  }

  .ios-input { 
    width: 100%; padding: 14px 16px; border-radius: 12px; 
    border: 1.5px solid var(--sep); background: ${isDark ? '#2C2C2E' : '#FFFFFF'}; 
    color: var(--text-main); font-size: 16px; outline: none;
  }

  .btn-primary { 
    width: 100%; padding: 16px; background: var(--ios-blue); color: white; 
    border: none; border-radius: 16px; font-weight: 700; font-size: 17px; 
  }

  .nav-bar { 
    padding: 55px 16px 15px; background: var(--nav-bg); backdrop-filter: blur(25px); 
    border-bottom: 0.5px solid var(--sep); display: flex; align-items: center; 
    justify-content: space-between; position: sticky; top: 0; z-index: 50; 
  }

  .ios-list { background: var(--card-bg); margin: 16px; border-radius: 12px; overflow: hidden; }
  .ios-item { 
    display: flex; align-items: center; padding: 12px 16px; cursor: pointer; 
    border: none; background: none; text-align: left; width: 100%; color: var(--text-main); 
  }

  .chat-bubble { 
    max-width: 75%; padding: 10px 14px; border-radius: 18px; font-size: 16px; 
    position: relative; word-wrap: break-word; margin-bottom: 4px; 
  }
  .bubble-me { background: var(--ios-blue); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
  .bubble-other { background: ${isDark ? '#1C1C1E' : '#FFFFFF'}; color: var(--text-main); align-self: flex-start; border-bottom-left-radius: 4px; }

  .circle-video { width: 220px; height: 220px; border-radius: 50%; object-fit: cover; border: 3px solid var(--ios-blue); overflow: hidden; }
  
  .reaction-badge {
    position: absolute; bottom: -10px; right: 10px; background: var(--card-bg); 
    border-radius: 10px; padding: 2px 6px; font-size: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    display: flex; gap: 2px;
  }

  .reaction-picker {
    position: absolute; background: var(--card-bg); border-radius: 20px; 
    padding: 8px 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.3); display: flex; gap: 10px;
    z-index: 100; transform: translateY(-50px); animation: pop 0.2s ease-out;
  }
  @keyframes pop { from { transform: scale(0.5) translateY(0); } to { transform: scale(1) translateY(-50px); } }

  .tab-bar { 
    height: 85px; background: var(--nav-bg); backdrop-filter: blur(25px); 
    border-top: 0.5px solid var(--sep); display: flex; justify-content: space-around; 
    padding-top: 10px; flex-shrink: 0; z-index: 100;
  }

  /* Исправление бага с аватаром */
  .avatar { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; flex-shrink: 0; border: 0.5px solid var(--sep); }
  .avatar-huge { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin: 0 auto 15px; border: 3px solid var(--ios-blue); display: block; }
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

  // Кружочки и Голос
  const [isRecording, setIsRecording] = useState(null); // 'voice' or 'video'
  const [recTime, setRecTime] = useState(0);
  const [videoPreview, setVideoPreview] = useState(null);

  const scrollRef = useRef();
  const mediaRecorder = useRef(null);
  const videoRef = useRef(null);
  const audioChunks = useRef([]);

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
      setAllUsers(s.docs.map(d => ({ id: d.id, ...d.data() })));
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
    const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', user.username);
    await updateDoc(userRef, updates);
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('aura_user', JSON.stringify(updatedUser));
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
    await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
      text: val, uid: user.username, to: selectedPeer.username, ts: Date.now(), name: user.name, type, reactions: {}
    });
    setInput('');
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
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === 'video' ? { width: 400, height: 400, facingMode: 'user' } : false
      });
      if (type === 'video' && videoRef.current) videoRef.current.srcObject = stream;

      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];
      mediaRecorder.current.ondataavailable = e => audioChunks.current.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: type === 'video' ? 'video/webm' : 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => sendMessage(reader.result, type === 'video' ? 'video_circle' : 'voice');
        reader.readAsDataURL(blob);
        stream.getTracks().forEach(t => t.stop());
      };
      mediaRecorder.current.start();
      setIsRecording(type);
      setRecTime(0);
      const t = setInterval(() => setRecTime(p => p + 1), 1000);
      mediaRecorder.current.timer = t;
    } catch (e) { alert("Нет доступа"); }
  };

  const stopMediaRecording = () => {
    if (mediaRecorder.current) {
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
          <div className="auth-card">
            <div style={{width: 70, height: 70, background: '#007AFF', borderRadius: 20, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><MessageCircle color="white" size={36} /></div>
            <h2>{authStep === 'reg' ? 'Регистрация' : 'Вход в Aura'}</h2>
            <div style={{marginTop: 20}}>
              <input className="ios-input" placeholder="Логин" style={{marginBottom: 10}} onChange={e => setFormData({...formData, username: e.target.value})} />
              <input className="ios-input" type="password" placeholder="Пароль" style={{marginBottom: 10}} onChange={e => setFormData({...formData, password: e.target.value})} />
              {authStep === 'reg' && <input className="ios-input" placeholder="Ваше имя" style={{marginBottom: 10}} onChange={e => setFormData({...formData, name: e.target.value})} />}
              <button className="btn-primary" onClick={handleAuth} disabled={loading}>{loading ? '...' : 'Продолжить'}</button>
              <button style={{background: 'none', border: 'none', color: '#007AFF', marginTop: 20, cursor: 'pointer', width: '100%', fontWeight: 600}} onClick={() => setAuthStep(authStep === 'reg' ? 'login' : 'reg')}>
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

          {view === 'chats' && (
              <div className="view-container">
                <div className="nav-bar"><div className="nav-title">Чаты</div><Edit3 size={24} color="#007AFF" /></div>
                <div style={{padding: '0 16px 16px'}}><div style={{background: isDark ? '#1C1C1E' : '#E3E3E8', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px'}}><Search size={18} color="#8E8E93" /><input placeholder="Поиск" style={{background: 'none', border: 'none', outline: 'none', color: 'var(--text-main)', width: '100%'}} /></div></div>
                <div style={{flex: 1, overflowY: 'auto'}}>
                  <button className="ios-item" onClick={() => { setSelectedPeer({name: 'Общий чат', username: 'global'}); setView('chat_room'); }}>
                    <div style={{background: '#007AFF', width: 50, height: 50, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 14}}><Globe size={24} color="white"/></div>
                    <div style={{flex: 1}}><b style={{fontSize: 17}}>Общий чат</b><div style={{fontSize: 14, color: 'var(--text-sec)'}}>Групповая беседа</div></div>
                  </button>
                  {allUsers.filter(u => u.username !== user.username).map(u => (
                      <button key={u.username} className="ios-item" onClick={() => { setSelectedPeer(u); setView('chat_room'); }}>
                        <img src={u.avatar} className="avatar" />
                        <div style={{flex: 1}}><b style={{fontSize: 17}}>{u.name}</b><div style={{fontSize: 14, color: 'var(--text-sec)'}}>@{u.username}</div></div>
                      </button>
                  ))}
                </div>
              </div>
          )}

          {view === 'settings' && (
              <div className="view-container">
                <div className="nav-bar"><div className="nav-title">Настройки</div></div>
                <div className="ios-list">
                  <div style={{padding: 20, textAlign: 'center'}}>
                    <div style={{position: 'relative', display: 'inline-block'}}>
                      <img src={user.avatar} className="avatar-huge" />
                      <label style={{position: 'absolute', bottom: 15, right: 0, background: '#007AFF', borderRadius: '50%', padding: 8, cursor: 'pointer', border: '3px solid var(--card-bg)'}}>
                        <Camera size={18} color="white" />
                        <input type="file" hidden accept="image/*" onChange={onAvatarChange} />
                      </label>
                    </div>
                    <h3 style={{fontSize: 22, fontWeight: 800}}>{user.name}</h3>
                    <p style={{color: 'var(--text-sec)'}}>@{user.username}</p>
                  </div>
                </div>
                <div className="ios-list">
                  <button className="ios-item" onClick={() => { setIsDark(!isDark); localStorage.setItem('aura_dark', !isDark); }}><Sun style={{marginRight: 12}} size={20}/> Темная тема</button>
                  <button className="ios-item" onClick={() => { localStorage.clear(); window.location.reload(); }} style={{color: '#FF3B30'}}><LogOut style={{marginRight: 12}} size={20}/> Выйти</button>
                </div>
              </div>
          )}

          {view === 'chat_room' && (
              <div className="view-container">
                <div className="nav-bar">
                  <button onClick={() => setView('chats')} style={{background: 'none', border: 'none', color: '#007AFF'}}><ChevronLeft size={34} /></button>
                  <div style={{textAlign: 'center'}}><b style={{fontSize: 17}}>{selectedPeer.name}</b><div style={{fontSize: 11, color: '#34C759'}}>в сети</div></div>
                  <img src={selectedPeer.avatar || ''} className="avatar" style={{width: 36, height: 36}} />
                </div>

                <div ref={scrollRef} className="chat-scroll">
                  <div style={{flex: 1}}></div>
                  {currentMessages.map((m) => (
                      <div key={m.id} className={`chat-bubble ${m.uid === user.username ? 'bubble-me' : 'bubble-other'}`} onClick={() => setActiveReactionId(m.id)}>
                        {m.type === 'video_circle' ? (
                            <video src={m.text} controls className="circle-video" />
                        ) : m.type === 'voice' ? (
                            <audio src={m.text} controls style={{width: 180}} />
                        ) : <div>{m.text}</div>}

                        {activeReactionId === m.id && (
                            <div className="reaction-picker">
                              {['❤️', '👍', '🔥', '😂'].map(e => <span key={e} onClick={() => addReaction(m.id, e)} style={{fontSize: 20, cursor: 'pointer'}}>{e}</span>)}
                            </div>
                        )}

                        {m.reactions && Object.keys(m.reactions).length > 0 && (
                            <div className="reaction-badge">
                              {Array.from(new Set(Object.values(m.reactions))).map(emoji => <span key={emoji}>{emoji}</span>)}
                            </div>
                        )}
                        <div style={{fontSize: 10, opacity: 0.5, textAlign: 'right', marginTop: 4}}>{new Date(m.ts).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</div>
                      </div>
                  ))}
                </div>

                <div style={{padding: '10px 16px 35px', background: 'var(--nav-bg)', backdropFilter: 'blur(25px)', display: 'flex', gap: 10, alignItems: 'center', borderTop: '0.5px solid var(--sep)'}}>
                  {isRecording ? (
                      <div style={{flex: 1, display: 'flex', alignItems: 'center', background: '#FF3B30', padding: '10px 15px', borderRadius: 20, color: 'white'}}>
                        {isRecording === 'video' && <video ref={videoRef} autoPlay muted className="circle-video" style={{width: 40, height: 40, marginRight: 10, border: 'none'}} />}
                        <span style={{flex: 1}}>Запись {isRecording === 'video' ? 'кружочка' : 'голоса'}... {recTime}с</span>
                        <button onClick={stopMediaRecording} style={{background: 'white', border: 'none', color: '#FF3B30', borderRadius: '50%', padding: 5}}><Square size={16}/></button>
                      </div>
                  ) : (
                      <>
                        <button onMouseDown={() => startMediaRecording('video')} onTouchStart={() => startMediaRecording('video')} style={{background: 'none', border: 'none', color: '#8E8E93'}}><Camera size={26}/></button>
                        <input style={{flex: 1, padding: '11px 16px', borderRadius: 22, border: 'none', background: isDark ? '#2C2C2E' : '#FFFFFF', color: 'var(--text-main)', fontSize: 16}} value={input} onChange={e => setInput(e.target.value)} placeholder="Сообщение" onKeyDown={e => e.key === 'Enter' && sendMessage(input)} />
                        {input.trim() ? (
                            <button onClick={() => sendMessage(input)} style={{background: '#007AFF', borderRadius: '50%', width: 38, height: 38, border: 'none', color: 'white'}}><Send size={18}/></button>
                        ) : <button onMouseDown={() => startMediaRecording('voice')} onTouchStart={() => startMediaRecording('voice')} style={{background: 'none', border: 'none', color: '#8E8E93'}}><Mic size={26}/></button>}
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