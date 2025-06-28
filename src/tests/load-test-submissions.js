/**
 * Loaconst TEST_CONFIG = {
  API_BASE_URL: 'http://localhost:3000',
  MONGODB_URI: 'mongodb+srv://aadipatel1911:MyPassword123@cluster0.lp33q.mongodb.net/web3ssh?retryWrites=true&w=majority',
  NUM_CONCURRENT_SUBMISSIONS: 50, // Full load test
  TIMEOUT_MS: 30000, // 30 seconds timeout per request
}; for Project Submissions
 * Tests system reliability by submitting 50 projects simultaneously
 */

import 'dotenv/config';
import { MongoClient } from 'mongodb';
import axios from 'axios';

// Configuration
const TEST_CONFIG = {
  API_BASE_URL: 'http://localhost:3000',
  MONGODB_URI:
    'mongodb+srv://aadipatel1911:MyPassword123@cluster0.lp33q.mongodb.net/web3ssh?retryWrites=true&w=majority',
  NUM_CONCURRENT_SUBMISSIONS: 50,
  TIMEOUT_MS: 30000, // 30 seconds timeout per request
};

// Sample data templates for generating realistic test submissions
const PROJECT_TEMPLATES = {
  projectNames: [
    'DeFi Trading Bot',
    'NFT Marketplace',
    'Supply Chain Tracker',
    'Carbon Credit Exchange',
    'Decentralized Identity System',
    'Smart Contract Auditor',
    'Blockchain Voting Platform',
    'Crypto Portfolio Manager',
    'Web3 Social Network',
    'Decentralized File Storage',
    'Cross-Chain Bridge',
    'DeFi Lending Protocol',
    'GameFi Platform',
    'DAO Governance Tool',
    'Metaverse Real Estate',
    'Blockchain Analytics Dashboard',
    'Tokenized Rewards System',
    'Decentralized Insurance',
    'Smart Contract Testing Framework',
    'Blockchain-based KYC',
  ],

  teamNames: [
    'Block Builders',
    'Chain Innovators',
    'Crypto Crusaders',
    'DeFi Dragons',
    'Web3 Warriors',
    'Smart Contract Squad',
    'Blockchain Brigade',
    'Defi Developers',
    'NFT Ninjas',
    'DAO Dynasty',
  ],

  technologies: [
    'Solidity',
    'React',
    'Node.js',
    'Python',
    'JavaScript',
    'TypeScript',
    'Ethereum',
    'Polygon',
    'Hardhat',
    'Truffle',
    'Web3.js',
    'Ethers.js',
    'IPFS',
    'MetaMask',
    'OpenZeppelin',
    'Chainlink',
    'The Graph',
    'MongoDB',
    'PostgreSQL',
    'Docker',
    'AWS',
    'Next.js',
    'Express.js',
    'FastAPI',
  ],

  problemStatements: [
    'Traditional financial systems are slow, expensive, and inaccessible to many people globally. We need a decentralized solution that provides fast, low-cost financial services.',
    'Current supply chain systems lack transparency and traceability, making it difficult to verify product authenticity and ethical sourcing.',
    'Existing voting systems are vulnerable to fraud and manipulation, reducing public trust in democratic processes.',
    'Digital identity management is fragmented across multiple platforms, creating privacy concerns and user experience issues.',
    'Small businesses struggle to access capital due to complex lending processes and high barriers to entry in traditional finance.',
    'Content creators have limited control over their intellectual property and often receive unfair compensation from centralized platforms.',
    'Environmental impact tracking and carbon credit systems lack transparency and verifiability.',
    'Cross-border payments are slow, expensive, and require multiple intermediaries.',
    'Data privacy and ownership rights are compromised in centralized social media platforms.',
    'Insurance claims processing is slow, opaque, and often involves disputes between parties.',
  ],

  solutionOverviews: [
    'Our platform leverages blockchain technology to create a transparent, efficient, and accessible solution that eliminates intermediaries and reduces costs.',
    'We built a decentralized application that uses smart contracts to automate processes and ensure trust between parties.',
    'The solution implements advanced cryptographic techniques to secure data while maintaining user privacy and control.',
    'Our protocol creates an incentive mechanism that rewards participants and maintains network security through tokenomics.',
    'The platform integrates multiple blockchain networks to provide seamless cross-chain functionality and interoperability.',
    'We developed a user-friendly interface that abstracts away blockchain complexity while maintaining decentralization benefits.',
    'The solution uses oracles and real-world data feeds to bridge the gap between blockchain and traditional systems.',
    'Our marketplace mechanism facilitates peer-to-peer transactions with built-in dispute resolution and escrow services.',
    'The platform implements governance tokens that allow community-driven decision making and protocol upgrades.',
    'We created a scalable architecture that can handle high transaction volumes while maintaining low fees.',
  ],

  descriptions: [
    'This comprehensive platform addresses critical challenges in the current ecosystem by providing innovative solutions that leverage cutting-edge blockchain technology. Our approach combines user experience optimization with robust security measures to create a seamless experience for all stakeholders.',
    'The project represents a significant advancement in decentralized technology implementation, offering unprecedented transparency and efficiency improvements. Through careful architecture design and smart contract optimization, we deliver superior performance while maintaining security.',
    'Our solution introduces novel mechanisms for community governance and incentive alignment, creating a sustainable ecosystem that benefits all participants. The platform incorporates advanced features for scalability, interoperability, and user experience enhancement.',
    'Built with security-first principles, this platform provides enterprise-grade reliability while maintaining the openness and transparency that blockchain technology enables. Our implementation includes comprehensive testing and audit procedures to ensure maximum security.',
    'The project demonstrates innovative use of emerging technologies to solve real-world problems, creating measurable value for users and stakeholders. Through iterative development and community feedback, we have refined the solution to meet market demands.',
  ],

  githubRepos: [
    'https://github.com/defi-protocol/trading-bot',
    'https://github.com/blockchain-team/nft-marketplace',
    'https://github.com/supply-chain/tracker-dapp',
    'https://github.com/carbon-credits/exchange-platform',
    'https://github.com/identity-system/decentralized-id',
    'https://github.com/smart-contracts/audit-tool',
    'https://github.com/voting-platform/blockchain-voting',
    'https://github.com/crypto-portfolio/manager-app',
    'https://github.com/web3-social/decentralized-network',
    'https://github.com/file-storage/distributed-storage',
  ],

  demoVideos: [
    'https://www.youtube.com/watch?v=demo1',
    'https://www.youtube.com/watch?v=demo2',
    'https://www.youtube.com/watch?v=demo3',
    'https://vimeo.com/demo4',
    'https://www.youtube.com/watch?v=demo5',
  ],

  liveDemos: [
    'https://defi-trading-bot.vercel.app',
    'https://nft-marketplace-demo.netlify.app',
    'https://supply-chain-tracker.herokuapp.com',
    'https://carbon-exchange-demo.vercel.app',
    'https://identity-system-demo.netlify.app',
  ],

  supportingFiles: [
    'https://docs.google.com/document/d/1a2b3c4d5e6f7g8h9i0j/edit',
    'https://docs.google.com/presentation/d/1x2y3z4a5b6c7d8e9f0g/edit',
    'https://docs.google.com/spreadsheets/d/1m2n3o4p5q6r7s8t9u0v/edit',
    'https://drive.google.com/file/d/1w2x3y4z5a6b7c8d9e0f/view',
    'https://docs.google.com/document/d/1g2h3i4j5k6l7m8n9o0p/edit',
  ],
};

class LoadTester {
  constructor() {
    this.results = {
      successful: 0,
      failed: 0,
      errors: [],
      responseTimes: [],
      startTime: null,
      endTime: null,
    };
  }

  async connectToDatabase() {
    console.log('🔗 Connecting to database...');
    this.client = new MongoClient(TEST_CONFIG.MONGODB_URI);
    await this.client.connect();
    this.db = this.client.db();
    console.log('✅ Database connected successfully');
  }

  async fetchTestUsers(count = TEST_CONFIG.NUM_CONCURRENT_SUBMISSIONS) {
    console.log(
      `📋 Fetching ${count} users who haven't submitted projects yet...`,
    );

    // Get total count of users first
    const totalUsers = await this.db.collection('users').countDocuments();
    console.log(`📊 Total users in database: ${totalUsers}`);

    if (totalUsers === 0) {
      throw new Error(
        '❌ No users found in database. Please ensure users are registered in the system.',
      );
    }

    // Get users who have already submitted projects
    const submittedProjects = await this.db
      .collection('projects')
      .find({}, { email: 1, uid: 1 })
      .toArray();
    const submittedUserEmails = new Set(submittedProjects.map((p) => p.email));
    const submittedUserUIDs = new Set(submittedProjects.map((p) => p.uid));

    console.log(`📊 Users who already submitted: ${submittedUserEmails.size}`);

    // Fetch users who haven't submitted projects yet
    const availableUsers = await this.db
      .collection('users')
      .find({
        $and: [
          { email: { $nin: Array.from(submittedUserEmails) } },
          { uid: { $nin: Array.from(submittedUserUIDs) } },
        ],
      })
      .toArray();

    console.log(`📊 Available users for testing: ${availableUsers.length}`);

    if (availableUsers.length === 0) {
      throw new Error(
        '❌ No users available for testing. All users have already submitted projects.',
      );
    }

    if (availableUsers.length < count) {
      console.log(
        `⚠️  Only ${availableUsers.length} users available without submissions, but need ${count} for testing.`,
      );
      console.log(
        `🔄 Will use all ${availableUsers.length} available users for testing.`,
      );
      count = availableUsers.length;
    }

    // Select the required number of users
    const selectedUsers = availableUsers.slice(0, count);

    console.log(
      `✅ Selected ${selectedUsers.length} different users for load testing`,
    );
    console.log(
      `👥 Users: ${selectedUsers
        .slice(0, 5)
        .map((u) => u.email)
        .join(', ')}${selectedUsers.length > 5 ? '...' : ''}`,
    );

    return selectedUsers;
  }

  generateRandomProjectData(user, index) {
    const getRandomItem = (array) =>
      array[Math.floor(Math.random() * array.length)];
    const getRandomItems = (array, count) => {
      const shuffled = [...array].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    return {
      email: user.email,
      uid: user.uid,
      projectName: `${getRandomItem(PROJECT_TEMPLATES.projectNames)} ${index + 1}`,
      teamName: getRandomItem(PROJECT_TEMPLATES.teamNames),
      participantNames: [user.name || `Participant ${index + 1}`],
      description: `${getRandomItem(PROJECT_TEMPLATES.descriptions)} This project specifically focuses on solving critical challenges in the Web3 ecosystem through innovative blockchain solutions. Our implementation provides significant improvements in efficiency, security, and user experience compared to existing alternatives in the market.`,
      problemStatement: getRandomItem(PROJECT_TEMPLATES.problemStatements),
      solutionOverview: getRandomItem(PROJECT_TEMPLATES.solutionOverviews),
      technologiesUsed: getRandomItems(
        PROJECT_TEMPLATES.technologies,
        3 + Math.floor(Math.random() * 5),
      ),
      demoVideoLink:
        Math.random() > 0.3 ? getRandomItem(PROJECT_TEMPLATES.demoVideos) : '',
      githubRepoLink: `${getRandomItem(PROJECT_TEMPLATES.githubRepos)}-${index + 1}`,
      liveDemoLink:
        Math.random() > 0.4 ? getRandomItem(PROJECT_TEMPLATES.liveDemos) : '',
      supportingFiles:
        Math.random() > 0.5
          ? [getRandomItem(PROJECT_TEMPLATES.supportingFiles)]
          : [],
      termsAccepted: true,
    };
  }

  async submitProject(projectData, userIndex) {
    const startTime = Date.now();

    try {
      const response = await axios.post(
        `${TEST_CONFIG.API_BASE_URL}/api/submit-project`,
        projectData,
        {
          timeout: TEST_CONFIG.TIMEOUT_MS,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const responseTime = Date.now() - startTime;
      this.results.responseTimes.push(responseTime);

      if (response.status === 201 && response.data.success) {
        this.results.successful++;
        console.log(
          `✅ User ${userIndex + 1}: Project "${projectData.projectName}" submitted successfully (${responseTime}ms) - ID: ${response.data.submissionId}`,
        );
        return {
          success: true,
          responseTime,
          submissionId: response.data.submissionId,
        };
      } else {
        this.results.failed++;
        console.log(
          `❌ User ${userIndex + 1}: Unexpected response - Status: ${response.status}`,
        );
        this.results.errors.push(
          `User ${userIndex + 1}: Unexpected response status ${response.status}`,
        );
        return { success: false, responseTime, error: 'Unexpected response' };
      }
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.results.failed++;

      const errorMessage = error.response
        ? `HTTP ${error.response.status}: ${error.response.data?.message || error.response.statusText}`
        : error.message;

      console.log(
        `❌ User ${userIndex + 1}: Failed - ${errorMessage} (${responseTime}ms)`,
      );
      this.results.errors.push(`User ${userIndex + 1}: ${errorMessage}`);

      return { success: false, responseTime, error: errorMessage };
    }
  }

  async runConcurrentSubmissions(users) {
    console.log(
      `\n🚀 Starting concurrent submission of ${users.length} projects...`,
    );
    this.results.startTime = Date.now();

    // Generate project data for all users
    const projectsData = users.map((user, index) =>
      this.generateRandomProjectData(user, index),
    );

    // Submit all projects concurrently
    const submissionPromises = projectsData.map((projectData, index) =>
      this.submitProject(projectData, index),
    );

    // Wait for all submissions to complete
    const results = await Promise.allSettled(submissionPromises);

    this.results.endTime = Date.now();

    return results;
  }

  generateReport() {
    const totalTime = this.results.endTime - this.results.startTime;
    const avgResponseTime =
      this.results.responseTimes.length > 0
        ? this.results.responseTimes.reduce((a, b) => a + b, 0) /
          this.results.responseTimes.length
        : 0;
    const maxResponseTime = Math.max(...this.results.responseTimes);
    const minResponseTime = Math.min(...this.results.responseTimes);
    const successRate =
      (this.results.successful /
        (this.results.successful + this.results.failed)) *
      100;

    console.log('\n' + '='.repeat(80));
    console.log('📊 LOAD TEST RESULTS');
    console.log('='.repeat(80));
    console.log(
      `📈 Total Submissions: ${this.results.successful + this.results.failed}`,
    );
    console.log(`✅ Successful: ${this.results.successful}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`📊 Success Rate: ${successRate.toFixed(2)}%`);
    console.log(
      `⏱️  Total Time: ${totalTime}ms (${(totalTime / 1000).toFixed(2)}s)`,
    );
    console.log(`📊 Average Response Time: ${avgResponseTime.toFixed(2)}ms`);
    console.log(`⚡ Fastest Response: ${minResponseTime}ms`);
    console.log(`🐌 Slowest Response: ${maxResponseTime}ms`);
    console.log(
      `💾 Throughput: ${((this.results.successful + this.results.failed) / (totalTime / 1000)).toFixed(2)} requests/second`,
    );

    if (this.results.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      console.log('-'.repeat(40));
      this.results.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`);
      });
    }

    console.log('\n📊 RESPONSE TIME DISTRIBUTION:');
    console.log('-'.repeat(40));
    const sortedTimes = [...this.results.responseTimes].sort((a, b) => a - b);
    if (sortedTimes.length > 0) {
      console.log(
        `P50 (Median): ${sortedTimes[Math.floor(sortedTimes.length * 0.5)]}ms`,
      );
      console.log(
        `P90: ${sortedTimes[Math.floor(sortedTimes.length * 0.9)]}ms`,
      );
      console.log(
        `P95: ${sortedTimes[Math.floor(sortedTimes.length * 0.95)]}ms`,
      );
      console.log(
        `P99: ${sortedTimes[Math.floor(sortedTimes.length * 0.99)]}ms`,
      );
    }

    console.log('='.repeat(80));
  }

  async cleanup() {
    if (this.client) {
      await this.client.close();
      console.log('🔌 Database connection closed');
    }
  }

  async run() {
    try {
      console.log('🧪 Starting Load Test for Project Submissions');
      console.log('-'.repeat(50));

      await this.connectToDatabase();

      const users = await this.fetchTestUsers();

      if (users.length === 0) {
        throw new Error('No users found for testing');
      }

      await this.runConcurrentSubmissions(users);

      this.generateReport();
    } catch (error) {
      console.error('💥 Load test failed:', error);
      process.exit(1);
    } finally {
      await this.cleanup();
    }
  }
}

// Run the load test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const loadTester = new LoadTester();
  loadTester.run().catch(console.error);
}

export default LoadTester;
