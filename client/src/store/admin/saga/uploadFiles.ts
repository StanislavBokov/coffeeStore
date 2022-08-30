import { takeLatest, put, delay } from 'typed-redux-saga';
import actionsTypes from '../actionTypes';
import axios, { AxiosResponse } from 'axios';
import { uploadFies, uploadedFalse } from '../reducer';
import { uploadedFilesAction } from '../actions';

export function* uploadedFilesWorker({ payload }: ReturnType<typeof uploadedFilesAction>) {
  try {
   
    const { data } = yield axios.post(`http://localhost:5566/uploadedFiles`, payload.formData);
    // console.log(data);
    
    yield put(uploadFies(data))
    yield delay(2000)
    yield(put(uploadedFalse()))
 
  } catch (err) {
    console.error(err);
  }
}

export default function* listener() {
  yield takeLatest(actionsTypes.UPLOADED_FILES, uploadedFilesWorker);

}
