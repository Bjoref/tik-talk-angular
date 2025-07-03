import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UiProfileCardComponent, UiSearchFiltersComponent, UiScrollTriggerComponent } from '@tt/common-ui';
import { profileActions, selectFilteredProfiles } from '@tt/data-access';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store'

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'page-search',
	imports: [UiProfileCardComponent, UiSearchFiltersComponent, CommonModule, UiScrollTriggerComponent],
	templateUrl: './search.component.html',
	styleUrl: './search.component.scss',
})
export class SearchComponent {
	store = inject(Store);
	console = console;

	profiles = this.store.selectSignal(selectFilteredProfiles);

	timeToFetch() {
		this.store.dispatch(profileActions.setPage({}))
	}

}
