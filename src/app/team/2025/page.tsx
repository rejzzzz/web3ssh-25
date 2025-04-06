import TeamSection from './TeamSection';
import teamData from '@data/2025/team.json';

export default function Page() {
  return (
    <div>
      <TeamSection teamData={teamData} />
      <h1 className="text-center text-white text-4xl mt-10">Will be added soon</h1>
    </div>
  );
}