import { NextUIProvider } from '@nextui-org/react';
import { Converter } from './components/Converter';

function App() {
  return (
    <NextUIProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">txt2json</h1>
              <span className="text-xs text-gray-600 mt-1">Convert text to JSON, locally</span>
            </div>
          </div>
        </header>
        
        <main className="py-8">
          <Converter />
        </main>
      </div>
    </NextUIProvider>
  );
}

export default App;