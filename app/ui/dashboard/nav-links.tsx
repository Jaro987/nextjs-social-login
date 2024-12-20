'use client';

import {
  UserGroupIcon,
  DocumentDuplicateIcon,
  PresentationChartBarIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: PresentationChartBarIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Users', href: '/dashboard/users', icon: UserGroupIcon },
  { name: 'Logs', href: '/dashboard/logs-for-admin', icon: DocumentDuplicateIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-black/[0.6] p-3 text-sm font-medium hover:bg-[#fff]/[0.6]  md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-white/[0.6] text-black/[0.6]': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
