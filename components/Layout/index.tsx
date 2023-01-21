import React from "react";

import SidebarMenu from "../SidebarMenu";

export type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="bg-gray-100 dark:bg-gray-700 w-full min-h-screen relative">
      <SidebarMenu />
      <section className="w-full pl-4 md:pl-6 lg:pl-80 min-h-screen py-10 pr-4 md:pr-6">
        <div className="container mx-auto">{children}</div>
      </section>
    </main>
  );
};

export default Layout;
