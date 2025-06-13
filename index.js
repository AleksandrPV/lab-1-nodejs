const http = require('http');
const os = require("os");
const userInfo = os.userInfo();
const uid = userInfo.uid;
const name = userInfo.username;
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;
const MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGODB_URI || "mongodb://mongodb:27017/test1";
const mongoClient = new MongoClient(url);

async function run() {
    try {
        // Подключаемся к серверу
        await mongoClient.connect();
        // обращаемся к базе данных
        const db = mongoClient.db();
        // выполняем пинг для проверки подключения
        const result = await db.command({ ping: 1 });
        console.log("Подключение с сервером успешно установлено");
        console.log(result);
    } 
    catch(err) {
        console.log("Возникла ошибка");
        console.log(err);
    }
}

// Запускаем подключение к MongoDB
run().catch(console.error);

const server = http.createServer(async (req, res) => {
    try {
        const db = mongoClient.db();
        const collection = db.collection("users");
        const count = await collection.countDocuments();
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`Hello ${name}, you have ${count} documents`);
    } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
        console.error(err);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

 