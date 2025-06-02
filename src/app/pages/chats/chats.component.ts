import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiChatsListComponent } from '../../common-ui/ui-chats-list/ui-chats-list.component';

@Component({
  selector: 'page-chats',
  imports: [RouterOutlet, UiChatsListComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent {

}
