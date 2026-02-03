import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/products-list/product-list.routes').then((m) => m.routes),
  },
];
