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
    --glass-bg: rgba(255, 255, 255, 0.7);
    --glass-border: rgba(255, 255, 255, 0.3);
  }
  
  body { 
    font-family: 'Inter', -apple-system, sans-serif; 
    margin: 0; padding: 0; overflow: hidden; 
    background: linear-gradient(135deg, #E2E2E2 0%, #FFFFFF 100%);
    color: black;
    user-select: none; 
    -webkit-tap-highlight-color: transparent;
  }

  .glass {
    background: var(--glass-bg);
    backdrop-filter: blur(25px) saturate(180%);
    -webkit-backdrop-filter: blur(25px) saturate(180%);
    border: 1px solid var(--glass-border);
  }

  .ios-card {
    background: white;
    border-radius: 28px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }

  /* Анимации */
  @keyframes spring-in {
    0% { transform: scale(0.9) translateY(30px); opacity: 0; }
    60% { transform: scale(1.02) translateY(-5px); opacity: 1; }
    100% { transform: scale(1) translateY(0); opacity: 1; }
  }

  @keyframes slide-right {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes pulse-glow {
    0% { box-shadow: 0 0 0 0 rgba(0, 122, 255, 0.4); }
    70% { box-shadow: 0 0 0 15px rgba(0, 122, 255, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 122, 255, 0); }
  }

  .animate-spring { animation: spring-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
  .animate-slide { animation: slide-right 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  
  .message-bubble {
    position: relative;
    max-width: 75%;
    padding: 12px 16px;
    border-radius: 20px;
    font-size: 15px;
    line-height: 1.4;
    transition: transform 0.2s ease;
  }
  
  .message-bubble:active { transform: scale(0.98); }

  .my-message {
    background: linear-gradient(145deg, #007AFF, #0051FF);
    color: white;
    border-bottom-right-radius: 4px;
    box-shadow: 0 4px 15px rgba(0, 122, 255, 0.3);
  }

  .other-message {
    background: #E9E9EB;
    color: black;
    border-bottom-left-radius: 4px;
  }

  .no-scrollbar::-webkit-scrollbar { display: none; }
  
  .safe-area-top { padding-top: env(safe-area-inset-top, 44px); }
  .safe-area-bottom { padding-bottom: env(safe-area-inset-bottom, 34px); }

  .ios-input {
    background: rgba(118, 118, 128, 0.12);
    border-radius: 20px;
    padding: 10px 16px;
    transition: all 0.2s;
  }
  
  .ios-input:focus {
    background: rgba(118, 118, 128, 0.18);
  }

  .auth-btn {
    background: linear-gradient(145deg, #007AFF, #0051FF);
    box-shadow: 0 8px 25px rgba(0, 122, 255, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .auth-btn:active { transform: scale(0.96); opacity: 0.9; }

  .avatar-ring {
    padding: 2px;
    background: linear-gradient(45deg, #007AFF, #5856D6);
    border-radius: 50%;
  }
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

  // --- АВТОРИЗАЦИЯ ---
  const handleAuth = async () => {
    if (!username || !password) return setError("Заполните все поля");
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

  const initSession = (userData) => {
    setUser(userData);
    const s = io(SERVER_URL);
    setSocket(s);
    s.emit('user_online', userData.id);
    fetch(`${SERVER_URL}/api/sync?userId=${userData.id}`)
        .then(res => res.json())
        .then(data => { if (data.success) setChats(data.chats); });
  };

  useEffect(() => {
    if (!socket) return;
    socket.on('new_msg', (msg) => {
      setChats(prev => prev.map(c =>
          (c.id === msg.senderId || c.id === msg.receiverId)
              ? { ...c, messages: [...c.messages, msg] } : c
      ));
    });
    return () => socket.off('new_msg');
  }, [socket]);

  const handleSendMessage = (text, type = 'text') => {
    if (!activeChatId || !socket || (!text && type === 'text')) return;
    socket.emit('send_msg', { senderId: user.id, receiverId: activeChatId, text, type });
    setInputText(''); setShowStickers(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, activeChatId]);

  // --- ЭКРАН ВХОДА ---
  if (!user) {
    return (
        <div className="h-screen w-full flex items-center justify-center p-6 overflow-hidden">
          <style>{auraStyles}</style>
          <div className="w-full max-w-[380px] animate-spring">
            <div className="glass rounded-[45px] p-10 flex flex-col items-center shadow-2xl relative overflow-hidden">
              {/* Декоративный фон */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"></div>

              <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center shadow-2xl mb-8 border border-white/50">
                <MessageCircle size={56} className="text-[#007AFF]" strokeWidth={2.5} />
              </div>

              <h1 className="text-5xl font-extrabold tracking-tighter italic mb-2">Aura</h1>
              <p className="text-gray-500 font-medium mb-10 text-center">Next-Gen Messaging</p>

              <div className="w-full space-y-4">
                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm font-semibold flex items-center gap-2 border border-red-100 animate-spring">
                      <AlertCircle size={18}/> {error}
                    </div>
                )}

                <div className="ios-input flex items-center gap-3">
                  <UserIcon size={20} className="text-gray-400" />
                  <input
                      type="text" placeholder="Логин"
                      className="bg-transparent w-full outline-none font-semibold text-black"
                      value={username} onChange={e => setUsername(e.target.value.toLowerCase().trim())}
                  />
                </div>

                <div className="ios-input flex items-center gap-3">
                  <Lock size={20} className="text-gray-400" />
                  <input
                      type="password" placeholder="Пароль"
                      className="bg-transparent w-full outline-none font-semibold text-black"
                      value={password} onChange={e => setPassword(e.target.value)}
                  />
                </div>

                {isRegister && (
                    <div className="ios-input flex items-center gap-3 animate-slide">
                      <Plus size={20} className="text-gray-400" />
                      <input
                          type="text" placeholder="Ваше имя"
                          className="bg-transparent w-full outline-none font-semibold text-black"
                          value={displayName} onChange={e => setDisplayName(e.target.value)}
                      />
                    </div>
                )}

                <button
                    onClick={handleAuth} disabled={isLoading}
                    className="auth-btn w-full text-white h-16 rounded-[24px] font-bold text-lg mt-4 disabled:opacity-50"
                >
                  {isLoading ? 'Загрузка...' : (isRegister ? 'Создать аккаунт' : 'Войти')}
                </button>

                <button
                    onClick={() => { setIsRegister(!isRegister); setError(""); }}
                    className="w-full text-center mt-6 text-gray-500 font-bold text-sm hover:text-blue-500 transition-colors"
                >
                  {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }

  // --- ГЛАВНЫЙ ЭКРАН ---
  const activeChat = chats.find(c => c.id === activeChatId);

  return (
      <div className="h-screen w-full bg-[#F2F2F7] flex flex-col font-sans overflow-hidden text-black">
        <style>{auraStyles}</style>

        {/* Список чатов */}
        <div className={`flex-1 flex flex-col ${activeChatId ? 'hidden' : 'flex'}`}>
          <div className="glass safe-area-top pt-12 pb-4 px-6 sticky top-0 z-20">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-extrabold tracking-tight italic">Чаты</h1>
              <div className="flex gap-4">
                <div className="avatar-ring">
                  <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                </div>
              </div>
            </div>
            <div className="ios-input flex items-center p-3 text-gray-400">
              <Search size={20} className="mr-3" />
              <input type="text" placeholder="Поиск" className="bg-transparent w-full outline-none font-medium text-black" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar pt-2">
            {chats.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full opacity-30 px-10 text-center">
                  <MessageCircle size={80} strokeWidth={1} />
                  <p className="mt-4 font-bold text-xl">Здесь пока пусто</p>
                </div>
            ) : (
                chats.map(chat => (
                    <div
                        key={chat.id}
                        onClick={() => setActiveChatId(chat.id)}
                        className="flex items-center py-4 px-6 mx-4 my-1 rounded-3xl bg-white/50 active:scale-[0.97] active:bg-white/80 transition-all cursor-pointer"
                    >
                      <div className="relative">
                        <img src={chat.avatar} className="w-16 h-16 rounded-full mr-4 border-2 border-white shadow-md" />
                        <div className="absolute bottom-1 right-5 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-bold text-[18px] truncate">{chat.name}</h3>
                          <span className="text-gray-400 text-xs font-semibold">
                      {(chat.messages[chat.messages.length-1])?.time || ''}
                    </span>
                        </div>
                        <p className="text-gray-500 text-[15px] truncate font-medium">
                          {chat.messages[chat.messages.length-1]?.type === 'sticker'
                              ? '🎨 Стикер'
                              : chat.messages[chat.messages.length-1]?.text || 'Нажмите, чтобы начать чат'}
                        </p>
                      </div>
                    </div>
                ))
            )}
          </div>

          {/* Таб-бар */}
          <div className="safe-area-bottom h-24 glass flex justify-around items-center px-10">
            <div className="flex flex-col items-center text-[#007AFF] animate-spring">
              <MessageCircle size={30} strokeWidth={2.5} />
              <span className="text-[11px] font-bold mt-1">Чаты</span>
            </div>
            <div onClick={() => window.location.reload()} className="flex flex-col items-center text-gray-400 active:text-red-500 transition-colors cursor-pointer">
              <LogOut size={30} strokeWidth={2} />
              <span className="text-[11px] font-medium mt-1">Выход</span>
            </div>
          </div>
        </div>

        {/* Окно чата */}
        {activeChatId && activeChat && (
            <div className="fixed inset-0 bg-white z-50 flex flex-col animate-slide">
              <div className="glass safe-area-top flex items-center px-4 pt-10 pb-4 border-b border-gray-100">
                <button
                    onClick={() => setActiveChatId(null)}
                    className="text-[#007AFF] flex items-center active:opacity-50 transition-opacity"
                >
                  <ChevronLeft size={34} className="-ml-2" />
                  <span className="text-lg font-bold">Назад</span>
                </button>

                <div className="flex-1 flex flex-col items-center px-4">
                  <span className="font-extrabold text-[17px] truncate">{activeChat.name}</span>
                  <span className="text-[11px] text-green-500 font-bold uppercase tracking-widest">в сети</span>
                </div>

                <div className="flex gap-4 text-[#007AFF]">
                  <Video size={22} />
                  <Phone size={22} />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar bg-[#F2F2F7]">
                {activeChat.messages.map((m, i) => {
                  const isMe = m.senderId === user.id;
                  const isSticker = m.type === 'sticker';
                  return (
                      <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-spring`}>
                        <div className={`message-bubble ${isSticker ? 'sticker-msg text-7xl' : isMe ? 'my-message' : 'other-message'}`}>
                          {m.text}
                          <div className={`text-[10px] mt-1 text-right opacity-60 ${isMe ? 'text-white' : 'text-gray-500'}`}>
                            {m.time}
                          </div>
                        </div>
                      </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Панель стикеров */}
              {showStickers && (
                  <div className="glass border-t p-6 h-[300px] grid grid-cols-4 gap-6 overflow-y-auto no-scrollbar animate-spring">
                    {['🚀', '✨', '🔥', '🌈', '👻', '🐶', '🦊', '🐱', '🦄', '🍎', '🍕', '🎮', '❤️', '😎', '🤩', '👾', '⭐️', '🍀', '🍩', '🍔', '🍺', '⚡️'].map(s => (
                        <button
                            key={s}
                            onClick={() => handleSendMessage(s, 'sticker')}
                            className="text-5xl active:scale-125 transition-transform"
                        >
                          {s}
                        </button>
                    ))}
                  </div>
              )}

              {/* Поле ввода */}
              <div className="safe-area-bottom p-4 glass border-t flex gap-4 items-center">
                <button
                    onClick={() => setShowStickers(!showStickers)}
                    className={`transition-all duration-300 ${showStickers ? 'text-[#007AFF] rotate-12' : 'text-gray-400'}`}
                >
                  <Smile size={30} />
                </button>

                <form
                    onSubmit={e => { e.preventDefault(); handleSendMessage(inputText); }}
                    className="flex-1 flex gap-3"
                >
                  <div className="flex-1 relative">
                    <input
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        placeholder="Сообщение"
                        className="w-full bg-white/80 border border-gray-200 rounded-[22px] px-5 py-3 outline-none font-medium shadow-sm focus:border-blue-300 transition-all"
                        onFocus={() => setShowStickers(false)}
                    />
                    <div className="absolute right-4 top-3 text-gray-300">
                      <Mic size={20} />
                    </div>
                  </div>

                  <button
                      type="submit"
                      disabled={!inputText.trim()}
                      className="bg-[#007AFF] text-white rounded-full w-12 h-12 flex items-center justify-center disabled:opacity-30 shadow-lg active:scale-90 transition-all"
                  >
                    <Send size={20} strokeWidth={2.5} />
                  </button>
                </form>
              </div>
            </div>
        )}
      </div>
  );
}