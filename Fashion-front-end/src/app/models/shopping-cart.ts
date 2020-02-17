import {CartItem} from './cart-item';

export class ShoppingCart {
  public items: CartItem[] = new Array<CartItem>();
  public id: number;
  public grossTotal = 0;
  public deliveryTotal = 0;
  public itemsTotal = 0;
  public quantityInCart: any[];

  public updateForm(src: ShoppingCart) {
    this.items = src.items;
    this.id = src.id;
    this.grossTotal = src.grossTotal;
    this.deliveryTotal = src.deliveryTotal;
    this.itemsTotal = src.itemsTotal;
    this.quantityInCart = src.quantityInCart;
  }
}
