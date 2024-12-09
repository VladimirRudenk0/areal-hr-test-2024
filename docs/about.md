# О проекте Areal HR Test 2024

## Введение

**Areal HR Test 2024** — это веб-приложение, созданное для учета сотрудников и управления кадровыми процессами в нескольких организациях. Приложение позволяет вести комплексный учет данных о сотрудниках, организациях, отделах, должностях, а также управлять документами и кадровыми операциями.

## Цель проекта

Основная цель — разработка гибкого и масштабируемого приложения для кадрового учета, которое легко адаптируется к потребностям любой организации, нуждающейся в управлении сотрудниками в разных структурах.

## Технологический стек

Для реализации проекта были выбраны следующие технологии:

- **Frontend**: Vue.js, Quasar, Vite — обеспечивают быструю и интерактивную работу интерфейса.
- **Backend**: Node.js, NestJS, Sequelize — позволяют реализовать RESTful API и взаимодействие с базой данных.
- **База данных**: PostgreSQL — хранение информации о сотрудниках, организациях и кадровых операциях.
- **Прочие технологии**: Docker, Nginx, Git/Github, VitePress для документирования.

## Требования

### Функциональные требования

- CRUD-операции для управления сотрудниками.
- Поддержка учета сотрудников в нескольких организациях.
- Авторизация и идентификация пользователей.
- Валидация данных при вводе для обеспечения точности.

### Нефункциональные требования

- Высокая производительность и стабильность.
- Обеспечение безопасности данных.
- Удобство и интуитивность пользовательского интерфейса.

## Архитектура приложения

### Frontend

- **Компоненты на Vue.js** — реализация всех интерфейсов и пользовательских взаимодействий.
- **Quasar** — используется для обеспечения кроссплатформенной совместимости.
- **Vite** — ускоряет сборку и разработку проекта.
- **VitePress** — платформа для создания документации.

### Backend

- **API на Node.js с NestJS** — для обработки запросов и аутентификации.
- **Sequelize и node-pg-migrate** — для работы с PostgreSQL и миграциями базы данных.

### База данных

- **PostgreSQL** — система управления базами данных, структурированная для удобного хранения информации о сотрудниках и организациях.

### Контейнеризация

- **Docker** — упаковка приложения и его зависимостей в контейнеры.
- **Nginx** — для раздачи статических файлов и проксирования запросов.

## Процесс разработки

- Использование **Git и Github** для контроля версий и командной работы.
- Создание миграций для управления изменениями в структуре базы данных.
- Проведение тестирования компонентов и API для обеспечения стабильности.

## Документация

Проектная документация создается с помощью **VitePress** и включает инструкции по установке, настройке и использованию приложения.

## Структура проекта

```
areal-hr-test-2024/
├── .git/                   # Файлы системы контроля версий Git
├── .gitignore              # Список игнорируемых файлов
├── README.md               # Краткая документация по проекту
├── docker-compose.yml      # Настройки сервисов для Docker
├── .env                    # Переменные окружения (не добавляются в Git)
├── .env.example            # Пример файла переменных окружения
├── /api                    # Backend приложение (Node.js + NestJS)
│   ├── Dockerfile          # Docker-образ для backend
│   ├── migrations/         # Файлы миграций базы данных
│   └── src/
│       ├── main.ts         # Точка входа в приложение
│       ├── app.module.ts   # Главный модуль NestJS
│       ├── config/         # Конфигурации приложения (CORS, переменные окружения и т.д.)
│       ├── models/         # Модели данных (пользователи, организации и т.д.)
│       └── modules/        # Модули и контроллеры для обработки запросов
│
├── /app                    # Frontend приложение (Vue.js + Quasar)
│   ├── Dockerfile          # Docker-образ для frontend
│   └── src/
│       ├── main.ts         # Точка входа в приложение
│       ├── api/            # API-запросы
│       ├── components/     # Компоненты Vue
│       └── pages/          # Основные страницы приложения
└── /containers             # Скрипты и настройки для Docker
    └── nginx/              # Конфигурации для Nginx
        └── nginx.conf
```

## Инструментарий для разработки

- **Операционная система** — Windows 10 с установленными WSL2 и Docker Desktop.
- **IDE** — IntelliJ IDEA и Visual Studio Code.
- **Дополнительные приложения** — PostgreSQL с модулями PEM-HTTPD и Migration Toolkit.

## [Вернуться на главную страницу](index.md)