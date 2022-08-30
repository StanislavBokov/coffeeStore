/* eslint-disable @typescript-eslint/no-explicit-any */

import { FC, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { Button } from '../../../components';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { removeLotAction } from '../../../store/admin/actions';
import { upDateLotAction } from '../../../store/admin/actions';

export const Coffee:FC = () => {
  const { coffee } = useSelector((state:RootStateOrAny) => state.coffee);

  const dispatch = useDispatch();
  const [fileState, setFileState] = useState<any>(null);

  const onChange = (event: any) => {
    setFileState(event.target.files[0]);
    
  };

  const upDateLot = async () => {
   
    const formData = new FormData();
    formData.append('file', fileState);

    const res = await fetch('http://localhost:5566/addLot', {
      method:'POST',
      body: formData
    });
    const data = await res.json();
    console.log(data);
    
  };

  const removeLot = (id: string) => {
    dispatch(removeLotAction(id));
  };
  return (
    <div className={styles.wraper}>
      {coffee.map((item:any) => (
        <div key={item._id}>
          <div>{item.name}</div>
          <Button size="noSize" variant="text" onClick={() => removeLot(item._id)}>Удалть лот</Button>
          {/* <Button size="noSize" variant="text" onClick={() => upDateLot(item._id)}>Изменить лот</Button> */}
        </div>
      ))}
      <input type="file" onChange={onChange} name="file" />
      <button onClick={upDateLot}>Send</button>
      {/* <img src={'blob:http://localhost:3000/b8128917-94e9-4e64-9739-79695d8b9735'} alt="" /> */}
    </div>
  );
};

// import { FC, useState } from 'react';

// export const  Coffee = () => {

//   const [fileState, setFileState] = useState<any>(null);
//   const [upload, setUpload] = useState();

//   const handleChange = (event:any) => {
//     setFileState(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();

//     formData.append('file', fileState);

//     const res = await fetch('http://localhost:5566/edit', {
//       method: 'POST',
//       body: formData
//     });

//     const data = await res.json();
//     console.log(data);

//   };
//   // console.log(fileState);
//   return (
//     <div>
//       <input type="file" onChange={handleChange}/>
//       <button onClick={handleUpload}>Send</button>
//     </div>
//   );
// };

export default Coffee;