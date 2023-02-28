// server
import Express from 'express';
import cors from 'cors';
import passport from 'passport';

import { jwtStrategy } from './config/passport';
import productRouter from './routes/products';
import orderRouter from './routes/order';
import userRouter from './routes/user';
import wishlistRouter from './routes/wishlist'

const app = Express();
app.use(Express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(jwtStrategy)

// routes
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/user', userRouter);
app.use('/wishlist', wishlistRouter)

export default app;
