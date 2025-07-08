'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Database, FileText, Award, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TermsAndConditions() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: `By participating in the Web3SSH Hackathon or using our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not participate in the hackathon or use our services.`
    },
    {
      icon: Award,
      title: "Project Submission & Ownership",
      content: `All submitted projects must be original work created during the hackathon period. By submitting your project, you retain ownership of your intellectual property while granting Web3SSH a non-exclusive license to showcase your work on our platform and promotional materials. This includes the right to display project information, images, videos, and descriptions.`
    },
    {
      icon: Database,
      title: "Data Collection & Usage",
      content: `We collect and store information you provide during registration and project submission, including but not limited to: name, email address, project details, team information, demo videos, GitHub repositories, and supporting materials. This information is used to manage the hackathon, display projects on our website, communicate with participants, and improve our services. We respect your privacy and will not sell your personal information to third parties.`
    },
    {
      icon: Globe,
      title: "Website Display & Promotion",
      content: `By submitting your project, you grant Web3SSH permission to display your project information, including project name, description, team details, technologies used, demo videos, and other submitted materials on our website and social media channels. This helps showcase the innovation and talent from our hackathon community. We will always credit your team appropriately and maintain the integrity of your project presentation.`
    },
    {
      icon: Shield,
      title: "Code of Conduct",
      content: `Participants must maintain professional and respectful behavior throughout the hackathon. Harassment, discrimination, or inappropriate conduct will not be tolerated. All submitted content must be appropriate and free from offensive material. Projects should not violate any laws or regulations. Plagiarism or submission of existing projects is strictly prohibited.`
    }
  ];

  const additionalTerms = [
    {
      title: "Judging & Awards",
      content: "Judging decisions are final and cannot be appealed. Prize distribution is subject to verification of eligibility and compliance with these terms. Winners may be required to provide additional documentation."
    },
    {
      title: "Technical Requirements",
      content: "Projects must include a working demo video and accessible source code repository. All submitted links must remain functional throughout the judging period and for display purposes."
    },
    {
      title: "Privacy & Security",
      content: "We implement reasonable security measures to protect your data. However, no system is completely secure, and we cannot guarantee absolute security of information transmitted over the internet."
    },
    {
      title: "Limitation of Liability",
      content: "Web3SSH and its organizers shall not be liable for any technical issues, data loss, or other problems that may occur during the hackathon. Participation is at your own risk."
    },
    {
      title: "Changes to Terms",
      content: "We reserve the right to modify these terms at any time. Participants will be notified of significant changes. Continued participation after changes constitutes acceptance of the modified terms."
    },
    {
      title: "Contact Information",
      content: "For questions about these terms or data usage, please contact us through our official communication channels or website."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,theme(colors.blue.600),transparent_25%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,theme(colors.purple.600),transparent_25%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,theme(colors.indigo.600),transparent_25%)]" />
        </div>

        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 40, 0],
            y: [0, 60, -30, 0],
            scale: [1, 0.8, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Back Button */}
        <motion.div
          className="absolute top-6 left-6 z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={handleBackClick}
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl border border-white/20 text-white transition-all duration-200 shadow-lg"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back</span>
          </motion.button>
        </motion.div>

        <div className="container mx-auto px-4 pt-20 pb-16">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400">
                Terms &
              </span>
              <br />
              <span className="text-white">Conditions</span>
            </motion.h1>

            <motion.p
              className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Please read these terms carefully before participating in the Web3SSH Hackathon. 
              By joining our community, you agree to these conditions which help us maintain a 
              safe, innovative, and collaborative environment for all participants.
            </motion.p>

            <motion.div
              className="flex justify-center gap-8 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">Fair</div>
                <div className="text-white/60 text-sm">Usage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">Transparent</div>
                <div className="text-white/60 text-sm">Process</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-400">Secure</div>
                <div className="text-white/60 text-sm">Platform</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Sections */}
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">
                        {section.title}
                      </h2>
                      <p className="text-white/90 text-base leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Terms Grid */}
          <motion.div
            className="max-w-6xl mx-auto mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Additional Important Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {additionalTerms.map((term, index) => (
                <motion.div
                  key={term.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + 0.1 * index }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                    {term.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {term.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer Notice */}
          <motion.div
            className="max-w-4xl mx-auto mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/30 text-center">
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full">
                  <FileText className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-300 text-sm font-medium">Last Updated</span>
                </div>
              </div>
              <p className="text-white/90 mb-4">
                These terms were last updated on <strong>January 2025</strong>. 
                We may update these terms from time to time to reflect changes in our practices or legal requirements.
              </p>
              <p className="text-white/70 text-sm">
                By continuing to participate in our hackathon after any changes to these terms, 
                you accept the updated version. We encourage you to review these terms periodically.
              </p>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            className="max-w-2xl mx-auto mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}
