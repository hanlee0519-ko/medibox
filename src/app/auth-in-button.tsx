'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session } from 'inspector';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PopUp } from './components/PopUp';

export default function AuthInButton({ session }: { session: Session | null }) {
  const [showPopUp, setShowPopUp] = useState(false);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    setEmail(email);
    setShowPopUp((prev) => !prev);
    router.refresh();
  };

  const handleOTP = async () => {
    await supabase.auth.verifyOtp({
      email: email,
      token: token,
      type: 'email',
    });
    setToken('');
    router.refresh();
  };

  const handleChangePassword = async () => {
    await supabase.auth.updateUser({
      password: password,
    });
    router.refresh();
    router.push('/login');
  };

  return (
    <div>
      <div className="mt-8 p-8">
        <h1>SIGN IN</h1>
        <input
          className="w-11/12 border-solid border-2 border-black-600 text-black mt-4 m-1 p-1"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div>
          <button
            className="w-11/12 border-solid border-2 border-black-600 text-black m-1 p-1 hover:bg-amber-400 hover:text-white"
            onClick={handleSignUp}
          >
            Sign In
          </button>
        </div>
      </div>

      <PopUp
        show={showPopUp}
        onConfirm={handleChangePassword}
        onCloseBtn={() => setShowPopUp((prev) => !prev)}
        confirnName={'Rest Password'}
      >
        <h3>Email</h3>
        <input
          className="w-11/12 border-solid border-2 border-black-600 text-black m-1 p-1 bg-gray-300 "
          type="text"
          value={email}
          disabled
        />
        {session ? (
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
        ) : (
          <div className="mt-3">
            <h3>OTP</h3>
            <input
              className="w-11/12 border-solid border-2 border-black-600 text-black m-1 p-1"
              type="password"
              name="OPT"
              placeholder="OTP"
              onChange={(e) => setToken(e.target.value)}
              value={token}
            />
            <div>
              <button
                className="w-11/12 border-solid border-2 border-black-600 text-black m-1 p-1 hover:bg-amber-400 hover:text-white"
                onClick={handleOTP}
              >
                Verify
              </button>
            </div>
          </div>
        )}
      </PopUp>
    </div>
  );
}
