import { Component } from '@angular/core';
import { UiPostInputComponent } from '../ui-post-input/ui-post-input.component';
import { UiPostComponent } from '../ui-post/ui-post.component';

@Component({
  selector: 'ui-post-feed',
  imports: [UiPostInputComponent, UiPostComponent],
  templateUrl: './ui-post-feed.component.html',
  styleUrl: './ui-post-feed.component.scss'
})
export class UiPostFeedComponent {

}
