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
  addDoc
} from 'firebase/firestore';
import {
  Search, MessageCircle, ChevronLeft, Send, Phone, Plus,
  AlertCircle, Lock, User as UserIcon, LogOut, Video,
  Smile, Mic, Moon, Sun, Camera, Save, Play, Square, X
} from 'lucide-react';

// --- БЕЗОПАСНАЯ ИНИЦИАЛИЗАЦИЯ FIREBASE (ПРАВИЛО 3) ---
const getFirebaseConfig = () => {
  try {
    if (typeof __firebase_config !== 'undefined' && __firebase_config) {
      return JSON.parse(__firebase_config);
    }
  } catch (e) { console.error("Firebase config parse error", e); }
  return null;
};

const firebaseConfig = getFirebaseConfig();
const appId = typeof __app_id !== 'undefined' ? __app_id : 'aura-messenger-v26';

let app, auth, db;
if (firebaseConfig && firebaseConfig.apiKey) {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
}

const auraStyles = (isDark) => `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  
  :root { 
    --ios-blue: #007AFF; 
    --ios-bg: ${isDark ? '#000000' : '#F2F2F7'};
    --glass-bg: ${isDark ? 'rgba(28, 28, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)'};
    --text-main: ${isDark ? '#FFFFFF' : '#000000'};
    --text-sec: ${isDark ? '#8E8E93' : '#8E8E93'};
    --card-bg: ${isDark ? '#1C1C1E' : '#FFFFFF'};
    --bubble-other: ${isDark ? '#262629' : '#E9E9EB'};
    --input-bg: ${isDark ? '#2C2C2E' : '#FFFFFF'};
  }
  
  * { box-sizing: border-box; transition: background-color 0.3s ease; }

  body { 
    font-family: 'Inter', -apple-system, sans-serif; 
    margin: 0; padding: 0; overflow: hidden; 
    background: var(--ios-bg);
    color: var(--text-main);
  }

  .screen { height: 100vh; width: 100vw; display: flex; flex-direction: column; background: var(--ios-bg); position: relative; overflow: hidden; }
  .flex-center { display: flex; align-items: center; justify-content: center; }
  .hidden { display: none !important; }

  /* Навигация */
  .glass-nav {
    background: var(--glass-bg);
    backdrop-filter: blur(30px) saturate(200%);
    -webkit-backdrop-filter: blur(30px) saturate(200%);
    border-bottom: 0.5px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
    padding: 50px 20px 15px;
    z-index: 100;
  }

  /* Карточка входа */
  .glass-card {
    background: var(--card-bg);
    border-radius: 38px;
    padding: 40px 30px;
    box-shadow: 0 20px 50px rgba(0,0,0,${isDark ? '0.5' : '0.1'});
    width: 100%;
    max-width: 360px;
    text-align: center;
  }

  /* ФИКС АВАТАРОВ (Чтобы не были на весь экран) */
  .avatar-main { width: 90px; height: 90px; border-radius: 26px; margin: 0 auto 20px; box-shadow: 0 10px 25px rgba(0,122,255,0.3); object-fit: cover; display: block; }
  .avatar-list { width: 54px; height: 54px; border-radius: 50%; object-fit: cover; margin-right: 15px; border: 2px solid var(--card-bg); flex-shrink: 0; }
  .avatar-small { width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid var(--ios-blue); cursor: pointer; object-fit: cover; }

  /* Элементы списка чатов */
  .chat-item { 
    display: flex; align-items: center; padding: 14px 18px; margin: 6px 12px; 
    background: var(--card-bg); border-radius: 22px; cursor: pointer; 
  }
  .chat-item:active { transform: scale(0.98); opacity: 0.8; }

  /* Сообщения */
  .msg-container { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 8px; background: var(--ios-bg); }
  .bubble { max-width: 75%; padding: 10px 16px; border-radius: 20px; font-size: 15px; position: relative; line-height: 1.4; word-wrap: break-word; }
  .bubble-me { background: var(--ios-blue); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
  .bubble-other { background: var(--bubble-other); color: var(--text-main); align-self: flex-start; border-bottom-left-radius: 4px; }
  
  /* Инпуты */
  .ios-input-group { background: ${isDark ? '#2C2C2E' : '#E9E9EB'}; border-radius: 16px; display: flex; align-items: center; padding: 12px 16px; margin-bottom: 12px; width: 100%; }
  .ios-input-group input { background: transparent; border: none; outline: none; width: 100%; color: var(--text-main); margin-left: 10px; font-size: 16px; }

  .bottom-bar { 
    padding: 12px 16px 34px; background: var(--glass-bg); 
    backdrop-filter: blur(20px); border-top: 0.5px solid rgba(0,0,0,0.05);
    display: flex; align-items: center; gap: 10px;
  }
  .msg-input { flex: 1; background: var(--input-bg); border: none; border-radius: 22px; padding: 10px 18px; outline: none; color: var(--text-main); font-size: 16px; }
  .send-btn { background: var(--ios-blue); border: none; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
  
  .btn-primary { 
    background: var(--ios-blue); color: white; border: none; width: 100%; 
    height: 54px; border-radius: 18px; font-size: 17px; font-weight: 700; 
    margin-top: 10px; cursor: pointer;
  }
  .btn-primary:active { transform: scale(0.97); }

  .animate-pop { animation: ios-pop 0.4s cubic-bezier(0.15, 0.9, 0.3, 1.1) forwards; }
  @keyframes ios-pop { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
`;

export default function App() {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [appUser, setAppUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('aura_dark') === 'true');
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const [allUsers, setAllUsers] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChatId, setActiveChatId] = useState(null);
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const messagesEndRef = useRef(null);

  // --- 1. FIREBASE AUTH ---
  useEffect(() => {
    if (!auth) return;
    const initAuth = async () => {
      try {
        const token = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
        if (token) await signInWithCustomToken(auth, token);
        else await signInAnonymously(auth);
      } catch (e) { console.error("Auth", e); }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setFirebaseUser(u);
      const saved = localStorage.getItem('aura_app_user');
      if (saved) try { setAppUser(JSON.parse(saved)); } catch(e) { localStorage.removeItem('aura_app_user'); }
    });
    return () => unsubscribe();
  }, []);

  // --- 2. CLOUD SYNC (RULE 1 & 2) ---
  useEffect(() => {
    if (!firebaseUser || !db) return;

    const usersRef = collection(db, 'artifacts', appId, 'public', 'data', 'users');
    const unsubUsers = onSnapshot(usersRef, (snap) => {
      setAllUsers(snap.docs.map(d => ({ ...d.data(), id: d.id })));
    }, (e) => console.error("Sync Users", e));

    const msgsRef = collection(db, 'artifacts', appId, 'public', 'data', 'messages');
    const unsubMsgs = onSnapshot(msgsRef, (snap) => {
      const data = snap.docs.map(d => ({ ...d.data(), id: d.id }));
      setAllMessages(data.sort((a, b) => a.timestamp - b.timestamp));
    }, (e) => console.error("Sync Msgs", e));

    return () => { unsubUsers(); unsubMsgs(); };
  }, [firebaseUser]);

  // --- 3. SEARCH LOGIC ---
  const getVisibleChats = () => {
    if (!appUser) return [];
    const lowerQuery = searchQuery.toLowerCase().trim();

    return allUsers.filter(u => {
      if (u.username === appUser.username) return false;
      const matchSearch = u.username.toLowerCase().includes(lowerQuery) || u.name.toLowerCase().includes(lowerQuery);
      const hasMsgs = allMessages.some(m =>
          (m.senderId === appUser.username && m.receiverId === u.username) ||
          (m.senderId === u.username && m.receiverId === appUser.username)
      );
      return lowerQuery ? matchSearch : hasMsgs;
    }).map(u => ({
      ...u,
      messages: allMessages.filter(m =>
          (m.senderId === appUser.username && m.receiverId === u.username) ||
          (m.senderId === u.username && m.receiverId === appUser.username)
      )
    }));
  };

  const chats = getVisibleChats();

  // --- 4. HANDLERS ---
  const handleAuth = async () => {
    if (!username || !password) return setError("Заполните все поля");
    if (!db) return setError("Сервер подключается...");
    setError("");

    const userDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', username);
    try {
      const snap = await getDoc(userDocRef);
      if (isRegister) {
        if (snap.exists()) return setError("Никнейм занят");
        const newUser = {
          username, password, name: displayName || username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&backgroundColor=007AFF`,
          bio: "Aura Pro User"
        };
        await setDoc(userDocRef, newUser);
        setAppUser(newUser);
        localStorage.setItem('aura_app_user', JSON.stringify(newUser));
      } else {
        if (!snap.exists() || snap.data().password !== password) return setError("Неверный логин или пароль");
        setAppUser(snap.data());
        localStorage.setItem('aura_app_user', JSON.stringify(snap.data()));
      }
    } catch (e) { setError("Ошибка базы данных"); }
  };

  const handleSendMessage = async () => {
    if (!activeChatId || !appUser || !inputText.trim()) return;
    const msgsRef = collection(db, 'artifacts', appId, 'public', 'data', 'messages');
    const msg = {
      senderId: appUser.username,
      receiverId: activeChatId,
      text: inputText,
      timestamp: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setInputText('');
    try { await addDoc(msgsRef, msg); } catch (e) { console.error(e); }
  };

  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [allMessages, activeChatId]);

  if (!appUser) {
    return (
        <div className="screen flex-center" style={{padding: '20px'}}>
          <style>{auraStyles(isDarkMode)}</style>
          <div className="glass-card animate-pop">
            <div className="avatar-main flex-center" style={{background: '#007AFF'}}>
              <MessageCircle color="white" size={48} />
            </div>
            <h1 style={{fontSize: '32px', fontWeight: '800', margin: '0 0 5px'}}>Aura</h1>
            <p style={{color: 'var(--text-sec)', margin: '0 0 30px', fontWeight: '500'}}>{isRegister ? 'Регистрация' : 'Вход в облако'}</p>
            {error && <div style={{color: '#FF3B30', background: 'rgba(255,59,48,0.1)', padding: '12px', borderRadius: '14px', marginBottom: '15px', fontSize: '14px'}}>{error}</div>}
            <div className="ios-input-group"><UserIcon size={20} color="#A0A0A5" /><input placeholder="Никнейм" value={username} onChange={e => setUsername(e.target.value.toLowerCase().trim())} /></div>
            <div className="ios-input-group"><Lock size={20} color="#A0A0A5" /><input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} /></div>
            {isRegister && <div className="ios-input-group animate-pop"><Plus size={20} color="#A0A0A5" /><input placeholder="Ваше имя" value={displayName} onChange={e => setDisplayName(e.target.value)} /></div>}
            <button className="btn-primary" onClick={handleAuth}>{isRegister ? 'Создать' : 'Войти'}</button>
            <p style={{marginTop: '20px', fontSize: '14px'}}><span onClick={() => { setIsRegister(!isRegister); setError(""); }} style={{color: 'var(--ios-blue)', cursor: 'pointer', fontWeight: '700'}}>{isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Создать'}</span></p>
          </div>
        </div>
    );
  }

  const activeChat = allUsers.find(u => u.username === activeChatId);
  const activeChatMessages = allMessages.filter(m => (m.senderId === appUser.username && m.receiverId === activeChatId) || (m.senderId === activeChatId && m.receiverId === appUser.username));

  return (
      <div className="screen">
        <style>{auraStyles(isDarkMode)}</style>

        {/* ЧАТ-ЛИСТ */}
        <div className={`flex-col h-full ${activeChatId || showSettings ? 'hidden' : ''}`}>
          <div className="glass-nav">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
              <h1 style={{margin: 0, fontSize: '34px', fontWeight: '800', letterSpacing: '-1.2px'}}>Чаты</h1>
              <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
                {isDarkMode ? <Sun size={24} onClick={() => { setIsDarkMode(false); localStorage.setItem('aura_dark', false); }} style={{cursor: 'pointer'}} /> : <Moon size={24} onClick={() => { setIsDarkMode(true); localStorage.setItem('aura_dark', true); }} style={{cursor: 'pointer'}} />}
                <img src={appUser.avatar} className="avatar-small" onClick={() => setShowSettings(true)} />
              </div>
            </div>
            <div className="ios-input-group" style={{marginBottom: 0, background: isDarkMode ? '#1C1C1E' : '#E3E3E8'}}>
              <Search size={18} color="#8E8E93" />
              <input placeholder="Поиск по нику или имени" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
          </div>
          <div style={{flex: 1, overflowY: 'auto'}}>
            {chats.length === 0 ? (
                <div style={{textAlign: 'center', marginTop: '100px', opacity: 0.3}}><Search size={60} style={{marginBottom: '10px'}} /><p>Никого не нашли</p></div>
            ) : (
                chats.map(chat => (
                    <div key={chat.username} className="chat-item" onClick={() => setActiveChatId(chat.username)}>
                      <img src={chat.avatar} className="avatar-list" />
                      <div style={{flex: 1, minWidth: 0}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                          <b style={{fontSize: '17px'}}>{chat.name}</b>
                          <span style={{fontSize: '12px', color: 'var(--text-sec)'}}>{chat.messages?.slice(-1)[0]?.time || ''}</span>
                        </div>
                        <div style={{color: 'var(--text-sec)', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                          {chat.messages?.slice(-1)[0]?.text || `@${chat.username}`}
                        </div>
                      </div>
                    </div>
                ))
            )}
          </div>
        </div>

        {/* НАСТРОЙКИ */}
        {showSettings && (
            <div className="screen animate-pop" style={{position: 'fixed', top: 0, left: 0, zIndex: 300}}>
              <div className="glass-nav flex-center" style={{paddingTop: '50px', justifyContent: 'space-between'}}>
                <button onClick={() => setShowSettings(false)} style={{background: 'none', border: 'none', color: 'var(--ios-blue)', fontSize: '17px', fontWeight: '600', display: 'flex', alignItems: 'center'}}><ChevronLeft size={28} /> Назад</button>
                <b style={{fontSize: '17px'}}>Профиль</b>
                <LogOut size={22} color="#FF3B30" onClick={() => { localStorage.clear(); window.location.reload(); }} />
              </div>
              <div style={{padding: '30px', textAlign: 'center'}}>
                <img src={appUser.avatar} className="avatar-main" style={{width: '120px', height: '120px'}} />
                <h2 style={{margin: '0'}}>{appUser.name}</h2>
                <p style={{color: 'var(--text-sec)', marginBottom: '30px'}}>@{appUser.username}</p>
                <div className="ios-input-group" style={{textAlign: 'left'}}><UserIcon size={20} color="#A0A0A5" /><input defaultValue={appUser.bio} /></div>
                <button className="btn-primary" onClick={() => setShowSettings(false)}>Сохранить</button>
              </div>
            </div>
        )}

        {/* ОКНО ЧАТА */}
        {activeChatId && activeChat && (
            <div className="screen" style={{position: 'fixed', top: 0, left: 0, zIndex: 200}}>
              <div className="glass-nav flex-center" style={{paddingTop: '50px', justifyContent: 'space-between'}}>
                <button onClick={() => { setActiveChatId(null); setSearchQuery(''); }} style={{background: 'none', border: 'none', color: 'var(--ios-blue)', display: 'flex', alignItems: 'center', fontSize: '17px', fontWeight: '600'}}><ChevronLeft size={28} /> Назад</button>
                <div style={{textAlign: 'center'}}><b style={{display: 'block', fontSize: '16px'}}>{activeChat.name}</b><span style={{fontSize: '11px', color: '#34C759', fontWeight: '700'}}>в сети</span></div>
                <div style={{display: 'flex', gap: '15px', color: 'var(--ios-blue)'}}><Video size={22} /><Phone size={22} /></div>
              </div>
              <div className="msg-container">
                {activeChatMessages.map((m, i) => (
                    <div key={i} className={`bubble ${m.senderId === appUser.username ? 'bubble-me' : 'bubble-other'} animate-pop`}>
                      {m.text}
                      <div style={{fontSize: '10px', opacity: 0.5, textAlign: 'right', marginTop: '4px'}}>{m.time}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="bottom-bar">
                <Plus size={26} color="var(--ios-blue)" />
                <input className="msg-input" value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Сообщение" onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} />
                {inputText.trim() ? (
                    <button className="send-btn" onClick={handleSendMessage}><Send size={20} /></button>
                ) : (
                    <Mic size={26} color="#8E8E93" />
                )}
              </div>
            </div>
        )}
      </div>
  );
}