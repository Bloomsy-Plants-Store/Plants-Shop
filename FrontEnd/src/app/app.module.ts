import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleProductsComponent } from './Components/Pages/Home/sample-products/sample-products.component';
import { HomePageComponent } from './Components/Pages/Home/home-page/home-page.component';
import { ReviewComponent } from './Components/Pages/Home/review/review.component';
import { FooterComponent } from './Components/Pages/Home/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    SampleProductsComponent,
    HomePageComponent,
    ReviewComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
