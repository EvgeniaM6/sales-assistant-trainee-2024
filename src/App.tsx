import { Route, Routes } from 'react-router-dom';
import { AuthPage, ChatPage, FeedPage, FeedsListPage, NotFoundPage, VersionPage } from './script/pages';
import { PageRoutes } from './script/constants';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path={`/${PageRoutes.Auth}`} element={<AuthPage />} />
        <Route path={`/${PageRoutes.Chat}/:id`} element={<ChatPage />} />
        <Route path='/' element={<FeedsListPage />} />
        <Route path={`/${PageRoutes.Feed}`} element={<FeedsListPage />} />
        <Route path={`/${PageRoutes.Feed}/:id`} element={<FeedPage />} />
        <Route path={`/${PageRoutes.Version}`} element={<VersionPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
