import { CommonModule } from '@angular/common';
import { Component, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { EmptyStateComponent } from 'vb-lib-ui';

import { CLIENT_CONTEXT_READ, ClientContextRead } from 'lib-contracts';

import { ProductListItem } from '../../model/product-list.model';
import { ProductListService } from '../../service/product-list.service';

@Component({
  selector: 'app-products-list',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,

    EmptyStateComponent,
  ],
  providers: [ProductListService],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  private readonly context = inject<ClientContextRead>(CLIENT_CONTEXT_READ);
  private readonly productListService = inject(ProductListService);

  private productsOriginal: ProductListItem[] = [];
  public productsFiltered: WritableSignal<ProductListItem[]> = signal([]);
  public loadings: Signal<boolean> = signal(false);

  public displayedColumns: string[] = ['name', 'category', 'price', 'currency', 'status'];
  public dataSource: MatTableDataSource<ProductListItem> = new MatTableDataSource<ProductListItem>(
    this.productsOriginal,
  );

  constructor() {
    effect(() => {
      const clientId = this.context.activeClientId();

      if (clientId) {
        this.loadProducts(clientId);
      }
    });
  }

  private loadProducts(clientId: string): void {
    console.log('loadProducts', clientId);

    if (clientId) {
      this.productListService.getProductsByClient(clientId).subscribe({
        next: (products: ProductListItem[]) => {
          this.productsOriginal = products;
          this.productsFiltered.set(products);
          console.log(this.productsOriginal);
          this.dataSource.data = products;
        },
        error: (error: Error) => {
          console.error(error);
        },
      });
    }
  }
}
