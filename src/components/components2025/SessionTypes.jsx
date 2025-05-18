export default function SessionTypes() {
  const scheduleData = [
    {
      icon: <CodeIcon className="h-10 w-10 mr-2" />,
      title: 'Coding Sessions',
      time: '9:45 AM - 11:45 AM & 2:00 PM - 3:30 PM',
      description:
        'Practical hands-on coding sessions led by 10 instructors. Build real Web3 applications and sharpen your development skills across blockchain platforms.',
    },
    {
      icon: <MicIcon className="h-10 w-10 mr-2" />,
      title: 'Keynote Sessions',
      time: '12:00 PM - 12:45 PM',
      description:
        'Daily keynote presentations from Web3 industry leaders sharing insights on blockchain technology, decentralized applications, and the future of Web3.',
    },
    {
      icon: <FireIcon className="h-10 w-10 mr-2" />,
      title: 'Fire-side Chats',
      time: '3:45 PM - 4:30 PM',
      description:
        'Informal conversations with accomplished entrepreneurs and technologists in the Web3 space, providing unique insights and networking opportunities.',
    },
    {
      icon: <UsersIcon className="h-10 w-10 mr-2" />,
      title: 'Team Building Activities',
      time: '3:45 PM - 4:30 PM',
      description:
        'Collaborative activities designed to enhance communication and problem-solving skills, preparing you for effective teamwork during the hackathon.',
    },
  ];
  return (
    <div
      id="sessionType"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-opacity-90 mb-[120px]"
    >
      <h1 className="text-4xl md:text-6xl font-sans font-medium mb-10 lg:mb-20 text-center text-white">
        Session Types
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {scheduleData.map((item, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-10 shadow-md rounded-lg p-8 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center mb-4">
              {item.icon}
              <h2 className="text-2xl lg:text-3xl font-sans font-medium text-white">
                {item.title}
              </h2>
            </div>
            <div className="flex justify-start items-center my-4 ml-0">
              <div className="bg-[#222] text-white text-muted-foreground px-5 py-1 rounded-full text-lg font-medium">
                {item.time}
              </div>
            </div>
            <p className="text-xl font-sans text-white mt-4">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function MicIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function FireIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
