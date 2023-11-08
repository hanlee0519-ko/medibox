import styles from './page.module.css';
import AuthButton from '../auth-button';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Login() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}></div>
      <div className={styles.login}>
        <AuthButton />
      </div>
    </div>
  );
}
