import { FC, useState, useEffect } from 'react';
import { H3, Input, Button, Text } from '..';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { CSSTransition } from 'react-transition-group';
import styles from './styles.module.scss';
import { registerUserAction } from '../../store/register/actions';
import { loader } from '../../assets/icons';
import { validateScheme, inputHelper } from './registration.helper';

export const Registration: FC = () => {
  type DataType  = {
    [key: string]: { value: string, isBlur:boolean }
  }
  const dispatch = useDispatch();

  const { errorMessage, loading } = useTypedSelector((state) => state.register);

  const [errors, setErrors] = useState<{[key:string]: string}>({});

  const [data, setData] = useState<DataType>({
    name: { value: '', isBlur: false },
    numberPhone: { value: '', isBlur: false },
    email: { value: '', isBlur: false },
    password: { value: '', isBlur: false }
  });

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {       
    setData((prevState:DataType) => ({
      ...prevState,
      [target.name]: { ...data[target.name], value: target.value  }
    }));
  };

  const handleBlur = ({ target }: React.ChangeEvent<HTMLInputElement>) => {  
    setData((prevState:DataType)  => ({
      ...prevState,
      [target.name]: { ...data[target.name], isBlur: true  }
    }));
  };
  
  const validate = () => {
    validateScheme.validate({ name:data.name.value, numberPhone:data.numberPhone.value, email:data.email.value, password:data.password.value })
      .then(() => setErrors({}))
      .catch((error) => setErrors({ [error.path]: error.message }));
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [data]);
  
  const signUpHandle = () => {
    dispatch(registerUserAction({ email: data.email.value, password: data.password.value, name: data.name.value, numberPhone: data.numberPhone.value }));    
  };

  return (
    <div className={styles.Registration}>
      <div className={styles.wrapper}>
        <div className={styles.mainDataWrapper}>
          <H3 className={styles.titles}>Регистрация</H3>
          <CSSTransition
            in={Boolean(errorMessage)}
            timeout={300}
            unmountOnExit
            classNames="message"
          >
            <Text color="error" className={styles.message}>{errorMessage}</Text>
          </CSSTransition>
          {inputHelper.map(({ id, name, placeholder }) => (
            <>
              <Input 
                key={id}
                id={id} 
                name={name}
                placeholder={placeholder} 
                onChange={handleChange} 
                value={data[name].value}
                error={errors[name]}
                blur={data[name].isBlur}
                onBlur={handleBlur}
                type={name === 'password' ? name : 'text'}
              />
              {data[name].isBlur && <Text className={styles.errorMessage} color="error">{errors[name]}</Text>}             
            </>
          ))}
          <Button 
            className={styles.signUpBtn}
            onClick={signUpHandle}
            disable={ Object.keys(errors).length !== 0}
          >
            {loading ? <img src={loader} className={styles.imgLoader}/> : 'Зарегестрироваться'}
          </Button>
        </div>
      </div>
    </div>
  );
};