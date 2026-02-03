import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { debounceTime, distinctUntilChanged } from 'rxjs';

import { ClientContext } from 'lib-contracts';

import { ClientContextService } from '../../core/context/client-context/client-context.service';
import { ClientService } from '../../core/service/client.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,

    RouterLink,
    RouterLinkActive,

    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  providers: [ClientService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private readonly clientService = inject(ClientService);
  public readonly context = inject(ClientContextService);

  public clientControl = new FormControl('');
  private clientOptions: ClientContext[] = [];
  public clientFilteredOptions: ClientContext[] = [];

  formbuilder = inject(FormBuilder);

  constructor() {
    effect(() => {
      this.clientOptions = this.context.clients();
      this.clientFilteredOptions = this.clientOptions;
    });
  }

  ngOnInit(): void {
    this.loadClients();
    this.listenToClientControl();
  }

  onClientSelected(client: ClientContext): void {
    this.context.setActiveClient(client);
  }

  displayClient(client: ClientContext | null): string {
    return client ? client.name : '';
  }

  private loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (clients) => {
        this.context.setClients(clients);
      },
    });
  }

  private listenToClientControl(): void {
    this.clientControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe({
      next: (value: string | ClientContext | null) => {
        this.clientFilteredOptions = this.filterClients(value);
      },
    });
  }

  private filterClients(value: string | ClientContext | null): ClientContext[] {
    if (value instanceof Object) {
      return this.clientOptions;
    }

    if (value?.trim().length === 0) {
      return this.clientOptions;
    }
    return this.clientOptions.filter((client) =>
      client.name
        .toLowerCase()
        .trim()
        .includes(value?.toLowerCase().trim() ?? ''),
    );
  }
}
