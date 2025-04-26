import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-background border-l-2">
          {children}
        </main>
      </div>
    </div>
  );
}