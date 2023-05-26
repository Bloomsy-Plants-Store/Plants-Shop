import { Component, HostListener ,   } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  nav!: HTMLElement;
  userName:any;
  errorMessage: any;
  isAdmin: boolean = false;
  total: any;

  constructor(private authService: AuthService,
    private router: Router,
    private cartService: CartService) { }

  ngOnInit() {
  this.nav = document.querySelector("nav")!;
  setInterval(() => {
    this.getTotalItemsInCart();
  }, 1000);
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.scrollY > 0) {
      this.nav.classList.add("scrolled",".navbar-brand",".nav-link",".fa-bars");
    } else {
      this.nav.classList.remove("scrolled",".navbar-brand",".nav-link",".fa-bars");
    }
  }

  getUserNameFromLocalStorage(): any {
    const token = localStorage.getItem('access_token');
    if (token != null) {
      this.userName = JSON.parse(token).UserName;
    } else {
      this.userName = null;
    }
    return this.userName;
  }

  getUserRole(): any {
    const userRole = JSON.parse(localStorage.getItem('access_token')!)?.adminRole || false;
    if (userRole === false) {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
    return this.isAdmin;
  }

  getTotalItemsInCart(): any {
    let userId = JSON.parse(localStorage.getItem('access_token')!).UserId;
    this.cartService.GetAllProductsInCart(userId).subscribe({
      next: (data: any) => {
        this.total =data.cart.length ? data.cart.length : 0;
      },error(err) {
        console.log(err);
      },

    });
  }



  logout(): void {
   const id = JSON.parse(localStorage.getItem('access_token')!).UserId;
       this.authService.logout(id).subscribe({
        next: async() => {
           await localStorage.removeItem("access_token");
           await localStorage.removeItem("x-auth-token");
           await localStorage.removeItem("remember_me_token");
          window.location.reload();
          console.log('Logout Successfully');
        },
        error: (err: any) => {
            this.errorMessage = 'LogOut Failed,Please Try Again';
        }
    })
  }

}

