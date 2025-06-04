# Node.js API с MongoDB

Простой REST API сервер на Node.js с использованием MongoDB в качестве базы данных.

## Технологии

- Node.js
- Express.js
- MongoDB
- Docker
- GitHub Actions для CI/CD

## Требования

- Node.js 20.x
- MongoDB 7.0
- Docker и Docker Compose (для контейнеризации)

## Установка и запуск

### Локальная разработка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите MongoDB:
```bash
sudo systemctl start mongod
```

4. Запустите приложение:
```bash
npm start
```

### Запуск в Docker

1. Сборка и запуск контейнеров:
```bash
docker-compose up --build
```

Для продакшн сборки:
```bash
docker-compose -f docker-compose.prod.yml up --build
```

## API Endpoints

- `GET /api/users` - Получить список всех пользователей
- `POST /api/users` - Создать нового пользователя
- `GET /api/users/:id` - Получить пользователя по ID
- `PUT /api/users/:id` - Обновить пользователя
- `DELETE /api/users/:id` - Удалить пользователя

## Структура проекта

```
.
├── .github/              # GitHub Actions workflows
├── node_modules/         # Зависимости проекта
├── .dockerignore        # Исключения для Docker
├── .gitignore           # Исключения для Git
├── Dockerfile           # Конфигурация Docker для разработки
├── Dockerfile.prod      # Конфигурация Docker для продакшена
├── docker-compose.yml   # Конфигурация Docker Compose для разработки
├── docker-compose.prod.yml # Конфигурация Docker Compose для продакшена
├── index.js             # Точка входа приложения
├── main.js              # Основной файл приложения
├── package.json         # Зависимости и скрипты
└── README.md            # Документация проекта
```

## CI/CD

Проект настроен на автоматическое развертывание при пуше в ветку main через GitHub Actions. Процесс включает:
1. Сборку Docker образа
2. Тестирование
3. Развертывание на сервер

## Лицензия

MIT 