import {
	Component,
	ElementRef,
	HostListener,
	inject,
	Renderer2,
	Signal,
} from '@angular/core';
import { debounceTime, firstValueFrom, Subject, takeUntil } from 'rxjs';
import { UpdateHeightService, PostHttpService, EmitPostData, Post, PostService } from '@tt/shared';
import { UiPostInputComponent } from '../ui-post-input/ui-post-input.component';
import { UiPostComponent } from '../ui-post/ui-post.component';

@Component({
	selector: 'ui-post-feed',
	imports: [UiPostInputComponent, UiPostComponent	],
	templateUrl: './ui-post-feed.component.html',
	styleUrl: './ui-post-feed.component.scss',
})
export class UiPostFeedComponent {
	private destroy$ = new Subject<void>();

	postHttpService = inject(PostHttpService);
	updateHeightService = inject(UpdateHeightService);
	postService = inject(PostService);
	r2 = inject(Renderer2);
	hostElement = inject(ElementRef);

	private resizeSubject = new Subject<Event>();

	posts: Signal<Post[]> = this.postHttpService.posts;

	constructor() {
		firstValueFrom(this.postHttpService.fetchPost());
	}

	ngAfterViewInit() {
		this.updateHeightService.updateHeight(this.hostElement, this.r2, 48);

		this.resizeSubject
			.pipe(debounceTime(100), takeUntil(this.destroy$))
			.subscribe(() => {
				this.updateHeightService.updateHeight(this.hostElement, this.r2, 48);
			});
	}

	onCreated(data: EmitPostData) {
		console.log('sdfsfsfsdfsdfsf1232')
		this.postService
			.onCreatePost(
				data.postText,
				data.isCommentInput,
				data.profile,
				data.postId
			)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (response) => {},
				error: (err) => {
					console.error('Ошибка:', err);
				},
				complete: () => {
					console.log('complete');
				},
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
