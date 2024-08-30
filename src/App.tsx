import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ProfileList from '../src/pages/ProfileList';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Profile Management Dashboard</h1>
          <p className="text-gray-600">Manage and view user profiles effectively.</p>
        </header>

        {/* Profile List */}
        <main>
          <ProfileList />
        </main>

        {/* Footer */}
        <footer className="mt-10 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Profile Management App. All rights reserved.</p>
        </footer>
      </div>
    </Provider>
  );
};

export default App;