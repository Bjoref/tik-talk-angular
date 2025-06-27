import { createFeature, createReducer, on } from '@ngrx/store';
import { tokenActions } from './actions';

export interface tokenState {
	token: string | null;
}

const initialState: tokenState = {
	token: null,
};

export const tokenFeature = createFeature({
	name: 'tokenFeature',
	reducer: createReducer(
		initialState,
		on(tokenActions.refreshToken, (state, payload) => {
			return {
				...state,
				count: payload.token,
			};
		}),
	),
});
