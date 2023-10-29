import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ listMenu }) => {
  const location = useLocation();
  return (
    <>
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 md:hidden">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
          {listMenu &&
            listMenu.map((item, index) => (
              <Link
                to={`${item.to}`}
                className="inline-flex flex-col items-center justify-center hover:bg-gray-50  group no-underline"
                key={index}
              >
                {item.icon}
                <span className="text-sm text-gray-500  group-hover:text-blue-600 ">
                  {item.name}
                </span>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
