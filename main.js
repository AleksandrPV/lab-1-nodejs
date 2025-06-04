const http = require('http');
const os = require("os");
const userInfo = os.userInfo();
const uid = userInfo.uid;
const name = userInfo.username;
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;
const MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nodejs";
const mongoClient = new MongoClient(url);
let count = 0;

async function run() {
    try {
        // Подключаемся к серверу
        await mongoClient.connect();
        // обращаемся к базе данных
        const db = mongoClient.db();
        // выполняем пинг для проверки подключения
        const result = await db.command({ ping: 1 });
        console.log("Подключение с сервером успешно установлено");
        const collection = db.collection("users");
        count = await collection.countDocuments();
        console.log(`В коллекции users ${count} документа/ов`);
        console.log(result);
    } 
    catch(err) {
        console.log("Возникла ошибка");
        console.log(err);
    }
}

// Запускаем подключение к MongoDB
run().catch(console.error);

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Hello ${name}, you have ${count} documents` );
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
