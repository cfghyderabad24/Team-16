"use client";

import React from 'react';
import Link from 'next/link';

const SideBar = () => {
  return (
    <nav className="w-64 bg-gray-200 text-black flex flex-col p-4 shadow-lg h-full">
      <ul className="flex-1">
        <li className="mb-4">
          <Link href="/pages/escalation" className="hover:underline">
            Projects
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/visualization" className="hover:underline">
            Visualization
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/escalation" className="hover:underline">
            Escalation
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
