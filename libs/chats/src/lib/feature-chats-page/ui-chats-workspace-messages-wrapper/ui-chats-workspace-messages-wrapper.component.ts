import {
	ChangeDetectionStrategy,
	Component,
	effect,
	ElementRef,
	HostListener,
	inject,
	input,
	Renderer2,
} from '@angular/core';
import { UiChatsWorkspaceMessageComponent } from '../ui-chats-workspace-message';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { ChatHttpService, UpdateHeightService, Chat } from '@tt/data-access';
import { CommonModule } from '@angular/common';
import { ChatDayPipe } from '@tt/shared';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'ui-chats-workspace-messages-wrapper',
	imports: [UiChatsWorkspaceMessageComponent, CommonModule, ChatDayPipe],
	templateUrl: './ui-chats-workspace-messages-wrapper.component.html',
	styleUrl: './ui-chats-workspace-messages-wrapper.component.scss',
})
export class UiChatsWorkspaceMessagesWrapperComponent {
	private destroy$ = new Subject<void>();

	chat = input.required<Chat>();

	chatService = inject(ChatHttpService);
	updateHeightService = inject(UpdateHeightService);
	r2 = inject(Renderer2);
	hostElement = inject(ElementRef);

	messages = this.chatService.activeChatessages;
	messagesLength: number = 0;

	private resizeSubject = new Subject<Event>();

	constructor() {
		effect(() => {
			if (this.messages()) {
				setTimeout(() => this.scrollToBottom(), 0);
			}
		});
	}

	ngAfterViewInit() {
		this.updateHeightService.updateHeight(this.hostElement, this.r2, 128);

		this.resizeSubject
			.pipe(debounceTime(100), takeUntil(this.destroy$))
			.subscribe(() => {
				this.updateHeightService.updateHeight(this.hostElement, this.r2, 128);
			});
	}

	private scrollToBottom(): void {
		if (this.messagesLength === this.messages().length) {
			return;
		}
		this.messagesLength = this.messages().length;

		requestAnimationFrame(() => {
			const element = this.hostElement.nativeElement;
			element.scrollTop = element.scrollHeight;
		});
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: Event) {
		this.resizeSubject.next(event);
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
