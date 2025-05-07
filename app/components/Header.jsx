import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div>
      <header id="vendor-nav" className="bg-gray-800">
        <div className="flex items-center content-center gap-3">
          VENDOR DASHBOARD
        </div>
        <div></div>
      </header>
      <div id="vendor-main">
        <div id="vendordashboard">
            <Link href="/dashboard/addrole">Add Role</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
