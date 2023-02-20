import { Request, Response } from 'express';

import Order from '../models/Order';
import OrderServices from '../services/Order';

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const newOrder = new Order({
      uerId: req.params.userId,
      // productOrder: req.body,
    });
    const order = await OrderServices.createOrder(newOrder);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json('server error');
  }
};

export const getOrderListController = async (req: Request, res: Response) => {
  try {
    const orderList = await OrderServices.getOrders();
    res.status(200).json(orderList);
  } catch (err) {
    res.status(404).json('orders not found');
  }
};

export const getOrderListByUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId;
    const orderList = await OrderServices.getOrderListByUserId( userId );
    res.status(200).json(orderList);
  } catch (err) {
    res.status(404).json('Orders not found');
  }
};

export const updateOrderByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const orderId = req.params.id;
    const update = req.body;
    const updateOrder = await OrderServices.updateOrderByUserId(
      orderId,
      update
    );
    res.status(200).json(updateOrder);
  } catch (err) {
    res.status(500).json('Server error');
  }
};

export const deleteOrderByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const OrderId = req.params.id;
    const deleteOrder = await OrderServices.deleteOrderById(OrderId);
    res.status(200).json(deleteOrder);
  } catch (err) {
    res.status(404).json('Order not found');
  }
};
