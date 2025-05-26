import { Component, inject } from '@angular/core';
import { UiProfileHeaderComponent } from '../../common-ui/ui-profile-header/ui-profile-header.component';
import { ProfileHttpService } from '../../data/services/profile-http.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { UiSvgComponent } from '../../common-ui/ui-svg/ui-svg.component';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { UiTagComponent } from '../../common-ui/ui-tag/ui-tag.component';
import { UiPostFeedComponent } from '../../common-ui/ui-post-feed/ui-post-feed.component';

@Component({
  selector: 'page-profile',
  imports: [
    UiProfileHeaderComponent, 
    CommonModule, 
    UiSvgComponent, 
    RouterModule, 
    ImgUrlPipe, 
    UiTagComponent, 
    UiPostFeedComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileService = inject(ProfileHttpService);
  route = inject(ActivatedRoute);

  me$ = toObservable(this.profileService.me);
  subscribers$ = this.profileService.getSubscribersShortList(6);

  profile$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        if(id === 'me') return this.me$;

        return this.profileService.getAccount(id)
      })
    )
}
