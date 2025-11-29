import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function AppLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="border-b bg-white/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 select-none">
            <span className="inline-block w-2 h-2 rounded-full bg-green-600" />
            <span className="font-semibold">GiveawayMaker</span>
          </Link>
          <nav className="text-sm text-gray-600">
            <a href="https://github.com/basarardabaykal" target="_blank" rel="noreferrer" className="hover:text-black">GitHub</a>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl px-6 py-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold">{title}</h1>
          </div>
          <div className="border bg-white rounded-xl shadow-sm p-6">
            {children}
          </div>
        </div>
      </main>
      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-6 py-3 text-xs text-gray-500">
          <p>Simple tools for running fair giveaways.</p>
        </div>
      </footer>
    </div>
  );
}
