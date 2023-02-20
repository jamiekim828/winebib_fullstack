import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../redux/store';
import { getAllWines } from '../../redux/thunks/wine';

export default function WineList() {
  const wineList = useSelector((state: RootState) => state.wine.wine);
  console.log(wineList);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllWines());
  }, [dispatch]);

  return <div>WineList</div>;
}
