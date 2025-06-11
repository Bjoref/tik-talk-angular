import { Component, inject } from '@angular/core';
import { ProfileHttpService } from '@tt/shared';
import { UiProfileCardComponent, UiSearchFiltersComponent } from '@tt/common-ui';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'page-search',
	imports: [UiProfileCardComponent, UiSearchFiltersComponent, CommonModule],
	templateUrl: './search.component.html',
	styleUrl: './search.component.scss',
})
export class SearchComponent {
	profileService = inject(ProfileHttpService);
	profiles = this.profileService.filteredProfiles;
}
