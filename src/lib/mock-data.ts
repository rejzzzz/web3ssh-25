// Mock participants data for testing
import { Participant, Submission, HackathonConfig } from 'types/dashboard';

export const mockParticipants: Participant[] = [
  {
    email: 'john.doe@example.com',
    uid: 'IIITS2025001',
    name: 'John Doe',
    teamId: 'team_001',
    teamName: 'Web3 Innovators',
    registeredAt: new Date('2025-06-01T10:00:00Z'),
    isVerified: true
  },
  {
    email: 'jane.smith@example.com', 
    uid: 'IIITS2025002',
    name: 'Jane Smith',
    teamId: 'team_002',
    teamName: 'Blockchain Builders',
    registeredAt: new Date('2025-06-02T14:30:00Z'),
    isVerified: true
  },
  {
    email: 'test@web3ssh.com',
    uid: 'TEST001',
    name: 'Test Participant',
    teamId: 'team_test',
    teamName: 'Test Team',
    registeredAt: new Date('2025-06-22T00:00:00Z'),
    isVerified: true
  }
];

export const mockSubmissions: Submission[] = [];

export const mockHackathonConfig: HackathonConfig = {
  configKey: 'submission_window',
  startTime: new Date('2025-06-22T00:00:00Z'),
  endTime: new Date('2025-07-05T23:59:59Z'),
  isActive: true
};
