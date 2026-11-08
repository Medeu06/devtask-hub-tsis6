import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import RootLayout from './layouts/RootLayout.jsx';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const TaskListPage = lazy(() => import('./pages/TaskListPage.jsx'));
const TaskDetailPage = lazy(() => import('./pages/TaskDetailPage.jsx'));
const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'));
const SignupPage = lazy(() => import('./pages/SignupPage.jsx'));
const ProfilePage = lazy(() => import('./pages/ProfilePage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

function LoadingFallback() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
      <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-xs text-indigo-400 font-mono">Загрузка модуля...</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="tasks" element={<TaskListPage />} />
              <Route path="tasks/:id" element={<TaskDetailPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />

              {/* Protected Routes */}
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
