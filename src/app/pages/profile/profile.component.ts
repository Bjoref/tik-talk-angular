import { Component, inject, signal } from '@angular/core';
import { UiProfileHeaderComponent } from '../../common-ui/ui-profile-header/ui-profile-header.component';
import { ProfileHttpService } from '../../data/services/profile-http.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { firstValueFrom, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { UiSvgComponent } from '../../common-ui/ui-svg/ui-svg.component';
import { UiTagComponent } from '../../common-ui/ui-tag/ui-tag.component';
import { UiPostFeedComponent } from '../../common-ui/ui-post-feed/ui-post-feed.component';
import { UiAvatarComponent } from '../../common-ui/ui-avatar/ui-avatar.component';
import { Profile } from '../../data/interfaces/profile.interface';
import { ChatHttpService } from '../../data/services/chat-http.service';

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
      this.isMyPage.set(id === 'me' || id === this.profileService.me()?.id)
			if (id === 'me') return this.me$;

			return this.profileService.getAccount(id);
		})
	);

	isMyPage = signal<boolean>(false);

  async sendMessage(profileId: number) {
    firstValueFrom(this.chatService.createChat(profileId))
      .then((res) => {
        this.router.navigate(['/chats', res.id])
      })
  }
}
