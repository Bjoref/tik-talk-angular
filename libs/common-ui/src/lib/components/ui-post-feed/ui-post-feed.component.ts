import {
	Component,
	ElementRef,
	HostListener,
	inject,
	input,
	Renderer2,
} from '@angular/core';
import { debounceTime, Subject, take, takeUntil } from 'rxjs';
import {
	UpdateHeightService,
	PostHttpService,
	EmitPostData,
	Post,
	PostService,
	postsActions,
} from '@tt/data-access';
import { UiPostInputComponent } from '../ui-post-input/ui-post-input.component';
import { UiPostComponent } from '../ui-post/ui-post.component';
import { Store } from '@ngrx/store';

@Component({
	selector: 'ui-post-feed',
	imports: [UiPostInputComponent, UiPostComponent],
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
	store = inject(Store);
	posts = input<Post[]>();
	id = input.required<string>();

	private resizeSubject = new Subject<Event>();

	ngAfterViewInit() {
		this.updateHeightService.updateHeight(this.hostElement, this.r2, 48);

		this.resizeSubject
			.pipe(debounceTime(100), takeUntil(this.destroy$))
			.subscribe(() => {
				this.updateHeightService.updateHeight(
					this.hostElement,
					this.r2,
					48
				);
			});
	}

	onCreated(data: EmitPostData) {
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
					this.postDispatchStore();
				},
			});
	}

	postDispatchStore() {
		this.postHttpService
			.fetchPost(this.id())
			.pipe(take(1))
			.subscribe((res) => {
				this.store.dispatch(postsActions.postsLoaded({ posts: res }));
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
