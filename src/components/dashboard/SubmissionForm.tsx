'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Users,
  Code,
  FileText,
  Lightbulb,
  Link,
  AlertCircle,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertTriangle,
  Plus,
  ExternalLink,
} from 'lucide-react';
import { SubmissionRequest } from 'types/dashboard';
import { submissionSchema } from 'lib/validation';

interface SubmissionFormProps {
  participantInfo: any;
  submissionWindow: {
    isOpen: boolean;
    startTime: Date | null;
    endTime: Date | null;
    timeRemaining: number;
  };
  onSuccess: (submissionId: string) => void;
  onError: () => void;
  isLoading: boolean;
}

interface FormData {
  projectName: string;
  teamName: string;
  participantNames: string[];
  description: string;
  problemStatement: string;
  solutionOverview: string;
  technologiesUsed: string[];
  demoVideoLink: string;
  githubRepoLink: string;
  liveDemoLink: string;
  supportingFiles: string[];
  termsAccepted: boolean;
  tracks: string[];
}

const FORM_STEPS = [
  { id: 'project', title: 'Project Info', icon: Code },
  { id: 'team', title: 'Team Details', icon: Users },
  { id: 'description', title: 'Description', icon: FileText },
  { id: 'solution', title: 'Solution', icon: Lightbulb },
  { id: 'links', title: 'Links & Files', icon: Link },
  { id: 'review', title: 'Review', icon: Check },
];

export default function SubmissionForm({
  participantInfo,
  submissionWindow,
  onSuccess,
  onError,
  isLoading,
}: SubmissionFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    teamName: '',
    participantNames: [participantInfo?.name || ''],
    description: '',
    problemStatement: '',
    solutionOverview: '',
    technologiesUsed: [],
    demoVideoLink: '',
    githubRepoLink: '',
    liveDemoLink: '',
    supportingFiles: [],
    termsAccepted: false,
    tracks: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [existingProject, setExistingProject] = useState<any>(null);
  const [newTech, setNewTech] = useState('');
  const [newParticipant, setNewParticipant] = useState('');
  const [newGoogleDocsLink, setNewGoogleDocsLink] = useState('');

  // Format time remaining
  const formatTimeRemaining = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologiesUsed.includes(newTech.trim())) {
      updateFormData('technologiesUsed', [
        ...formData.technologiesUsed,
        newTech.trim(),
      ]);
      setNewTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    updateFormData(
      'technologiesUsed',
      formData.technologiesUsed.filter((t) => t !== tech),
    );
  };

  const addParticipant = () => {
    if (
      newParticipant.trim() &&
      !formData.participantNames.includes(newParticipant.trim()) &&
      formData.participantNames.length < 4 // Maximum 4 total members (1 verified + 3 additional)
    ) {
      updateFormData('participantNames', [
        ...formData.participantNames,
        newParticipant.trim(),
      ]);
      setNewParticipant('');
    }
  };

  const removeParticipant = (index: number) => {
    // Don't allow removing the first participant (verified user)
    if (index === 0) return;
    updateFormData(
      'participantNames',
      formData.participantNames.filter((_, i) => i !== index),
    );
  };

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 0: // Project Info
        if (!formData.projectName.trim()) {
          newErrors.projectName = 'Project name is required';
        }
        if (!formData.tracks || formData.tracks.length === 0) {
          newErrors.tracks = 'Please select at least one track';
        }
        break;
      case 1: // Team Details
        if (formData.participantNames.length === 0) {
          newErrors.participantNames = 'At least one participant is required';
        }
        break;
      case 2: // Description
        if (formData.description.length < 50) {
          newErrors.description = 'Description must be at least 50 characters';
        }
        if (formData.problemStatement.length < 20) {
          newErrors.problemStatement =
            'Problem statement must be at least 20 characters';
        }
        break;
      case 3: // Solution
        if (formData.solutionOverview.length < 20) {
          newErrors.solutionOverview =
            'Solution overview must be at least 20 characters';
        }
        if (formData.technologiesUsed.length === 0) {
          newErrors.technologiesUsed = 'At least one technology is required';
        }
        break;
      case 4: // Links & Files
        if (!formData.githubRepoLink.trim()) {
          newErrors.githubRepoLink = 'GitHub repository link is required';
        }
        if (!formData.demoVideoLink.trim()) {
          newErrors.demoVideoLink = 'Demo video link is required';
        }
        if (formData.supportingFiles.length === 0) {
          newErrors.supportingFiles =
            'At least one Google Docs/Drive link is required';
        }
        break;
      case 5: // Review
        if (!formData.termsAccepted) {
          newErrors.termsAccepted = 'You must accept the terms and conditions';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < FORM_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;

    try {
      // Validate with schema
      const submissionData: SubmissionRequest = {
        email: participantInfo.email,
        uid: participantInfo.uid,
        ...formData,
      };

      const validated = submissionSchema.parse(submissionData);

      const response = await fetch('/api/submit-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validated),
      });

      const result = await response.json();

      if (result.success) {
        onSuccess(result.submissionId);
      } else {
        // Check if it's an existing project error
        if (result.existingProject) {
          setExistingProject(result.existingProject);
        }
        setErrors({ submit: result.message });
        onError();
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to submit project. Please try again.' });
      onError();
    }
  };

  // Add Google Docs link handler
  const addGoogleDocsLink = () => {
    if (!newGoogleDocsLink.trim()) return;

    // Validate Google Docs/Drive URL
    const googleDocsRegex = /^https:\/\/(docs|drive)\.google\.com\/.+/;
    if (!googleDocsRegex.test(newGoogleDocsLink)) {
      setErrors((prev) => ({
        ...prev,
        googleDocsLink: 'Please enter a valid Google Docs or Google Drive link',
      }));
      return;
    }

    // Check for duplicates
    if (formData.supportingFiles.includes(newGoogleDocsLink)) {
      setErrors((prev) => ({
        ...prev,
        googleDocsLink: 'This link has already been added',
      }));
      return;
    }

    updateFormData('supportingFiles', [
      ...formData.supportingFiles,
      newGoogleDocsLink,
    ]);
    setNewGoogleDocsLink('');
    setErrors((prev) => ({ ...prev, googleDocsLink: '' }));
  };

  // Check if submission window is open
  if (!submissionWindow.isOpen) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">
            Submission Window Closed
          </h2>
          <p className="text-gray-300 mb-6">
            The hackathon submission window is currently closed. Please check
            back during the submission period.
          </p>
          {submissionWindow.startTime && (
            <p className="text-sm text-gray-400">
              Submissions open: {submissionWindow.startTime.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Existing Project Warning */}
      {existingProject && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                Project Already Submitted
              </h3>
              <p className="text-gray-300 mb-4">
                You have already submitted a project for this hackathon.
                Multiple submissions are not allowed.
              </p>
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Project Name:</span>
                    <p className="text-white font-semibold">
                      {existingProject.projectName}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">Submission ID:</span>
                    <p className="text-blue-400 font-mono">
                      {existingProject.submissionId}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gray-400">Submitted On:</span>
                    <p className="text-white">
                      {new Date(
                        existingProject.submissionTimestamp,
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
                <p className="text-blue-300 text-sm">
                  <strong>Need help?</strong> If you have any queries about your
                  submission or need to make changes, please contact the
                  organizers immediately.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Submission Timer */}
      <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-md rounded-2xl p-4 mb-8 border border-red-500/30">
        <div className="flex items-center justify-center gap-3">
          <Clock className="w-5 h-5 text-red-400" />
          <span className="text-white font-semibold">
            Time Remaining:{' '}
            {formatTimeRemaining(submissionWindow.timeRemaining)}
          </span>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {FORM_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
                  ${
                    isActive
                      ? 'bg-purple-600 text-white'
                      : isCompleted
                        ? 'bg-green-600 text-white'
                        : 'bg-white/10 text-gray-400'
                  }
                `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
                {index < FORM_STEPS.length - 1 && (
                  <div
                    className={`
                    w-8 h-0.5 mx-2
                    ${isCompleted ? 'bg-green-600' : 'bg-white/20'}
                  `}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
        <AnimatePresence mode="wait">
          {/* Step 0: Project Info */}
          {currentStep === 0 && (
            <motion.div
              key="project"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Code className="w-6 h-6 text-purple-400" />
                  Project Information
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) =>
                    updateFormData('projectName', e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your project name"
                />
                {errors.projectName && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.projectName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Team Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.teamName}
                  onChange={(e) => updateFormData('teamName', e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your team name (if applicable)"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-white mb-2">
                  Track <span>*</span>
                </label>
                <div className="flex gap-6 items-center mb-2">
                  {/* Women Track */}
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.tracks?.includes('Women')}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        let tracks = formData.tracks || [];
                        if (checked) {
                          tracks = [...tracks, 'Women'];
                        } else {
                          tracks = tracks.filter((t) => t !== 'Women');
                        }
                        updateFormData('tracks', tracks);
                      }}
                      className={`
          appearance-none w-5 h-5 rounded-full border-2
          border-purple-500
          transition-colors
          ${formData.tracks?.includes('Women') ? 'bg-purple-600 border-purple-600' : 'bg-transparent'}
        `}
                    />
                    <span className="text-white">Women</span>
                  </label>
                  {/* Open Track */}
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.tracks?.includes('Open')}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        let tracks = formData.tracks || [];
                        if (checked) {
                          tracks = [...tracks, 'Open'];
                        } else {
                          tracks = tracks.filter((t) => t !== 'Open');
                        }
                        updateFormData('tracks', tracks);
                      }}
                      className={`
          appearance-none w-5 h-5 rounded-full border-2
          border-purple-500
          transition-colors
          ${formData.tracks?.includes('Open') ? 'bg-purple-600 border-purple-600' : 'bg-transparent'}
        `}
                    />
                    <span className="text-white">Open</span>
                  </label>
                </div>
                <p className="text-xs text-yellow-200 mt-2">
                  If you select the <span className="font-semibold">Women</span>{' '}
                  track, your entire team must only contain women participants.
                  Otherwise, your submission will be canceled.
                </p>
                {errors.tracks && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.tracks}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 1: Team Details */}
          {currentStep === 1 && (
            <motion.div
              key="team"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <Users className="w-6 h-6 text-purple-400" />
                  Team Members
                </h3>
                <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500/30 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">
                        <strong className="text-blue-400">
                          Maximum 4 team members allowed.
                        </strong>{' '}
                        You&apos;re already included as the verified
                        participant.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-white">
                    Participants *
                  </label>
                  <span className="text-sm text-gray-400">
                    {formData.participantNames.length}/4 members
                  </span>
                </div>
                <div className="space-y-3">
                  {formData.participantNames.map((name, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/10 border border-white/30 rounded-lg">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="text-white">{name}</span>
                        {index === 0 && (
                          <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
                            You
                          </span>
                        )}
                      </div>
                      {index > 0 && (
                        <button
                          onClick={() => removeParticipant(index)}
                          className="px-3 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  {formData.participantNames.length < 4 ? (
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newParticipant}
                        onChange={(e) => setNewParticipant(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === 'Enter' && addParticipant()
                        }
                        className="flex-1 px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Add team member name"
                      />
                      <button
                        onClick={addParticipant}
                        className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-yellow-400" />
                        <p className="text-yellow-400 font-medium">
                          Team limit reached
                        </p>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">
                        Maximum 4 team members allowed (including the verified
                        participant)
                      </p>
                    </div>
                  )}
                </div>

                {errors.participantNames && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.participantNames}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 2: Description */}
          {currentStep === 2 && (
            <motion.div
              key="description"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-purple-400" />
                  Project Description
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Project Description *{' '}
                  <span className="text-gray-400">
                    ({formData.description.length}/5000)
                  </span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    updateFormData('description', e.target.value)
                  }
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Provide a detailed description of your project (minimum 50 characters)"
                />
                {errors.description && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Problem Statement *{' '}
                  <span className="text-gray-400">
                    ({formData.problemStatement.length}/2000)
                  </span>
                </label>
                <textarea
                  value={formData.problemStatement}
                  onChange={(e) =>
                    updateFormData('problemStatement', e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="What problem does your project solve? (minimum 20 characters)"
                />
                {errors.problemStatement && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.problemStatement}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Solution */}
          {currentStep === 3 && (
            <motion.div
              key="solution"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-purple-400" />
                  Solution & Technologies
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Solution Overview *{' '}
                  <span className="text-gray-400">
                    ({formData.solutionOverview.length}/2000)
                  </span>
                </label>
                <textarea
                  value={formData.solutionOverview}
                  onChange={(e) =>
                    updateFormData('solutionOverview', e.target.value)
                  }
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="How does your solution work? What makes it unique? (minimum 20 characters)"
                />
                {errors.solutionOverview && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.solutionOverview}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Technologies Used *
                </label>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {formData.technologiesUsed.map((tech, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                      >
                        <span>{tech}</span>
                        <button
                          onClick={() => removeTechnology(tech)}
                          className="text-purple-400 hover:text-white transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., React, Solidity, IPFS, etc."
                    />
                    <button
                      onClick={addTechnology}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>

                  {errors.technologiesUsed && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.technologiesUsed}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Links & Files */}
          {currentStep === 4 && (
            <motion.div
              key="links"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Link className="w-6 h-6 text-purple-400" />
                  Links & Supporting Files
                </h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  GitHub Repository Link *
                </label>
                <input
                  type="url"
                  value={formData.githubRepoLink}
                  onChange={(e) =>
                    updateFormData('githubRepoLink', e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://github.com/username/project"
                />
                {errors.githubRepoLink && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.githubRepoLink}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Demo Video Link *
                </label>
                <input
                  type="url"
                  value={formData.demoVideoLink}
                  onChange={(e) =>
                    updateFormData('demoVideoLink', e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://youtube.com/watch?v=..."
                />
                {errors.demoVideoLink && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.demoVideoLink}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Website Link (Optional)
                </label>
                <input
                  type="url"
                  value={formData.liveDemoLink}
                  onChange={(e) =>
                    updateFormData('liveDemoLink', e.target.value)
                  }
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://your-project-demo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Supporting Materials (Google Docs/Drive Links) *
                </label>
                <p className="text-sm text-gray-400 mb-4">
                  Add Google Docs or Google Drive links containing project
                  images, files, or any supporting materials. At least one link
                  is required.
                </p>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={newGoogleDocsLink}
                      onChange={(e) => {
                        setNewGoogleDocsLink(e.target.value);
                        setErrors((prev) => ({ ...prev, googleDocsLink: '' }));
                      }}
                      className="flex-1 px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="https://docs.google.com/... or https://drive.google.com/..."
                    />
                    <button
                      type="button"
                      onClick={addGoogleDocsLink}
                      disabled={!newGoogleDocsLink.trim()}
                      className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>

                  {errors.googleDocsLink && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.googleDocsLink}
                    </p>
                  )}
                </div>

                {formData.supportingFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium text-white">
                      Added Links:
                    </h4>
                    {formData.supportingFiles.map((link, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-4 py-3 bg-white/10 rounded-lg border border-white/20"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <ExternalLink className="w-4 h-4 text-purple-400 flex-shrink-0" />
                          <span className="text-white text-sm truncate">
                            {link}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
                          >
                            View
                          </a>
                          <button
                            onClick={() =>
                              updateFormData(
                                'supportingFiles',
                                formData.supportingFiles.filter(
                                  (_, i) => i !== index,
                                ),
                              )
                            }
                            className="text-red-400 hover:text-red-300 transition-colors text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {errors.supportingFiles && (
                  <p className="text-red-400 text-sm mt-3 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.supportingFiles}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Check className="w-6 h-6 text-purple-400" />
                  Review & Submit
                </h3>
              </div>

              {/* Review Summary */}
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">
                    Project Information
                  </h4>
                  <p className="text-gray-300">Name: {formData.projectName}</p>
                  {formData.teamName && (
                    <p className="text-gray-300">Team: {formData.teamName}</p>
                  )}
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">
                    Team Members ({formData.participantNames.length})
                  </h4>
                  <div className="space-y-1">
                    {formData.participantNames.map((name, index) => (
                      <p key={index} className="text-gray-300">
                        {name} {index === 0 && '(You)'}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">
                    Technologies ({formData.technologiesUsed.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.technologiesUsed.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Links</h4>
                  <div className="space-y-1">
                    <p className="text-gray-300">
                      GitHub: {formData.githubRepoLink}
                    </p>
                    {formData.demoVideoLink && (
                      <p className="text-gray-300">
                        Demo Video: {formData.demoVideoLink}
                      </p>
                    )}
                    {formData.liveDemoLink && (
                      <p className="text-gray-300">
                        Website: {formData.liveDemoLink}
                      </p>
                    )}
                  </div>
                </div>

                {formData.supportingFiles.length > 0 && (
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">
                      Supporting Materials ({formData.supportingFiles.length})
                    </h4>
                    <div className="space-y-2">
                      {formData.supportingFiles.map((link, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-purple-400 flex-shrink-0" />
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-300 hover:text-purple-200 text-sm truncate"
                          >
                            {link}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="bg-white/5 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.termsAccepted}
                    onChange={(e) =>
                      updateFormData('termsAccepted', e.target.checked)
                    }
                    className="mt-1 w-4 h-4 text-purple-600 bg-transparent border-white/30 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <div>
                    <label htmlFor="terms" className="text-white text-sm">
                      I accept the{' '}
                      <a
                        href="/terms-and-conditions"
                        className="text-purple-400 hover:text-purple-300 underline"
                      >
                        Terms and Conditions
                      </a>{' '}
                      and confirm that all information provided is accurate and
                      that this project is our original work.
                    </label>
                    {errors.termsAccepted && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.termsAccepted}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {errors.submit && (
                <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {errors.submit}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300
              ${
                currentStep === 0
                  ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }
            `}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="text-sm text-gray-400">
            Step {currentStep + 1} of {FORM_STEPS.length}
          </div>

          {currentStep === FORM_STEPS.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`
                flex items-center gap-2 px-8 py-3 rounded-lg transition-all duration-300
                ${
                  isLoading
                    ? 'bg-purple-600/50 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transform hover:scale-105'
                }
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Project
                  <Check className="w-4 h-4" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
