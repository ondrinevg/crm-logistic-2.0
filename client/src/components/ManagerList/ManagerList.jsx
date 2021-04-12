import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ManagerList = () => {
  const users = useSelector(state => state.users);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(showUsersSaga());
  }, []);
}

export default ManagerList;