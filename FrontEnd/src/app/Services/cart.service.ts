import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private Base_URL = "http://localhost:7400/users/"
  constructor(private readonly myClient: HttpClient) { }

  // get all products in cart
  GetAllProductsInCart(id:Number) {
    return this.myClient.get(this.Base_URL+id+"/cart")
  }

  //delete specific product from cart
  deleteProductFromCart(id:Number , cartItemId:Number) {
    return this.myClient.delete(this.Base_URL + id+"/cart/"+cartItemId);
  }

  // update specific product from cart
  // /:id/cart/:cartItemId
  updateSpecificProduct(id: Number, cartItemId: Number, quantity: Number) {
    return this.myClient.put(this.Base_URL + id + "/cart/" + cartItemId, { quantity });
  }

}
