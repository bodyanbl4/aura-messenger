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

// Инициализация сервисов Firebase
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
  
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; background: #000; color: var(--text-main); overflow: hidden; }
  
  .app-container { width: 100vw; height: 100vh; display: flex; justify-content: center; background: #000; }
  .phone-screen { width: 100%; max-width: 500px; height: 100%; background: var(--ios-bg); position: relative; display: flex; flex-direction: column; overflow: hidden; }

  .auth-wrap { flex: 1; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .auth-card { background: var(--card-bg); width: 100%; max-width: 340px; padding: 35px 25px; border-radius: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); text-align: center; }
  
  .ios-input { 
    width: 100%; padding: 14px 16px; margin-bottom: 12px; border-radius: 14px; 
    border: 1px solid var(--sep); background: ${isDark ? '#2C2C2E' : '#F2F2F7'}; 
    color: var(--text-main); font-size: 16px; outline: none; display: block;
  }

  .btn-primary { 
    width: 100%; padding: 16px; background: var(--ios-blue); color: white; 
    border: none; border-radius: 16px; font-weight: 700; font-size: 17px; cursor: pointer; margin-top: 10px;
    transition: opacity 0.2s;
  }
  .btn-primary:active { opacity: 0.8; }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .nav-bar { padding: 50px 16px 15px; background: var(--nav-bg); backdrop-filter: blur(20px); border-bottom: 0.5px solid var(--sep); display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
  .nav-title { font-size: 34px; font-weight: 800; }
  
  .ios-list { background: var(--card-bg); margin: 15px 16px; border-radius: 12px; overflow: hidden; }
  .ios-item { display: flex; align-items: center; padding: 12px 16px; cursor: pointer; transition: background 0.2s; width: 100%; border: none; background: none; text-align: left; color: var(--text-main); position: relative; }
  .ios-item:active { background: ${isDark ? '#2C2C2E' : '#E5E5EA'}; }
  .ios-item:not(:last-child)::after {
    content: ''; position: absolute; left: 56px; right: 0; bottom: 0; height: 0.5px; background: var(--sep);
  }

  .chat-bubble { max-width: 75%; padding: 10px 14px; border-radius: 18px; margin-bottom: 4px; font-size: 16px; position: relative; word-wrap: break-word; }
  .bubble-me { background: var(--ios-blue); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
  .bubble-other { background: ${isDark ? '#262629' : '#E9E9EB'}; color: var(--text-main); align-self: flex-start; border-bottom-left-radius: 4px; }

  .error-msg { color: #FF3B30; font-size: 13px; background: rgba(255,59,48,0.1); padding: 10px; border-radius: 12px; margin-bottom: 15px; line-height: 1.4; }
  
  .tab-bar { height: 85px; background: var(--nav-bg); backdrop-filter: blur(20px); border-top: 0.5px solid var(--sep); display: flex; justify-content: space-around; padding-top: 10px; }
  .tab-item { display: flex; flex-direction: column; align-items: center; gap: 4px; color: var(--text-sec); cursor: pointer; border: none; background: none; }
  .tab-item.active { color: var(--ios-blue); }

  .icon-box { width: 32px; height: 32px; border-radius: 7px; display: flex; align-items: center; justify-content: center; margin-right: 12px; color: white; flex-shrink: 0; }
  .avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; flex-shrink: 0; margin-right: 12px; }
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

  // --- 1. АВТОРИЗАЦИЯ (СТРОГО ПО ПРАВИЛАМ) ---
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
        setErrorMsg("Ошибка подключения: " + e.message);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setFirebaseUser(u);
      if (u) {
        const saved = localStorage.getItem('aura_user');
        if (saved) {
          try { setUser(JSON.parse(saved)); } catch (e) { localStorage.removeItem('aura_user'); }
        }
      } else {
        initAuth(); // Инициируем вход если нет сессии
      }
    });

    return () => unsubscribe();
  }, []);

  // --- 2. СИНХРОНИЗАЦИЯ (ТОЛЬКО ПОСЛЕ УСПЕШНОГО ВХОДА) ---
  useEffect(() => {
    if (!firebaseUser) return;

    // Синхронизация пользователей (Используем путьartifacts/...)
    const usersQuery = collection(db, 'artifacts', appId, 'public', 'data', 'users');
    const unsubUsers = onSnapshot(usersQuery,
        (s) => {
          setAllUsers(s.docs.map(d => d.data()));
        },
        (err) => {
          console.error("Users sync fail:", err);
          if (err.code === 'permission-denied') {
            setErrorMsg("База данных заблокирована. Проверьте вкладку 'Rules' в Firestore.");
          }
        }
    );

    // Синхронизация сообщений
    const msgsQuery = collection(db, 'artifacts', appId, 'public', 'data', 'messages');
    const unsubMsgs = onSnapshot(msgsQuery,
        (s) => {
          const msgsData = s.docs.map(d => d.data()).sort((a,b) => a.ts - b.ts);
          setMessages(msgsData);
        },
        (err) => {
          console.error("Msgs sync fail:", err);
        }
    );

    return () => { unsubUsers(); unsubMsgs(); };
  }, [firebaseUser]);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, view]);

  const handleAuth = async () => {
    const { username, password, name } = formData;
    if (!username || !password) return setErrorMsg("Введите логин и пароль");
    if (!firebaseUser) return setErrorMsg("Ожидание сервера... Попробуйте через мгновение");

    setLoading(true);
    setErrorMsg('');

    try {
      const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', username.toLowerCase().trim());
      const snap = await getDoc(userRef);

      if (authStep === 'reg') {
        if (snap.exists()) { setLoading(false); return setErrorMsg("Никнейм занят"); }
        const newUser = {
          username: username.toLowerCase().trim(), password, name: name || username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
          bio: 'Использую Aura'
        };
        await setDoc(userRef, newUser);
        loginSuccess(newUser);
      } else {
        if (!snap.exists() || snap.data().password !== password) { setLoading(false); return setErrorMsg("Неверный логин или пароль"); }
        loginSuccess(snap.data());
      }
    } catch (e) {
      console.error(e);
      setErrorMsg("Ошибка записи в базу. Убедитесь, что правила Firestore позволяют запись.");
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
    } catch (e) {
      console.error("Send message fail:", e);
      setErrorMsg("Ошибка отправки. Проверьте правила доступа.");
    }
  };

  if (!user) return (
      <div className="app-container">
        <style>{auraStyles(isDark)}</style>
        <div className="phone-screen">
          <div className="auth-wrap">
            <div className="auth-card">
              <div style={{width: 80, height: 80, background: '#007AFF', borderRadius: 24, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,122,255,0.3)'}}>
                <MessageCircle color="white" size={44} />
              </div>
              <h2 style={{margin: '0 0 10px', fontSize: '24px'}}>Aura Messenger</h2>
              <p style={{color: 'var(--text-sec)', marginBottom: '20px', fontSize: '15px'}}>{authStep === 'reg' ? 'Создание профиля' : 'Вход в аккаунт'}</p>

              {errorMsg && <div className="error-msg">{errorMsg}</div>}

              <input className="ios-input" placeholder="Логин" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
              <input className="ios-input" type="password" placeholder="Пароль" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              {authStep === 'reg' && <input className="ios-input" placeholder="Ваше имя" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />}

              <button className="btn-primary" onClick={handleAuth} disabled={loading || !firebaseUser}>
                {loading ? 'Загрузка...' : !firebaseUser ? 'Подключение...' : 'Продолжить'}
              </button>

              <button
                  onClick={() => { setAuthStep(authStep === 'reg' ? 'login' : 'reg'); setErrorMsg(''); }}
                  style={{marginTop: '25px', color: '#007AFF', border: 'none', background: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: '700'}}
              >
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
              <>
                <div className="nav-bar"><div className="nav-title">Чаты</div><Edit3 size={24} color="#007AFF" /></div>
                <div style={{padding: '10px 16px'}}>
                  <div style={{background: isDark ? '#1C1C1E' : '#E3E3E8', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Search size={18} color="#8E8E93" /><input placeholder="Поиск" style={{background: 'none', border: 'none', outline: 'none', color: 'var(--text-main)', width: '100%', fontSize: '16px'}} value={search} onChange={e => setSearch(e.target.value)} />
                  </div>
                </div>
                <div style={{flex: 1, overflowY: 'auto'}}>
                  <button className="ios-item" onClick={() => setView('chat_room')}>
                    <div className="icon-box" style={{background: '#007AFF', width: 52, height: 52, borderRadius: '50%'}}><Globe size={26}/></div>
                    <div style={{flex: 1}}><div style={{display: 'flex', justifyContent: 'space-between'}}><b style={{fontSize: '17px'}}>Общий чат</b><span style={{fontSize: '12px', color: 'var(--text-sec)'}}>Online</span></div><div style={{fontSize: '14px', color: 'var(--text-sec)'}}>Зайти и поздороваться</div></div>
                    <ChevronRight size={18} color="#C6C6C8" />
                  </button>
                  {allUsers.filter(u => u.username !== user.username && u.username.includes(search.toLowerCase())).map(u => (
                      <button key={u.username} className="ios-item" onClick={() => setView('chat_room')}>
                        <img src={u.avatar} className="avatar" style={{width: 52, height: 52, borderRadius: '50%', marginRight: 12}} />
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
                    <img src={user.avatar} className="avatar" style={{width: 60, height: 60, borderRadius: '50%', marginRight: 12}} />
                    <div style={{flex: 1}}><div style={{fontSize: '20px', fontWeight: '700'}}>{user.name}</div><div style={{color: 'var(--text-sec)'}}>@{user.username}</div></div>
                  </div>
                </div>
                <div className="ios-list">
                  <button className="ios-item" onClick={() => { setIsDark(!isDark); localStorage.setItem('aura_dark', !isDark); }}>
                    <div className="icon-box" style={{background: '#5856D6'}}>{isDark ? <Sun size={18}/> : <Moon size={18}/>}</div>
                    <div style={{flex: 1}}>Темная тема</div><div style={{color: 'var(--text-sec)', marginRight: 8}}>{isDark ? 'Вкл' : 'Выкл'}</div>
                    <ChevronRight size={18} color="#C6C6C8" />
                  </button>
                </div>
                <div className="ios-list">
                  <button className="ios-item" onClick={() => { localStorage.clear(); window.location.reload(); }}>
                    <div className="icon-box" style={{background: '#FF3B30'}}><LogOut size={18}/></div>
                    <div style={{flex: 1, color: '#FF3B30', fontWeight: '600'}}>Выйти</div>
                    <ChevronRight size={18} color="#C6C6C8" />
                  </button>
                </div>
              </div>
          )}

          {view === 'chat_room' && (
              <div className="slide-in" style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <div className="nav-bar" style={{paddingTop: '50px'}}>
                  <button onClick={() => setView('chats')} style={{background: 'none', border: 'none', color: '#007AFF', display: 'flex', alignItems: 'center', cursor: 'pointer'}}><ChevronLeft size={32} /> <span>Назад</span></button>
                  <div style={{textAlign: 'center'}}><b style={{display: 'block'}}>Общий чат</b><span style={{fontSize: '11px', color: '#34C759', fontWeight: 'bold'}}>в сети</span></div>
                  <div style={{width: 40}}></div>
                </div>
                <div ref={scrollRef} style={{flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', padding: '15px'}}>
                  {messages.map((m, i) => (
                      <div key={i} className={`chat-bubble ${m.uid === user.username ? 'bubble-me' : 'bubble-other'}`}>
                        {m.uid !== user.username && <div style={{fontSize: '11px', fontWeight: '700', marginBottom: '4px', color: '#FF9500'}}>{m.name || m.uid}</div>}
                        <div style={{wordBreak: 'break-word'}}>{m.text}</div>
                        <div style={{fontSize: '10px', opacity: 0.5, textAlign: 'right', marginTop: '4px'}}>{m.ts ? new Date(m.ts).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}</div>
                      </div>
                  ))}
                </div>
                <div style={{padding: '10px 16px 35px', background: 'var(--nav-bg)', backdropFilter: 'blur(20px)', display: 'flex', gap: '10px', alignItems: 'center', borderTop: '0.5px solid var(--sep)'}}>
                  <Plus size={28} color="#007AFF" /><input style={{flex: 1, padding: '10px 15px', borderRadius: '20px', border: 'none', background: isDark ? '#2C2C2E' : '#FFFFFF', color: 'var(--text-main)', fontSize: '16px', outline: 'none'}} value={input} onChange={e => setInput(e.target.value)} placeholder="Сообщение" onKeyDown={e => e.key === 'Enter' && sendMessage(input)} />
                  {input.trim() ? (
                      <button onClick={() => sendMessage(input)} style={{background: '#007AFF', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer'}}><Send size={18} color="white" /></button>
                  ) : <Mic size={26} color="#8E8E93" />}
                </div>
              </div>
          )}

          {view !== 'chat_room' && (
              <div className="tab-bar">
                <button className={`tab-item ${view === 'chats' ? 'active' : ''}`} onClick={() => setView('chats')}><MessageCircle size={28} /><span style={{fontSize: '10px'}}>Чаты</span></button>
                <button className={`tab-item ${view === 'settings' ? 'active' : ''}`} onClick={() => setView('settings')}><UserIcon size={28} /><span style={{fontSize: '10px'}}>Настройки</span></button>
              </div>
          )}
        </div>
      </div>
  );
}