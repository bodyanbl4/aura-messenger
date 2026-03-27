import React, { useState, useEffect, useRef } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, onSnapshot, addDoc } from 'firebase/firestore';
import {
  Search, MessageCircle, ChevronLeft, Send, Phone, Plus,
  User as UserIcon, LogOut, Video, Moon, Sun, Camera,
  ChevronRight, Bell, Shield, Smartphone, Globe, MoreHorizontal, Edit3, Mic
} from 'lucide-react';

// --- ИНИЦИАЛИЗАЦИЯ FIREBASE ---
const getFirebaseConfig = () => {
  try { return typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null; }
  catch (e) { return null; }
};
const firebaseConfig = getFirebaseConfig();
const appId = typeof __app_id !== 'undefined' ? __app_id : 'aura-v26';
let app, auth, db;
if (firebaseConfig && firebaseConfig.apiKey) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
}

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
  
  .app-container { 
    width: 100vw; height: 100vh; display: flex; justify-content: center; background: #000; 
  }

  .phone-screen { 
    width: 100%; max-width: 500px; height: 100%; background: var(--ios-bg); 
    position: relative; display: flex; flex-direction: column; overflow: hidden;
  }

  /* Дизайн блоков (Settings Style) */
  .ios-list { background: var(--card-bg); margin: 20px 16px; border-radius: 12px; overflow: hidden; }
  .ios-item { 
    display: flex; align-items: center; padding: 12px 16px; cursor: pointer; 
    transition: background 0.2s; position: relative;
  }
  .ios-item:active { background: ${isDark ? '#2C2C2E' : '#E5E5EA'}; }
  .ios-item:not(:last-child)::after {
    content: ''; position: absolute; left: 56px; right: 0; bottom: 0; height: 0.5px; background: var(--sep);
  }

  .icon-box { 
    width: 30px; height: 30px; border-radius: 7px; display: flex; align-items: center; 
    justify-content: center; margin-right: 12px; color: white; flex-shrink: 0;
  }

  .avatar { width: 50px; height: 50px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
  .avatar-lg { width: 64px; height: 64px; border-radius: 50%; margin-right: 15px; }

  /* Навигация */
  .nav-bar { 
    padding: 50px 16px 10px; background: var(--nav-bg); backdrop-filter: blur(20px);
    display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50;
  }
  .nav-title { font-size: 34px; font-weight: 700; letter-spacing: -0.5px; }

  /* Вход */
  .auth-box { 
    flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 30px;
    background: var(--ios-bg);
  }
  .auth-card { background: var(--card-bg); padding: 30px; border-radius: 24px; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; }
  .ios-input { 
    width: 100%; padding: 14px; margin-bottom: 12px; border-radius: 12px; 
    border: none; background: ${isDark ? '#2C2C2E' : '#F2F2F7'}; color: var(--text-main); font-size: 16px; outline: none;
  }

  /* Таб-бар */
  .tab-bar { 
    height: 85px; background: var(--nav-bg); backdrop-filter: blur(20px); 
    border-top: 0.5px solid var(--sep); display: flex; justify-content: space-around; padding-top: 10px;
  }
  .tab-item { display: flex; flex-direction: column; align-items: center; gap: 4px; color: var(--text-sec); cursor: pointer; }
  .tab-item.active { color: var(--ios-blue); }
  .tab-label { font-size: 10px; font-weight: 500; }

  /* Чат */
  .chat-bubble { max-width: 75%; padding: 10px 14px; border-radius: 18px; margin-bottom: 4px; font-size: 16px; position: relative; }
  .bubble-me { background: var(--ios-blue); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
  .bubble-other { background: ${isDark ? '#262629' : '#E9E9EB'}; color: var(--text-main); align-self: flex-start; border-bottom-left-radius: 4px; }

  @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
  .slide-in { animation: slideIn 0.3s ease-out; }
`;

export default function App() {
  const [appUser, setAppUser] = useState(JSON.parse(localStorage.getItem('aura_user') || 'null'));
  const [isDark, setIsDark] = useState(localStorage.getItem('aura_dark') === 'true');
  const [view, setView] = useState('chats'); // chats, settings, chat_room
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const scrollRef = useRef();

  useEffect(() => {
    if (!auth) return;
    signInAnonymously(auth);
    if (appUser && db) {
      const q = collection(db, 'artifacts', appId, 'public', 'data', 'messages');
      return onSnapshot(q, (s) => {
        setMsgs(s.docs.map(d => d.data()).sort((a,b) => a.ts - b.ts));
      });
    }
  }, [appUser]);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [msgs, view]);

  const handleLogin = async () => {
    if (!db || !username || !password) return;
    const ref = doc(db, 'artifacts', appId, 'public', 'data', 'users', username);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      if (snap.data().password === password) {
        setAppUser(snap.data());
        localStorage.setItem('aura_user', JSON.stringify(snap.data()));
      } else { alert("Неверный пароль"); }
    } else {
      const newUser = { username, password, name: username, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`, bio: 'Привет, я в Aura!' };
      await setDoc(ref, newUser);
      setAppUser(newUser);
      localStorage.setItem('aura_user', JSON.stringify(newUser));
    }
  };

  async function handleSend() {
    if (!input.trim() || !db) return;
    const text = input;
    const currentInput = input;
    setInput('');
    await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
      text: currentInput, uid: appUser.username, ts: Date.now()
    });
  }

  if (!appUser) return (
      <div className="app-container">
        <style>{auraStyles(isDark)}</style>
        <div className="phone-screen">
          <div className="auth-box">
            <div className="auth-card">
              <div style={{width: 70, height: 70, background: '#007AFF', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px shadow-lg'}}>
                <MessageCircle color="white" size={40} />
              </div>
              <h1 style={{margin: '0 0 10px', fontSize: '28px', fontWeight: '800'}}>Aura</h1>
              <p style={{color: '#8E8E93', marginBottom: '25px'}}>Вход в мессенджер</p>
              <input className="ios-input" placeholder="Никнейм" onChange={e => setUsername(e.target.value.toLowerCase())} />
              <input className="ios-input" type="password" placeholder="Пароль" onChange={e => setPassword(e.target.value)} />
              <button onClick={handleLogin} style={{width: '100%', padding: '16px', background: '#007AFF', color: 'white', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '17px', marginTop: '10px'}}>Продолжить</button>
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
                <div className="nav-bar">
                  <div className="nav-title">Чаты</div>
                  <div style={{display: 'flex', gap: '15px'}}>
                    <Edit3 size={24} color="#007AFF" />
                  </div>
                </div>
                <div style={{padding: '0 16px 10px'}}>
                  <div style={{background: isDark ? '#1C1C1E' : '#E3E3E8', borderRadius: '10px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Search size={18} color="#8E8E93" />
                    <input placeholder="Поиск" style={{background: 'none', border: 'none', outline: 'none', color: 'var(--text-main)', width: '100%'}} onChange={e => setSearch(e.target.value)} />
                  </div>
                </div>
                <div style={{flex: 1, overflowY: 'auto'}}>
                  <div className="ios-item" onClick={() => setView('chat_room')} style={{padding: '12px 16px'}}>
                    <div className="icon-box" style={{background: '#007AFF', width: 54, height: 54, borderRadius: '50%'}}><Globe size={28}/></div>
                    <div style={{flex: 1, marginLeft: '10px'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <b>Общий чат Aura</b>
                        <span style={{fontSize: '13px', color: '#8E8E93'}}>12:45</span>
                      </div>
                      <div style={{fontSize: '14px', color: '#8E8E93', marginTop: '2px'}}>Нажмите, чтобы войти в чат</div>
                    </div>
                  </div>
                  <div style={{padding: '20px', textAlign: 'center', color: '#8E8E93', fontSize: '13px'}}>У вас пока нет личных чатов</div>
                </div>
              </>
          )}

          {view === 'settings' && (
              <div style={{overflowY: 'auto', flex: 1}} className="slide-in">
                <div className="nav-bar"><div className="nav-title">Настройки</div><div style={{color: '#007AFF', fontWeight: '600'}}>Изм.</div></div>

                <div className="ios-list" style={{display: 'flex', alignItems: 'center', padding: '16px'}}>
                  <img src={appUser.avatar} className="avatar-lg" alt="Profile" />
                  <div style={{flex: 1}}>
                    <div style={{fontSize: '22px', fontWeight: '600'}}>{appUser.name}</div>
                    <div style={{color: '#8E8E93'}}>@{appUser.username}</div>
                  </div>
                  <ChevronRight color="#C6C6C8" />
                </div>

                <div className="ios-list">
                  <div className="ios-item" onClick={() => {
                    const next = !isDark;
                    setIsDark(next);
                    localStorage.setItem('aura_dark', next);
                  }}>
                    <div className="icon-box" style={{background: '#5856D6'}}>{isDark ? <Sun size={18}/> : <Moon size={18}/>}</div>
                    <div style={{flex: 1}}>Ночной режим</div>
                    <div style={{fontSize: '16px', color: '#8E8E93', marginRight: '5px'}}>{isDark ? 'Вкл' : 'Выкл'}</div>
                  </div>
                  <div className="ios-item">
                    <div className="icon-box" style={{background: '#FF9500'}}><Bell size={18}/></div>
                    <div style={{flex: 1}}>Уведомления</div>
                    <ChevronRight size={18} color="#C6C6C8" />
                  </div>
                </div>

                <div className="ios-list">
                  <div className="ios-item">
                    <div className="icon-box" style={{background: '#34C759'}}><Shield size={18}/></div>
                    <div style={{flex: 1}}>Конфиденциальность</div>
                    <ChevronRight size={18} color="#C6C6C8" />
                  </div>
                  <div className="ios-item">
                    <div className="icon-box" style={{background: '#AF52DE'}}><Smartphone size={18}/></div>
                    <div style={{flex: 1}}>Устройства</div>
                    <ChevronRight size={18} color="#C6C6C8" />
                  </div>
                </div>

                <div className="ios-list">
                  <div className="ios-item" onClick={() => { localStorage.clear(); window.location.reload(); }}>
                    <div className="icon-box" style={{background: '#FF3B30'}}><LogOut size={18}/></div>
                    <div style={{flex: 1, color: '#FF3B30', fontWeight: '600'}}>Выйти</div>
                  </div>
                </div>
              </div>
          )}

          {view === 'chat_room' && (
              <div className="slide-in" style={{display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--ios-bg)'}}>
                <div className="nav-bar" style={{paddingTop: '50px', background: 'var(--nav-bg)'}}>
                  <div onClick={() => setView('chats')} style={{display: 'flex', alignItems: 'center', color: '#007AFF', cursor: 'pointer'}}>
                    <ChevronLeft size={32} style={{marginLeft: '-10px'}} /> <span>Назад</span>
                  </div>
                  <div style={{textAlign: 'center'}}>
                    <b style={{display: 'block'}}>Общий чат</b>
                    <span style={{fontSize: '11px', color: '#34C759'}}>в сети</span>
                  </div>
                  <MoreHorizontal size={24} color="#007AFF" />
                </div>
                <div ref={scrollRef} style={{flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', padding: '16px'}}>
                  {msgs.map((m, i) => (
                      <div key={i} className={`chat-bubble ${m.uid === appUser.username ? 'bubble-me' : 'bubble-other'}`}>
                        {m.uid !== appUser.username && <div style={{fontSize: '11px', fontWeight: '700', marginBottom: '2px', color: '#FF9500'}}>{m.uid}</div>}
                        {m.text}
                        <div style={{fontSize: '10px', opacity: 0.5, textAlign: 'right', marginTop: '2px'}}>
                          {new Date(m.ts).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                  ))}
                </div>
                <div style={{padding: '10px 16px 35px', background: 'var(--nav-bg)', display: 'flex', gap: '10px', alignItems: 'center'}}>
                  <Plus size={28} color="#007AFF" />
                  <input
                      style={{flex: 1, padding: '10px 15px', borderRadius: '20px', border: 'none', background: isDark ? '#2C2C2E' : '#FFFFFF', color: 'var(--text-main)', fontSize: '16px'}}
                      value={input} onChange={e => setInput(e.target.value)} placeholder="Сообщение"
                      onKeyDown={e => e.key === 'Enter' && handleSend()}
                  />
                  {input.trim() ? (
                      <div onClick={handleSend} style={{background: '#007AFF', borderRadius: '50%', width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                        <Send size={18} color="white" />
                      </div>
                  ) : <Mic size={26} color="#8E8E93" />}
                </div>
              </div>
          )}

          {view !== 'chat_room' && (
              <div className="tab-bar">
                <div className={`tab-item ${view === 'chats' ? 'active' : ''}`} onClick={() => setView('chats')}>
                  <MessageCircle size={26} />
                  <span className="tab-label">Чаты</span>
                </div>
                <div className={`tab-item ${view === 'settings' ? 'active' : ''}`} onClick={() => setView('settings')}>
                  <UserIcon size={26} />
                  <span className="tab-label">Настройки</span>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}