import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import React from 'react';

const links = [
  { label: 'Dashboard', href: '/' },
  { label: 'Issues', href: '/issues' },
];

const NavBar = () => {
  return (
    <nav className="flex justify-around m-4 items-center h-14  ">
      <Link href="/">
        <AiFillBug size="25" />
      </Link>

      <ul className="space-x-4">
        {links.map((link) => {
          return (
            <Link
              key={link.href}
              href={link.href}
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
            >
              {link.label}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
