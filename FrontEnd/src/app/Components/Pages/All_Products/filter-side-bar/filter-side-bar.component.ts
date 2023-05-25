import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from 'src/app/Services/products.service';
@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.css'],
})

export class FilterSideBarComponent implements OnInit {
  categories:any
  minValue: number = 50;
  maxValue: number = 1500;
  selectedOption: string | undefined;
  sortOptions: string[] = ['Default sorting','Sort by average rating', 'Sort by price: low to high', 'Sort by price: high to low'];
  @Output() myEvent = new EventEmitter();
  constructor(private spinner: NgxSpinnerService, public myService: ProductsService) {}
  ngOnInit(): void {
    this.spinner.show();
    this.myService.getEachCatgory().subscribe({
      next: (response: any) => {
        this.categories = response.data;
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
      },
    });
  }
  options: Options = {
    floor: this.minValue,  //the minimum value of the slider
    ceil: this.maxValue, //the maximum value of the slider
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          this.minValue=value;
          return "<b>Min price:</b> $" + value;
        case LabelType.High:
          this.maxValue=value;
          return "<b>Max price:</b> $" + value;
        default:
          return "$" + value;
      }

    }
  };
  @ViewChild('sidenav', { static: true })
  sidenav!: MatSidenav;

  openSidenav() {
    this.spinner.show();
    this.sidenav.open();
    this.spinner.hide();
  }

  closeSidenav() {
    this.spinner.show();
    this.sidenav.close();
    this.spinner.hide();
  }

  HandleEvent() {
    const price_range={
      min:this.minValue,
      max:this.maxValue
    }
    this.myEvent.emit(price_range);
  }

  onOptionSelected(option: string) {
    this.spinner.show();
    // Perform sorting logic or other actions based on the selected option
    console.log('Selected Option:', this.selectedOption);
    this.spinner.hide();
  }
  // categories = [
  //   {
  //     id:"0",
  //     name: "Low Maintenance",
  //     img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-11.jpg",
  //     count:3
  //   },
  //   {
  //     id:"1",
  //     name: "Indoor Plants",
  //     img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-10.jpg",
  //     count:3
  //   },
  //   {
  //     id:"2",
  //     name: "Ceramic Pots",
  //     img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-8.jpg",
  //     count:3
  //   },
  //   {
  //     id:"3",
  //     name: "Air Purifying",
  //     img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-7.jpg",
  //     count:3
  //   },
  //   {
  //     id:"4",
  //     name: "Plant Bundle",
  //     img_src: "https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/categories-12.jpg",
  //     count:3
  //   }
  // ]
}
