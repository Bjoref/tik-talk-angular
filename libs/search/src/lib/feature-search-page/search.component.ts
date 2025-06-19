import { Component, inject } from '@angular/core';
import { UiProfileCardComponent, UiSearchFiltersComponent } from '@tt/common-ui';
import { selectFilteredProfiles } from '@tt/data-access';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store'

@Component({
	selector: 'page-search',
	imports: [UiProfileCardComponent, UiSearchFiltersComponent, CommonModule],
	templateUrl: './search.component.html',
	styleUrl: './search.component.scss',
})
export class SearchComponent {
	store = inject(Store);

	profiles = this.store.selectSignal(selectFilteredProfiles);
}
