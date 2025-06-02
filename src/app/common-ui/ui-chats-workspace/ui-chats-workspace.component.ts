import { Component } from '@angular/core';
import { UiChatsWorkspaceHeaderComponent } from "../ui-chats-workspace-header/ui-chats-workspace-header.component";
import { UiChatsWorkspaceMessagesWrapperComponent } from "../ui-chats-workspace-messages-wrapper/ui-chats-workspace-messages-wrapper.component";
import { UiPostInputComponent } from "../ui-post-input/ui-post-input.component";

@Component({
  selector: 'ui-chats-workspace',
  imports: [UiChatsWorkspaceHeaderComponent, UiChatsWorkspaceMessagesWrapperComponent, UiPostInputComponent],
  templateUrl: './ui-chats-workspace.component.html',
  styleUrl: './ui-chats-workspace.component.scss'
})
export class UiChatsWorkspaceComponent {

}
