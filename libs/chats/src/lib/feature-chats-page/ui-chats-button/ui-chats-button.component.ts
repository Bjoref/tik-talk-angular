import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UiAvatarComponent } from '@tt/common-ui';
import { LastMessageRes } from '@tt/data-access';
import { DateConverterPipe } from '@tt/shared';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'button[chats]',
	imports: [UiAvatarComponent, DateConverterPipe],
	templateUrl: './ui-chats-button.component.html',
	styleUrl: './ui-chats-button.component.scss',
})
export class UiChatsButtonComponent {
	chat = input<LastMessageRes>();
}
