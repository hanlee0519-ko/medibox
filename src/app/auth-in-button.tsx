'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session } from 'inspector';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AuthInButton({ session }: { session: Session | null }) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    console.log('회원가입');
    await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setEmail(email);
    router.refresh();
  };

  const handleOTP = async () => {
    console.log('OTP 인증');
    await supabase.auth.verifyOtp({
      email: email,
      token: token,
      type: 'email',
    });
    setToken('');
    router.refresh();
  };

  const handleChangePassword = async () => {
    console.log('비밀번호 초기화');
    await supabase.auth.updateUser({
      password: password,
    });
    router.refresh();
    router.push('/login');
  };

  return session ? (
    <div>
      <div>
        <h1>인증완료, 비밀번호를 초기화 하세요</h1>
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
      <div>
        <button onClick={handleChangePassword}>Reset Passowrd</button>
      </div>
    </div>
  ) : (
    <div>
      <h1>이메일을 입력하고, 인증코드를 요청하세요</h1>
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
          name="OPT"
          placeholder="OTP"
          onChange={(e) => setToken(e.target.value)}
          value={token}
        />
      </div>
      <div>
        <button onClick={handleSignUp}>Sign In</button>
      </div>
      <div>
        <button onClick={handleOTP}>Verify</button>
      </div>
    </div>
  );
}
