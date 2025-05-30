import {
	Component,
	ElementRef,
	HostListener,
	inject,
	Renderer2,
	Signal,
} from '@angular/core';
import { UiPostInputComponent } from '../ui-post-input/ui-post-input.component';
import { UiPostComponent } from '../ui-post/ui-post.component';
import { PostHttpService } from '../../data/services/post-http.service';
import { EmitPostData, Post } from '../../data/interfaces/post.interface';
import { debounceTime, firstValueFrom, Subject, takeUntil } from 'rxjs';
import { PostService } from '../../data/services/post.service';
import { Profile } from '../../data/interfaces/profile.interface';

@Component({
	selector: 'ui-post-feed',
	imports: [UiPostInputComponent, UiPostComponent],
	templateUrl: './ui-post-feed.component.html',
	styleUrl: './ui-post-feed.component.scss',
})
export class UiPostFeedComponent {
	private destroy$ = new Subject<void>();

	postHttpService = inject(PostHttpService);
	postService = inject(PostService);
	r2 = inject(Renderer2);
	hostElement = inject(ElementRef);

	private resizeSubject = new Subject<Event>();

	posts: Signal<Post[]> = this.postHttpService.posts;

	constructor() {
		firstValueFrom(this.postHttpService.fetchPost());
	}

	ngAfterViewInit() {
		this.postService.updateHeight(this.hostElement, this.r2);

		this.resizeSubject
			.pipe(debounceTime(100), takeUntil(this.destroy$))
			.subscribe(() => {
				this.postService.updateHeight(this.hostElement, this.r2);
			});
	}

	onCreated(data: EmitPostData) {
		this.postService
			.onCreatePost(data.postText, data.isCommentInput, data.profile, data.postId)
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
