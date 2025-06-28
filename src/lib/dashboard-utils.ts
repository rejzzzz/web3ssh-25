import { HackathonInfo } from 'types/dashboard';

// Generate unique submission ID
export function generateSubmissionId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `submission_${timestamp}_${randomStr}`;
}

// Check if submission window is open
export function isSubmissionWindowOpen(
  startTime: Date,
  endTime: Date,
): boolean {
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
  name: 'Web3SSH Hackathon 2025',
  dates: {
    start: new Date('2025-07-03T00:00:00Z'),
    end: new Date('2025-07-06T23:59:59Z'),
  },
  duration: '3 July to 6 July, 2025',
  theme: "Web3SSH Hackathon: Important Information for Participants",
  objectives: [
    "Welcome to the Web3 Hackathon! We're thrilled to have you join us for an exciting journey into the decentralized future. This document outlines key details and rules to ensure a smooth and rewarding experience for all participants.",
    "🏆 Prize Pool: We're offering an exciting total prize pool of ₹80,000 distributed across two tracks to reward innovation and talent.",
    "🚀 Open Track: Open to all participants, encouraging diverse and groundbreaking Web3 projects. Prize Distribution (₹60,000): 1st Place: ₹30,000, 2nd Place: ₹20,000, 3rd Place: ₹10,000.",
    "👩‍💻 Special Track for Women in Web3: Dedicated to fostering inclusivity and encouraging women's participation in the Web3 space. Eligibility: To be eligible for this track, your entire team must consist of women. Prize Distribution (₹20,000): 1st Place: ₹8,000, 2nd Place: ₹6,000, 3rd Place: ₹6,000.",
    "👥 Team Formation: Team Size: Each team must consist of 2 to 4 members. Invite-Only Event: This hackathon is an invite-only event. All registered participants have already received invitations and are encouraged to bring their teams. Please ensure all your team members are registered.",
    "🛠️ Tech Stack: For this hackathon, all projects must be developed on the Ethereum blockchain. We encourage you to innovate and utilize any Ethereum-compatible technologies you deem best suited for your project, such as Solidity, Web3.js, Ethers.js, and other related tools and frameworks within the Ethereum ecosystem."
  ],
  schedule: [
    {
      id: '1',
      title: 'Summer School: Inauguration',
      description: 'Opening ceremony for the Summer School',
      startTime: new Date('2025-06-29T10:00:00Z'),
      endTime: new Date('2025-06-29T11:00:00Z'),
      type: 'ceremony',
    },
    {
      id: '2',
      title: 'Workshops & Sessions',
      description: 'Technical and non-technical workshops',
      startTime: new Date('2025-06-29T11:00:00Z'),
      endTime: new Date('2025-07-03T17:00:00Z'),
      type: 'workshop',
    },
    {
      id: '3',
      title: 'Hackathon Kickoff',
      description: 'Hackathon begins',
      startTime: new Date('2025-07-03T18:00:00Z'),
      endTime: new Date('2025-07-03T19:00:00Z'),
      type: 'ceremony',
    },
    {
      id: '4',
      title: 'Hackathon Ongoing',
      description: 'Teams work on their projects',
      startTime: new Date('2025-07-03T19:00:00Z'),
      endTime: new Date('2025-07-06T09:00:00Z'),
      type: 'workshop',
    },
    {
      id: '5',
      title: 'Project Submission Deadline',
      description: 'Final deadline for project submissions',
      startTime: new Date('2025-07-06T09:00:00Z'),
      endTime: new Date('2025-07-06T09:30:00Z'),
      type: 'deadline',
    },
    {
      id: '6',
      title: 'Project Presentations & Judging',
      description: 'Teams present their projects to judges',
      startTime: new Date('2025-07-06T10:00:00Z'),
      endTime: new Date('2025-07-06T16:00:00Z'),
      type: 'judging',
    },
    {
      id: '7',
      title: 'Closing Ceremony & Awards',
      description: 'Winner announcements and prize distribution',
      startTime: new Date('2025-07-06T17:00:00Z'),
      endTime: new Date('2025-07-06T18:00:00Z'),
      type: 'ceremony',
    },
  ],
  rules: [
    "Originality: All projects must be original work created during the hackathon period. Pre-existing code or projects are not permitted, although using open-source libraries and frameworks is acceptable.",
    "Boilerplate Code: Teams are permitted to use boilerplate code from other projects to kickstart their development.",
    "Code Submission: All project code must be submitted by the specified deadline. Details on the submission platform will be provided during the hackathon.",
    "GitHub Repository Monitoring: Teams will receive a Google Form to submit the link to an empty public GitHub repository before the start of the hackathon. This repository will be monitored throughout the evaluation period.",
    "Version Control: Frequent commits to your public GitHub repository are highly encouraged. This demonstrates your team's development process and progress over time.",
    "Intellectual Property: All projects created during the hackathon, including their intellectual property rights, will become the property of web3ssh.",
    "AI Tool Declaration: If any AI tools (e.g., code generators, content creators) were used in the development of your project, you must clearly declare them in your submission documentation.",
    "Judging Criteria: Projects will be judged based on criteria such as innovation, technical complexity, impact, completeness, and presentation. Specific weighting for each criterion will be announced at the start of the hackathon.",
    "Fair Play: We expect all participants to maintain a spirit of fair play, collaboration, and respect. Any form of cheating, plagiarism, or disruptive behavior will lead to disqualification.",
    "Communication: Stay updated through our official communication channels (e.g., Discord, announcements) for important updates, schedule changes, and technical support.",
    "Eligibility Verification: For the Special Track for Women, eligibility will be verified. Any misrepresentation will result to disqualification.",
    "Decisions: The decisions of the judges and organizers are final."
  ],
  judgingCriteria: [
    { id: '1', name: 'Innovation', description: 'Creativity and uniqueness of the solution', weight: 20 },
    { id: '2', name: 'Technical Complexity', description: 'Technical depth and implementation quality', weight: 20 },
    { id: '3', name: 'Impact', description: 'Real-world applicability and potential', weight: 20 },
    { id: '4', name: 'Completeness', description: 'How complete and functional the project is', weight: 20 },
    { id: '5', name: 'Presentation', description: 'Quality of demo and documentation', weight: 20 },
  ],
  resources: [],
  faqs: [
    { id: '1', question: 'What are the submission requirements?', answer: 'Public GitHub Repository Link: A link to your project\'s public GitHub repository, containing all your code. Demo Video Link: A link to a demo video of your project (e.g., Google Drive or YouTube). This video should showcase your project\'s functionality and features. Deployed-App Link (Optional): If your project has a deployed version, please provide a link to it. Google Drive Link for Assets: A Google Drive link containing all related assets such as videos, photos, presentations, and any other relevant files.', category: 'submission' },
    { id: '2', question: 'Who owns the project IP?', answer: 'All projects created during the hackathon, including their intellectual property rights, will become the property of web3ssh.', category: 'ip' },
    { id: '3', question: 'How are winners selected?', answer: 'Projects will be judged based on innovation, technical complexity, impact, completeness, and presentation. Specific weighting for each criterion will be announced at the start of the hackathon.', category: 'judging' },
    { id: '4', question: 'How do I get support?', answer: 'Stay updated through our official communication channels (e.g., Discord, announcements) for important updates, schedule changes, and technical support.', category: 'support' },
  ],
};
