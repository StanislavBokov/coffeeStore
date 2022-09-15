import { FC, useState, useRef, useEffect } from 'react';
import { H2, Input, MySelect, Text, Button } from '../../../components';
import styles from './styles.module.scss';
import { inputHelper, fermentationSelect, degreeRoastSelect, rangeInput, inputErrorMessage, selectErrorMessage } from './helper';
import { addLotAction, uploadedFilesAction } from '../../../store/admin/actions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { DataTextInput, DataRangeInput } from '../../../types';

export const AddCoffeeItem:FC = () => {
  const { images, uploaded, successReqest } = useTypedSelector((state) => state.admin);
  const filePicker = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
    
  const [dataTextInput, setDataTextInput] = useState<DataTextInput>({
    name: '',
    country: '',
    growthHeight: '',
    screen: '',
    description: '',
    aboutCoffee: ''
  });    

  const [fermentation, setSelectFermentation ] = useState('') 
  const [degreeRoast, setSelectDegreeRoast ] = useState('') 
  
  const [inputError, setInputError] = useState({ field: '', message: '' })

  const [selectError, setSelectError] = useState('')

  useEffect(() => {
    inputErrorMessage(dataTextInput, setInputError)
  }, [dataTextInput])

  useEffect(() => {
    selectErrorMessage({ fermentation, degreeRoast }, setSelectError)
  }, [fermentation, degreeRoast])

  const [file, setFile] = useState<any>([])
  const [fileUploaded, setFileUploaded] = useState(false)
  const [dataRangeInput, setDataRangeInput] = useState<DataRangeInput>({
    acidity: 1,
    density: 1,
    grade: 50,
    minPrice:100,
    maxPrice: 100
  })

  const handleChange = ({ target }:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {    
    setDataTextInput((prevState:DataTextInput) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleChangeRange = ({ target }:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDataRangeInput((prevState:DataRangeInput) => ({
      ...prevState,
      [target.name]: Number(target.value)
    }));
  }
  const handlePick = () => {
    filePicker.current!.click()
  }

  const handleChangeFile = (event:React.ChangeEvent<HTMLInputElement>) => {
    if(file.length >= 3) return
    for(let i = 0; i < event.target.files!.length; i++) {
      setFile((prevState:any) => (
        [...prevState, event.target.files![i]]
      ))
    }  
    setFileUploaded(true)
  }
  
  const addLotHandler = async () => {
    const formData = new FormData();
    for(let i = 0; i < file.length; i++) {
      formData.append(`file${i}`, file[i]);
    }
    dispatch(uploadedFilesAction({ formData }))

  }
  useEffect(() => {
    if(uploaded) {
      dispatch(addLotAction({ 
        ...dataTextInput,
        ...dataRangeInput,
        fermentation,
        degreeRoast,
        images
      }))
    }
 
  }, [uploaded])
  useEffect(() => {
    if(successReqest) {
      setFile([])
      setDataTextInput({
        name: '',
        country: '',
        growthHeight: '',
        screen: '',
        description: '',
        aboutCoffee: ''
      })
      setSelectFermentation('')
      setSelectDegreeRoast('')
      setDataRangeInput({
        acidity: 1,
        density: 1,
        grade: 50,
        minPrice:100,
        maxPrice: 100
      })
    }
  }, [successReqest])

  return (
    <div>
      <H2 className={styles.mainTitle}>Добавить лот</H2>
      <div className={styles.inputContainer}>
        <div className={styles.column1}>
          {inputHelper.map(({ name, id, placeHolder, textArea }) => (
            <Input 
              id={id} 
              name={name} 
              key={id}
              placeholder={placeHolder}
              value={dataTextInput[name as keyof DataTextInput]}
              onChange={handleChange}
              textArea={textArea}
              error={name === inputError.field}
             
            />
          ))}
          <Text color="error" className={styles.inputErrorMessage}>{inputError.message}</Text>
          <div className={styles.selectsContainer}>
            <MySelect 
              options={fermentationSelect} 
              value={fermentation} 
              setValue={setSelectFermentation} 
              placeholder='Fermentation'
              className="custom-select"
            />
            <MySelect 
              options={degreeRoastSelect} 
              value={degreeRoast} 
              setValue={setSelectDegreeRoast} 
              placeholder='Degree roast'
              className="custom-select"
            />
            <Text color="error">{selectError}</Text>
          </div>
        </div>
        <div className={styles.column2}>
          <div className={styles.btnContainer}>
            <div>
              <Button onClick={handlePick} size="sm">Выбрать файлы</Button>
              {!fileUploaded && <Text color="error" className={styles.fileErrorMessage}>Выберете и загрузите файлы</Text>}
              <ul className={styles.listContainer}>
                {file.map((el:any) => (
                  <li key={el.lastModified} className={styles.list}>{el.name}</li>
                ))}
              </ul>
            </div>
       
            <input type="file" onChange={handleChangeFile} name="file" multiple className={styles.hidden} ref={filePicker}/>
          </div>
          
          <div className={styles.rangeInputContainer}>
            {rangeInput.map(({ id, name, label, min, max }) => (
              <div key={id} className={styles.rangeInputItem}>
                <Text>{label}</Text>
                <input 
                  type="range"
                  min={min}
                  max={max} 
                  value={dataRangeInput[name as keyof DataRangeInput]}
                  onChange={handleChangeRange}
                  name={name}
                  className={styles.inputRange}
                />
                <Text>{dataRangeInput[name as keyof DataRangeInput]}</Text>
              </div>
            ))}
          </div>
        
          <Button size="sm" onClick={addLotHandler} disable={Boolean(inputError.message) || Boolean(selectError) || !fileUploaded}>Добавить Лот</Button>
          <CSSTransition
            in={successReqest}
            timeout={300}
            unmountOnExit
            classNames="inputMessage"
          >
            <Text className={styles.textMessage} color="success">Лот был успешно добавлен</Text>
          </CSSTransition>
         
        </div>
       
      </div>
    </div>
  );
};