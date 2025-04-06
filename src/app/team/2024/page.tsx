import TeamSection from './TeamSection';
import teamData from '@data/2024/team.json';

export default function Page() {
  return <TeamSection teamData={teamData} />;
}