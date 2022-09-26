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

exports.conversations = [
    {
        username: 'kk',
        content: '你好呀',
    },
    {
        username: 'laobai',
        content: '喵喵'
    },
    {
        username: 'feifei',
        content: '如果文字多了就会溢出来, 如果文字多了就会溢出来, 如果文字多了就会溢出来,如果文字多了就会溢出来,如果文字多了就会溢出来,如果文字多了就会溢出来,如果文字多了就会溢出来,如果文字多了就会溢出来'
    }
]