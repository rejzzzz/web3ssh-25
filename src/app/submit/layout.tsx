import { AuthProvider } from 'contexts/AuthContext';

export default function SubmitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
