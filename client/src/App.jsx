import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import {
  Search, MessageCircle, ChevronLeft, Send, Phone, User, Plus,
  Sticker, AlertCircle, Lock, User as UserIcon, LogOut, Video,
  Smile, Mic, Moon, Sun, Camera, Save, X, Play, Square
} from 'lucide-react';

// --- КОНФИГУРАЦИЯ СЕРВЕРА ---
const SERVER_URL = 'https://aura-je6y.onrender.com';

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
`;

export default function App() {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('aura_dark') === 'true');
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [inputText, setInputText] = useState('');
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  // Для голосовых
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const audioChunks = useRef([]);

  const messagesEndRef = useRef(null);

  // --- ИНИЦИАЛИЗАЦИЯ ---
  const initSession = (userData) => {
    setUser(userData);
    localStorage.setItem('aura_user', JSON.stringify(userData));

    // Подключаем сокет
    const s = io(SERVER_URL, { transports: ['websocket'] });
    setSocket(s);

    s.emit('user_online', userData.id);

    // Первая загрузка чатов
    syncChats(userData.id);
  };

  const syncChats = (userId) => {
    fetch(`${SERVER_URL}/api/sync?userId=${userId}`)
        .then(r => r.json())
        .then(d => d.success && setChats(d.chats));
  };

  useEffect(() => {
    const saved = localStorage.getItem('aura_user');
    if (saved) initSession(JSON.parse(saved));
  }, []);

  // --- REAL-TIME ЛОГИКА ---
  useEffect(() => {
    if (!socket) return;

    const handleNewMsg = (msg) => {
      setChats(prev => prev.map(chat => {
        if (chat.id === msg.senderId || chat.id === msg.receiverId) {
          // Проверяем, нет ли уже такого сообщения (защита от дублей)
          if (chat.messages.some(m => m.id === msg.id)) return chat;
          return { ...chat, messages: [...chat.messages, msg] };
        }
        return chat;
      }));
    };

    socket.on('new_msg', handleNewMsg);
    socket.on('msg_delivered', handleNewMsg);

    return () => {
      socket.off('new_msg');
      socket.off('msg_delivered');
    };
  }, [socket]);

  // --- ФУНКЦИИ ---
  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem('aura_dark', next);
  };

  const handleAuth = async () => {
    if (!username || !password) return setError("Заполните поля");
    setError("");
    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    try {
      const res = await fetch(`${SERVER_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isRegister ? { username, password, name: displayName } : { username, password })
      });
      const data = await res.json();
      if (data.success) initSession(data.user);
      else setError(data.error);
    } catch (e) { setError("Ошибка сервера"); }
  };

  const handleSendMessage = (text, type = 'text') => {
    if (!activeChatId || !socket || (!text && type !== 'voice')) return;
    socket.emit('send_msg', { senderId: user.id, receiverId: activeChatId, text, type });
    setInputText('');
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
  if (!user) {
    return (
        <div className="screen flex-center" style={{padding: '20px'}}>
          <style>{auraStyles(isDarkMode)}</style>
          <div className="glass-card animate-pop">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${isRegister ? username : 'Aura'}&backgroundColor=007AFF`} className="avatar-main" alt="Logo" />
            <h1 style={{margin: '0 0 5px', fontSize: '32px', fontWeight: '800'}}>Aura</h1>
            <p style={{color: 'var(--text-sec)', margin: '0 0 30px', fontWeight: '500'}}>
              {isRegister ? 'Создать профиль Pro' : 'Вход в мессенджер'}
            </p>
            {error && <div style={{color: '#FF3B30', background: 'rgba(255,59,48,0.1)', padding: '12px', borderRadius: '15px', marginBottom: '15px'}}>{error}</div>}
            <div className="ios-input-group"><UserIcon size={20} color="#A0A0A5" /><input placeholder="Логин" value={username} onChange={e => setUsername(e.target.value.toLowerCase())} /></div>
            <div className="ios-input-group"><Lock size={20} color="#A0A0A5" /><input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} /></div>
            {isRegister && <div className="ios-input-group"><Plus size={20} color="#A0A0A5" /><input placeholder="Имя" value={displayName} onChange={e => setDisplayName(e.target.value)} /></div>}
            <button className="btn-primary" onClick={handleAuth}>{isRegister ? 'Зарегистрироваться' : 'Войти'}</button>
            <p style={{marginTop: '20px', fontSize: '14px', color: 'var(--text-sec)'}}>
              {isRegister ? 'Есть аккаунт?' : 'Впервые здесь?'}
              <span onClick={() => setIsRegister(!isRegister)} style={{color: 'var(--ios-blue)', marginLeft: '8px', cursor: 'pointer', fontWeight: 'bold'}}>{isRegister ? 'Войти' : 'Создать'}</span>
            </p>
          </div>
        </div>
    );
  }

  const activeChat = chats.find(c => c.id === activeChatId);

  return (
      <div className="screen">
        <style>{auraStyles(isDarkMode)}</style>

        {/* ЛИСТ ЧАТОВ */}
        <div className={`flex-col h-full ${activeChatId || showSettings ? 'hidden' : ''}`}>
          <div className="glass-nav">
            <div className="flex-row" style={{justifyContent: 'space-between', marginBottom: '20px'}}>
              <h1 style={{margin: 0, fontSize: '34px', fontWeight: '800'}}>Чаты</h1>
              <div className="flex-row" style={{gap: '15px'}}>
                {isDarkMode ? <Sun size={24} onClick={toggleTheme} /> : <Moon size={24} onClick={toggleTheme} />}
                <img src={user.avatar} className="avatar-small" onClick={() => setShowSettings(true)} />
              </div>
            </div>
            <div className="ios-input-group" style={{marginBottom: 0}}><Search size={20} color="#A0A0A5" /><input placeholder="Поиск сообщений" /></div>
          </div>
          <div className="chat-list">
            {chats.map(chat => (
                <div key={chat.id} className="chat-item" onClick={() => setActiveChatId(chat.id)}>
                  <img src={chat.avatar} className="avatar-list" />
                  <div style={{flex: 1}}>
                    <div className="flex-row" style={{justifyContent: 'space-between'}}>
                      <b style={{fontSize: '17px'}}>{chat.name}</b>
                      <span style={{fontSize: '12px', color: 'var(--text-sec)'}}>{chat.messages.slice(-1)[0]?.time || ''}</span>
                    </div>
                    <div style={{color: 'var(--text-sec)', fontSize: '14px', marginTop: '2px'}}>
                      {chat.messages.slice(-1)[0]?.type === 'voice' ? '🎤 Голосовое' : chat.messages.slice(-1)[0]?.text || 'Напишите что-нибудь...'}
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>

        {/* НАСТРОЙКИ / ПРОФИЛЬ */}
        {showSettings && (
            <div className="screen animate-pop">
              <div className="glass-nav flex-row">
                <button onClick={() => setShowSettings(false)} style={{background: 'none', border: 'none', color: 'var(--ios-blue)', fontSize: '18px', fontWeight: '600'}}><ChevronLeft size={30} /> Назад</button>
                <div style={{flex: 1, textAlign: 'center', fontWeight: '700'}}>Профиль</div>
                <LogOut size={24} color="#FF3B30" onClick={() => { localStorage.clear(); window.location.reload(); }} />
              </div>
              <div style={{padding: '30px', textAlign: 'center'}}>
                <div style={{position: 'relative', display: 'inline-block'}}>
                  <img src={user.avatar} className="avatar-main" style={{width: '120px', height: '120px'}} />
                  <div style={{position: 'absolute', bottom: 25, right: 0, background: 'var(--ios-blue)', color: 'white', padding: '8px', borderRadius: '50%'}}><Camera size={18} /></div>
                </div>
                <h2 style={{margin: '10px 0 5px'}}>{user.name}</h2>
                <p style={{color: 'var(--text-sec)', marginBottom: '30px'}}>@{user.username}</p>

                <div className="ios-input-group" style={{textAlign: 'left'}}><User size={20} color="#A0A0A5" /><input placeholder="О себе" defaultValue="Использую Aura Messenger" /></div>
                <button className="btn-primary" style={{marginTop: '20px'}} onClick={() => setShowSettings(false)}><Save size={20} style={{marginRight: '10px'}} /> Сохранить изменения</button>
              </div>
            </div>
        )}

        {/* ОКНО ЧАТА */}
        {activeChatId && activeChat && (
            <div className="screen" style={{position: 'fixed', top: 0, left: 0, zIndex: 200}}>
              <div className="glass-nav flex-row">
                <button onClick={() => setActiveChatId(null)} style={{background: 'none', border: 'none', color: 'var(--ios-blue)', display: 'flex', alignItems: 'center', fontSize: '18px', fontWeight: '600'}}><ChevronLeft size={30} /> Назад</button>
                <div style={{flex: 1, textAlign: 'center', fontWeight: '700'}}>{activeChat.name}</div>
                <div style={{width: '60px', display: 'flex', gap: '15px', color: 'var(--ios-blue)'}}><Video size={22} /><Phone size={22} /></div>
              </div>
              <div className="msg-container">
                {activeChat.messages.map((m, i) => (
                    <div key={i} className={`bubble ${m.senderId === user.id ? 'bubble-me' : 'bubble-other'} animate-pop`}>
                      {m.type === 'voice' ? (
                          <div className="voice-bubble">
                            <Play size={20} fill="currentColor" onClick={() => new Audio(m.text).play()} />
                            <div style={{height: '3px', flex: 1, background: 'rgba(255,255,255,0.3)', borderRadius: '2px'}}></div>
                            <span style={{fontSize: '10px'}}>Голос</span>
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
                    style={{background: isRecording ? '#FF3B30' : '#8E8E93'}}
                >
                  {isRecording ? <Square size={20} /> : <Mic size={24} />}
                </button>
                <input className="msg-input" value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Сообщение" />
                <button className="send-btn" onClick={() => handleSendMessage(inputText)} disabled={!inputText.trim()}><Send size={20} /></button>
              </div>
            </div>
        )}
      </div>
  );
}