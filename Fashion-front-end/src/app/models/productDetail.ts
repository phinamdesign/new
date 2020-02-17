import {Product} from './product';
import {Size} from './size';
import {Color} from './color';
import {Payment} from './payment';

export interface ProductDetail {
  id?: number;
  size?: Size;
  color?: Color;
  payment?: Payment;
  product?: Product;
  quantity?: number;
  order?: any;
  // salePrice?: number;
}
