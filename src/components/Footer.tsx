import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-800 text-white p-4 fixed bottom-0 w-full">
      <div className="container mx-auto text-center">
        <p>&copy; 2000 - {new Date().getFullYear()} Seku Corporation</p>
      </div>
    </footer>
  );
};

export default Footer;