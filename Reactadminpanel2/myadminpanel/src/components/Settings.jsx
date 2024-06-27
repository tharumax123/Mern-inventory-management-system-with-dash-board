// src/components/Settings.jsx

import React, { useState } from 'react';
 import './Settings.css';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>SETTINGS</h3>
      </div>
      <div className='settings-container'>
        <div className='setting'>
          <label>
            Dark Mode:
            <input
              type='checkbox'
              checked={darkMode}
              onChange={handleThemeChange}
            />
          </label>
        </div>
        <div className='setting'>
          <label>
            Language:
            <select value={language} onChange={handleLanguageChange}>
              <option value='English'>English</option>
              <option value='Spanish'>Spanish</option>
              <option value='French'>French</option>
              <option value='German'>German</option>
            </select>
          </label>
        </div>
      </div>
    </main>
  );
};

export default Settings;
