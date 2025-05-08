import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div>
      <header id="vendor-nav" className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-lg sm:text-xl font-semibold">VENDOR DASHBOARD</h1>
          {/* Add more nav items here if needed */}
        </div>
      </header>

      <main
        id="vendor-main"
        className="bg-gray-50 min-h-screen py-6 px-4 sm:px-8"
      >
        <div id="vendordashboard" className="max-w-4xl mx-auto">
          <Link
            href="/dashboard/addrole"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Add Role
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Header;
