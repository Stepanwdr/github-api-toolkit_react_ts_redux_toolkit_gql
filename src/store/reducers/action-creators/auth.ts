import { userServices } from '../../../services/userServices';
import { authSlice } from '../authSlice';
import { AppDispatch } from '../../store';
export const getUser = () => {
  return async (dispatch: AppDispatch): Promise<any> => {
    try {
      const res = await userServices.fetchGetUser();
      dispatch(authSlice.actions.setUser(res.viewer));
    } catch (e: any) {
      // Handle error
    }
  };
};

