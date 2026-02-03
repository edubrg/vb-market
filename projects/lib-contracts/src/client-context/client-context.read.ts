import { Signal } from '@angular/core';

import { ClientContext } from './client-context.model';

export interface ClientContextRead {
  readonly activeClient: Signal<ClientContext | null>;
  readonly activeClientId: Signal<string | null>;
}
