const jwt = require('jsonwebtoken');
const config = require('config');

// Middleware для CORS
function cors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
}

// Middleware для проверки авторизации через JWT токен
function checkAuth(req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Auth error' });
        }
        const decoded = jwt.verify(token, config.get('secretKey'));
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Auth error' });
    }
}

// Middleware для установки пути к файлам
function filePath(path) {
    return function (req, res, next) {
        req.filePath = path;
        next();
    }
}

// Экспорт массива всех middleware
module.exports = [cors, checkAuth, filePath];
