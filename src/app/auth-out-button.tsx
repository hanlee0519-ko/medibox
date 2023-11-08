'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function AuthOutButton() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    console.log('로그아웃');
    await supabase.auth.signOut();
    router.refresh();
  };

  return <button onClick={handleSignOut}>로그아웃</button>;
}
