import { Metadata } from 'next';
import TermsAndConditions from '../../components/legal/TermsAndConditions.tsx';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Web3SSH Hackathon',
  description:
    'Terms and conditions for participating in the Web3SSH Hackathon and using our platform.',
  openGraph: {
    title: 'Terms and Conditions | Web3SSH Hackathon',
    description:
      'Terms and conditions for participating in the Web3SSH Hackathon and using our platform.',
    images: ['/link_preview.png'],
  },
};

export default function TermsAndConditionsPage() {
  return <TermsAndConditions />;
}
