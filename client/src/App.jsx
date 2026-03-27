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
  ChevronRight, Bell, Shield, Smartphone, Globe, MoreHorizontal, Edit3, Mic, Save, Square, Play
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

// Инициализация сервисов
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
  .phone-screen { width: 100%; max-width: 500px; height: 100%; background: var(--ios-bg); position: relative; display: flex; flex-direction: column; overflow: hidden; }

  /* Центрирование и оформление карточки авторизации */
  .auth-wrap { flex: 1; display: flex; align-items: center; justify-content: center; padding: 20px; background: var(--ios-bg); }
  .auth-card { 
    background: var(--card-bg); 
    width: 100%; 
    max-width: 360px; 
    padding: 40px 24px; 
    border-radius: 32px; 
    box-shadow: 0 15px 35px rgba(0,0,0,0.1); 
    display: flex; 
    flex-direction: column;
    gap: 0;
  }
  
  .auth-logo-box {
    width: 70px; height: 70px; background: var(--ios-blue); border-radius: 20px; 
    margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 20px rgba(0,122,255,0.3);
  }

  .auth-card h2 { margin-bottom: 8px; font-size: 24px; font-weight: 800; text-align: center; color: var(--text-main); }
  .auth-card p.subtitle { color: var(--text-sec); margin-bottom: 30px; font-size: 15px; text-align: center; }

  .input-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; width: 100%; }
  .input-label { font-size: 13px; font-weight: 600; color: var(--text-sec); margin-left: 4px; }

  .ios-input { 
    width: 100%; padding: 14px 16px; border-radius: 12px; 
    border: 1.5px solid var(--sep); background: ${isDark ? '#2C2C2E' : '#FFFFFF'}; 
    color: var(--text-main); font-size: 16px; outline: none;
    transition: border-color 0.2s;
  }
  .ios-input:focus { border-color: var(--ios-blue); }

  .btn-primary { 
    width: 100%; padding: 16px; background: var(--ios-blue); color: white; 
    border: none; border-radius: 16px; font-weight: 700; font-size: 17px; cursor: pointer;
    margin-top: 10px; transition: background 0.2s, transform 0.1s;
  }
  .btn-primary:active { transform: scale(0.98); background: #0062CC; }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .auth-toggle-btn {
    background: none; border: none; color: var(--ios-blue); font-size: 15px; font-weight: 600;
    margin-top: 24px; cursor: pointer; text-align: center; width: 100%;
  }

  /* Навигация */
  .nav-bar { padding: 50px 16px 15px; background: var(--nav-bg); backdrop-filter: blur(20px); border-bottom: 0.5px solid var(--sep); display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
  .nav-title { font-size: 32px; font-weight: 800; letter-spacing: -0.5px; }
  
  .ios-list { background: var(--card-bg); margin: 16px; border-radius: 12px; overflow: hidden; }
  .ios-item { display: flex; align-items: center; padding: 12px 16px; cursor: pointer; transition: background 0.2s; border: none; background: none; text-align: left; width: 100%; color: var(--text-main); position: relative; }
  .ios-item:active { background: ${isDark ? '#2C2C2E' : '#E5E5EA'}; }
  .ios-item:not(:last-child)::after { content: ''; position: absolute; left: 60px; right: 0; bottom: 0; height: 0.5px; background: var(--sep); }

  .chat-bubble { max-width: 75%; padding: 10px 14px; border-radius: 18px; margin-bottom: 6px; font-size: 16px; position: relative; word-wrap: break-word; line-height: 1.4; }
  .bubble-me { background: var(--ios-blue); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
  .bubble-other { background: ${isDark ? '#262629' : '#E9E9EB'}; color: var(--text-main); align-self: flex-start; border-bottom-left-radius: 4px; }

  .error-msg { color: #FF3B30; font-size: 13px; background: rgba(255,59,48,0.1); padding: 12px; border-radius: 12px; margin-bottom: 16px; line-height: 1.4; font-weight: 500; }
  
  .tab-bar { height: 85px; background: var(--nav-bg); backdrop-filter: blur(20px); border-top: 0.5px solid var(--sep); display: flex; justify-content: space-around; padding-top: 10px; }
  .tab-item { display: flex; flex-direction: column; align-items: center; gap: 4px; color: var(--text-sec); cursor: pointer; border: none; background: none; }
  .tab-item.active { color: var(--ios-blue); }

  .avatar { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; flex-shrink: 0; margin-right: 12px; }
`;

export default function App() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(localStorage.getItem('aura_dark') === 'true');
  const [view, setView] = useState('chats');
  const [authStep, setAuthStep] = useState('login');
  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({ username: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const scrollRef = useRef();

  // 1. Инициализация Auth
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (e) {
        console.error("Auth init fail:", e);
        setErrorMsg("Ошибка связи: " + e.message);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setFirebaseUser(u);
      if (u) {
        const saved = localStorage.getItem('aura_user');
        if (saved) { try { setUser(JSON.parse(saved)); } catch (e) { localStorage.removeItem('aura_user'); } }
      } else {
        initAuth();
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Синхронизация данных
  useEffect(() => {
    if (!firebaseUser) return;

    const unsubUsers = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'users'), (s) => {
      setAllUsers(s.docs.map(d => d.data()));
    }, (err) => {
      if (err.code === 'permission-denied') setErrorMsg("База данных заблокирована. Проверьте Rules!");
    });

    const unsubMsgs = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), (s) => {
      setMessages(s.docs.map(d => d.data()).sort((a,b) => a.ts - b.ts));
    });

    return () => { unsubUsers(); unsubMsgs(); };
  }, [firebaseUser]);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, view]);

  const handleAuth = async () => {
    const { username, password, name } = formData;
    if (!username || !password) return setErrorMsg("Заполните все поля");
    if (!firebaseUser) return setErrorMsg("Подключение...");

    setLoading(true); setErrorMsg('');

    try {
      const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', username.toLowerCase().trim());
      const snap = await getDoc(userRef);

      if (authStep === 'reg') {
        if (snap.exists()) { setLoading(false); return setErrorMsg("Логин занят"); }
        const newUser = {
          username: username.toLowerCase().trim(), password, name: name || username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`, bio: 'В Aura'
        };
        await setDoc(userRef, newUser);
        loginSuccess(newUser);
      } else {
        if (!snap.exists() || snap.data().password !== password) { setLoading(false); return setErrorMsg("Неверный логин или пароль"); }
        loginSuccess(snap.data());
      }
    } catch (e) {
      setErrorMsg("Ошибка Firestore. Проверьте вкладку Rules.");
      setLoading(false);
    }
  };

  const loginSuccess = (u) => {
    setUser(u);
    localStorage.setItem('aura_user', JSON.stringify(u));
    setLoading(false);
  };

  const sendMessage = async (val) => {
    if (!val.trim() || !firebaseUser || !user) return;
    try {
      await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
        text: val, uid: user.username, ts: Date.now(), name: user.name
      });
      setInput('');
    } catch (e) { console.error(e); }
  };

  if (!user) return (
      <div className="app-container">
        <style>{auraStyles(isDark)}</style>
        <div className="auth-wrap">
          <div className="auth-card">
            <div className="auth-logo-box">
              <MessageCircle color="white" size={40} />
            </div>
            <h2>{authStep === 'reg' ? 'Регистрация' : 'Вход в Aura'}</h2>
            <p className="subtitle">Приватный мессенджер нового поколения</p>

            {errorMsg && <div className="error-msg">{errorMsg}</div>}

            <div className="input-group">
              <span className="input-label">Ваш логин</span>
              <input className="ios-input" placeholder="Напр: aura_user" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
            </div>

            <div className="input-group">
              <span className="input-label">Пароль</span>
              <input className="ios-input" type="password" placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>

            {authStep === 'reg' && (
                <div className="input-group">
                  <span className="input-label">Ваше имя</span>
                  <input className="ios-input" placeholder="Как вас зовут?" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
            )}

            <button className="btn-primary" onClick={handleAuth} disabled={loading || !firebaseUser}>
              {loading ? 'Загрузка...' : 'Продолжить'}
            </button>

            <button className="auth-toggle-btn" onClick={() => { setAuthStep(authStep === 'reg' ? 'login' : 'reg'); setErrorMsg(''); }}>
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
          {view === 'chats' && (
              <>
                <div className="nav-bar"><div className="nav-title">Чаты</div><Edit3 size={24} color="#007AFF" /></div>
                <div style={{padding: '0 16px 16px'}}>
                  <div style={{background: isDark ? '#1C1C1E' : '#E3E3E8', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Search size={18} color="#8E8E93" /><input placeholder="Поиск" style={{background: 'none', border: 'none', outline: 'none', color: 'var(--text-main)', width: '100%', fontSize: '16px'}} value={search} onChange={e => setSearch(e.target.value)} />
                  </div>
                </div>
                <div style={{flex: 1, overflowY: 'auto'}}>
                  <button className="ios-item" onClick={() => setView('chat_room')}>
                    <div style={{background: '#007AFF', width: 50, height: 50, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12}}><Globe size={24} color="white"/></div>
                    <div style={{flex: 1}}><div style={{display: 'flex', justifyContent: 'space-between'}}><b style={{fontSize: '17px'}}>Общий чат</b><span style={{fontSize: '12px', color: 'var(--text-sec)'}}>Online</span></div><div style={{fontSize: '14px', color: 'var(--text-sec)'}}>Присоединиться к беседе</div></div>
                    <ChevronRight size={18} color="#C6C6C8" />
                  </button>
                  {allUsers.filter(u => u.username !== user.username && u.username.includes(search.toLowerCase())).map(u => (
                      <button key={u.username} className="ios-item" onClick={() => setView('chat_room')}>
                        <img src={u.avatar} className="avatar" />
                        <div style={{flex: 1}}><b style={{fontSize: '17px'}}>{u.name}</b><div style={{fontSize: '14px', color: 'var(--text-sec)'}}>@{u.username}</div></div>
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
                  <div className="ios-item">
                    <img src={user.avatar} className="avatar" style={{width: 60, height: 60}} />
                    <div style={{flex: 1}}><div style={{fontSize: '20px', fontWeight: '700'}}>{user.name}</div><div style={{color: 'var(--text-sec)'}}>@{user.username}</div></div>
                  </div>
                </div>
                <div className="ios-list">
                  <button className="ios-item" onClick={() => { setIsDark(!isDark); localStorage.setItem('aura_dark', !isDark); }}>
                    <div style={{background: '#5856D6', width: 30, height: 30, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, color: 'white'}}>{isDark ? <Sun size={18}/> : <Moon size={18}/>}</div>
                    <div style={{flex: 1}}>Темная тема</div><div style={{color: 'var(--text-sec)', marginRight: 8}}>{isDark ? 'Вкл' : 'Выкл'}</div>
                  </button>
                </div>
                <div className="ios-list">
                  <button className="ios-item" onClick={() => { localStorage.clear(); window.location.reload(); }}>
                    <div style={{background: '#FF3B30', width: 30, height: 30, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, color: 'white'}}><LogOut size={18}/></div>
                    <div style={{flex: 1, color: '#FF3B30', fontWeight: '600'}}>Выйти из аккаунта</div>
                  </button>
                </div>
              </div>
          )}

          {view === 'chat_room' && (
              <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <div className="nav-bar" style={{paddingTop: '50px'}}>
                  <button onClick={() => setView('chats')} style={{background: 'none', border: 'none', color: '#007AFF', display: 'flex', alignItems: 'center', cursor: 'pointer'}}><ChevronLeft size={32} /> <span>Назад</span></button>
                  <div style={{textAlign: 'center'}}><b style={{display: 'block'}}>Общий чат</b><span style={{fontSize: '11px', color: '#34C759', fontWeight: 'bold'}}>в сети</span></div>
                  <div style={{width: 40}}></div>
                </div>
                <div ref={scrollRef} style={{flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', padding: '16px'}}>
                  {messages.map((m, i) => (
                      <div key={i} className={`chat-bubble ${m.uid === user.username ? 'bubble-me' : 'bubble-other'}`}>
                        {m.uid !== user.username && <div style={{fontSize: '11px', fontWeight: '700', marginBottom: '4px', color: '#FF9500'}}>{m.name || m.uid}</div>}
                        <div>{m.text}</div>
                        <div style={{fontSize: '10px', opacity: 0.6, textAlign: 'right', marginTop: '4px'}}>{m.ts ? new Date(m.ts).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}</div>
                      </div>
                  ))}
                </div>
                <div style={{padding: '10px 16px 35px', background: 'var(--nav-bg)', backdropFilter: 'blur(20px)', display: 'flex', gap: '10px', alignItems: 'center', borderTop: '0.5px solid var(--sep)'}}>
                  <Plus size={28} color="#007AFF" />
                  <input style={{flex: 1, padding: '10px 15px', borderRadius: '20px', border: 'none', background: isDark ? '#2C2C2E' : '#FFFFFF', color: 'var(--text-main)', fontSize: '16px', outline: 'none'}} value={input} onChange={e => setInput(e.target.value)} placeholder="Сообщение" onKeyDown={e => e.key === 'Enter' && sendMessage(input)} />
                  {input.trim() ? (
                      <button onClick={() => sendMessage(input)} style={{background: '#007AFF', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer'}}><Send size={18} color="white" /></button>
                  ) : <Mic size={24} color="#8E8E93" />}
                </div>
              </div>
          )}

          {view !== 'chat_room' && (
              <div className="tab-bar">
                <button className={`tab-item ${view === 'chats' ? 'active' : ''}`} onClick={() => setView('chats')}><MessageCircle size={28} /><span style={{fontSize: '11px'}}>Чаты</span></button>
                <button className={`tab-item ${view === 'settings' ? 'active' : ''}`} onClick={() => setView('settings')}><UserIcon size={28} /><span style={{fontSize: '11px'}}>Настройки</span></button>
              </div>
          )}
        </div>
      </div>
  );
}