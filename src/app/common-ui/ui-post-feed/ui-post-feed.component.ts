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
import { Post } from '../../data/interfaces/post.interface';
import { firstValueFrom } from 'rxjs';

@Component({
	selector: 'ui-post-feed',
	imports: [UiPostInputComponent, UiPostComponent],
	templateUrl: './ui-post-feed.component.html',
	styleUrl: './ui-post-feed.component.scss',
})
export class UiPostFeedComponent {
	postService = inject(PostHttpService);
	r2 = inject(Renderer2);
	hostElement = inject(ElementRef);

	posts: Signal<Post[]> = this.postService.posts;

	@HostListener('window:resize')
	OnWindowResize() {
    this.resizeFeed();
  }

	constructor() {
		firstValueFrom(this.postService.fetchPost());
	}

	ngAfterViewInit() {
    this.resizeFeed();
	}

	resizeFeed() {
		const { top } = this.hostElement.nativeElement.getBoundingClientRect();

		const height = window.innerHeight - top - 24 - 24;

		this.r2.setStyle(
			this.hostElement.nativeElement,
			'height',
			height + 'px'
		);
	}
}
