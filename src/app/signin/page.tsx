import styles from './page.module.css';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AuthInButton from '../auth-in-button';

export default async function Login() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className={styles.container}>
      <div className={styles.logo}></div>
      <div className={styles.signin}>
        <h1>
          <AuthInButton session={session} />
        </h1>
      </div>
    </div>
  );
}
