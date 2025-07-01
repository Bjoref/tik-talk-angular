import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Profile } from '@tt/data-access';
import { CommonModule } from '@angular/common';
import { UiAvatarComponent } from '@tt/common-ui';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'ui-chats-workspace-header',
	imports: [CommonModule, UiAvatarComponent],
	templateUrl: './ui-chats-workspace-header.component.html',
	styleUrl: './ui-chats-workspace-header.component.scss',
})
export class UiChatsWorkspaceHeaderComponent {
	profile = input<Profile>();
}
