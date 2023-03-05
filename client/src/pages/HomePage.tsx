import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

import Main from '../components/main/Main';
import Recommend from '../components/main/Recommend';
import { getAllWines } from '../redux/thunks/wine';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllWines());
  }, [dispatch]);

  return (
    <div>
      <Main />
      <Recommend />
    </div>
  );
}
