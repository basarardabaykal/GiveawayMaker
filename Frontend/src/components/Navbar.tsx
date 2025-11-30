import { Link } from 'react-router-dom';
import Logo from '../assets/GiveawayMakerLogo.png';

export function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 w-full z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 select-none hover:opacity-80 transition-opacity">
          <img src={Logo} alt="GiveawayMaker Logo" className="h-9 sm:h-10 w-auto drop-shadow-sm" />
          <span className="font-semibold text-gray-900 text-base sm:text-lg">GiveawayMaker</span>
        </Link>
        <nav className="text-sm">
          <a
            href="https://github.com/basarardabaykal"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="GitHub Profile"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56 0-.27-.01-1.15-.02-2.09-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.26 3.39.96.11-.76.41-1.26.75-1.55-2.55-.29-5.23-1.28-5.23-5.71 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.99.01 1.99.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.24 2.73.12 3.02.74.8 1.19 1.83 1.19 3.09 0 4.44-2.69 5.41-5.25 5.69.42.37.8 1.09.8 2.2 0 1.59-.02 2.87-.02 3.26 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
            <span>GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
