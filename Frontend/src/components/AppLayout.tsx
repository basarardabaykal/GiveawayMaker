import type { ReactNode } from 'react';

export function AppLayout({ title, subtitle, children }: { title?: string; subtitle?: string; children: ReactNode }) {
  const showTitle = Boolean(title && title.trim().length > 0);
  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="flex-1 flex justify-center py-4">
        <div className="w-full px-4 sm:px-6 max-w-5xl">
          {showTitle && (
            <div className="text-center mb-6">
              <h1 className="font-semibold text-gray-900 text-3xl">{title}</h1>
              {subtitle && (
                <p className="mt-1 text-gray-600 text-base font-normal">{subtitle}</p>
              )}
            </div>
          )}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
