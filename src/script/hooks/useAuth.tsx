import { useAppSelector } from './reduxHooks';

function useAuth() {
  const { isAuthorized } = useAppSelector((store) => store.auth);

  return { isAuthorized };
}

export default useAuth;
