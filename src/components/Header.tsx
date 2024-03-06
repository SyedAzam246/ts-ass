

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

interface RouteProps {
  to: string; // Define the type for the `to` prop of Link
}

const Header: React.FC = () => {
  return (
    <header>
      <nav className="nav-container">
        <Link to="/user">My Posts</Link> {/* Remove `as={Link}` as it's not needed */}
        <Link to="/">All Posts</Link> {/* Remove `as={Link}` as it's not needed */}
      </nav>
    </header>
  );
};

export default Header;

