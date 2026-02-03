import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ConfigPage from './pages/ConfigPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900">
        <nav className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-cosmic-gold">Hushpair Admin</h1>
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                    Dashboard
                  </a>
                  <a href="/config" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                    Configuration
                  </a>
                  <a href="/users" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                    Users
                  </a>
                </div>
              </div>
              <div className="text-gray-400 text-sm">
                Admin Panel v1.0
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/config" element={<ConfigPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
