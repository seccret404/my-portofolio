// src/Components/Layout/Layout.tsx
import React from 'react';
import Header from './Header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
     return (
          <>
               <div className="flex justify-center">
                    <Header />
               </div>
               <main className="pt-[100px] md:ml-[135px] md:mr-[135px] mr-[50px] ml-[50px]">
                    {children}
               </main>
          </>
     );
};

export default Layout;
