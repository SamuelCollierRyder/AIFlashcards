import React from "react";

export default function Header({ signedIn = false }) {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Ponder AI</a>
      </div>
      <div className="flex-none">
        {signedIn ? (
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/add-cards">Add cards</a>
            </li>
            <li>
              <a href="/view-cards">View cards</a>
            </li>
            <li>
              <a href="/study">Study</a>
            </li>
            <li>
              <a href="/study">Sign out</a>
            </li>
          </ul>
        ) : (
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/log-in">Log In</a>
            </li>
            <li>
              <a href="/sign-up">Sign Up</a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
