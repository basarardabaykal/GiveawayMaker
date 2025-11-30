import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function AppLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 select-none hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">G</span>
            </div>
            <span className="font-semibold text-gray-900">GiveawayMaker</span>
          </Link>
          <nav className="text-sm">
            <a href="https://github.com/basarardabaykal" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">GitHub</a>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-2xl px-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          </div>
          <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
            {children}
          </div>
        </div>
      </main>
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-3 text-center">
          <p className="text-xs text-gray-500">© 2025 GiveawayMaker</p>
        </div>
      </footer>
    </div>
  );
}
