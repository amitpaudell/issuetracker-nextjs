'use client';
import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import React from 'react';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

const links = [
  { label: 'Dashboard', href: '/' },
  { label: 'Issues', href: '/issues' },
];

const NavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);
  return (
    <nav className="flex justify-around m-4 items-center h-14  ">
      <Link href="/">
        <AiFillBug size="25" />
      </Link>

      <ul className="space-x-8">
        {links.map((link) => {
          return (
            <Link
              key={link.href}
              href={link.href}
              className={classNames({
                'text-zinc-900': currentPath == link.href,
                'text-zinc-500': currentPath !== link.href,
                'hover:text-zinc-800 transition-colors': true,
              })}
            >
              {link.label}
            </Link>
            // <Link
            //   key={link.href}
            //   href={link.href}
            //   className={`${link.href == currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`}
            // >
            //   {link.label}
            // </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
