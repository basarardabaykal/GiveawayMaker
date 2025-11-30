import type { ReactNode } from 'react';

export function AppLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-6 pt-6">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          </div>
          <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
