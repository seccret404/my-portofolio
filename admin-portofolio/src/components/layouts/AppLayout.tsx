import type { ReactNode } from 'react';
import Header from './header';
import Sidebar from './sidebar';

interface AppLayoutProps {
     children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
     return (
          <div className="flex h-screen overflow-hidden">
               <Sidebar />
               <div className="flex-1 flex flex-col min-h-0">
                    <Header />
                    <main className="flex-1 overflow-y-auto p-6 bg-[#f0f4f8]">
                         <div className="max-w-7xl mx-auto">
                              {children}
                         </div>
                    </main>
               </div>
          </div>
     );
}
