import LeaderboardPage from '@components/components2025/LeaderboardPage';
import Navbar from '@components/components2025/Navbar2025';
import Footer from '@components/components2025/Footer2025';

export const metadata = {
  title: 'Ambassadors Leaderboard | Web3SSH 2025',
  description: 'Track the performance of our amazing ambassadors and see who\'s bringing the most participants to Web3SSH 2025!',
};

export default function AmbassadorLeaderboard() {
  return (
    <>
      <Navbar />
      <main className="relative">
        {/* Background gradient similar to other pages */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:24px_24px]"></div>
        </div>
        <LeaderboardPage />
      </main>
      <Footer />
    </>
  );
}
