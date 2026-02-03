import { Routes } from '@angular/router';

import { loadRemoteModule } from '@angular-architects/native-federation';

import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },

      {
        path: 'products',
        loadChildren: () => loadRemoteModule('mfe-products', './Routes').then((m) => m.routes),
      },
      {
        path: 'cart',
        loadChildren: () => loadRemoteModule('mfe-cart', './Routes').then((m) => m.routes),
      },
    ],
  },
];
