import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import {
  Search, MessageCircle, ChevronLeft, Send, Phone, User, Plus,
  Sticker, AlertCircle, Lock, User as UserIcon, LogOut, Video,
  MoreVertical, Smile, Mic, Image as ImageIcon
} from 'lucide-react';

// --- КОНФИГУРАЦИЯ СЕРВЕРА ---
const SERVER_URL = 'https://aura-je6y.onrender.com';

const auraStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  
  :root { 
    --ios-blue: #007AFF; 
    --ios-bg: #F2F2F7;
    --glass-bg: rgba(255, 255, 255, 0.8);
    --glass-border: rgba(255, 255, 255, 0.2);
  }
  
  * { box-sizing: border-box; }

  body { 
    font-family: 'Inter', -apple-system, sans-serif; 
    margin: 0; padding: 0; overflow: hidden; 
    background: #FFFFFF;
    color: black;
    user-select: none; 
  }

  /* Основные контейнеры без Tailwind */
  .screen { height: 100vh; width: 100%; display: flex; flex-direction: column; background: var(--ios-bg); position: relative; }
  .flex-center { display: flex; align-items: center; justify-content: center; }
  .flex-col { display: flex; flex-direction: column; }
  .flex-row { display: flex; flex-direction: row; align-items: center; }
  .hidden { display: none !important; }

  /* Эффект iOS 26 Glass */
  .glass-nav {
    background: var(--glass-bg);
    backdrop-filter: blur(30px) saturate(200%);
    -webkit-backdrop-filter: blur(30px) saturate(200%);
    border-bottom: 0.5px solid rgba(0,0,0,0.1);
    padding: 50px 20px 15px;
    z-index: 100;
  }

  .glass-card {
    background: white;
    border-radius: 35px;
    padding: 30px;
    box-shadow: 0 15px 40px rgba(0,0,0,0.08);
    width: 100%;
    max-width: 380px;
    text-align: center;
  }

  /* Анимации */
  @keyframes ios-pop {
    0% { transform: scale(0.9); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  .animate-pop { animation: ios-pop 0.4s cubic-bezier(0.15, 0.9, 0.3, 1.1) forwards; }

  /* Фикс Аватаров */
  .avatar-main { width: 90px; height: 90px; border-radius: 28px; margin-bottom: 20px; box-shadow: 0 8px 20px rgba(0,122,255,0.2); object-fit: cover; }
  .avatar-list { width: 56px !important; height: 56px !important; border-radius: 50%; object-fit: cover; margin-right: 15px; border: 2px solid white; }
  .avatar-small { width: 38px !important; height: 38px !important; border-radius: 50%; border: 1.5px solid white; object-fit: cover; }

  /* Чат и сообщения */
  .chat-list { flex: 1; overflow-y: auto; padding: 10px 0; }
  .chat-item { 
    display: flex; align-items: center; padding: 15px 20px; margin: 5px 15px; 
    background: white; border-radius: 24px; cursor: pointer; transition: 0.2s;
  }
  .chat-item:active { transform: scale(0.97); background: #f9f9f9; }

  .msg-container { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 10px; background: #fff; }
  .bubble { 
    max-width: 75%; padding: 12px 18px; border-radius: 22px; font-size: 16px; 
    position: relative; line-height: 1.4; 
  }
  .bubble-me { background: var(--ios-blue); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
  .bubble-other { background: #E9E9EB; color: black; align-self: flex-start; border-bottom-left-radius: 4px; }
  .sticker { font-size: 60px; background: none !important; padding: 0 !important; }

  /* Поля ввода */
  .ios-input-group { background: #F2F2F7; border-radius: 18px; display: flex; align-items: center; padding: 12px 15px; margin-bottom: 12px; }
  .ios-input-group input { background: transparent; border: none; outline: none; width: 100%; font-size: 16px; margin-left: 10px; font-weight: 500; }

  .btn-primary { 
    background: var(--ios-blue); color: white; border: none; width: 100%; 
    height: 58px; border-radius: 20px; font-size: 18px; font-weight: 700; 
    margin-top: 15px; cursor: pointer; transition: 0.3s;
  }
  .btn-primary:active { transform: scale(0.96); opacity: 0.9; }

  .bottom-bar { 
    padding: 15px 20px 35px; background: var(--glass-bg); 
    backdrop-filter: blur(20px); border-top: 0.5px solid rgba(0,0,0,0.05);
    display: flex; align-items: center; gap: 12px;
  }
  .msg-input { flex: 1; background: #f0f0f5; border: none; border-radius: 25px; padding: 12px 20px; outline: none; font-size: 16px; }
  .send-btn { background: var(--ios-blue); border: none; color: white; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

  .status-dot { width: 12px; height: 12px; background: #34C759; border: 2px solid white; border-radius: 50%; position: absolute; bottom: 0; right: 15px; }
`;

export default function App() {
  const [user, setUser] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [inputText, setInputText] = useState('');
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showStickers, setShowStickers] = useState(false);

  const messagesEndRef = useRef(null);

  // Инициализация сессии и сохранение в память браузера
  const initSession = (userData) => {
    setUser(userData);
    localStorage.setItem('aura_user', JSON.stringify(userData));

    const s = io(SERVER_URL);
    setSocket(s);
    s.emit('user_online', userData.id);
    fetch(`${SERVER_URL}/api/sync?userId=${userData.id}`)
        .then(r => r.json()).then(d => d.success && setChats(d.chats))
        .catch(e => console.error("Sync error:", e));
  };

  // Авто-вход при загрузке страницы
  useEffect(() => {
    const savedUser = localStorage.getItem('aura_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        initSession(parsed);
      } catch (e) {
        localStorage.removeItem('aura_user');
      }
    }
  }, []);

  const handleAuth = async () => {
    if (!username || !password) return setError("Заполните поля");
    setIsLoading(true); setError("");
    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    try {
      const res = await fetch(`${SERVER_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isRegister ? { username, password, name: displayName } : { username, password })
      });
      const data = await res.json();
      if (data.success) {
        initSession(data.user);
      } else { setError(data.error || "Доступ запрещен"); }
    } catch (e) { setError("Сервер просыпается... Подождите минуту."); }
    finally { setIsLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem('aura_user');
    window.location.reload();
  };

  useEffect(() => {
    if (!socket) return;
    socket.on('new_msg', (msg) => {
      setChats(prev => prev.map(c => (c.id === msg.senderId || c.id === msg.receiverId) ? { ...c, messages: [...c.messages, msg] } : c));
    });
    return () => socket.off('new_msg');
  }, [socket]);

  const handleSendMessage = (text, type = 'text') => {
    if (!activeChatId || !socket || (!text && type === 'text')) return;
    socket.emit('send_msg', { senderId: user.id, receiverId: activeChatId, text, type });
    setInputText(''); setShowStickers(false);
  };

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chats, activeChatId]);

  if (!user) {
    return (
        <div className="screen flex-center" style={{padding: '20px'}}>
          <style>{auraStyles}</style>
          <div className="glass-card animate-pop">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Aura&backgroundColor=007AFF`} className="avatar-main" alt="Logo" />
            <h1 style={{margin: '0 0 5px', fontSize: '32px', fontWeight: '800'}}>Aura</h1>
            <p style={{color: '#8E8E93', margin: '0 0 30px', fontWeight: '500'}}>{isRegister ? 'Регистрация iOS 26' : 'Вход в мессенджер'}</p>

            {error && <div style={{color: '#FF3B30', background: '#FFF2F2', padding: '12px', borderRadius: '15px', marginBottom: '15px', fontSize: '14px', fontWeight: '600'}}>{error}</div>}

            <div className="ios-input-group">
              <UserIcon size={20} color="#A0A0A5" />
              <input placeholder="Логин" value={username} onChange={e => setUsername(e.target.value.toLowerCase().trim())} />
            </div>

            <div className="ios-input-group">
              <Lock size={20} color="#A0A0A5" />
              <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            {isRegister && (
                <div className="ios-input-group animate-pop">
                  <Plus size={20} color="#A0A0A5" />
                  <input placeholder="Ваше имя" value={displayName} onChange={e => setDisplayName(e.target.value)} />
                </div>
            )}

            <button className="btn-primary" onClick={handleAuth}>{isLoading ? 'Загрузка...' : (isRegister ? 'Создать' : 'Войти')}</button>

            <p style={{marginTop: '20px', fontSize: '14px', color: '#8E8E93', fontWeight: '600'}}>
              {isRegister ? 'Уже есть аккаунт?' : 'Впервые здесь?'}
              <span onClick={() => setIsRegister(!isRegister)} style={{color: '#007AFF', marginLeft: '8px', cursor: 'pointer'}}>
              {isRegister ? 'Войти' : 'Создать'}
            </span>
            </p>
          </div>
        </div>
    );
  }

  const activeChat = chats.find(c => c.id === activeChatId);

  return (
      <div className="screen">
        <style>{auraStyles}</style>

        <div className={`flex-col h-full ${activeChatId ? 'hidden' : ''}`}>
          <div className="glass-nav">
            <div className="flex-row" style={{justifyContent: 'space-between', marginBottom: '20px'}}>
              <h1 style={{margin: 0, fontSize: '34px', fontWeight: '800', letterSpacing: '-1px'}}>Чаты</h1>
              <div className="flex-row" style={{gap: '12px'}}>
                <img src={user.avatar} className="avatar-small" alt="My avatar" />
                <LogOut size={22} color="#8E8E93" onClick={handleLogout} style={{cursor: 'pointer'}} title="Выйти" />
              </div>
            </div>
            <div className="ios-input-group" style={{marginBottom: 0}}>
              <Search size={20} color="#A0A0A5" />
              <input placeholder="Поиск" />
            </div>
          </div>

          <div className="chat-list">
            {chats.length === 0 ? (
                <div style={{textAlign: 'center', marginTop: '100px', color: '#A0A0A5'}}>
                  <MessageCircle size={60} style={{opacity: 0.2, marginBottom: '10px'}} />
                  <p>Нет активных чатов</p>
                </div>
            ) : (
                chats.map(chat => (
                    <div key={chat.id} className="chat-item" onClick={() => setActiveChatId(chat.id)}>
                      <div style={{position: 'relative'}}>
                        <img src={chat.avatar} className="avatar-list" alt={`${chat.name}'s avatar`} />
                        <div className="status-dot"></div>
                      </div>
                      <div style={{flex: 1}}>
                        <div className="flex-row" style={{justifyContent: 'space-between'}}>
                          <b style={{fontSize: '17px'}}>{chat.name}</b>
                          <span style={{fontSize: '12px', color: '#A0A0A5'}}>{chat.messages.slice(-1)[0]?.time || ''}</span>
                        </div>
                        <div style={{color: '#8E8E93', fontSize: '15px', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px'}}>
                          {chat.messages.slice(-1)[0]?.type === 'sticker' ? '🎨 Стикер' : chat.messages.slice(-1)[0]?.text || 'Начните общение...'}
                        </div>
                      </div>
                    </div>
                ))
            )}
          </div>
        </div>

        {activeChatId && activeChat && (
            <div className="screen" style={{position: 'fixed', top: 0, left: 0, zIndex: 200}}>
              <div className="glass-nav flex-row" style={{paddingTop: '50px'}}>
                <button onClick={() => setActiveChatId(null)} style={{background: 'none', border: 'none', color: '#007AFF', display: 'flex', alignItems: 'center', fontSize: '18px', fontWeight: '600', cursor: 'pointer'}}>
                  <ChevronLeft size={30} style={{marginLeft: '-10px'}} /> Назад
                </button>
                <div style={{flex: 1, textAlign: 'center', fontWeight: '700', fontSize: '17px'}}>{activeChat.name}</div>
                <div style={{width: '60px', display: 'flex', gap: '15px', color: '#007AFF'}}>
                  <Video size={22} /> <Phone size={22} />
                </div>
              </div>

              <div className="msg-container">
                {activeChat.messages.map((m, i) => (
                    <div key={i} className={`bubble ${m.senderId === user.id ? 'bubble-me' : 'bubble-other'} ${m.type === 'sticker' ? 'sticker' : ''} animate-pop`}>
                      {m.text}
                      {m.type !== 'sticker' && <div style={{fontSize: '10px', opacity: 0.5, textAlign: 'right', marginTop: '4px'}}>{m.time}</div>}
                    </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {showStickers && (
                  <div style={{background: 'white', height: '250px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', padding: '20px', gap: '15px', overflowY: 'auto', borderTop: '1px solid #eee'}}>
                    {['🚀', '✨', '🔥', '🌈', '👻', '🐶', '🦊', '🐱', '🦄', '🍎', '🍕', '🎮', '❤️', '😎', '👾', '⭐️', '🍀', '🍩'].map(s => (
                        <button key={s} onClick={() => handleSendMessage(s, 'sticker')} style={{fontSize: '40px', background: 'none', border: 'none'}}>{s}</button>
                    ))}
                  </div>
              )}

              <div className="bottom-bar">
                <Smile size={28} color="#A0A0A5" onClick={() => setShowStickers(!showStickers)} />
                <form style={{flex: 1, display: 'flex', gap: '10px'}} onSubmit={e => { e.preventDefault(); handleSendMessage(inputText); }}>
                  <input className="msg-input" value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Сообщение" onFocus={() => setShowStickers(false)} />
                  <button type="submit" className="send-btn" disabled={!inputText.trim()}><Send size={20} /></button>
                </form>
              </div>
            </div>
        )}
      </div>
  );
}