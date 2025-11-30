import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 w-full z-40">
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
  );
}
