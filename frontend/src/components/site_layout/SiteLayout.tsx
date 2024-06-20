import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

interface SiteLayoutProps {}

const SiteLayout: FunctionComponent<SiteLayoutProps> = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl">Header</h1>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4">
        <p className="text-center">Footer</p>
      </footer>
    </div>
  );
};

export default SiteLayout;
