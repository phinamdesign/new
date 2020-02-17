import {Category} from './category';
import {Supplier} from './supplier';
import {Picture} from './Picture';

export class Product {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
  quantity?: number;
  category?: any;
  supplier?: any;
  pictures?: Picture[];
  date?: string;
}
