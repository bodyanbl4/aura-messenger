import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import {
  Search, MessageCircle, ChevronLeft, Send, Phone, User, Plus, Sticker, AlertCircle, Lock, User as UserIcon, LogOut
} from 'lucide-react';

// --- КОНФИГУРАЦИЯ СЕРВЕРА ---
// Твоя актуальная ссылка от Render:
const SERVER_URL = 'https://aura-je6y.onrender.com';

const auraStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  
  :root { 
    --aura-blue: #007AFF; 
    --aura-bg: #FFFFFF; 
  }
  
  body { 
    font-family: 'Inter', -apple-system, sans-serif; 
    margin: 0; padding: 0; overflow: hidden; 
    background-color: #f0f0f2; color: black;
    user-select: none; 
    -webkit-tap-highlight-color: transparent;
  }

  .ios-blur { 
    background: rgba(255, 255, 255, 0.8); 
    backdrop-filter: blur(30px) saturate(190%); 
  }
  
  @keyframes message-spring { 
    0% { opacity: 0; transform: scale(0.8) translateY(10px); } 
    100% { opacity: 1; transform: scale(1) translateY(0); } 
  }
  
  .animate-aura-message { animation: message-spring 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
  
  .animate-slide-in { animation: slide-in 0.4s cubic-bezier(0.3, 1, 0.3, 1) forwards; }
  @keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
  
  .no-scrollbar::-webkit-scrollbar { display: none; }
  
  .safe-area-top { padding-top: env(safe-area-inset-top, 20px); }
  .safe-area-bottom { padding-bottom: env(safe-area-inset-bottom, 20px); }

  .sticker-msg { background: transparent !important; box-shadow: none !important; padding: 0 !important; }
  
  .auth-gradient {
    background: linear-gradient(135deg, #007AFF 0%, #5856D6 100%);
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

  // --- ЛОГИКА АУТЕНТИФИКАЦИИ ---

  const handleAuth = async () => {
    if (!username || !password) return setError("Заполните все поля");
    setIsLoading(true);
    setError("");

    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    const body = isRegister
        ? { username, password, name: displayName }
        : { username, password };

    try {
      const res = await fetch(`${SERVER_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (data.success) {
        initSession(data.user);
      } else {
        setError(data.error || "Ошибка доступа");
      }
    } catch (e) {
      setError("Сервер временно недоступен. Подождите 30 секунд, пока Render проснется.");
    } finally {
      setIsLoading(false);
    }
  };

  const initSession = async (userData) => {
    setUser(userData);
    const s = io(SERVER_URL);
    setSocket(s);
    s.emit('user_online', userData.id);

    try {
      const syncRes = await fetch(`${SERVER_URL}/api/sync?userId=${userData.id}`);
      const syncData = await syncRes.json();
      if (syncData.success) setChats(syncData.chats);
    } catch (e) { console.error("Sync error"); }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on('new_msg', (msg) => {
      setChats(prev => prev.map(c =>
          (c.id === msg.senderId || c.id === msg.receiverId)
              ? { ...c, messages: [...c.messages, msg] }
              : c
      ));
    });

    socket.on('msg_delivered', (msg) => {
      setChats(prev => prev.map(c =>
          (c.id === msg.receiverId)
              ? { ...c, messages: [...c.messages, msg] }
              : c
      ));
    });

    return () => {
      socket.off('new_msg');
      socket.off('msg_delivered');
    };
  }, [socket]);

  const handleSendMessage = (text, type = 'text') => {
    if (!activeChatId || !socket || (!text && type === 'text')) return;

    const msgData = {
      senderId: user.id,
      receiverId: activeChatId,
      text,
      type
    };

    socket.emit('send_msg', msgData);
    setInputText('');
    setShowStickers(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, activeChatId]);

  if (!user) {
    return (
        <div className="h-screen w-full bg-white flex flex-col items-center justify-center p-8 font-sans text-black">
          <style>{auraStyles}</style>
          <div className="w-full max-w-[360px] animate-aura-message">
            <div className="w-24 h-24 auth-gradient rounded-[30px] flex items-center justify-center shadow-2xl mb-10 mx-auto">
              <MessageCircle size={52} color="white" />
            </div>

            <h1 className="text-5xl font-extrabold mb-2 italic tracking-tighter text-center">Aura</h1>
            <p className="text-gray-400 mb-10 text-center font-medium">
              {isRegister ? 'Регистрация в Aura' : 'Вход в мессенджер'}
            </p>

            <div className="space-y-4">
              {error && (
                  <div className="text-red-500 bg-red-50 p-4 rounded-2xl text-sm border border-red-100 flex items-center gap-2">
                    <AlertCircle size={18}/> {error}
                  </div>
              )}

              <div className="bg-gray-100 p-4 rounded-2xl flex items-center gap-3">
                <UserIcon size={20} className="text-gray-400" />
                <input
                    type="text" placeholder="Логин"
                    className="bg-transparent w-full outline-none font-semibold"
                    value={username} onChange={e => setUsername(e.target.value.toLowerCase().trim())}
                />
              </div>

              <div className="bg-gray-100 p-4 rounded-2xl flex items-center gap-3">
                <Lock size={20} className="text-gray-400" />
                <input
                    type="password" placeholder="Пароль"
                    className="bg-transparent w-full outline-none font-semibold"
                    value={password} onChange={e => setPassword(e.target.value)}
                />
              </div>

              {isRegister && (
                  <div className="bg-gray-100 p-4 rounded-2xl flex items-center gap-3 animate-slide-in">
                    <Plus size={20} className="text-gray-400" />
                    <input
                        type="text" placeholder="Имя"
                        className="bg-transparent w-full outline-none font-semibold"
                        value={displayName} onChange={e => setDisplayName(e.target.value)}
                    />
                  </div>
              )}

              <button
                  onClick={handleAuth} disabled={isLoading}
                  className="w-full bg-[#007AFF] text-white h-16 rounded-[24px] font-bold text-lg shadow-xl shadow-blue-500/20 active:scale-95 transition-all mt-4"
              >
                {isLoading ? 'Подключение...' : (isRegister ? 'Зарегистрироваться' : 'Войти')}
              </button>

              <p className="text-center mt-6 text-gray-500 font-medium">
                {isRegister ? 'Есть аккаунт?' : 'Впервые в Aura?'}
                <button
                    onClick={() => { setIsRegister(!isRegister); setError(""); }}
                    className="ml-2 text-[#007AFF] font-bold underline"
                >
                  {isRegister ? 'Войти' : 'Создать'}
                </button>
              </p>
            </div>
          </div>
        </div>
    );
  }

  const activeChat = chats.find(c => c.id === activeChatId);

  return (
      <div className="h-screen w-full bg-white flex flex-col font-sans overflow-hidden text-black">
        <style>{auraStyles}</style>

        <div className={`flex-1 flex flex-col ${activeChatId ? 'hidden' : 'flex'}`}>
          <div className="ios-blur safe-area-top pt-12 pb-2 px-6 sticky top-0 z-20">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-4xl font-extrabold tracking-tight italic">Aura</h1>
              <div className="relative">
                <img src={user.avatar} className="w-10 h-10 rounded-full border border-gray-100 shadow-sm" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl flex items-center p-3 text-gray-400 mb-2">
              <Search size={20} className="mr-3" /> <span className="text-lg font-medium">Поиск</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            {chats.length === 0 ? (
                <div className="text-center mt-32 px-10 animate-aura-message">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-200">
                    <Plus size={40}/>
                  </div>
                  <p className="text-gray-400 font-medium text-center">Список пуст. <br/>Зарегистрируйте другого пользователя!</p>
                </div>
            ) : (
                chats.map(chat => (
                    <div key={chat.id} onClick={() => setActiveChatId(chat.id)} className="flex items-center py-4 border-b border-gray-50 ml-6 pr-6 cursor-pointer active:bg-gray-100 transition-colors">
                      <img src={chat.avatar} className="w-14 h-14 rounded-full mr-4 border border-gray-100" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="font-bold text-[17px] truncate">{chat.name}</h3>
                          <span className="text-gray-400 text-xs">{(chat.messages[chat.messages.length-1])?.time || ''}</span>
                        </div>
                        <p className="text-gray-500 text-[15px] truncate">
                          {chat.messages[chat.messages.length-1]?.type === 'sticker' ? '🎨 Стикер' : chat.messages[chat.messages.length-1]?.text || 'Начните чат...'}
                        </p>
                      </div>
                    </div>
                ))
            )}
          </div>

          <div className="safe-area-bottom h-20 border-t border-gray-100 flex justify-around items-center bg-white/95 backdrop-blur-md">
            <div className="flex flex-col items-center text-[#007AFF]"><MessageCircle size={28} strokeWidth={2.5} /><span className="text-[10px] font-bold mt-1">Чаты</span></div>
            <div onClick={() => window.location.reload()} className="flex flex-col items-center text-gray-300 cursor-pointer"><LogOut size={28} strokeWidth={1.5} /><span className="text-[10px] font-medium mt-1">Выход</span></div>
          </div>
        </div>

        {activeChatId && activeChat && (
            <div className="fixed inset-0 bg-white z-30 flex flex-col animate-slide-in">
              <div className="ios-blur safe-area-top flex items-center px-4 pt-10 pb-3 border-b border-gray-100">
                <button onClick={() => setActiveChatId(null)} className="text-[#007AFF] flex items-center active:opacity-50 transition-opacity">
                  <ChevronLeft size={34} className="-ml-2" /> <span className="text-lg font-bold">Чаты</span>
                </button>
                <div className="flex-1 text-center font-bold text-[17px] truncate px-4">{activeChat.name}</div>
                <div className="w-14 flex justify-end text-[#007AFF]"><Phone size={22} /></div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-3 no-scrollbar bg-white">
                {activeChat.messages.map((m, i) => (
                    <div key={i} className={`flex ${m.senderId === user.id ? 'justify-end' : 'justify-start'} animate-aura-message`}>
                      <div className={`max-w-[80%] px-4 py-2.5 rounded-[22px] shadow-sm ${m.type === 'sticker' ? 'sticker-msg text-7xl' : m.senderId === user.id ? 'bg-[#007AFF] text-white rounded-br-none' : 'bg-[#F2F2F7] text-black rounded-bl-none'}`}>
                        {m.text}
                      </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {showStickers && (
                  <div className="ios-blur border-t p-4 h-[250px] grid grid-cols-4 gap-4 overflow-y-auto no-scrollbar animate-slide-in">
                    {['🚀', '✨', '🔥', '🌈', '👻', '🐶', '🦊', '🐱', '🦄', '🍎', '🍕', '🎮', '❤️', '😎', '🤩', '👾', '⭐️', '🍀', '🍩'].map(s => (
                        <button key={s} onClick={() => handleSendMessage(s, 'sticker')} className="text-5xl active:scale-90 transition-transform">{s}</button>
                    ))}
                  </div>
              )}

              <div className="safe-area-bottom p-4 border-t flex gap-3 items-center bg-gray-50">
                <button onClick={() => setShowStickers(!showStickers)} className={`transition-colors ${showStickers ? 'text-[#007AFF]' : 'text-gray-400'}`}><Sticker size={28} /></button>
                <form onSubmit={e => { e.preventDefault(); handleSendMessage(inputText); }} className="flex-1 flex gap-2">
                  <input value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Сообщение" className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2.5 outline-none font-medium" onFocus={() => setShowStickers(false)} />
                  <button type="submit" disabled={!inputText.trim()} className="bg-[#007AFF] text-white rounded-full p-2 w-12 h-12 flex items-center justify-center disabled:opacity-30 shadow-lg shadow-blue-500/20 active:scale-90 transition-transform"><Send size={20} /></button>
                </form>
              </div>
            </div>
        )}
      </div>
  );
}