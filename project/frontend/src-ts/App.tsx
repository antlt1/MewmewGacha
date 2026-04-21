import type { ReactNode } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { appRoutes, type AppRouteItem } from './router';

function renderRoutes(routes: AppRouteItem[]): ReactNode {
  return routes.map((route, index) => {
    const { path, element, children, index: isIndex } = route;

    return (
      <Route key={path ?? `route-${index}`} path={path} element={element} index={isIndex}>
        {children ? renderRoutes(children) : null}
      </Route>
    );
  });
}

export default function App() {
  return (
    <Router>
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
