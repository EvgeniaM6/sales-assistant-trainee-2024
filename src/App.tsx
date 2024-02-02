import { Route, Routes } from 'react-router-dom';
import { AuthPage, ChatPage, FeedPage, FeedsListPage, NotFoundPage, VersionPage } from './script/pages';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/chat/:id" element={<ChatPage />} />
        <Route path="/feed" element={<FeedsListPage />} />
        <Route path="/feed/:id" element={<FeedPage />} />
        <Route path="/version" element={<VersionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
