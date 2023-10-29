import React from 'react';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BiHelpCircle, BiHomeCircle, BiUserCircle } from 'react-icons/bi';
import { MdOutlineExplore } from 'react-icons/md';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';
import RightBar from './RightBar';
import SideBar from './SideBar';

const Layout = () => {
  let listMenu = [
    {
      to: '/',
      path: '/',
      name: 'Home',
      icon: (
        <BiHomeCircle className='"w-5 h-5 mb-2 text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500 text-2xl' />
      ),
    },
    {
      to: 'explore',
      path: '/explore',
      name: 'Explore',
      icon: (
        <MdOutlineExplore className='"w-5 h-5 mb-2 text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500 text-xl' />
      ),
    },
    {
      to: 'create',
      path: '/create',
      name: 'Create',
      icon: (
        <AiOutlinePlusSquare className='"w-5 h-5 mb-2 text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500 text-xl' />
      ),
    },
    {
      to: 'help',
      path: '/help',
      name: 'Help',
      icon: (
        <BiHelpCircle className='"w-5 h-5 mb-2 text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500 text-xl' />
      ),
    },
    {
      to: 'profile',
      path: '/profile',
      name: 'Profile',
      icon: (
        <BiUserCircle className='"w-5 h-5 mb-2 text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-500 text-xl' />
      ),
    },
  ];
  return (
    <>
      <Navbar listMenu={listMenu} />
      <SideBar listMenu={listMenu} />
      <RightBar />
      <main className="min-h-screen">
        <Header />
        <div className="h-full max-w-xl mx-auto font-medium bg-white min-h-screen border-t border-t-gray-200">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
