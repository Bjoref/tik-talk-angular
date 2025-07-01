import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { UiAvatarComponent } from '@tt/common-ui';
import { CommonModule } from '@angular/common';
import { DateConverterPipe } from '@tt/shared';
import { Message } from '@tt/data-access';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'ui-chats-workspace-message',
	imports: [UiAvatarComponent, CommonModule, DateConverterPipe],
	templateUrl: './ui-chats-workspace-message.component.html',
	styleUrl: './ui-chats-workspace-message.component.scss',
})
export class UiChatsWorkspaceMessageComponent {
	message = input.required<Message>();

	@HostBinding('class.is-mine')
	get isMine() {
		return this.message().isMine;
	}
}
