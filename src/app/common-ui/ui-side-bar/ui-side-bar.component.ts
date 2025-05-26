import { Component, inject } from '@angular/core';
import { UiSvgComponent } from '../ui-svg/ui-svg.component';
import { RouterModule } from '@angular/router';
import { UiSubscriberCardComponent } from "../ui-subscriber-card/ui-subscriber-card.component";
import { ProfileHttpService } from '../../data/services/profile-http.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'ui-side-bar',
  imports: [UiSvgComponent, RouterModule, UiSubscriberCardComponent, CommonModule, ImgUrlPipe],
  templateUrl: './ui-side-bar.component.html',
  styleUrl: './ui-side-bar.component.scss'
})
export class UiSideBarComponent {
  profileService = inject(ProfileHttpService);

  me = this.profileService.me;

  subscribers$ = this.profileService.getSubscribersShortList()

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me'
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    },
  ]

  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
  }
}
