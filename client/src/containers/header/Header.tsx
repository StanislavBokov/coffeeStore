import { FC } from "react";
import styles from './styles.module.scss';
import { userLoggedOut } from "../../store/user/reducer";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Header:FC = () => {

  const { isLoggedIn, auth } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(userLoggedOut());
    navigate('/');
  };
  
  return (
    <div className={styles.Header}>
      {isLoggedIn && <div className={styles.wrapper}>
        <div className={styles.info}>
          {/* <img src={logo} alt="logo" className={styles.mainLogo}/> */}
          <Link className={styles.links} to="/">Домой</Link>
          <Link className={styles.links} to="/basket">Корзина</Link>
          {auth?.isAdmin === 'true' && <Link className={styles.links} to="panelAdmin">Панель aдминистратора</Link>}
        </div>
        <div>
        
          <Button variant="text" size="noSize" onClick={logout}>Выйти</Button>
        </div>
      </div>}
    </div>
  );
};