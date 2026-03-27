import React, { useState, useEffect, useRef } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, collection, onSnapshot, addDoc, updateDoc } from 'firebase/firestore';
import {
  Search, MessageCircle, ChevronLeft, Send, Phone, Plus,
  Lock, User as UserIcon, LogOut, Video,
  Smile, Mic, Moon, Sun, Camera, Save, ChevronRight, Bell, Shield, Smartphone, Globe
} from 'lucide-react';

// --- Инициализация Firebase (упрощенная для стабильности) ---
const getFirebaseConfig = () => {
  try { return typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null; }
  catch (e) { return null; }
};
const firebaseConfig = getFirebaseConfig();
const appId = typeof __app_id !== 'undefined' ? __app_id : 'aura-v26';
let app, auth, db;
if (firebaseConfig) {
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
  }
  
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; background: var(--ios-bg); color: var(--text-main); user-select: none; }
  .screen { height: 100vh; width: 100vw; display: flex; flex-direction: column; overflow: hidden; position: relative; }
  
  /* Стили меню как на скрине */
  .settings-group { background: var(--card-bg); margin: 20px 16px; border-radius: 12px; overflow: hidden; }
  .settings-item { 
    display: flex; align-items: center; padding: 12px 16px; cursor: pointer; 
    transition: background 0.2s; position: relative;
  }
  .settings-item:active { background: ${isDark ? '#2C2C2E' : '#E5E5EA'}; }
  .settings-item:not(:last-child)::after {
    content: ''; position: absolute; left: 56px; right: 0; bottom: 0; height: 0.5px; background: var(--sep);
  }

  .icon-box { 
    width: 32px; height: 32px; border-radius: 7px; display: flex; align-items: center; 
    justify-content: center; margin-right: 12px; color: white; 
  }

  .profile-card { background: var(--card-bg); margin: 0 16px 20px; border-radius: 12px; padding: 16px; display: flex; align-items: center; }
  .avatar-profile { width: 64px; height: 64px; border-radius: 50%; margin-right: 16px; object-fit: cover; }

  .ios-nav { 
    padding: 50px 16px 10px; background: var(--ios-bg); display: flex; 
    align-items: center; justify-content: space-between; sticky: top; z-index: 10;
  }
  .nav-title { font-size: 34px; font-weight: 700; letter-spacing: -0.5px; }
  
  .chat-bubble { max-width: 75%; padding: 8px 14px; border-radius: 18px; margin: 4px 0; font-size: 16px; }
  .me { background: var(--ios-blue); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
  .other { background: ${isDark ? '#262629' : '#E9E9EB'}; align-self: flex-start; border-bottom-left-radius: 4px; }
`;

export default function App() {
  const [appUser, setAppUser] = useState(JSON.parse(localStorage.getItem('aura_user') || 'null'));
  const [isDark, setIsDark] = useState(localStorage.getItem('aura_dark') === 'true');
  const [view, setView] = useState('chats'); // chats, settings, chat_room
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!auth) return;
    signInAnonymously(auth);
    if (appUser && db) {
      return onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), (s) => {
        setMsgs(s.docs.map(d => d.data()).sort((a,b) => a.ts - b.ts));
      });
    }
  }, [appUser]);

  const handleLogin = async () => {
    if (!db || !username) return;
    const ref = doc(db, 'artifacts', appId, 'public', 'data', 'users', username);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      if (snap.data().password === password) {
        setAppUser(snap.data());
        localStorage.setItem('aura_user', JSON.stringify(snap.data()));
      }
    } else {
      const newUser = { username, password, name: username, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`, bio: 'Aura user' };
      await setDoc(ref, newUser);
      setAppUser(newUser);
      localStorage.setItem('aura_user', JSON.stringify(newUser));
    }
  };

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('aura_dark', next);
  };

  if (!appUser) return (
      <div className="screen" style={{padding: '40px 20px', justifyContent: 'center'}}>
        <style>{auraStyles(isDark)}</style>
        <h1 style={{textAlign: 'center', fontSize: '32px'}}>Aura</h1>
        <input placeholder="Username" style={{padding: '12px', borderRadius: '10px', border: '1px solid #ccc', marginBottom: '10px'}} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" style={{padding: '12px', borderRadius: '10px', border: '1px solid #ccc', marginBottom: '20px'}} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin} style={{padding: '15px', background: '#007AFF', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold'}}>Войти / Регистрация</button>
      </div>
  );

  return (
      <div className="screen">
        <style>{auraStyles(isDark)}</style>

        {view === 'chats' && (
            <>
              <div className="ios-nav"><div className="nav-title">Чаты</div><Search size={24} color="#007AFF" /></div>
              <div style={{flex: 1, overflowY: 'auto'}}>
                <div className="settings-item" onClick={() => { setActiveChat('Global'); setView('chat_room'); }}>
                  <div className="icon-box" style={{background: '#007AFF'}}><Globe size={20}/></div>
                  <div style={{flex: 1}}><b>Общий чат</b><div style={{fontSize: '13px', color: '#8E8E93'}}>Все пользователи Aura</div></div>
                  <ChevronRight size={20} color="#C6C6C8" />
                </div>
              </div>
              <div style={{padding: '20px', display: 'flex', justifyContent: 'space-around', background: isDark ? '#161616' : '#F9F9F9', borderTop: '0.5px solid #ccc'}}>
                <MessageCircle color="#007AFF" onClick={() => setView('chats')} />
                <UserIcon color="#8E8E93" onClick={() => setView('settings')} />
              </div>
            </>
        )}

        {view === 'settings' && (
            <div style={{overflowY: 'auto', flex: 1}}>
              <div className="ios-nav"><div className="nav-title">Настройки</div></div>

              <div className="profile-card">
                <img src={appUser.avatar} className="avatar-profile" />
                <div>
                  <div style={{fontSize: '20px', fontWeight: '600'}}>{appUser.name}</div>
                  <div style={{color: '#8E8E93'}}>@{appUser.username}</div>
                </div>
              </div>

              <div className="settings-group">
                <div className="settings-item" onClick={toggleTheme}>
                  <div className="icon-box" style={{background: '#5856D6'}}>{isDark ? <Sun size={18}/> : <Moon size={18}/>}</div>
                  <div style={{flex: 1}}>{isDark ? 'Светлая тема' : 'Темная тема'}</div>
                  <div style={{fontSize: '15px', color: '#8E8E93', marginRight: '8px'}}>{isDark ? 'Вкл' : 'Выкл'}</div>
                </div>
                <div className="settings-item">
                  <div className="icon-box" style={{background: '#FF9500'}}><Bell size={18}/></div>
                  <div style={{flex: 1}}>Уведомления</div>
                  <ChevronRight size={20} color="#C6C6C8" />
                </div>
              </div>

              <div className="settings-group">
                <div className="settings-item">
                  <div className="icon-box" style={{background: '#34C759'}}><Shield size={18}/></div>
                  <div style={{flex: 1}}>Конфиденциальность</div>
                  <ChevronRight size={20} color="#C6C6C8" />
                </div>
                <div className="settings-item">
                  <div className="icon-box" style={{background: '#AF52DE'}}><Smartphone size={18}/></div>
                  <div style={{flex: 1}}>Устройства</div>
                  <ChevronRight size={20} color="#C6C6C8" />
                </div>
              </div>

              <div className="settings-group">
                <div className="settings-item" onClick={() => { localStorage.clear(); window.location.reload(); }}>
                  <div className="icon-box" style={{background: '#FF3B30'}}><LogOut size={18}/></div>
                  <div style={{flex: 1, color: '#FF3B30'}}>Выйти</div>
                </div>
              </div>

              <div style={{padding: '20px', display: 'flex', justifyContent: 'space-around', background: isDark ? '#161616' : '#F9F9F9', position: 'fixed', bottom: 0, width: '100%'}}>
                <MessageCircle color="#8E8E93" onClick={() => setView('chats')} />
                <UserIcon color="#007AFF" onClick={() => setView('settings')} />
              </div>
            </div>
        )}

        {view === 'chat_room' && (
            <>
              <div className="ios-nav" style={{paddingTop: '50px', background: isDark ? '#1C1C1E' : '#F2F2F7'}}>
                <ChevronLeft color="#007AFF" size={30} onClick={() => setView('chats')} />
                <div style={{fontWeight: '600'}}>{activeChat}</div>
                <div style={{width: 30}}></div>
              </div>
              <div style={{flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', padding: '16px'}}>
                {msgs.map((m, i) => (
                    <div key={i} className={`chat-bubble ${m.uid === appUser.username ? 'me' : 'other'}`}>
                      <div style={{fontSize: '11px', opacity: 0.7, marginBottom: '2px'}}>{m.uid}</div>
                      {m.text}
                    </div>
                ))}
              </div>
              <div style={{padding: '10px 16px 30px', background: isDark ? '#1C1C1E' : '#FFFFFF', display: 'flex', gap: '10px'}}>
                <input className="msg-input" style={{flex: 1, padding: '10px', borderRadius: '20px', border: 'none', background: isDark ? '#2C2C2E' : '#F2F2F7', color: 'var(--text-main)'}}
                       value={input} onChange={e => setInput(e.target.value)} placeholder="Сообщение" />
                <button onClick={async () => {
                  if (!input.trim()) return;
                  await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'messages'), {
                    text: input, uid: appUser.username, ts: Date.now()
                  });
                  setInput('');
                }} style={{background: '#007AFF', border: 'none', color: 'white', borderRadius: '50%', width: 36, height: 36}}><Send size={18}/></button>
              </div>
            </>
        )}
      </div>
  );
}