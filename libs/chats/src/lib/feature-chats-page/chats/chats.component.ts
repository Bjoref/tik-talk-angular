import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiChatsListComponent } from '../ui-chats-list';

@Component({
	selector: 'page-chats',
	imports: [RouterOutlet, UiChatsListComponent],
	templateUrl: './chats.component.html',
	styleUrl: './chats.component.scss',
})
export class ChatsComponent {}
