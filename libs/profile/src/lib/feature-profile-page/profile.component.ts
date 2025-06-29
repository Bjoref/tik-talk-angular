import { Component, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import {
	ChatHttpService,
	Post,
	PostHttpService,
	postsActions,
	ProfileHttpService,
	selectPosts,
} from '@tt/data-access';
import {
	UiAvatarComponent,
	UiTagComponent,
	UiSvgComponent,
	UiProfileHeaderComponent,
	UiPostFeedComponent,
} from '@tt/common-ui';
import {
	catchError,
	EMPTY,
	firstValueFrom,
	switchMap,
	take,
	tap,
	throwError,
} from 'rxjs';
import { Store } from '@ngrx/store';

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
	postHttpService = inject(PostHttpService);
	chatService = inject(ChatHttpService);
	route = inject(ActivatedRoute);
	router = inject(Router);
	id: string = '';
	store = inject(Store);
	posts: Signal<Post[]> = this.store.selectSignal(selectPosts);

	me$ = toObservable(this.profileService.me);

	profile$ = this.route.params.pipe(
		tap((profile) => {
			this.id = profile['id'];
			this.subscribers$ = this.profileService.getSubscribersShortList(
				6,
				this.id
			);
		}),
		switchMap(({ id }) => {
			this.getPosts();
			this.isMyPage.set(
				id === 'me' || id === this.profileService.me()?.id
			);
			if (id === 'me') return this.me$;

			return this.profileService.getAccount(id);
		})
	);

	subscribers$ = this.profileService.getSubscribersShortList(6, this.id);

	isMyPage = signal<boolean>(false);

	async sendMessage(profileId: number) {
		firstValueFrom(this.chatService.createChat(profileId)).then((res) => {
			this.router.navigate(['/chats', res.id]);
		});
	}

	ngOnInit() {
		this.getPosts()
	}

	getPosts() {
		this.postHttpService
			.fetchPost(this.id)
			.pipe(
				take(1),
			)
			.subscribe(
				(res) => {
					this.store.dispatch(
						postsActions.postsLoaded({ posts: res })
					);
				},
				(err) => {
					console.log(this.posts);
					if (err.status === 404) {
						this.store.dispatch(
							postsActions.postsLoaded({ posts: [] })
						);
					}
				}
			);
	}
}
