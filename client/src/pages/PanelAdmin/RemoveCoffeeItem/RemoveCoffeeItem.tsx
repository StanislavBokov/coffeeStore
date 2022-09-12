import styles from './styles.module.scss';
import { FC, useState } from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { ModalRemoveLot } from './ModalRemoveLot/ModalRemoveLot';
import { CSSTransition } from 'react-transition-group';
import { setting } from '../../../assets/icons';
import { H2, Text, Button } from '../../../components';

export const RemoveCoffeeItem:FC = () => {
  const [openModal, setOpenModal] = useState(false)
  const [isAvailable, setAvailable] = useState<boolean>(true)
  const [id, setId] = useState<string>('');
  const { coffee } = useTypedSelector((state) => state.coffee)
  const { successRemove } = useTypedSelector((state) => state.admin)
  
  const selectLot = (id: string, available: boolean) => {
    setOpenModal(true)
    setId(id)
    setAvailable(available)
  };
    
  return (
    <div>
      <H2 className={styles.title}>Настройка лотов</H2>
      <div className={styles.wrapper}>
        <div className={styles.border}/>
        {coffee.map((item) => (
          <div className={styles.wrappItem} key={item._id}>
            <Text className={styles.text} color={item.available ? "success" : "error"}>{item.name}</Text>
            <Button variant="text" size="noSize"  onClick={() => selectLot(item._id, item.available)}><img src={setting}/></Button>
          </div>   
        ))}
        <CSSTransition in={successRemove} timeout={200} classNames="message" unmountOnExit>
          <Text color="success" className={styles.message}>Лот был удален</Text>
        </CSSTransition>
        <CSSTransition in={openModal} timeout={200} classNames="modal" unmountOnExit>
          <ModalRemoveLot id={id} setOpenModal={setOpenModal} isAvailable={isAvailable} />
        </CSSTransition>
        
      </div>
    </div>
  )
}