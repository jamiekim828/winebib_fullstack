import React from 'react';

import './WineDetail.css';
import { Wine } from '../../types/type';

type Prop = {
  wine: Wine;
};

export default function WineDetail({ wine }: Prop) {
  return (
    <div className='wine-detail'>
      <div>
        <p className='wine-name'>{wine.name}</p>
        <div className='wine-img-div'>
        <img src={`${wine.image}`} alt={`${wine.name}`} className='wine-img' />
        </div>
        <p>{wine.region}, {wine.country}</p>
      </div>
      <div className='wine-price'>
        <p>${wine.price}</p>
      </div>
    </div>
  );
}
