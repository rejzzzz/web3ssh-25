import Navbar from 'components/components2025/Navbar2025';
import Footer from 'components/components2025/Footer2025';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-24 pb-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
