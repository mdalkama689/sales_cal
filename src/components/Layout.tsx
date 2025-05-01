import React, { ReactNode } from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';
import Transition from './ui/Transition';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 200);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CalculatorIcon className="text-indigo-400 mr-2" size={24} />
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                GST Calculator Pro
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Transition
          show={mounted}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          {children}
        </Transition>
      </main>

      <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-400">
            <p className="mb-2">GST Calculator Pro &copy; 2025</p>
            <p className="text-xs">
              Disclaimer: The GST calculations provided are estimates based on general CGST and SGST rates.
              Actual tax rates may vary based on specific HSN/SAC codes and product categories.
              This tool should not be used for official financial or tax preparation purposes.
              Please consult a tax professional for accurate GST calculations.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;