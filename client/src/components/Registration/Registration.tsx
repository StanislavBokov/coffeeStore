import { FC, useState, useEffect } from 'react';
import { H3, Input, Button, Text } from '..';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CSSTransition } from 'react-transition-group';
import useInput from '../../hooks/useInput';
import styles from './styles.module.scss';
import { registerUserAction } from '../../store/register/actions';
import { loader } from '../../assets/icons';
import { validateScheme } from './registration.helper';

export const Registration: FC = () => {
 
  const dispatch = useDispatch();
  const userName = useInput('');
  const email = useInput('');

  const password = useInput('');
  const passwordConfirmation = useInput('');

  const { errorMessage, successRegister, loading } = useTypedSelector((state) => state.register);

  type TypeErrors = { 
    [key:string]: string
   }

  const [errors, setErrors] = useState<TypeErrors>({});

  const validate = () => {
    validateScheme.validate({ email:email.value, password: password.value, name: userName.value, passwordConfirmation: passwordConfirmation.value })
      .then(() => setErrors({}))
      .catch((error) => setErrors({ [error.path]: error.message }));
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [email.value, password.value, userName.value, passwordConfirmation.value]);

  const signUpHandle = () => {
    const isValid = validate();
    if(!isValid) return;
    dispatch(registerUserAction({ email: email.value, password: password.value, name: userName.value }));    
  };

  return (
    <div className={styles.Registration}>
      <div className={styles.wrapper}>
        <div className={styles.mainDataWrapper}>
          <H3 className={styles.titles}>Основные данные</H3>
          <CSSTransition
            in={successRegister}
            timeout={300}
            unmountOnExit
            classNames="message"
          >
            <Text size="lg" color="success" className={styles.message}>Вы успешно зарегестрированы</Text>
          </CSSTransition>
  
          <CSSTransition
            in={Boolean(errorMessage)}
            timeout={300}
            unmountOnExit
            classNames="message"
          >
            <Text size="lg" color="error" className={styles.message}>{errorMessage}</Text>
          </CSSTransition>
  
          <Input error={errors.name} name="username" {...userName} placeholder="Имя" /><br />
          <Input error={errors.email} name="email" {...email} placeholder="E-mail" /><br />
          <H3 className={styles.titles}>Ваш пароль</H3>
   
          <Input error={errors.password} name="password" {...password} placeholder="Пароль" type="password" /><br />
          <Input error={errors.passwordConfirmation}  name="passwordConfirmation" {...passwordConfirmation} placeholder="Подтвердить пароль" type="password" /><br />
          <Button className={styles.signUpBtn} onClick={signUpHandle}>{loading ? <img src={loader} className={styles.imgLoader}/> : 'Зарегестрироваться'}</Button>
        </div>
      </div>
    </div>
  );
};