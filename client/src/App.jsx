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

  /* Анимации */
  @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
  @keyframes slideInUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes springPop { 0% { transform: scale(0.85); opacity: 0; } 70% { transform: scale(1.05); } 100% { transform: scale(1); opacity: 1; } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .view-animate { animation: slideInRight 0.35s cubic-bezier(0.32, 0.72, 0, 1); }
  .msg-animate { animation: springPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
  .fade-animate { animation: fadeIn 0.3s ease; }

  /* Авторизация */
  .auth-wrap { flex: 1; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .auth-card { background: var(--card-bg); width: 100%; max-width: 360px; padding: 40px 24px; border-radius: 32px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); display: flex; flex-direction: column; animation: slideInUp 0.6s ease; }
  
  .auth-logo-box { width: 70px; height: 70px; background: var(--ios-blue); border-radius: 20px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(0,122,255,0.3); }

  .input-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; width: 100%; }
  .input-label { font-size: 13px; font-weight: 600; color: var(--text-sec); margin-left: 4px; }

  .ios-input { width: 100%; padding: 14px 16px; border-radius: 12px; border: 1.5px solid var(--sep); background: ${isDark ? '#2C2C2E' : '#FFFFFF'}; color: var(--text-main); font-size: 16px; outline: none; transition: border-color 0.2s; }
  .ios-input:focus { border-color: var(--ios-blue); }

  .btn-primary { width: 100%; padding: 16px; background: var(--ios-blue); color: white; border: none; border-radius: 16px; font-weight: 700; font-size: 17px; cursor: pointer; margin-top: 10px; transition: transform 0.1s; }
  .btn-primary:active { transform: scale(0.96); }

  /* Списки и элементы */
  .nav-bar { padding: 55px 16px 15px; background: var(--nav-bg); backdrop-filter: blur(25px); border-bottom: 0.5px solid var(--sep); display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
  .nav-title { font-size: 32px; font-weight: 800; letter-spacing: -0.5px; }
  
  .ios-list { background: var(--card-bg); margin: 16px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
  .ios-item { display: flex; align-items: center; padding: 12px 16px; cursor: pointer; transition: background 0.2s; border: none; background: none; text-align: left; width: 100%; color: var(--text-main); position: relative; }
  .ios-item:active { background: ${isDark ? '#2C2C2E' : '#E5E5EA'}; }
  .ios-item:not(:last-child)::after { content: ''; position: absolute; left: 70px; right: 0; bottom: 0; height: 0.5px; background: var(--sep); }

  /* Сообщения */
  .chat-scroll { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 8px; background: ${isDark ? '#000' : '#F2F2F7'}; }
  .chat-bubble { max-width: 75%; padding: 10px 14px; border-radius: 18px; font-size: 16px; position: relative; word-wrap: break-word; line-height: 1.4; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
  .bubble-me { background: var(--ios-blue); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
  .bubble-other { background: ${isDark ? '#1C1C1E' : '#FFFFFF'}; color: var(--text-main); align-self: flex-start; border-bottom-left-radius: 4px; }

  .tab-bar { height: 85px; background: var(--nav-bg); backdrop-filter: blur(25px); border-top: 0.5px solid var(--sep); display: flex; justify-content: space-around; padding-top: 10px; }
  .tab-item { display: flex; flex-direction: column; align-items: center; gap: 4px; color: var(--text-sec); cursor: pointer; border: none; background: none; transition: transform 0.2s; }
  .tab-item:active { transform: scale(0.9); }
  .tab-item.active { color: var(--ios-blue); }

  .avatar { width: 52px; height: 52px; border-radius: 50%; object-fit: cover; flex-shrink: 0; margin-right: 14px; border: 0.5px solid var(--sep); }
`;

export default function App() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(localStorage.getItem('aura_dark') === 'true');
  const [view, setView] = useState('chats');
  const [selectedPeer, setSelectedPeer] = useState(null); // Тот, с кем общаемся

  const [allUsers, setAllUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({ username: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [authStep, setAuthStep] = useState('login');

  const scrollRef = useRef();

  // 1. Инициализация
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
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

  // 2. Синхронизация данных
  useEffect(() => {
    if (!firebaseUser) return;
    const unsubUsers = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'users'), (s) => {
      setAllUsers(s.docs.map(d => d.data()));
    });
    const unsubMsgs = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), (s) => {
      setMessages(s.docs.map(d => d.data()).sort((a,b) => a.ts - b.ts));
    });
    return () => { unsubUsers(); unsubMsgs(); };
  }, [firebaseUser]);

  // Автопрокрутка вниз
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, view, selectedPeer]);

  const handleAuth = async () => {
    const { username, password, name } = formData;
    if (!username || !password) return setErrorMsg("Заполните поля");
    setLoading(true); setErrorMsg('');
    try {
      const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', username.toLowerCase().trim());
      const snap = await getDoc(userRef);
      if (authStep === 'reg') {
        if (snap.exists()) { setLoading(false); return setErrorMsg("Логин занят"); }
        const newUser = { username: username.toLowerCase().trim(), password, name: name || username, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`, bio: 'В Aura' };
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

  const sendMessage = async (val) => {
    if (!val.trim() || !user || !selectedPeer) return;
    const isGlobal = selectedPeer.username === 'global';
    await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
      text: val,
      uid: user.username,
      to: selectedPeer.username,
      ts: Date.now(),
      name: user.name
    });
    setInput('');
  };

  // Фильтрация сообщений для текущего чата
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
            <div className="auth-logo-box"><MessageCircle color="white" size={40} /></div>
            <h2>{authStep === 'reg' ? 'Регистрация' : 'Вход в Aura'}</h2>
            {errorMsg && <div className="error-msg">{errorMsg}</div>}
            <div className="input-group">
              <span className="input-label">Логин</span>
              <input className="ios-input" placeholder="ivan777" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
            </div>
            <div className="input-group">
              <span className="input-label">Пароль</span>
              <input className="ios-input" type="password" placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>
            {authStep === 'reg' && (
                <div className="input-group">
                  <span className="input-label">Ваше имя</span>
                  <input className="ios-input" placeholder="Александр" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
            )}
            <button className="btn-primary" onClick={handleAuth} disabled={loading}>{loading ? 'Загрузка...' : 'Продолжить'}</button>
            <button className="auth-toggle-btn" style={{background: 'none', border: 'none', color: '#007AFF', marginTop: 20, cursor: 'pointer'}} onClick={() => { setAuthStep(authStep === 'reg' ? 'login' : 'reg'); setErrorMsg(''); }}>
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
              <div className="view-animate">
                <div className="nav-bar"><div className="nav-title">Чаты</div><Edit3 size={24} color="#007AFF" /></div>
                <div style={{padding: '0 16px 16px'}}>
                  <div style={{background: isDark ? '#1C1C1E' : '#E3E3E8', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Search size={18} color="#8E8E93" /><input placeholder="Поиск в Aura" style={{background: 'none', border: 'none', outline: 'none', color: 'var(--text-main)', width: '100%', fontSize: '16px'}} value={search} onChange={e => setSearch(e.target.value)} />
                  </div>
                </div>
                <div style={{flex: 1, overflowY: 'auto'}}>
                  <button className="ios-item" onClick={() => { setSelectedPeer({name: 'Общий чат', username: 'global'}); setView('chat_room'); }}>
                    <div style={{background: '#007AFF', width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 14}}><Globe size={26} color="white"/></div>
                    <div style={{flex: 1}}><div style={{display: 'flex', justifyContent: 'space-between'}}><b style={{fontSize: '17px'}}>Общий чат</b><span style={{fontSize: '12px', color: 'var(--text-sec)'}}>Online</span></div><div style={{fontSize: '14px', color: 'var(--text-sec)'}}>Групповая беседа</div></div>
                    <ChevronRight size={18} color="#C6C6C8" />
                  </button>
                  {allUsers.filter(u => u.username !== user.username && u.username.includes(search.toLowerCase())).map(u => (
                      <button key={u.username} className="ios-item" onClick={() => { setSelectedPeer(u); setView('chat_room'); }}>
                        <img src={u.avatar} className="avatar" />
                        <div style={{flex: 1}}><b style={{fontSize: '17px'}}>{u.name}</b><div style={{fontSize: '14px', color: 'var(--text-sec)'}}>@{u.username}</div></div>
                        <ChevronRight size={18} color="#C6C6C8" />
                      </button>
                  ))}
                </div>
              </div>
          )}

          {view === 'settings' && (
              <div className="view-animate" style={{flex: 1, overflowY: 'auto'}}>
                <div className="nav-bar"><div className="nav-title">Настройки</div></div>
                <div className="ios-list">
                  <div className="ios-item">
                    <img src={user.avatar} className="avatar" style={{width: 64, height: 64}} />
                    <div style={{flex: 1}}><div style={{fontSize: '22px', fontWeight: '800'}}>{user.name}</div><div style={{color: 'var(--text-sec)'}}>@{user.username}</div></div>
                  </div>
                </div>
                <div className="ios-list">
                  <button className="ios-item" onClick={() => { setIsDark(!isDark); localStorage.setItem('aura_dark', !isDark); }}>
                    <div style={{background: '#5856D6', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, color: 'white'}}>{isDark ? <Sun size={18}/> : <Moon size={18}/>}</div>
                    <div style={{flex: 1}}>Темная тема</div><div style={{color: 'var(--text-sec)', marginRight: 8}}>{isDark ? 'Вкл' : 'Выкл'}</div>
                  </button>
                </div>
                <div className="ios-list">
                  <button className="ios-item" onClick={() => { localStorage.clear(); window.location.reload(); }}>
                    <div style={{background: '#FF3B30', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, color: 'white'}}><LogOut size={18}/></div>
                    <div style={{flex: 1, color: '#FF3B30', fontWeight: '600'}}>Выйти</div>
                  </button>
                </div>
              </div>
          )}

          {view === 'chat_room' && selectedPeer && (
              <div className="view-animate" style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <div className="nav-bar" style={{paddingTop: '55px'}}>
                  <button onClick={() => setView('chats')} style={{background: 'none', border: 'none', color: '#007AFF', display: 'flex', alignItems: 'center', cursor: 'pointer'}}><ChevronLeft size={34} /> <span style={{fontSize: 17}}>Назад</span></button>
                  <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <b style={{fontSize: '17px'}}>{selectedPeer.name}</b>
                    <span style={{fontSize: '11px', color: '#34C759', fontWeight: '600'}}>в сети</span>
                  </div>
                  {selectedPeer.avatar ? <img src={selectedPeer.avatar} style={{width: 36, height: 36, borderRadius: '50%'}} /> : <div style={{width: 36}}></div>}
                </div>

                <div ref={scrollRef} className="chat-scroll">
                  <div style={{flex: 1}}></div> {/* Толкает сообщения вниз */}
                  {currentMessages.length === 0 && (
                      <div className="fade-animate" style={{textAlign: 'center', padding: 40, color: 'var(--text-sec)', fontSize: 14}}>
                        Здесь будет ваша переписка с {selectedPeer.name}
                      </div>
                  )}
                  {currentMessages.map((m, i) => (
                      <div key={i} className={`chat-bubble msg-animate ${m.uid === user.username ? 'bubble-me' : 'bubble-other'}`}>
                        {selectedPeer.username === 'global' && m.uid !== user.username && (
                            <div style={{fontSize: '11px', fontWeight: '700', marginBottom: '2px', color: '#FF9500'}}>{m.name}</div>
                        )}
                        <div>{m.text}</div>
                        <div style={{fontSize: '10px', opacity: 0.6, textAlign: 'right', marginTop: '2px'}}>
                          {m.ts ? new Date(m.ts).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                        </div>
                      </div>
                  ))}
                </div>

                <div style={{padding: '10px 16px 35px', background: 'var(--nav-bg)', backdropFilter: 'blur(25px)', display: 'flex', gap: '10px', alignItems: 'center', borderTop: '0.5px solid var(--sep)'}}>
                  <Plus size={28} color="#007AFF" />
                  <input style={{flex: 1, padding: '11px 16px', borderRadius: '22px', border: 'none', background: isDark ? '#2C2C2E' : '#FFFFFF', color: 'var(--text-main)', fontSize: '16px', outline: 'none'}} value={input} onChange={e => setInput(e.target.value)} placeholder="Cообщение" onKeyDown={e => e.key === 'Enter' && sendMessage(input)} />
                  {input.trim() ? (
                      <button onClick={() => sendMessage(input)} style={{background: '#007AFF', borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer'}}><Send size={18} color="white" /></button>
                  ) : <Mic size={26} color="#8E8E93" />}
                </div>
              </div>
          )}

          {view !== 'chat_room' && (
              <div className="tab-bar fade-animate">
                <button className={`tab-item ${view === 'chats' ? 'active' : ''}`} onClick={() => setView('chats')}><MessageCircle size={28} /><span style={{fontSize: '11px'}}>Чаты</span></button>
                <button className={`tab-item ${view === 'settings' ? 'active' : ''}`} onClick={() => setView('settings')}><UserIcon size={28} /><span style={{fontSize: '11px'}}>Настройки</span></button>
              </div>
          )}
        </div>
      </div>
  );
}