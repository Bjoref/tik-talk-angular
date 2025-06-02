import { Component, inject } from '@angular/core';
import { UiChatsWorkspaceHeaderComponent } from "../ui-chats-workspace-header/ui-chats-workspace-header.component";
import { UiChatsWorkspaceMessagesWrapperComponent } from "../ui-chats-workspace-messages-wrapper/ui-chats-workspace-messages-wrapper.component";
import { ActivatedRoute } from '@angular/router';
import { ChatHttpService } from '../../data/services/chat-http.service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-chats-workspace',
  imports: [UiChatsWorkspaceHeaderComponent, UiChatsWorkspaceMessagesWrapperComponent, CommonModule],
  templateUrl: './ui-chats-workspace.component.html',
  styleUrl: './ui-chats-workspace.component.scss'
})
export class UiChatsWorkspaceComponent {
  route = inject(ActivatedRoute);
  chatService = inject(ChatHttpService);

  activeChat$ = this.route.params
    .pipe(
      switchMap(({id}) => this.chatService.getChatById(id))
    )

}
