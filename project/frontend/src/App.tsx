import { useEffect, type ReactNode } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from './store/authStore';
import { appRoutes, type AppRouteItem } from './router';

function renderRoutes(routes: AppRouteItem[]): ReactNode {
  return routes.map((route, index) => {
    const { path, element, children } = route;

    return (
      <Route key={path ?? `route-${index}`} path={path} element={element}>
        {children ? renderRoutes(children) : null}
      </Route>
    );
  });
}

export default function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    // Initialize Firebase Auth listener
    initializeAuth();
  }, [initializeAuth]);

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {renderRoutes(appRoutes)}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-dark/5 p-6">
              <div className="mx-auto max-w-3xl rounded-xl border border-dark/20 bg-white p-6 shadow-sm">
                <h1 className="text-3xl font-bold text-dark">Not Found</h1>
                <p className="mt-2 text-dark/80">Khong tim thay route</p>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
