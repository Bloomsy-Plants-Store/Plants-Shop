import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Components/Pages/Home/home-page/home-page.component';
import { AboutComponent } from './Components/Pages/Home/about/about.component';
import { NavbarComponent } from './Components/Pages/Home/navbar/navbar.component';
import { HeaderComponent } from './Components/Pages/Home/header/header.component';
// import { SampleProductsComponent } from './Components/Pages/Home/sample-products/sample-products.component';
import { ReviewComponent } from './Components/Pages/Home/review/review.component';
import { FooterComponent } from './Components/Pages/Home/footer/footer.component';
import { SupportComponent } from './Components/Pages/Home/support/support.component';

@NgModule({
  declarations: [
    AppComponent,
    // SampleProductsComponent,
    HomePageComponent,
    HeaderComponent,
    ReviewComponent,
    NavbarComponent,
    FooterComponent,
    SupportComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
