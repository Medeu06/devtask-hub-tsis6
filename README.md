# DevTask Hub — TSIS6 (Authentication, Protected Routes & Caching Strategy)

**Student:** Medeu Seidali  
**Course:** React JS Frameworks  
**Deployment:** [https://YOUR-VERCEL-APP.vercel.app](https://YOUR-VERCEL-APP.vercel.app)  
**Repository:** [https://github.com/YOUR-USERNAME/devtask-hub-tsis6](https://github.com/YOUR-USERNAME/devtask-hub-tsis6)

---

## 📌 Features Added in TSIS6

1. **Authentication System (`AuthContext`)**:
   - Global auth state provider using React Context.
   - User persistent session stored in `localStorage` (`devtask_auth_user`).
   - Mock JWT token generation and role allocation (`Admin` / `User`).
2. **Protected Routes (`ProtectedRoute`)**:
   - Access restriction to `/dashboard` for unauthenticated visitors.
   - Automatic redirection to `/login` with location memory (`state.from`), restoring destination after login.
3. **API Response Caching Strategy**:
   - In-memory response cache for list (`getAll`) and details (`getById`).
   - Configurable Time-To-Live (TTL) via `VITE_CACHE_TTL_MS` (default 60 seconds).
   - Cache invalidation on mutation events (`create`, `update`, `remove`, `resetData`).

---

## ⚡ Caching Strategy & Invalidations

### 1. Cache Storage Structure
The `fakeApi.js` layer encapsulates an in-memory cache object:
- `allTasks`: Stores full task list along with `allTasksTimestamp`.
- `taskDetails`: A `Map` storing individual task objects keyed by ID alongside `timestamp`.

### 2. When Data is Cached
- **List Fetch (`getAll`)**: When `getAll()` is called, the system verifies if `cacheStore.allTasks` exists and if `Date.now() - allTasksTimestamp < CACHE_TTL_MS`. If valid, it immediately resolves from memory without simulating network delay.
- **Item Fetch (`getById`)**: Requests check `taskDetails.get(id)`. If cached within the TTL window, data returns instantly.

### 3. Cache Invalidation Triggers
To avoid stale data anomalies, the cache is automatically wiped (`clearCache()`) whenever a mutation occurs:
- `create(newItem)` $\rightarrow$ Invalidates list & item cache.
- `update(id, data)` $\rightarrow$ Invalidates list & item cache.
- `remove(id)` $\rightarrow$ Invalidates list & item cache.
- `resetData()` $\rightarrow$ Wipes `localStorage` and flushes cache store.

---

## 🛠️ Local Development Setup

1. **Clone repository:**
   ```bash
   git clone [https://github.com/YOUR-USERNAME/devtask-hub-tsis6.git](https://github.com/YOUR-USERNAME/devtask-hub-tsis6.git)
   cd devtask-hub-tsis6
