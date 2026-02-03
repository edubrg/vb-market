import { Injectable, signal, computed, Signal } from '@angular/core';

import { ClientContext } from 'lib-contracts';

@Injectable({ providedIn: 'root' })
export class ClientContextService {
  private readonly _clients = signal<ClientContext[]>([]);
  private readonly _activeClient = signal<ClientContext | null>(null);

  readonly clients: Signal<ClientContext[]> = this._clients.asReadonly();
  readonly activeClient: Signal<ClientContext | null> = this._activeClient.asReadonly();
  readonly activeClientId: Signal<string | null> = computed(() => this._activeClient()?.id ?? null);

  setClients(clients: ClientContext[]): void {
    this._clients.set(clients);
  }

  setActiveClient(client: ClientContext): void {
    this._activeClient.set(client);
  }
}
