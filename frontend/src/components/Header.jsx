import React from "react";

export default function Header() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Ponder AI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Log In</a>
          </li>
          <li>
            <a>Sign Up</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
