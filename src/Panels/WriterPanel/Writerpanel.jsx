import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { hideNavbarAndFooter, showNavbarAndFooter } from '../../store/slices/layoutslice';

const Writerpanel = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideNavbarAndFooter());

    return () => {
      dispatch(showNavbarAndFooter());
    };
  }, [dispatch]);
  return (
    <div>Writerpanel</div>
  )
}

export default Writerpanel