import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private Base_URL = "https://bloomsy.onrender.com/user/order/";
  http: any;

  constructor(private readonly myClient : HttpClient) { }

  GetOrdersByUserID(userID: number) {
    return this.myClient.get(this.Base_URL+"get-orders/"+userID);
  }

}

