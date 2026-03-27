const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Настройка CORS: разрешаем запросы со всех доменов (важно для Vercel)
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Используем /tmp для базы данных на Render, так как корень может быть защищен от записи
const DB_PATH = path.join('/tmp', 'database.json');

// Инициализация базы данных
const initDB = () => {
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify({ users: [], messages: [] }));
        console.log("База данных создана в /tmp");
    }
};
initDB();

const getData = () => {
    try {
        return JSON.parse(fs.readFileSync(DB_PATH));
    } catch (e) {
        return { users: [], messages: [] };
    }
};

const saveData = (data) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Ошибка сохранения БД:", e);
    }
};

// --- API ---

app.get('/', (req, res) => {
    res.send('Aura Server is Online 🚀');
});

app.post('/api/auth/register', (req, res) => {
    const { username, password, name } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Логин и пароль обязательны' });

    let data = getData();
    if (data.users.find(u => u.username === username)) {
        return res.status(400).json({ error: 'Этот логин уже занят' });
    }

    const newUser = {
        id: 'u_' + Date.now(),
        username,
        password,
        name: name || username,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&backgroundColor=007AFF`
    };

    data.users.push(newUser);
    saveData(data);
    res.json({ success: true, user: newUser });
});

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    let data = getData();
    const user = data.users.find(u => u.username === username && u.password === password);
    if (user) res.json({ success: true, user });
    else res.status(401).json({ success: false, error: 'Неверный логин или пароль' });
});

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

// --- SOCKETS ---
const connectedUsers = new Map();

io.on('connection', (socket) => {
    socket.on('user_online', (userId) => {
        connectedUsers.set(userId, socket.id);
    });

    socket.on('send_msg', (msg) => {
        let data = getData();
        const newMsg = {
            ...msg,
            id: 'm_' + Date.now(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        data.messages.push(newMsg);
        saveData(data);

        const receiverSocketId = connectedUsers.get(msg.receiverId);
        if (receiverSocketId) io.to(receiverSocketId).emit('new_msg', newMsg);
        socket.emit('msg_delivered', newMsg);
    });

    socket.on('disconnect', () => {
        for (let [uid, sid] of connectedUsers.entries()) {
            if (sid === socket.id) { connectedUsers.delete(uid); break; }
        }
    });
});

// КРИТИЧНО ДЛЯ RENDER: слушаем порт из process.env.PORT
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Aura Server Live on port ${PORT}`);
});