'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AuthButton() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    console.log('회원가입');
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    console.log('로그인');
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center	h-full">
        <div>icon</div>
        <div>Medibox CDMS</div>
        <div>
          <div>
            <input
              className="border-solid border-2 border-black-600 text-black m-1 p-1"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <input
              className="border-solid border-2 border-black-600 text-black m-1 p-1"
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>
        <div>
          <button onClick={handleSignUp}>회원가입</button>
        </div>
        <div>
          <button onClick={handleSignIn}>로그인</button>
        </div>
      </div>
    </>
  );
}
