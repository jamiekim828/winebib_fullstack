import Order, { OrderDocument } from '../models/Order';

const createOrder = async (order: OrderDocument): Promise<OrderDocument> => {
  return order.save();
};

const updateOrderByUserId = async (
  userId: string,
  update: Partial<OrderDocument>
): Promise<OrderDocument | null> => {
  return Order.findByIdAndUpdate(userId, update, { new: true });
};

const deleteOrderById = async (id: string): Promise<OrderDocument | null> => {
  return Order.findByIdAndDelete(id);
};

const getOrders = async (): Promise<OrderDocument[]> => {
  return Order.find();
};

const getOrderListByUserId = async (
  userIdFromRequest: string
): Promise<OrderDocument[] | null> => {
  return Order.find({ userId: userIdFromRequest });
};

export default {
  createOrder,
  updateOrderByUserId,
  deleteOrderById,
  getOrderListByUserId,
  getOrders,
};
