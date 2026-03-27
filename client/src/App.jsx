import React, { useState, useEffect, useRef } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, onSnapshot, addDoc, updateDoc } from 'firebase/firestore';
import {
  Search, MessageCircle, ChevronLeft, Send, Phone, Plus,
  User as UserIcon, LogOut, Video, Moon, Sun, Camera,
  ChevronRight, Bell, Shield, Smartphone, Globe, MoreHorizontal, Edit3, Mic, Save, Square, Play
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

// Глобальные переменные окружения (если доступны)
const envConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : firebaseConfig;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'aura-pro-v26';

// Инициализация
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
    --nav-bg: ${isDark ? 'rgba(28, 28, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  }
  
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; background: #000; color: var(--text-main); overflow: hidden; }
  
  .app-container { width: 100vw; height: 100vh; display: flex; justify-content: center; background: #000; }
  
  .phone-screen { 
    width: 100%; max-width: 500px; height: 100%; background: var(--ios-bg); 
    position: relative; display: flex; flex-direction: column; overflow: hidden;
  }

  .ios-list { background: var(--card-bg); margin: 15px 16px; border-radius: 12px; overflow: hidden; }
  .ios-item { 
    display: flex; align-items: center; padding: 12px 16px; cursor: pointer; 
    transition: background 0.2s; position: relative; width: 100%; border: none; background: none; text-align: left;
  }
  .ios-item:active { background: ${isDark ? '#2C2C2E' : '#E5E5EA'}; }
  .ios-item:not(:last-child)::after {
    content: ''; position: absolute; left: 56px; right: 0; bottom: 0; height: 0.5px; background: var(--sep);
  }

  .icon-box { width: 30px; height: 30px; border-radius: 7px; display: flex; align-items: center; justify-content: center; margin-right: 12px; color: white; flex-shrink: 0; }
  .avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; flex-shrink: 0; margin-right: 12px; }
  .avatar-lg { width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 10px; display: block; border: 2px solid var(--ios-blue); }

  .nav-bar { padding: 50px 16px 15px; background: var(--nav-bg); backdrop-filter: blur(20px); border-bottom: 0.5px solid var(--sep); display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
  .nav-title { font-size: 34px; font-weight: 800; color: var(--text-main); }

  .chat-bubble { max-width: 75%; padding: 10px 14px; border-radius: 18px; margin-bottom: 4px; font-size: 16px; position: relative; word-wrap: break-word; }
  .bubble-me { background: var(--ios-blue); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
  .bubble-other { background: ${isDark ? '#262629' : '#E9E9EB'}; color: var(--text-main); align-self: flex-start; border-bottom-left-radius: 4px; }

  .tab-bar { height: 85px; background: var(--nav-bg); backdrop-filter: blur(20px); border-top: 0.5px solid var(--sep); display: flex; justify-content: space-around; padding-top: 10px; }
  .tab-item { display: flex; flex-direction: column; align-items: center; gap: 4px; color: var(--text-sec); cursor: pointer; border: none; background: none; }
  .tab-item.active { color: var(--ios-blue); }

  .ios-input { 
    width: 100%; padding: 12px 15px; margin-bottom: 12px; border-radius: 12px; 
    border: 1px solid var(--sep); background: ${isDark ? '#2C2C2E' : '#FFFFFF'}; 
    color: var(--text-main); font-size: 16px; outline: none; display: block;
  }

  .btn-primary { 
    width: 100%; padding: 16px; background: var(--ios-blue); color: white; 
    border: none; border-radius: 14px; font-weight: 700; font-size: 17px; cursor: pointer;
  }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .record-pulse { animation: pulse 1s infinite; background: #FF3B30 !important; }
  @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
  
  .slide-in { animation: slideIn 0.3s ease-out forwards; }
  @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
`;

export default function App() {
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(localStorage.getItem('aura_dark') === 'true');
  const [view, setView] = useState('chats'); // chats, settings, chat_room, profile_edit
  const [authStep, setAuthStep] = useState('login'); // login, reg

  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const [formData, setFormData] = useState({ username: '', password: '', name: '', bio: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const scrollRef = useRef();
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  // --- Инициализация Auth и Sync ---
  useEffect(() => {
    const init = async () => {
      try {
        await signInAnonymously(auth);
        const saved = localStorage.getItem('aura_user');
        if (saved) setUser(JSON.parse(saved));
      } catch (e) {
        console.error("Firebase Auth Error", e);
      }
    };
    init();

    if (db) {
      const unsubUsers = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'users'), (s) => {
        setAllUsers(s.docs.map(d => d.data()));
      });

      const unsubMsgs = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), (s) => {
        const msgs = s.docs.map(d => d.data()).sort((a,b) => a.ts - b.ts);
        setMessages(msgs);
      });

      return () => { unsubUsers(); unsubMsgs(); };
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, view]);

  // --- Обработчики ---
  const handleAuth = async () => {
    const { username, password, name } = formData;
    if (!username || !password) {
      setErrorMsg("Заполните логин и пароль");
      return;
    }
    setLoading(true);
    setErrorMsg('');

    try {
      const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', username.toLowerCase().trim());
      const snap = await getDoc(userRef);

      if (authStep === 'reg') {
        if (snap.exists()) {
          setLoading(false);
          setErrorMsg("Этот никнейм уже занят");
          return;
        }
        const newUser = {
          username: username.toLowerCase().trim(),
          password,
          name: name || username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
          bio: 'Использую Aura'
        };
        await setDoc(userRef, newUser);
        completeLogin(newUser);
      } else {
        if (!snap.exists() || snap.data().password !== password) {
          setLoading(false);
          setErrorMsg("Неверный логин или пароль");
          return;
        }
        completeLogin(snap.data());
      }
    } catch (e) {
      console.error(e);
      setErrorMsg("Ошибка базы данных. Проверьте настройки Firebase.");
      setLoading(false);
    }
  };

  const completeLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('aura_user', JSON.stringify(userData));
    setLoading(false);
  };

  const sendMessage = async (val, type = 'text') => {
    if (!val.trim() && type === 'text') return;
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
        text: val, uid: user.username, ts: Date.now(), type, name: user.name
      });
      setInput('');
    } catch (e) { console.error(e); }
  };

  const startRecord = async () => {
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
    } catch (e) { alert("Микрофон недоступен"); }
  };

  const stopRecord = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  // --- Рендер ---
  if (!user) return (
      <div className="app-container">
        <style>{auraStyles(isDark)}</style>
        <div className="phone-screen" style={{justifyContent: 'center', padding: '20px'}}>
          <div style={{background: 'var(--card-bg)', padding: '30px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}>
            <div style={{width: 70, height: 70, background: '#007AFF', borderRadius: 20, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <MessageCircle color="white" size={40} />
            </div>
            <h2 style={{color: 'var(--text-main)', marginBottom: '10px'}}>{authStep === 'reg' ? 'Регистрация' : 'Вход в Aura'}</h2>

            {errorMsg && <div style={{color: '#FF3B30', fontSize: '14px', marginBottom: '15px', background: 'rgba(255,59,48,0.1)', padding: '10px', borderRadius: '10px'}}>{errorMsg}</div>}

            <input
                className="ios-input"
                placeholder="Логин"
                autoCapitalize="none"
                onChange={e => { setFormData({...formData, username: e.target.value}); setErrorMsg(''); }}
            />
            <input
                className="ios-input"
                type="password"
                placeholder="Пароль"
                onChange={e => { setFormData({...formData, password: e.target.value}); setErrorMsg(''); }}
            />
            {authStep === 'reg' && (
                <input
                    className="ios-input"
                    placeholder="Ваше имя"
                    onChange={e => setFormData({...formData, name: e.target.value})}
                />
            )}

            <button
                className="btn-primary"
                onClick={handleAuth}
                disabled={loading}
            >
              {loading ? 'Загрузка...' : 'Продолжить'}
            </button>

            <button
                onClick={() => { setAuthStep(authStep === 'reg' ? 'login' : 'reg'); setErrorMsg(''); }}
                style={{marginTop: '20px', color: '#007AFF', border: 'none', background: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: '600', width: '100%'}}
            >
              {authStep === 'reg' ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Создать'}
            </button>
          </div>
        </div>
      </div>
  );

  const filteredUsers = allUsers.filter(u =>
      u.username !== user.username &&
      (u.username.toLowerCase().includes(search.toLowerCase()) || u.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
      <div className="app-container">
        <style>{auraStyles(isDark)}</style>
        <div className="phone-screen">

          {view === 'chats' && (
              <>
                <div className="nav-bar">
                  <div className="nav-title">Чаты</div>
                  <Edit3 size={24} color="#007AFF" />
                </div>
                <div style={{padding: '10px 16px'}}>
                  <div style={{background: isDark ? '#1C1C1E' : '#E3E3E8', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Search size={18} color="#8E8E93" />
                    <input
                        placeholder="Поиск по нику или имени"
                        style={{background: 'none', border: 'none', outline: 'none', color: 'var(--text-main)', width: '100%', fontSize: '16px'}}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{flex: 1, overflowY: 'auto'}}>
                  <button className="ios-item" onClick={() => setView('chat_room')}>
                    <div className="icon-box" style={{background: '#007AFF', width: 48, height: 48, borderRadius: '50%'}}><Globe size={24}/></div>
                    <div style={{flex: 1}}>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <b style={{color: 'var(--text-main)'}}>Общий чат</b>
                        <span style={{fontSize: '12px', color: 'var(--text-sec)'}}>Online</span>
                      </div>
                      <div style={{fontSize: '14px', color: 'var(--text-sec)'}}>Нажмите, чтобы войти</div>
                    </div>
                    <ChevronRight size={18} color="#C6C6C8" />
                  </button>

                  {search && filteredUsers.map(u => (
                      <button key={u.username} className="ios-item" onClick={() => setView('chat_room')}>
                        <img src={u.avatar} className="avatar" alt="Avatar" />
                        <div style={{flex: 1}}>
                          <b style={{color: 'var(--text-main)'}}>{u.name}</b>
                          <div style={{fontSize: '13px', color: 'var(--text-sec)'}}>@{u.username}</div>
                        </div>
                        <ChevronRight size={18} color="#C6C6C8" />
                      </button>
                  ))}
                </div>
              </>
          )}

          {view === 'settings' && (
              <div className="slide-in" style={{flex: 1, overflowY: 'auto'}}>
                <div className="nav-bar"><div className="nav-title">Настройки</div></div>
                <div className="ios-list">
                  <button className="ios-item" onClick={() => setView('profile_edit')}>
                    <img src={user.avatar} className="avatar" style={{width: 60, height: 60}} />
                    <div style={{flex: 1}}>
                      <div style={{fontSize: '20px', fontWeight: '700', color: 'var(--text-main)'}}>{user.name}</div>
                      <div style={{color: 'var(--text-sec)'}}>@{user.username}</div>
                    </div>
                    <ChevronRight color="#C6C6C8" />
                  </button>
                </div>

                <div className="ios-list">
                  <button className="ios-item" onClick={() => { setIsDark(!isDark); localStorage.setItem('aura_dark', !isDark); }}>
                    <div className="icon-box" style={{background: '#5856D6'}}>{isDark ? <Sun size={18}/> : <Moon size={18}/>}</div>
                    <div style={{flex: 1, color: 'var(--text-main)'}}>Темная тема</div>
                    <div style={{color: 'var(--text-sec)', marginRight: '10px'}}>{isDark ? 'Вкл' : 'Выкл'}</div>
                  </button>
                  <div className="ios-item">
                    <div className="icon-box" style={{background: '#FF9500'}}><Bell size={18}/></div>
                    <div style={{flex: 1, color: 'var(--text-main)'}}>Уведомления</div>
                    <ChevronRight size={18} color="#C6C6C8" />
                  </div>
                </div>

                <div className="ios-list">
                  <div className="ios-item">
                    <div className="icon-box" style={{background: '#34C759'}}><Shield size={18}/></div>
                    <div style={{flex: 1, color: 'var(--text-main)'}}>Конфиденциальность</div>
                    <ChevronRight size={18} color="#C6C6C8" />
                  </div>
                </div>

                <div className="ios-list">
                  <button className="ios-item" onClick={() => { localStorage.clear(); window.location.reload(); }}>
                    <div className="icon-box" style={{background: '#FF3B30'}}><LogOut size={18}/></div>
                    <div style={{flex: 1, color: '#FF3B30', fontWeight: '600'}}>Выйти из аккаунта</div>
                  </button>
                </div>
              </div>
          )}

          {view === 'profile_edit' && (
              <div className="slide-in" style={{flex: 1, overflowY: 'auto'}}>
                <div className="nav-bar" style={{paddingLeft: '10px'}}>
                  <button onClick={() => setView('settings')} style={{background: 'none', border: 'none', color: '#007AFF', display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                    <ChevronLeft size={30} /> <span style={{fontSize: '17px'}}>Назад</span>
                  </button>
                  <b style={{fontSize: '17px', color: 'var(--text-main)'}}>Профиль</b>
                  <div style={{width: 50}}></div>
                </div>
                <div style={{textAlign: 'center', marginTop: '20px', padding: '20px'}}>
                  <div style={{position: 'relative', display: 'inline-block', marginBottom: '20px'}}>
                    <img src={user.avatar} className="avatar-lg" alt="Profile" />
                    <div style={{position: 'absolute', bottom: 5, right: 0, background: '#007AFF', borderRadius: '50%', padding: '6px', border: '3px solid var(--card-bg)'}}><Camera size={16} color="white" /></div>
                  </div>
                  <div className="ios-list">
                    <div className="ios-item"><input className="ios-input" style={{margin: 0, border: 'none'}} defaultValue={user.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Имя" /></div>
                    <div className="ios-item"><input className="ios-input" style={{margin: 0, border: 'none'}} defaultValue={user.bio} onChange={e => setFormData({...formData, bio: e.target.value})} placeholder="О себе" /></div>
                  </div>
                  <button className="btn-primary" onClick={async () => {
                    const ref = doc(db, 'artifacts', appId, 'public', 'data', 'users', user.username);
                    const updates = { name: formData.name || user.name, bio: formData.bio || user.bio };
                    await updateDoc(ref, updates);
                    setUser({...user, ...updates});
                    setView('settings');
                  }}>Сохранить</button>
                </div>
              </div>
          )}

          {view === 'chat_room' && (
              <div className="slide-in" style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <div className="nav-bar" style={{paddingTop: '50px'}}>
                  <button onClick={() => setView('chats')} style={{background: 'none', border: 'none', color: '#007AFF', display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                    <ChevronLeft size={32} /> <span>Назад</span>
                  </button>
                  <div style={{textAlign: 'center'}}>
                    <b style={{display: 'block', color: 'var(--text-main)'}}>Общий чат</b>
                    <span style={{fontSize: '11px', color: '#34C759', fontWeight: 'bold'}}>в сети</span>
                  </div>
                  <Phone size={22} color="#007AFF" />
                </div>
                <div ref={scrollRef} style={{flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', padding: '15px'}}>
                  {messages.map((m, i) => (
                      <div key={i} className={`chat-bubble ${m.uid === user.username ? 'bubble-me' : 'bubble-other'}`}>
                        {m.uid !== user.username && <div style={{fontSize: '11px', fontWeight: '700', marginBottom: '4px', color: '#FF9500'}}>{m.name || m.uid}</div>}
                        {m.type === 'voice' ? (
                            <audio src={m.text} controls style={{width: '200px', height: '35px'}} />
                        ) : (
                            <div style={{wordBreak: 'break-word'}}>{m.text}</div>
                        )}
                        <div style={{fontSize: '10px', opacity: 0.5, textAlign: 'right', marginTop: '4px'}}>
                          {m.ts ? new Date(m.ts).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                        </div>
                      </div>
                  ))}
                </div>
                <div style={{padding: '10px 16px 35px', background: 'var(--nav-bg)', backdropFilter: 'blur(20px)', display: 'flex', gap: '10px', alignItems: 'center', borderTop: '0.5px solid var(--sep)'}}>
                  <Plus size={28} color="#007AFF" style={{cursor: 'pointer'}} />
                  <input
                      style={{flex: 1, padding: '10px 15px', borderRadius: '20px', border: 'none', background: isDark ? '#2C2C2E' : '#FFFFFF', color: 'var(--text-main)', fontSize: '16px', outline: 'none'}}
                      value={input} onChange={e => setInput(e.target.value)} placeholder="Сообщение"
                      onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                  />
                  <button
                      onMouseDown={startRecord} onMouseUp={stopRecord} onTouchStart={startRecord} onTouchEnd={stopRecord}
                      className={isRecording ? 'record-pulse' : ''}
                      style={{background: isRecording ? '#FF3B30' : '#8E8E93', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer'}}
                  >
                    {isRecording ? <Square size={16} color="white" /> : <Mic size={20} color="white" />}
                  </button>
                  {input.trim() && (
                      <button onClick={() => sendMessage(input)} style={{background: '#007AFF', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer'}}>
                        <Send size={18} color="white" />
                      </button>
                  )}
                </div>
              </div>
          )}

          {view !== 'chat_room' && (
              <div className="tab-bar">
                <button className={`tab-item ${view === 'chats' ? 'active' : ''}`} onClick={() => setView('chats')}>
                  <MessageCircle size={28} />
                  <span style={{fontSize: '10px'}}>Чаты</span>
                </button>
                <button className={`tab-item ${view === 'settings' ? 'active' : ''}`} onClick={() => setView('settings')}>
                  <UserIcon size={28} />
                  <span style={{fontSize: '10px'}}>Настройки</span>
                </button>
              </div>
          )}
        </div>
      </div>
  );
}