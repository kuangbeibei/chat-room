const jwt = require('jsonwebtoken');
exports.authenticateToken = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) {
        return res.sendStatus(401);
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user; 
            next();
        });
    }
}

exports.defaultDoors = [
    {
        name: '大厅',
        // image: images.Tiger,
        id: 'room1',
    },
    {
        name: "在一个时代的终章，我们会看到什么？",
        // image: images.Tiger,
        id: 'room2'
    },
    {
        name: "虚拟货币灵魂三问：我们是否需要一个“加密联储”？",
        // image: images.Tiger,
        id: 'room3'
    },
    {
        name: "PoW vs. PoS: 冰与火之歌",
        // image: images.Tiger,
        id: 'room4'
    },
];

exports.conversations = {
    'room1': [
        {
            username: 'Dan Kuang',
            content: 'Hey, this is a chat room where you can send messages with anyone instantly. There are seveal rules that you should follow: 1. Treat everyone with respect. 2. No spam or promotions. 3. Do not post the same message in multiple channels. 4. Ask any questions in this lobby room as it serves as a customer service.'
        }
    ],
    'room2': [
        {
            username: '大卫',
            content: '摆造型',
        },
        {
            username: '蜡笔小星',
            content: '看美女姐姐',
        },
        {
            username: '老白',
            content: '睡觉',
        }
    ],
}