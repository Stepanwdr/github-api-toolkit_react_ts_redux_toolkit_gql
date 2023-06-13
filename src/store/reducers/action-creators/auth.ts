import { userServices } from '../../../services/userServices';
import {  setUser } from '../authSlice';
import { AppDispatch } from '../../store';




export const getUser = () => {
  return async (dispatch: AppDispatch): Promise<any> => {
    try {
      const res = await userServices.fetchGetUser();
      dispatch(setUser(res.viewer));
    } catch (e: any) {
     console.log(e)
    }
  };
};

