import axios from 'axios';

import { AppDispatch } from '../store';
import { cartActions } from '../slices/cart';

const url = 'http://localhost:8000/order';