import { FC } from 'react';
import styles from './styles.module.scss';
import useInput from '../../hooks/useInput';
import { CSSTransition } from 'react-transition-group';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { signInAction } from '../../store/signIn/actions';
import { Button, Input, H3, Text } from '..';

export const LoginForm:FC = () => {
  const email = useInput('');
  const password = useInput('');
  const dispatch = useDispatch();
    
  const  { errorMessage }  = useTypedSelector((state) => state.signIn);
  const signUpHandle = () => {
    dispatch(signInAction({ email: email.value, password: password.value }));
  };
  return (
    <div className={styles.containerForm}>
      <H3 color="default" weight="light" className={styles.title}>Вход на сайт</H3>
      <CSSTransition
        in={Boolean(errorMessage)}
        timeout={300}
        unmountOnExit
        classNames="registerMessage"
      >
        <Text color="error" className={styles.errorMessage}>{errorMessage}</Text>
      </CSSTransition>
     
      <Input name="name" {...email} placeholder="E-mail" /><br />
      <Input name="password" {...password} placeholder="Password" type="password" />
      <Button size="sm" className={styles.signInBtn} onClick={signUpHandle}>Войти</Button>
    </div>
  );
};