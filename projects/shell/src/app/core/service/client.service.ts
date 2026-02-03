import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ClientContext } from 'lib-contracts';

import { CLIENTS_MOCK } from '../context/client-context/client-context.mock';

@Injectable()
export class ClientService {
  getClients(): Observable<ClientContext[]> {
    return of(CLIENTS_MOCK).pipe(delay(500));
  }
}
