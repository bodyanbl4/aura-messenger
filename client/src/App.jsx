import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
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
  query,
  getDocs
} from 'firebase/firestore';
import {
  Search, MessageCircle, ChevronLeft, Send, Phone, User, Plus,
  Sticker, AlertCircle, Lock, User as UserIcon, LogOut, Video,
  Smile, Mic, Moon, Sun, Camera, Save, X, Play, Square
} from 'lucide-react';

// --- КОНФИГУРАЦИЯ FIREBASE ---
const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'aura-messenger-v1';

const auraStyles = (isDark) => `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  
  :root { 
    --ios-blue: #007AFF; 
    --ios-bg: ${isDark ? '#000000' : '#F2F2F7'};
    --glass-bg: ${isDark ? 'rgba(28, 28, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
    --text-main: ${isDark ? '#FFFFFF' : '#000000'};
    --text-sec: ${isDark ? '#8E8E93' : '#8E8E93'};
    --card-bg: ${isDark ? '#1C1C1E' : '#FFFFFF'};
    --bubble-other: ${isDark ? '#262629' : '#E9E9EB'};
  }
  
  * { box-sizing: border-box; transition: background-color 0.3s, color 0.3s; }

  body { 
    font-family: 'Inter', -apple-system, sans-serif; 
    margin: 0; padding: 0; overflow: hidden; 
    background: var(--ios-bg);
    color: var(--text-main);
    user-select: none; 
  }

  .screen { height: 100vh; width: 100%; display: flex; flex-direction: column; background: var(--ios-bg); position: relative; }
  .flex-center { display: flex; align-items: center; justify-content: center; }
  .hidden { display: none !important; }

  .glass-nav {
    background: var(--glass-bg);
    backdrop-filter: blur(30px) saturate(200%);
    -webkit-backdrop-filter: blur(30px) saturate(200%);
    border-bottom: 0.5px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
    padding: 50px 20px 15px;
    z-index: 100;
  }

  .glass-card {
    background: var(--card-bg);
    border-radius: 35px;
    padding: 30px;
    box-shadow: 0 15px 40px rgba(0,0,0,${isDark ? '0.4' : '0.08'});
    width: 100%;
    max-width: 380px;
    text-align: center;
  }

  @keyframes ios-pop { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
  .animate-pop { animation: ios-pop 0.4s cubic-bezier(0.15, 0.9, 0.3, 1.1) forwards; }

  .avatar-main { width: 90px; height: 90px; border-radius: 28px; margin-bottom: 20px; box-shadow: 0 8px 20px rgba(0,122,255,0.3); object-fit: cover; }
  .avatar-list { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; margin-right: 15px; border: 2px solid var(--card-bg); }
  .avatar-small { width: 38px; height: 38px; border-radius: 50%; border: 1.5px solid var(--ios-blue); cursor: pointer; }

  .chat-item { 
    display: flex; align-items: center; padding: 15px 20px; margin: 5px 15px; 
    background: var(--card-bg); border-radius: 24px; cursor: pointer; 
  }

  .msg-container { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 10px; background: var(--ios-bg); }
  .bubble { max-width: 75%; padding: 12px 18px; border-radius: 22px; font-size: 16px; position: relative; line-height: 1.4; }
  .bubble-me { background: var(--ios-blue); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
  .bubble-other { background: var(--bubble-other); color: var(--text-main); align-self: flex-start; border-bottom-left-radius: 4px; }
  
  .voice-bubble { display: flex; align-items: center; gap: 10px; min-width: 150px; }

  .ios-input-group { background: ${isDark ? '#2C2C2E' : '#E9E9EB'}; border-radius: 18px; display: flex; align-items: center; padding: 12px 15px; margin-bottom: 12px; }
  .ios-input-group input { background: transparent; border: none; outline: none; width: 100%; color: var(--text-main); margin-left: 10px; }

  .bottom-bar { 
    padding: 15px 20px 35px; background: var(--glass-bg); 
    backdrop-filter: blur(20px); border-top: 0.5px solid rgba(0,0,0,0.05);
    display: flex; align-items: center; gap: 12px;
  }
  .msg-input { flex: 1; background: ${isDark ? '#2C2C2E' : '#FFFFFF'}; border: none; border-radius: 25px; padding: 12px 20px; outline: none; color: var(--text-main); }
  .send-btn { background: var(--ios-blue); border: none; color: white; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
  .record-active { background: #FF3B30 !important; animation: pulse 1s infinite; }
  @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }

  .btn-primary { 
    background: var(--ios-blue); color: white; border: none; width: 100%; 
    height: 58px; border-radius: 20px; font-size: 18px; font-weight: 700; 
    margin-top: 15px; cursor: pointer; transition: 0.3s;
  }
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
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioChunks = useRef([]);
  const messagesEndRef = useRef(null);

  // --- 1. АУТЕНТИФИКАЦИЯ FIREBASE (ПРАВИЛО 3) ---
  useEffect(() => {
    const initAuth = async () => {
      if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        await signInWithCustomToken(auth, __initial_auth_token);
      } else {
        await signInAnonymously(auth);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setFirebaseUser(u);
      // Проверяем локальную сессию приложения
      const saved = localStorage.getItem('aura_app_user');
      if (saved) setAppUser(JSON.parse(saved));
    });
    return () => unsubscribe();
  }, []);

  // --- 2. СИНХРОНИЗАЦИЯ ДАННЫХ (ПРАВИЛО 2) ---
  useEffect(() => {
    if (!firebaseUser) return;

    // Слушаем всех пользователей (публичные данные - ПРАВИЛО 1)
    const usersRef = collection(db, 'artifacts', appId, 'public', 'data', 'users');
    const unsubUsers = onSnapshot(usersRef, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setAllUsers(usersData);
    }, (err) => console.error("Ошибка загрузки пользователей:", err));

    // Слушаем все сообщения
    const msgsRef = collection(db, 'artifacts', appId, 'public', 'data', 'messages');
    const unsubMsgs = onSnapshot(msgsRef, (snapshot) => {
      const msgsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      // Сортируем по времени в памяти
      const sorted = msgsData.sort((a, b) => a.timestamp - b.timestamp);
      setAllMessages(sorted);
    }, (err) => console.error("Ошибка загрузки сообщений:", err));

    return () => { unsubUsers(); unsubMsgs(); };
  }, [firebaseUser]);

  // Сборка чатов в памяти
  useEffect(() => {
    if (!appUser) return;
    const otherUsers = allUsers.filter(u => u.username !== appUser.username);
    const compiledChats = otherUsers.map(u => {
      const chatMsgs = allMessages.filter(m =>
          (m.senderId === appUser.username && m.receiverId === u.username) ||
          (m.senderId === u.username && m.receiverId === appUser.username)
      );
      return { ...u, messages: chatMsgs };
    });
    setChats(compiledChats);
  }, [allUsers, allMessages, appUser]);

  // --- ФУНКЦИИ ---
  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem('aura_dark', next);
  };

  const handleAuth = async () => {
    if (!username || !password) return setError("Заполните поля");
    if (!firebaseUser) return setError("Подключение к облаку...");
    setError("");

    const userDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'users', username);

    try {
      const userSnap = await getDoc(userDocRef);

      if (isRegister) {
        if (userSnap.exists()) return setError("Этот логин уже занят");
        const newUser = {
          username,
          password, // В реальных приложениях используйте хеширование!
          name: displayName || username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&backgroundColor=007AFF`,
          bio: "Использую Aura Messenger"
        };
        await setDoc(userDocRef, newUser);
        setAppUser(newUser);
        localStorage.setItem('aura_app_user', JSON.stringify(newUser));
      } else {
        if (!userSnap.exists() || userSnap.data().password !== password) {
          return setError("Неверный логин или пароль");
        }
        const userData = userSnap.data();
        setAppUser(userData);
        localStorage.setItem('aura_app_user', JSON.stringify(userData));
      }
    } catch (e) {
      setError("Ошибка базы данных. Попробуйте снова.");
    }
  };

  const handleSendMessage = async (text, type = 'text') => {
    if (!activeChatId || !appUser || (!text && type !== 'voice')) return;

    const msgsRef = collection(db, 'artifacts', appId, 'public', 'data', 'messages');
    const newMsg = {
      senderId: appUser.username,
      receiverId: activeChatId,
      text,
      type,
      timestamp: Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    try {
      await addDoc(msgsRef, newMsg);
      setInputText('');
    } catch (e) {
      console.error("Ошибка отправки:", e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('aura_app_user');
    setAppUser(null);
    setActiveChatId(null);
  };

  // --- ГОЛОСОВЫЕ ---
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunks.current = [];
      recorder.ondataavailable = (e) => audioChunks.current.push(e.data);
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => handleSendMessage(reader.result, 'voice');
      };
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) { setError("Нет доступа к микрофону"); }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chats, activeChatId]);

  // --- UI ---
  if (!appUser) {
    return (
        <div className="screen flex-center" style={{padding: '20px'}}>
          <style>{auraStyles(isDarkMode)}</style>
          <div className="glass-card animate-pop">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${isRegister ? username || 'Aura' : 'Aura'}&backgroundColor=007AFF`} className="avatar-main" alt="Logo" />
            <h1 style={{margin: '0 0 5px', fontSize: '32px', fontWeight: '800'}}>Aura</h1>
            <p style={{color: 'var(--text-sec)', margin: '0 0 30px', fontWeight: '500'}}>
              {isRegister ? 'Регистрация в облаке' : 'Вход в мессенджер'}
            </p>
            {error && <div style={{color: '#FF3B30', background: 'rgba(255,59,48,0.1)', padding: '12px', borderRadius: '15px', marginBottom: '15px', fontSize: '14px'}}>{error}</div>}
            <div className="ios-input-group"><UserIcon size={20} color="#A0A0A5" /><input placeholder="Логин" value={username} onChange={e => setUsername(e.target.value.toLowerCase().trim())} /></div>
            <div className="ios-input-group"><Lock size={20} color="#A0A0A5" /><input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} /></div>
            {isRegister && <div className="ios-input-group animate-pop"><Plus size={20} color="#A0A0A5" /><input placeholder="Ваше имя" value={displayName} onChange={e => setDisplayName(e.target.value)} /></div>}
            <button className="btn-primary" onClick={handleAuth}>{isRegister ? 'Создать аккаунт' : 'Войти'}</button>
            <p style={{marginTop: '20px', fontSize: '14px', color: 'var(--text-sec)'}}>
              {isRegister ? 'Есть аккаунт?' : 'Впервые здесь?'}
              <span onClick={() => { setIsRegister(!isRegister); setError(""); }} style={{color: 'var(--ios-blue)', marginLeft: '8px', cursor: 'pointer', fontWeight: 'bold'}}>{isRegister ? 'Войти' : 'Создать'}</span>
            </p>
          </div>
        </div>
    );
  }

  const activeChat = chats.find(c => c.username === activeChatId);

  return (
      <div className="screen">
        <style>{auraStyles(isDarkMode)}</style>

        {/* СПИСОК ЧАТОВ */}
        <div className={`flex-col h-full ${activeChatId || showSettings ? 'hidden' : ''}`}>
          <div className="glass-nav">
            <div className="flex-row" style={{justifyContent: 'space-between', marginBottom: '20px', display: 'flex', alignItems: 'center'}}>
              <h1 style={{margin: 0, fontSize: '34px', fontWeight: '800'}}>Чаты</h1>
              <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                {isDarkMode ? <Sun size={24} onClick={toggleTheme} style={{cursor: 'pointer'}} /> : <Moon size={24} onClick={toggleTheme} style={{cursor: 'pointer'}} />}
                <img src={appUser.avatar} className="avatar-small" onClick={() => setShowSettings(true)} />
              </div>
            </div>
            <div className="ios-input-group" style={{marginBottom: 0}}><Search size={20} color="#A0A0A5" /><input placeholder="Поиск" /></div>
          </div>
          <div className="chat-list" style={{flex: 1, overflowY: 'auto'}}>
            {chats.length === 0 ? (
                <div style={{textAlign: 'center', marginTop: '100px', color: '#A0A0A5'}}>
                  <MessageCircle size={60} style={{opacity: 0.2, marginBottom: '10px'}} />
                  <p>Нет активных чатов.<br/>Зарегистрируйте другого пользователя!</p>
                </div>
            ) : (
                chats.map(chat => (
                    <div key={chat.username} className="chat-item" onClick={() => setActiveChatId(chat.username)}>
                      <img src={chat.avatar} className="avatar-list" />
                      <div style={{flex: 1, minWidth: 0}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                          <b style={{fontSize: '17px'}}>{chat.name}</b>
                          <span style={{fontSize: '12px', color: 'var(--text-sec)'}}>{chat.messages.slice(-1)[0]?.time || ''}</span>
                        </div>
                        <div style={{color: 'var(--text-sec)', fontSize: '14px', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                          {chat.messages.slice(-1)[0]?.type === 'voice' ? '🎤 Голосовое' : chat.messages.slice(-1)[0]?.text || 'Начните общение...'}
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
              <div className="glass-nav flex-row" style={{display: 'flex', alignItems: 'center'}}>
                <button onClick={() => setShowSettings(false)} style={{background: 'none', border: 'none', color: 'var(--ios-blue)', fontSize: '18px', fontWeight: '600', display: 'flex', alignItems: 'center', cursor: 'pointer'}}><ChevronLeft size={30} /> Назад</button>
                <div style={{flex: 1, textAlign: 'center', fontWeight: '700'}}>Профиль</div>
                <LogOut size={24} color="#FF3B30" onClick={handleLogout} style={{cursor: 'pointer'}} />
              </div>
              <div style={{padding: '30px', textAlign: 'center'}}>
                <div style={{position: 'relative', display: 'inline-block'}}>
                  <img src={appUser.avatar} className="avatar-main" style={{width: '120px', height: '120px'}} />
                  <div style={{position: 'absolute', bottom: 25, right: 0, background: 'var(--ios-blue)', color: 'white', padding: '8px', borderRadius: '50%'}}><Camera size={18} /></div>
                </div>
                <h2 style={{margin: '10px 0 5px'}}>{appUser.name}</h2>
                <p style={{color: 'var(--text-sec)', marginBottom: '30px'}}>@{appUser.username}</p>
                <div className="ios-input-group" style={{textAlign: 'left'}}><User size={20} color="#A0A0A5" /><input placeholder="О себе" defaultValue={appUser.bio} /></div>
                <button className="btn-primary" onClick={() => setShowSettings(false)}><Save size={20} style={{marginRight: '10px'}} /> Сохранить</button>
              </div>
            </div>
        )}

        {/* ЧАТ */}
        {activeChatId && activeChat && (
            <div className="screen" style={{position: 'fixed', top: 0, left: 0, zIndex: 200}}>
              <div className="glass-nav flex-row" style={{display: 'flex', alignItems: 'center', paddingTop: '50px'}}>
                <button onClick={() => setActiveChatId(null)} style={{background: 'none', border: 'none', color: 'var(--ios-blue)', display: 'flex', alignItems: 'center', fontSize: '18px', fontWeight: '600', cursor: 'pointer'}}>
                  <ChevronLeft size={30} style={{marginLeft: '-10px'}} /> Назад
                </button>
                <div style={{flex: 1, textAlign: 'center', fontWeight: '700', fontSize: '17px'}}>{activeChat.name}</div>
                <div style={{width: '60px', display: 'flex', gap: '15px', color: 'var(--ios-blue)', justifyContent: 'flex-end'}}>
                  <Video size={22} /> <Phone size={22} />
                </div>
              </div>
              <div className="msg-container">
                {activeChat.messages.map((m, i) => (
                    <div key={i} className={`bubble ${m.senderId === appUser.username ? 'bubble-me' : 'bubble-other'} animate-pop`}>
                      {m.type === 'voice' ? (
                          <div className="voice-bubble" style={{display: 'flex', alignItems: 'center', gap: '10px', minWidth: '150px'}}>
                            <Play size={20} fill="currentColor" onClick={() => new Audio(m.text).play()} style={{cursor: 'pointer'}} />
                            <div style={{height: '3px', flex: 1, background: 'rgba(255,255,255,0.3)', borderRadius: '2px'}}></div>
                            <span style={{fontSize: '10px'}}>Audio</span>
                          </div>
                      ) : m.text}
                      <div style={{fontSize: '10px', opacity: 0.5, textAlign: 'right', marginTop: '4px'}}>{m.time}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="bottom-bar">
                <button
                    onMouseDown={startRecording} onMouseUp={stopRecording}
                    onTouchStart={startRecording} onTouchEnd={stopRecording}
                    className={`send-btn ${isRecording ? 'record-active' : ''}`}
                    style={{background: isRecording ? '#FF3B30' : '#8E8E93', border: 'none', cursor: 'pointer'}}
                >
                  {isRecording ? <Square size={20} color="white" /> : <Mic size={24} color="white" />}
                </button>
                <input
                    className="msg-input"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    placeholder="Сообщение"
                    style={{flex: 1}}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                />
                <button className="send-btn" onClick={() => handleSendMessage(inputText)} disabled={!inputText.trim()} style={{border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Send size={20} color="white" />
                </button>
              </div>
            </div>
        )}
      </div>
  );
}