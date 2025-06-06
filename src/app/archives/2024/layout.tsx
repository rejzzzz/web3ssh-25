import GradientBackground from '@components/GradientBackground';
// import { GeistSans } from 'geist/font/sans';
import Navbar from '@components/components2024/Navbar2024';
import Footer from '@components/components2024/Footer2024';

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Gradient Background */}
      <div
        style={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          zIndex: '-10',
        }}
      >
        <GradientBackground />
      </div>

      {/* Content */}
      <Navbar />
      {children}
      <Footer />
    </>
  );
}