import { Component, DestroyRef, effect, inject, Signal } from '@angular/core';
import { UiSvgComponent } from '../ui-svg/ui-svg.component';
import { RouterModule } from '@angular/router';
import {
	ChatHttpService,
	ProfileHttpService,
	selectTokenInfo,
} from '@tt/data-access';
import { ImgUrlPipe } from '@tt/shared';
import { CommonModule } from '@angular/common';
import { firstValueFrom, Subscription, timer } from 'rxjs';
import { UiSubscriberCardComponent } from '../ui-subscriber-card/ui-subscriber-card.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectCount } from 'libs/data-access/src/lib/store/messageStore';
import { isErrorMessage } from 'libs/data-access/src/lib/interfaces/type-guard';

@Component({
	selector: 'ui-side-bar',
	imports: [
		UiSvgComponent,
		RouterModule,
		UiSubscriberCardComponent,
		CommonModule,
		ImgUrlPipe,
	],
	templateUrl: './ui-side-bar.component.html',
	styleUrl: './ui-side-bar.component.scss',
})
export class UiSideBarComponent {
	private destroyRef = inject(DestroyRef);
	profileService = inject(ProfileHttpService);
	store = inject(Store);
	token = this.store.selectSignal(selectTokenInfo);

	wsSubscribe!: Subscription;

	me = this.profileService.me;

	subscribers$ = this.profileService.getSubscribersShortList();

	count: Signal<number> = this.store.selectSignal(selectCount);

	private chatService = inject(ChatHttpService);

	constructor() {
		effect(() => {
			if (this.token()) {
				this.reconnectToken();
			}
		});
	}

	menuItems = [
		{
			label: 'Моя страница',
			icon: 'home',
			link: 'profile/me',
		},
		{
			label: 'Чаты',
			icon: 'chats',
			link: 'chats',
		},
		{
			label: 'Поиск',
			icon: 'search',
			link: 'search',
		},
	];

	async reconnectToken() {
		await firstValueFrom(this.profileService.getMe());
		await firstValueFrom(timer(2000));
		this.connectWS();
	}

	connectWS() {
		this.wsSubscribe?.unsubscribe();

		this.wsSubscribe = this.chatService
			.connectWS()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((mess) => {
				if (isErrorMessage(mess)) {
					this.reconnectToken();
				}
			});
	}
}
