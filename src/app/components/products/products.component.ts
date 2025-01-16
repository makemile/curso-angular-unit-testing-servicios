import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/product.service';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  product: Product[] = [];
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productService.getAllSimple().subscribe((products) => {
      this.product = products
    });
  }
}
