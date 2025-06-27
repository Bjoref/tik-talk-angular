import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiChatsListComponent } from '../ui-chats-list';
import { ChatHttpService } from '@tt/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'page-chats',
	imports: [RouterOutlet, UiChatsListComponent],
	templateUrl: './chats.component.html',
	styleUrl: './chats.component.scss',
})
export class ChatsComponent {}
