import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Context } from '../Providers/AppProvider';

function PrivateRoutes() {
  const[store] = useContext(Context)

  return (
    store.trainer.token ? <Outlet/> : <Navigate to="/Login"/>
  );
}

export default PrivateRoutes;