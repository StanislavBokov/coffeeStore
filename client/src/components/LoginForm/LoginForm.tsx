import { FC, useState } from 'react';
import styles from './styles.module.scss';
import { CSSTransition } from 'react-transition-group';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { inputHelper } from './helper';
import { loader } from '../../assets/icons';
import { signInAction } from '../../store/signIn/actions';
import { Button, Input, H3, Text } from '..';

export const LoginForm:FC = () => {
  type DataType  = {
    [key:string]: string
  }
  const dispatch = useDispatch();
    
  const  { errorMessage, loading }  = useTypedSelector((state) => state.signIn);
  
  const [data, setData] = useState<DataType>({
    email: '',
    password: ''
  });

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {       
    setData((prevState:DataType) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const signUpHandle = () => {
    dispatch(signInAction({ email: data.email , password: data.password }));
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
      {inputHelper.map(({ id, name, placeholder }) => (
        <Input
          key={id}
          id={id}
          name={name} 
          onChange={handleChange}
          value={data[name]} 
          placeholder={placeholder}
          type={name === 'password' ? name : 'text'}
        />
      ))}
      <Button 
        size="sm" 
        className={styles.signInBtn} 
        onClick={signUpHandle}
      >
        {loading ? <img src={loader} className={styles.imgLoader}/> : 'Войти'}
      </Button>
    </div>
  );
};