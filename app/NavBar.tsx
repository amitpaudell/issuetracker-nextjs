'use client';
import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import React from 'react';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Box, DropdownMenu, Text } from '@radix-ui/themes';
const links = [
  { label: 'Dashboard', href: '/' },
  { label: 'Issues', href: '/issues' },
];

const NavBar = () => {
  const { status, data: session } = useSession();
  const currentPath = usePathname();
  console.log(currentPath);
  return (
    <nav className="flex justify-around m-4 items-center h-14  ">
      <Link href="/">
        <AiFillBug size="25" />
      </Link>

      <ul className="flex flex-row space-x-8">
        {links.map((link) => {
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={classNames({
                  'text-zinc-900': currentPath == link.href,
                  'text-zinc-500': currentPath !== link.href,
                  'hover:text-zinc-800 transition-colors': true,
                })}
              >
                {link.label}
              </Link>
            </li>

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

      <Box>
        {status === 'authenticated' && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                src={session.user!.image!}
                fallback="?"
                size="3"
                radius="full"
                className="cursor-pointer"
              ></Avatar>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content>
              <DropdownMenu.Label>
                <Text size="2">{session.user!.email}</Text>
              </DropdownMenu.Label>

              <DropdownMenu.Item>
                <Link href="/api/auth/signout">Logout</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}

        {status === 'unauthenticated' && (
          <Link href="/api/auth/signin">Login</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
