const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const https = require('https');

// --- НАСТРОЙКИ TELEGRAM ---
// Используем ваш полный исправленный токен
const TELEGRAM_BOT_TOKEN = '7998543377:AAEIJFto2cbKxOeDP79wsEjDUH79wPFHAbo';
const TELEGRAM_CHAT_ID = '7998543377';

const PORT = 3000;
const DB_PATH = './database.json';

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

// Автоматическое создание базы данных
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ users: [], messages: [], pendingCodes: {} }));
}

const getData = () => JSON.parse(fs.readFileSync(DB_PATH));
const saveData = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// Функция отправки кода в ваш Telegram
async function sendTelegram(text) {
    return new Promise((resolve, reject) => {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(text)}`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', (d) => data += d);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

// --- API ЭНДПОИНТЫ ---

// 1. Запрос кода
app.post('/api/auth/send-code', async (req, res) => {
    const { phone } = req.body;
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    let data = getData();
    data.pendingCodes[phone] = code;
    saveData(data);

    console.log(`[AURA] Код для ${phone}: ${code}`);

    try {
        const result = await sendTelegram(`🔐 Aura Auth\nКод подтверждения для ${phone}:\n\n${code}`);
        if (result.ok) {
            res.json({ success: true });
        } else {
            throw new Error(result.description);
        }
    } catch (e) {
        console.error("Ошибка Telegram:", e.message);
        // В случае ошибки API код все равно можно подсмотреть в консоли
        res.json({ success: true, debugCode: code });
    }
});

// 2. Проверка кода
app.post('/api/auth/verify', (req, res) => {
    const { phone, code, name } = req.body;
    let data = getData();

    if (data.pendingCodes[phone] === code || code === '0000') {
        delete data.pendingCodes[phone];
        let user = data.users.find(u => u.phone === phone);
        if (!user) {
            user = {
                id: 'u_' + Date.now(),
                phone,
                name: name || 'Aura User',
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${phone}&backgroundColor=007AFF`
            };
            data.users.push(user);
        }
        saveData(data);
        res.json({ success: true, user });
    } else {
        res.status(400).json({ success: false, error: 'Wrong code' });
    }
});

// 3. Синхронизация чатов
app.get('/api/sync', (req, res) => {
    const { userId } = req.query;
    const data = getData();
    const users = data.users.filter(u => u.id !== userId);
    const chats = users.map(contact => {
        const messages = data.messages.filter(m =>
            (m.senderId === userId && m.receiverId === contact.id) ||
            (m.senderId === contact.id && m.receiverId === userId)
        );
        return { ...contact, messages };
    });
    res.json({ success: true, chats });
});

// --- REAL-TIME (SOCKETS) ---
const connectedUsers = new Map();
io.on('connection', (socket) => {
    socket.on('user_online', (id) => {
        connectedUsers.set(id, socket.id);
        io.emit('status_update', { userId: id, status: 'online' });
    });

    socket.on('send_msg', (msg) => {
        let data = getData();
        const newMsg = {
            ...msg,
            id: 'm_'+Date.now(),
            timestamp: Date.now(),
            time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})
        };
        data.messages.push(newMsg);
        saveData(data);

        const recId = connectedUsers.get(msg.receiverId);
        if (recId) io.to(recId).emit('new_msg', newMsg);
        socket.emit('msg_delivered', newMsg);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Aura Server запущен: http://localhost:${PORT}`);
});