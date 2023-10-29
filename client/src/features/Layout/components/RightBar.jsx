import React from 'react';
import { Link } from 'react-router-dom';

const RightBar = () => {
  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 right-0 z-40 lg:w-48 xl:w-64 h-screen 2xl:transition-transform 2xl:-translate-x-full hidden lg:block"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 ">
          <ul className="space-y-2 pl-0 font-medium">
            <li>Saran untuk anda</li>
            <li>
              <a
                href="#/"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group no-underline"
              >
                <img
                  src="/sample/sample-profile.jpg"
                  alt="prof-img"
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="flex-1 ml-3 whitespace-nowrap text-gray-800">
                  yerrr.acc456
                </span>
              </a>
            </li>
            <li>
              <a
                href="#/"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group no-underline"
              >
                <img
                  src="/sample/sample-profile.jpg"
                  alt="prof-img"
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="flex-1 ml-3 whitespace-nowrap text-gray-800">
                  yerrr.acc456
                </span>
              </a>
            </li>
            <li>
              <a
                href="#/"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group no-underline"
              >
                <img
                  src="/sample/sample-profile.jpg"
                  alt="prof-img"
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="flex-1 ml-3 whitespace-nowrap text-gray-800">
                  yerrr.acc456
                </span>
              </a>
            </li>
            <li>
              <a
                href="#/"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group no-underline"
              >
                <img
                  src="/sample/sample-profile.jpg"
                  alt="prof-img"
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="flex-1 ml-3 whitespace-nowrap text-gray-800">
                  yerrr.acc456
                </span>
              </a>
            </li>
            <li>
              <a
                href="#/"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group no-underline"
              >
                <img
                  src="/sample/sample-profile.jpg"
                  alt="prof-img"
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="flex-1 ml-3 whitespace-nowrap text-gray-800">
                  yerrr.acc456
                </span>
              </a>
            </li>
            <li className="mt-5 text-gray-500 p-2">2023 © Codigram </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default RightBar;
