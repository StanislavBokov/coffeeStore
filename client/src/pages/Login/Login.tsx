import { FC, useState } from 'react';
import styles from "./styles.module.scss";
import { Button, Text, LoginForm, Registration } from '../../components';
export const Login:FC = () => {

  const [type, setType] = useState('signIn');

  return (
    <div className={styles.loginWrapper}>
      {type === 'signIn' ? 
        <div className={styles.formWrapper}>
          <LoginForm /> 
          <Text size="md" weight="light"> Dont have account?</Text>
          <Button size="noSize" variant="text" onClick={() => setType('register')}>Sign Up</Button>
        </div> : 
        <div className={styles.formWrapper}>
          <Registration /> 
          <Text size="md" weight="light">Already have account?</Text>
          <Button size="noSize" variant="text" onClick={() => setType('signIn')}>Sign In</Button>
        </div>
      }
    </div>
  );

};