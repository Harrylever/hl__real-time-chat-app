import { useAppDispatch } from './hooks';
import { setToken } from '../slices/authSlice';

const useLogOutUser = () => {
  const dispatch = useAppDispatch();

  const clearLocalToken = () => {
    console.warn('Auth clear from storage...');
    window.localStorage.removeItem('auth');
    window.localStorage.removeItem('user');
  };

  const clearAuthReduceToken = () => {
    console.warn('Auth clear from Reducer...');
    dispatch(
      setToken({
        email: '',
        access: '',
        _id: '',
        refresh: '',
      })
    );
  };

  const main = () => {
    clearLocalToken();
    clearAuthReduceToken();
    window.location.assign('/login');
  };
  return main;
};

export default useLogOutUser;
