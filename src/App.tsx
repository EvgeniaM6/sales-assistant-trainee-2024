import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageRoutes } from './script/constants';
import { Spin } from './script/components';

const LazyAuthPage = lazy(() => import('./script/pages/AuthPage'));
const LazyChatPage = lazy(() => import('./script/pages/ChatPage'));
const LazyFeedPage = lazy(() => import('./script/pages/FeedPage'));
const LazyFeedsListPage = lazy(() => import('./script/pages/FeedsListPage'));
const LazyNotFoundPage = lazy(() => import('./script/pages/NotFoundPage'));
const LazyVersionPage = lazy(() => import('./script/pages/VersionPage'));

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path={`/${PageRoutes.Auth}`}
          element={<Suspense fallback={<Spin />}><LazyAuthPage /></Suspense>}
        />
        <Route
          path={`/${PageRoutes.Chat}/:id`}
          element={<Suspense fallback={<Spin />}><LazyChatPage /></Suspense>}
        />
        <Route
          path='/'
          element={<Suspense fallback={<Spin />}><LazyFeedsListPage /></Suspense>}
        />
        <Route
          path={`/${PageRoutes.Feed}`}
          element={<Suspense fallback={<Spin />}><LazyFeedsListPage /></Suspense>}
        />
        <Route
          path={`/${PageRoutes.Feed}/:id`}
          element={<Suspense fallback={<Spin />}><LazyFeedPage /></Suspense>}
        />
        <Route
          path={`/${PageRoutes.Version}`}
          element={<Suspense fallback={<Spin />}><LazyVersionPage /></Suspense>}
        />
        <Route
          path='*'
          element={<Suspense fallback={<Spin />}><LazyNotFoundPage /></Suspense>}
        />
      </Routes>
    </div>
  );
}

export default App;
