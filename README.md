
# Check-Event

Небольшое приложение направленное на облегчение процесса подготовки и организации любого типа мероприятия.



## Технический стек

**Client:** Vue3, Pinia, TailwindCSS, Shadcn/vue

**Server:** Python


## Демо приложения

https://genius192x.github.io/checkevent/


## Локальный запуск проекта

Клонировать репозиторий желательая версия Node > 20

```bash
  git clone https://github.com/genius192x/checkevent.git
```

Перейти в папку с проектом

```bash
  cd checkevent
```

Скачать нужные пакеты

```bash
  npm install
```

Запустить приложение

```bash
  vite
```


## Docker
Если докер установлен, то идем дальше, если нет то устанавливаем https://dev.to/ysmnikhil/how-to-build-with-react-or-vue-with-vite-and-docker-1a3l

Создайте контейнер Docker

```bash
  docker-compose up --build --no-recreate -d
```

Перейти в контейнер

```bash
  docker exec -it checkevent sh
```

Скачать пакеты и запустить приложение

```bash
  npm i && npm run dev
```

