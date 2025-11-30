import type { ReactNode } from 'react';

interface AppLayoutProps {
  title?: string;
  children: ReactNode;
  wide?: boolean;
}

export function AppLayout({ title, children, wide = false }: AppLayoutProps) {
  const showTitle = Boolean(title && title.trim().length > 0);
  return (
    <div className="flex flex-col flex-1 w-full">
      <main className="flex-1 flex justify-center py-4">
        <div className={"w-full px-6 " + (wide ? "max-w-5xl" : "max-w-2xl")}> 
          {showTitle && (
            <div className="text-center mb-6">
              <h1 className={"font-semibold text-gray-900 " + (wide ? "text-3xl" : "text-2xl")}>{title}</h1>
            </div>
          )}
          <div className={"bg-white rounded-lg shadow border border-gray-200 " + (wide ? "p-10" : "p-8")}> 
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
