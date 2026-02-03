import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { PRODUCT_LIST_MOCK } from '../mocks/product-list.mock';
import { ProductListItem } from '../model/product-list.model';

@Injectable()
export class ProductListService {
  getProductsByClient(clientId: string): Observable<ProductListItem[]> {
    return of(PRODUCT_LIST_MOCK).pipe(
      delay(300),
      map((products) => products.filter((product) => product.clientId === clientId)),
    );
  }
}
