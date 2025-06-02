import { Component, inject } from '@angular/core';
import { UiChatsButtonComponent } from "../ui-chats-button/ui-chats-button.component";
import { ChatHttpService } from '../../data/services/chat-http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-chats-list',
  imports: [UiChatsButtonComponent, CommonModule],
  templateUrl: './ui-chats-list.component.html',
  styleUrl: './ui-chats-list.component.scss'
})
export class UiChatsListComponent {
  chatService = inject(ChatHttpService);

  chats$ = this.chatService.getMyChats();

}
