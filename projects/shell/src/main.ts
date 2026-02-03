import { initFederation } from '@angular-architects/native-federation';

initFederation({
  'mfe-products': 'http://localhost:4201/remoteEntry.json',
  'mfe-cart': 'http://localhost:4202/remoteEntry.json',
})
  .then(() => import('./bootstrap'))
  .catch((err) => console.error(err));
