import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ChatHttpService, ProfileHttpService } from '@tt/data-access';
import { UiAvatarComponent, UiTagComponent, UiSvgComponent, UiProfileHeaderComponent, UiPostFeedComponent } from '@tt/common-ui';
import { firstValueFrom, switchMap } from 'rxjs';

@Component({
	selector: 'page-profile',
	imports: [
		UiProfileHeaderComponent,
		CommonModule,
		UiSvgComponent,
		RouterModule,
		UiTagComponent,
		UiPostFeedComponent,
		UiAvatarComponent,
	],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
})
export class ProfileComponent {
	profileService = inject(ProfileHttpService);
	chatService = inject(ChatHttpService);
	route = inject(ActivatedRoute);
	router = inject(Router);

	me$ = toObservable(this.profileService.me);
	subscribers$ = this.profileService.getSubscribersShortList(6);

	profile$ = this.route.params.pipe(
		switchMap(({ id }) => {
			this.isMyPage.set(
				id === 'me' || id === this.profileService.me()?.id
			);
			if (id === 'me') return this.me$;

			return this.profileService.getAccount(id);
		})
	);

	isMyPage = signal<boolean>(false);

	async sendMessage(profileId: number) {
		firstValueFrom(this.chatService.createChat(profileId)).then((res) => {
			this.router.navigate(['/chats', res.id]);
		});
	}
}
