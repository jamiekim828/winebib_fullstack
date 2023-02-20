// server
import Express from 'express';
import cors from 'cors';

import productRouter from './routes/products';
import orderRouter from './routes/order';
import userRouter from './routes/user';

const app = Express();
app.use(Express.json());
app.use(cors());

// routes
app.use('/product', productRouter);
app.use('order', orderRouter);
app.use('/user', userRouter);

export default app;
