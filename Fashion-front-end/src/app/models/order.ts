import {User} from './User';
import {ProductDetail} from './productDetail';
import {Payment} from './payment';

export interface Order {
  id: number;
  user?: User;
  productDetails?: ProductDetail[];
  phone?: string;
  payment?: Payment;
  deliveryAddress?: string;
  total?: number;
  date?: Date;
  status?: string;
}
