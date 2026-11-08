# DevTask Hub — TSIS6 (Firebase Authentication & Server Data Caching)

**Студент:** Медеу Сейдали  
**Курс:** React JS Frameworks  
**Деплой (Vercel):** [https://YOUR-VERCEL-APP.vercel.app](https://YOUR-VERCEL-APP.vercel.app)  
**Репозиторий (GitHub):** [https://github.com/YOUR-USERNAME/devtask-hub-tsis6](https://github.com/YOUR-USERNAME/devtask-hub-tsis6)

---

## 📌 Что реализовано в ТСИС6

1. **Firebase Authentication (`src/firebase.js`, `src/context/AuthContext.jsx`)**:
   - Авторизация через Email/Password и Google Sign-In (`signInWithPopup`).
   - Настоящая регистрация пользователей (`createUserWithEmailAndPassword`) с валидацией пароля.
   - Сохранение сессии при перезагрузке через `onAuthStateChanged`.
   - Публичные страницы (`/`, `/about`, `/tasks`, `/tasks/:id`, `/login`, `/signup`) и защищенные (`/profile`, `/dashboard`).

2. **Защищенные маршруты (`ProtectedRoute.jsx`)**:
   - Ограничение доступа неавторизованных пользователей к страницам `/profile` и `/dashboard`.
   - Автоматический редирект на `/login` с сохранением целевого адреса (`state.from`).

3. **Стратегия кэширования серверных данных (Server Data Caching Strategy)**:
   - Создан сервис ин-мемори кэширования в слоя API (`src/services/fakeApi.js`).
   - Кэшируются результаты запросов всех задач (`getAll`) и детальной информации отдельной задачи (`getById`).
   - Время жизни кэша (TTL) задается через переменную окружения `VITE_CACHE_TTL_MS` (по умолчанию 60 000 мс / 1 минута).

---

## ⚡ Описание стратегии кэширования и инвалидации (Caching Strategy Explanation)

### 1. Как работает кэширование
- **Кэширование списка (`getAll`)**: При первом запросе данные загружаются и сохраняются в `cacheStore.allTasks` с меткой времени `allTasksTimestamp`. При повторных вызовах в пределах TTL API мгновенно возвращает кэшированные данные без задержки сети.
- **Кэширование деталей (`getById`)**: Детали элементов сохраняются в `Map` под своими ID. Если карточка запрашивается повторно, информация берется из памяти.

### 2. Когда кэш инвалидируется (Cache Invalidation Rules)
Сброс кэша (`clearCache()`) происходит автоматически при выполнении любых мутаций данных, чтобы пользователь всегда видел актуальное состояние:
- **`create(newItem)`**: сбрасывает кэш списка и деталей.
- **`update(id, partialData)`**: сбрасывает кэш списка и деталей.
- **`remove(id)`**: сбрасывает кэш списка и деталей.
- **`resetData()`**: очищает `localStorage` и сбрасывает кэш.

---

## 🛠️ Запуск проекта локально

1. Клонировать репозиторий:
   ```bash
   git clone [https://github.com/YOUR-USERNAME/devtask-hub-tsis6.git](https://github.com/YOUR-USERNAME/devtask-hub-tsis6.git)
   cd devtask-hub-tsis6
