import type { Metadata } from 'next';
import GradientBackground from '@components/GradientBackground';

export const metadata: Metadata = {
  title: 'Web3SSH 2025 Hackathon Dashboard | Complete Event Guide',
  description:
    'Your comprehensive guide to Web3SSH 2025 Summer School & Hackathon. Explore schedule, speakers, rules, prizes, and more. Join the future of Web3 development.',
  keywords:
    'Web3SSH 2025, hackathon, blockchain, Web3, Ethereum, Solidity, DeFi, NFT, IPFS, programming contest, developer event',
  openGraph: {
    title: 'Web3SSH 2025 Hackathon Dashboard',
    description:
      'Complete guide to Web3SSH 2025 Summer School & Hackathon. Schedule, speakers, prizes, and submission details.',
    type: 'website',
    url: 'https://web3ssh.com/hackathon/2025',
    images: [
      {
        url: '/web3ssh.webp',
        width: 1200,
        height: 630,
        alt: 'Web3SSH 2025 Hackathon Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web3SSH 2025 Hackathon Dashboard',
    description: 'Complete guide to Web3SSH 2025 Summer School & Hackathon',
    images: ['/web3ssh.webp'],
  },
};

export default function HackathonLayout({
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
      <div className="relative z-10">{children}</div>
    </>
  );
}
