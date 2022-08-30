import React, { FC } from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import useInput from '../../hooks/useInput';
import { CSSTransition } from 'react-transition-group';
import { setModalRegister } from '../../store/modal/reducer';
import { signInAction } from '../../store/signIn/actions';
import { Modal, Button, Input, H3, Text } from '..';

export const ModalSignIn:FC = () => {
  const email = useInput('');
  const password = useInput('');
  const dispatch = useDispatch();
  
  const  { errorMessage }  = useSelector((state:RootStateOrAny) => state.signIn);
  
  const signUpHandle = () => {
    dispatch(signInAction({ email: email.value, password: password.value }));
  };
  return (
    <Modal position="absolute">
      <Button variant="text" className={styles.btnCloseModal} onClick={()=>dispatch(setModalRegister(false))}>&times;</Button>
      <H3 color="default" align="center" weight="light" className={styles.title}>Вход на сайт</H3>
      <CSSTransition
        in={errorMessage}
        timeout={300}
        unmountOnExit
        classNames="registerMessage"
      >
        <Text color="error" className={styles.errorMessage}>{errorMessage}</Text>
      </CSSTransition>
     
      <Input name="name" {...email} placeholder="E-mail" /><br />
      <Input name="password" {...password} placeholder="Password" /><br />
      <Button size="sm" className={styles.signInBtn} onClick={signUpHandle}>Войти</Button>
      <Link to="/registration" onClick={()=>dispatch(setModalRegister(false))}>Регистрация</Link>
    </Modal>
  );
};