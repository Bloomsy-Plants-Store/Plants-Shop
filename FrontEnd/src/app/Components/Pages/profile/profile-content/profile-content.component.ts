
import { Component, ElementRef, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';
import { ProductsService } from 'src/app/Services/products.service';
import { CartService } from 'src/app/Services/cart.service';
@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css']
})
export class ProfileContentComponent {
  Orders: any;
  ordersNumber: any
  ordersProducts: any
  customOrders: any[] = []
  clickedOrderProducts: any[] = []
  clickedOrder: { [key: string]: any } = {}
  currentPage = 1; // Current page number
  itemsPerPage = 12; // Number of items to display per page
  totalItems = 0;
  selectedOrder: any;
  constructor(private elementRef: ElementRef, public orderService: OrderService,public productService: ProductsService, public myCartService: CartService) { }

  ngOnInit(): void {
    let accessToken = localStorage.getItem('access_token');
    let userId: any | null = null;
    let custom: { [key: string]: any } = {};
    if (accessToken) {
      userId = "6468d60f2ca3ca5964e4a8f7";
    }
    this.orderService.GetOrdersByUserID(userId).subscribe({
      next: (response: any) => {
        this.Orders = response.orders;
        this.ordersNumber = this.Orders.length
        this.totalItems = this.Orders.length;
        this.Orders.forEach((element: Order) => {
          let products = element.products
          products.forEach(product=>{
            this.productService.GetProductByID(product.product_id).subscribe({
              next: (response: any) => {
                custom['total_price'] = element.total_price
                custom['_id'] = element._id
                custom['items'] = element.products.length
                custom['imageUrl'] = response.data.imageUrl
                this.customOrders.push(custom)
                console.log(this.customOrders);
                custom = {}
              },
              error: (err) => {
                console.log(err);
              }
            })
          })
        });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  getUpperBound(): number {
    const upperBound = (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage;
    return Math.min(upperBound, this.totalItems);
  }

  


  changeTabContent(order: any) {
    this.clickedOrderProducts = []
   this.clickedOrder =  (this.Orders).find((orderr: Order) =>{return orderr._id == order._id });
   console.log(this.clickedOrder);
   
   let custom: { [key: string]: any } = {};
   (this.clickedOrder['products']).forEach((product: any) => {
    this.productService.GetProductByID(product.product_id).subscribe({
        next: (response: any) => {
          custom = response.data
          custom['quantity'] = product.quantity
          console.log(custom)
          this.clickedOrderProducts.push(custom)
          custom = {}
        },
        error: (err) => {
          console.log(err);
        }
    })
   
  })
    this.selectedOrder = order;
    const ordersTab = document.getElementById('ex-with-icons-tabs-1');
    const tab = document.getElementById('ex-with-icons-tabs-4');
    if (ordersTab) {
      ordersTab.classList.remove('show', 'active');
      tab?.classList.add('show', 'active')
    }
  }
  returnTabContent() {
    const ordersTab = document.getElementById('ex-with-icons-tabs-1');
    const tab = document.getElementById('ex-with-icons-tabs-4');
    if (ordersTab) {
      ordersTab.classList.add('show', 'active');
      tab?.classList.remove("show", "active")
    }
  }
  handleFavorite() {
    const tab = document.getElementById('ex-with-icons-tabs-4');
    tab?.classList.remove("show", "active")
  }
}

interface Order {
  products: any[];
  total_price: number;
  _id: any;
  // Other properties of the product
}