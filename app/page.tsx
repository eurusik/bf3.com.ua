import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to the Ukrainian locale by default
  redirect('/uk');
  
  // This part won't be executed due to the redirect
  return null;
}
