// src/components/Navbar.js
import React from 'react';

function Navbar() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800">
      <div className="logo">
        <img src="assets/logo/logo2.png" alt="logo" className="w-32" />
      </div>
      <nav className="flex items-center">
        <div className="wallet flex items-center bg-gradient-to-r from-pink-500 to-orange-500 p-2 rounded-lg">
          <img src="https://cdn-icons-png.flaticon.com/512/217/217853.png" alt="wallet" className="w-6 h-6" />
          <span>₹<span id="wallet-balance">0.00</span></span>
        </div>
        {/* Add other header items like profile, login/signup buttons */}
      </nav>
    </header>
  );
}

export default Navbar;
