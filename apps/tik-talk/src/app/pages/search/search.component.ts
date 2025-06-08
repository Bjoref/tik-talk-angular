import { Component, inject } from '@angular/core';
import { ProfileHttpService } from '../../data/services/profile-http.service';
import { Profile } from '../../data/interfaces/profile.interface';
import { UiProfileCardComponent } from '../../common-ui/ui-profile-card/ui-profile-card.component';
import { UiSearchFiltersComponent } from '../../common-ui/ui-search-filters/ui-search-filters.component';
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
