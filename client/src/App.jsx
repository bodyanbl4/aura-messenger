import React, { useState, useRef, useEffect } from 'react';
import {
  Paperclip,
  Mic,
  Camera,
  Send,
  ChevronLeft,
  Trash2,
  X,
  Settings,
  Trash,
  Bell,
  Check,
  CheckCheck
} from 'lucide-react';

const App = () => {
  // --- СОСТОЯНИЯ ---
  const [messages, setMessages] = useState([
    { id: 1, type: 'text', content: 'Привет! Как дела?', sender: 'other', timestamp: '10:00', status: 'read' },
    { id: 2, type: 'text', content: 'Все супер, доделываю кружки как в Телеге!', sender: 'me', timestamp: '10:02', status: 'read' },
  ]);
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState('voice'); // 'voice' или 'video'
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [privacyStatus, setPrivacyStatus] = useState('online');
  const [contextMenu, setContextMenu] = useState(null);
  const [stream, setStream] = useState(null);
  const [activePush, setActivePush] = useState(null);

  const videoRef = useRef(null);
  const recordingInterval = useRef(null);
  const pressTimer = useRef(null);
  const isHolding = useRef(false);

  // --- ЭФФЕКТЫ ---

  // Скрытие пуша
  useEffect(() => {
    if (activePush) {
      const timer = setTimeout(() => setActivePush(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [activePush]);

  // Подключение видеопотока к элементу (Фикс черного экрана)
  useEffect(() => {
    if (stream && videoRef.current && mode === 'video' && isRecording) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play().catch(e => console.error("Play error:", e));
      };
    }
  }, [stream, isRecording, mode]);

  // --- ЛОГИКА КАМЕРЫ ---
  const startMedia = async () => {
    try {
      const constraints = {
        audio: true,
        video: mode === 'video' ? { facingMode: 'user', width: 400, height: 400 } : false
      };
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
    } catch (err) {
      console.error("Ошибка доступа:", err);
    }
  };

  const stopMedia = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  // --- УПРАВЛЕНИЕ КНОПКОЙ (TAP & HOLD) ---
  const handlePointerDown = (e) => {
    isHolding.current = false;
    pressTimer.current = setTimeout(() => {
      isHolding.current = true;
      startRecording();
    }, 300); // Порог удержания
  };

  const handlePointerUp = () => {
    clearTimeout(pressTimer.current);
    if (isHolding.current) {
      finishRecording();
    } else {
      // Одиночное нажатие — меняем режим
      setMode(prev => prev === 'voice' ? 'video' : 'voice');
    }
    isHolding.current = false;
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingDuration(0);
    startMedia();
    recordingInterval.current = setInterval(() => {
      setRecordingDuration(prev => prev + 1);
    }, 1000);
  };

  const finishRecording = () => {
    clearInterval(recordingInterval.current);
    const duration = recordingDuration;
    setIsRecording(false);
    setRecordingDuration(0);
    stopMedia();

    if (duration > 0) {
      const newMsg = {
        id: Date.now(),
        type: mode === 'voice' ? 'audio' : 'circle',
        content: mode === 'voice' ? 'Голосовое' : '',
        duration: formatTime(duration),
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      setMessages(prev => [...prev, newMsg]);
    }
  };

  const cancelRecording = () => {
    clearInterval(recordingInterval.current);
    setIsRecording(false);
    setRecordingDuration(0);
    stopMedia();
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // --- СООБЩЕНИЯ ---
  const handleSendText = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      id: Date.now(),
      type: 'text',
      content: inputText,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
  };

  const deleteMessage = (target) => {
    if (!contextMenu) return;
    // В реальном приложении здесь был бы запрос к API
    setMessages(prev => prev.filter(m => m.id !== contextMenu.msgId));
    setContextMenu(null);
  };

  return (
      <div className="flex flex-col h-screen bg-[#f0f0f0] font-sans overflow-hidden select-none relative text-black">

        {/* iOS PUSH */}
        {activePush && (
            <div className="absolute top-4 left-4 right-4 z-[200] animate-in slide-in-from-top duration-500">
              <div className="bg-white/90 backdrop-blur-2xl rounded-[2rem] p-4 shadow-2xl flex items-center space-x-4 border border-white/20">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Send size={24} className="text-white" fill="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-bold text-gray-500 tracking-wider">TELEGRAM</span>
                    <span className="text-[11px] text-gray-400">сейчас</span>
                  </div>
                  <div className="text-[15px] font-bold truncate">{activePush.title}</div>
                  <div className="text-[14px] text-gray-600 truncate">{activePush.message}</div>
                </div>
              </div>
            </div>
        )}

        {/* HEADER */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 h-16 flex items-center px-4 shrink-0 z-20">
          <div className="text-[#007aff] flex items-center cursor-pointer flex-1">
            <ChevronLeft size={30} />
            <span className="text-[17px] -ml-1">Чаты</span>
          </div>
          <div className="flex-[2] flex flex-col items-center">
            <div className="font-bold text-[17px] leading-tight">Павел Дуров</div>
            <div className={`text-[12px] ${privacyStatus === 'online' ? 'text-[#007aff]' : 'text-gray-500'}`}>
              {privacyStatus === 'online' ? 'в сети' : 'был(а) недавно'}
            </div>
          </div>
          <div className="flex-1 flex justify-end items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">ПД</div>
            <button onClick={() => setIsSettingsOpen(true)} className="text-[#007aff]">
              <Settings size={22} />
            </button>
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#e6ebf0] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-fixed">
          {messages.map((msg) => (
              <div
                  key={msg.id}
                  onContextMenu={(e) => { e.preventDefault(); setContextMenu({ x: e.pageX, y: e.pageY, msgId: msg.id }); }}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div className={`max-w-[80%] px-3 py-1.5 rounded-[18px] shadow-sm relative ${
                    msg.sender === 'me' ? 'bg-[#effdde] rounded-tr-[4px]' : 'bg-white rounded-tl-[4px]'
                }`}>
                  {msg.type === 'circle' ? (
                      <div className="w-56 h-56 rounded-full overflow-hidden border-2 border-white shadow-md bg-black relative">
                        <div className="absolute inset-0 flex items-center justify-center text-white/50 text-xs">Видео-кружок</div>
                      </div>
                  ) : msg.type === 'audio' ? (
                      <div className="flex items-center space-x-3 py-1 pr-6 min-w-[160px]">
                        <div className="bg-blue-500 rounded-full p-2 text-white shadow-sm"><Mic size={18} fill="white" /></div>
                        <div className="flex-1">
                          <div className="h-[2px] w-full bg-gray-300 rounded-full relative">
                            <div className="absolute left-0 top-0 h-full w-1/4 bg-blue-500"></div>
                          </div>
                          <div className="text-[11px] text-gray-500 mt-1">{msg.duration}</div>
                        </div>
                      </div>
                  ) : (
                      <p className="text-[16px] leading-[1.3] pr-8">{msg.content}</p>
                  )}
                  <div className="absolute bottom-1 right-2 flex items-center space-x-1">
                    <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                    {msg.sender === 'me' && (
                        msg.status === 'read' ? <CheckCheck size={12} className="text-blue-500" /> : <Check size={12} className="text-blue-500" />
                    )}
                  </div>
                </div>
              </div>
          ))}
        </div>

        {/* RECORDING HUD */}
        {isRecording && (
            <div className="absolute inset-x-0 bottom-20 z-[150] flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-white/90 backdrop-blur-xl rounded-full px-6 py-4 shadow-2xl border border-gray-200 flex items-center space-x-4">
                {mode === 'video' && (
                    <div className="w-32 h-32 bg-black rounded-full overflow-hidden border-4 border-blue-500 shadow-inner">
                      <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover scale-x-[-1]" />
                    </div>
                )}
                <div className="flex flex-col items-center">
                  <div className="flex items-center space-x-2 text-red-500 font-bold text-lg">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                    <span>{formatTime(recordingDuration)}</span>
                  </div>
                  <button onClick={cancelRecording} className="text-[13px] text-gray-500 font-medium mt-1 uppercase tracking-wider">Отменить</button>
                </div>
              </div>
            </div>
        )}

        {/* INPUT BAR */}
        <div className="bg-white/90 backdrop-blur-2xl px-2 py-2 flex items-end space-x-2 border-t border-gray-200 pb-safe z-20">
          <button className="p-2 text-[#007aff]">
            <Paperclip size={28} />
          </button>

          <div className="flex-1 bg-white border border-gray-300 rounded-[20px] min-h-[36px] px-3 py-1.5 flex items-center">
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Сообщение"
                className="w-full focus:outline-none text-[17px] bg-transparent"
            />
          </div>

          {inputText.length > 0 ? (
              <button onClick={handleSendText} className="p-2 bg-[#007aff] text-white rounded-full transition-transform active:scale-90">
                <Send size={22} fill="white" />
              </button>
          ) : (
              <button
                  onPointerDown={handlePointerDown}
                  onPointerUp={handlePointerUp}
                  className={`p-2 transition-all duration-200 ${isRecording ? 'text-red-500 scale-125' : 'text-[#007aff]'}`}
              >
                {mode === 'voice' ? <Mic size={28} /> : <Camera size={28} />}
              </button>
          )}
        </div>

        {/* CONTEXT MENU */}
        {contextMenu && (
            <>
              <div className="fixed inset-0 z-[290]" onClick={() => setContextMenu(null)} />
              <div
                  className="absolute z-[300] bg-white/90 backdrop-blur-2xl border border-gray-200 rounded-2xl shadow-2xl w-56 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                  style={{ top: contextMenu.y - 120, left: Math.min(contextMenu.x, window.innerWidth - 240) }}
              >
                <button onClick={() => deleteMessage('me')} className="w-full flex items-center px-4 py-3.5 text-[15px] text-gray-800 hover:bg-gray-100/50 border-b border-gray-100">
                  <Trash size={18} className="mr-3 text-gray-400" /> Удалить у меня
                </button>
                <button onClick={() => deleteMessage('both')} className="w-full flex items-center px-4 py-3.5 text-[15px] text-red-600 hover:bg-red-50 font-medium">
                  <Trash2 size={18} className="mr-3" /> Удалить у всех
                </button>
              </div>
            </>
        )}

        {/* SETTINGS MODAL */}
        {isSettingsOpen && (
            <div className="absolute inset-0 z-[400] bg-[#f0f0f0] flex flex-col animate-in slide-in-from-right duration-300">
              <div className="h-16 bg-white/80 backdrop-blur-md flex items-center px-4 border-b border-gray-200">
                <button onClick={() => setIsSettingsOpen(false)} className="text-[#007aff] flex items-center">
                  <ChevronLeft size={30} />
                  <span className="text-[17px]">Назад</span>
                </button>
                <div className="flex-1 text-center font-bold text-[17px]">Настройки</div>
                <div className="w-12" />
              </div>
              <div className="p-4 space-y-6">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-4 flex items-center justify-between border-b border-gray-100">
                    <span className="text-[16px]">Видимость сети</span>
                    <select
                        value={privacyStatus}
                        onChange={(e) => setPrivacyStatus(e.target.value)}
                        className="bg-transparent text-[#007aff] font-medium text-[16px] outline-none"
                    >
                      <option value="online">Всегда в сети</option>
                      <option value="recently">Был(а) недавно</option>
                    </select>
                  </div>
                  <div
                      onClick={() => { setActivePush({ title: 'Павел Дуров', message: 'Кружки теперь работают идеально! 🔥' }); setIsSettingsOpen(false); }}
                      className="p-4 flex items-center justify-between cursor-pointer active:bg-gray-50"
                  >
                    <span className="text-[16px]">Тестовое уведомление</span>
                    <Bell size={20} className="text-[#007aff]" />
                  </div>
                </div>
                <p className="text-[13px] text-gray-500 px-4 leading-relaxed">
                  Настройка «Был(а) недавно» скроет ваше точное время входа от всех пользователей.
                </p>
              </div>
            </div>
        )}
      </div>
  );
};

export default App;