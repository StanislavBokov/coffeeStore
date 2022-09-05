import styles from './styles.module.scss';
import { Modal, H3, Text, Button } from '../../../../components';
import { removeLotAction, setAvailabilityLotAction } from '../../../../store/admin/actions';
import { useDispatch } from 'react-redux';
import { FC } from 'react';

interface ModalRemoveLotProps {
    id: string,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    isAvailable: boolean
}
export const ModalRemoveLot:FC<ModalRemoveLotProps> = ({ id, setOpenModal, isAvailable }) => {
  const dispatch = useDispatch()

  const handleRemoveLot = (id:string) => {
    dispatch(removeLotAction(id))
    setOpenModal(false)
  } 
  const handleSetAvailabilityLot = (id: string) => {
    dispatch(setAvailabilityLotAction(id))
    setOpenModal(false)
  }
  return (
    <Modal position="fixed">
      <div>  
        <H3 className={styles.title}>Выберете одно из действий </H3>
        <div className={styles.wrapList}>
          <Text>1 - <Button variant="text" size="noSize" onClick={() => handleSetAvailabilityLot(id)}>{isAvailable ? 'Убрать из списка' : 'Вернуть в список'}</Button></Text>
          <Text>2 - <Button variant="text" size="noSize" onClick={() => handleRemoveLot(id)}>Удалить</Button></Text>
        </div>
        <Button size="noSize" variant="text" onClick={() => setOpenModal(false)}>Отмена</Button>
      </div>
   
    </Modal>
  )
}