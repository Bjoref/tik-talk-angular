import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { profileActions, ProfileHttpService, selectFilters } from '@tt/data-access';
import { debounceTime, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store'

@Component({
	selector: 'ui-search-filters',
	imports: [ReactiveFormsModule],
	templateUrl: './ui-search-filters.component.html',
	styleUrl: './ui-search-filters.component.scss',
})
export class UiSearchFiltersComponent {
	profileService = inject(ProfileHttpService);
	fb = inject(FormBuilder);

	store = inject(Store);

	filters = this.store.selectSignal(selectFilters);


	searchForm = this.fb.group({
		firstName: [''],
		lastName: [''],
		stack: [''],
	});

	constructor() {
		this.searchForm.valueChanges
			.pipe(
				startWith({}),
				debounceTime(300),
				takeUntilDestroyed()
			)
			.subscribe(formValue => {
				this.store.dispatch(profileActions.filterEvents({filters: formValue}))
			});
	}

	ngAfterViewInit() {
		if(this.filters()) {
			this.searchForm.patchValue(this.filters())
		}
	}
}
