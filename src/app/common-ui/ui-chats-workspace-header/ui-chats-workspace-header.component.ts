import { Component, input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { CommonModule } from '@angular/common';
import { UiAvatarComponent } from "../ui-avatar/ui-avatar.component";

@Component({
  selector: 'ui-chats-workspace-header',
  imports: [CommonModule, UiAvatarComponent],
  templateUrl: './ui-chats-workspace-header.component.html',
  styleUrl: './ui-chats-workspace-header.component.scss'
})
export class UiChatsWorkspaceHeaderComponent {
  profile = input<Profile>()
}
