import { HackathonInfo, ScheduleEvent, JudgingCriterion, Resource, FAQ } from 'types/dashboard';

// Generate unique submission ID
export function generateSubmissionId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `submission_${timestamp}_${randomStr}`;
}

// Check if submission window is open
export function isSubmissionWindowOpen(startTime: Date, endTime: Date): boolean {
  const now = new Date();
  return now >= startTime && now <= endTime;
}

// Calculate time remaining until deadline
export function getTimeRemaining(endTime: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
} {
  const now = new Date().getTime();
  const deadline = endTime.getTime();
  const total = deadline - now;

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((total % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, total };
}

// Format date for display
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date);
}

// Static hackathon information
export const HACKATHON_INFO: HackathonInfo = {
  name: 'Web3 Summer School & Hackathon 2025',
  dates: {
    start: new Date('2025-07-03T00:00:00Z'),
    end: new Date('2025-07-06T00:00:00Z'),
  },
  duration: '48 hours',
  theme: 'Building the Future of Decentralized Web',
  objectives: [
    'Learn cutting-edge Web3 technologies',
    'Build innovative decentralized applications',
    'Network with industry experts and peers',
    'Compete for exciting prizes and recognition',
    'Contribute to the open-source ecosystem',
  ],
  schedule: [
    {
      id: '1',
      title: 'Opening Ceremony',
      description: 'Welcome address and hackathon kickoff',
      startTime: new Date('2025-07-03T09:00:00Z'),
      endTime: new Date('2025-07-03T10:00:00Z'),
      type: 'ceremony',
    },
    {
      id: '2',
      title: 'Team Formation & Ideation',
      description: 'Form teams and brainstorm project ideas',
      startTime: new Date('2025-07-03T10:00:00Z'),
      endTime: new Date('2025-07-03T12:00:00Z'),
      type: 'workshop',
    },
    {
      id: '3',
      title: 'Technical Workshops',
      description: 'Hands-on workshops on Web3 technologies',
      startTime: new Date('2025-07-03T13:00:00Z'),
      endTime: new Date('2025-07-03T17:00:00Z'),
      type: 'workshop',
    },
    {
      id: '4',
      title: 'Mentorship Sessions',
      description: 'One-on-one guidance from industry experts',
      startTime: new Date('2025-07-04T09:00:00Z'),
      endTime: new Date('2025-07-04T18:00:00Z'),
      type: 'mentorship',
    },
    {
      id: '5',
      title: 'Submission Deadline',
      description: 'Final project submissions due',
      startTime: new Date('2025-07-05T09:00:00Z'),
      endTime: new Date('2025-07-05T09:00:00Z'),
      type: 'deadline',
    },
    {
      id: '6',
      title: 'Project Presentations',
      description: 'Teams present their projects to judges',
      startTime: new Date('2025-07-05T10:00:00Z'),
      endTime: new Date('2025-07-05T16:00:00Z'),
      type: 'judging',
    },
    {
      id: '7',
      title: 'Closing Ceremony & Awards',
      description: 'Winner announcements and prize distribution',
      startTime: new Date('2025-07-05T17:00:00Z'),
      endTime: new Date('2025-07-05T18:00:00Z'),
      type: 'ceremony',
    },
  ],
  rules: [
    'Teams can have 1-4 members',
    'All code must be open source',
    'Projects must be built during the 48-hour window',
    'Use of pre-existing code is allowed but must be clearly documented',
    'Projects must incorporate Web3 technologies',
    'Submissions must include working demo and source code',
    'Follow the code of conduct at all times',
    'Respect intellectual property rights',
  ],
  judgingCriteria: [
    {
      id: '1',
      name: 'Innovation',
      description: 'Originality and creativity of the solution',
      weight: 25,
    },
    {
      id: '2',
      name: 'Technical Complexity',
      description: 'Technical depth and implementation quality',
      weight: 25,
    },
    {
      id: '3',
      name: 'User Experience',
      description: 'Design, usability, and overall user experience',
      weight: 20,
    },
    {
      id: '4',
      name: 'Impact',
      description: 'Potential real-world impact and utility',
      weight: 20,
    },
    {
      id: '5',
      name: 'Presentation',
      description: 'Quality of demo and presentation',
      weight: 10,
    },
  ],
  resources: [
    {
      id: '1',
      title: 'Ethereum Documentation',
      description: 'Official Ethereum development documentation',
      url: 'https://ethereum.org/developers',
      category: 'documentation',
    },
    {
      id: '2',
      title: 'Hardhat Starter Kit',
      description: 'Template for Ethereum smart contract development',
      url: 'https://github.com/hardhat-starter-kit',
      category: 'starter-kit',
    },
    {
      id: '3',
      title: 'Web3.js API',
      description: 'JavaScript library for interacting with Ethereum',
      url: 'https://web3js.readthedocs.io',
      category: 'api',
    },
    {
      id: '4',
      title: 'Polygon Resources',
      description: 'Documentation and tools for Polygon development',
      url: 'https://polygon.technology/developers',
      category: 'sponsor',
    },
    {
      id: '5',
      title: 'Support Discord',
      description: 'Get help from mentors and fellow participants',
      url: 'https://discord.gg/web3ssh',
      category: 'contact',
    },
  ],
  faqs: [
    {
      id: '1',
      question: 'Can I participate alone?',
      answer: 'Yes, you can participate as a solo developer or form a team of up to 4 members.',
      category: 'participation',
    },
    {
      id: '2',
      question: 'What technologies should I use?',
      answer: 'You must incorporate Web3 technologies like Ethereum, Polygon, IPFS, or other blockchain platforms. Frontend and backend technologies are your choice.',
      category: 'technical',
    },
    {
      id: '3',
      question: 'Can I use existing code?',
      answer: 'Yes, but you must clearly document any pre-existing code or libraries used. The majority of the project should be built during the hackathon.',
      category: 'technical',
    },
    {
      id: '4',
      question: 'How do I submit my project?',
      answer: 'Use the submission form on this dashboard. You\'ll need your registration email and UID to verify your participation.',
      category: 'submission',
    },
    {
      id: '5',
      question: 'What should I include in my submission?',
      answer: 'Your submission should include project name, description, demo video, GitHub repository, and optionally a live demo link.',
      category: 'submission',
    },
  ],
};
