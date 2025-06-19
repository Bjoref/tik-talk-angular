import { createFeature, createReducer, on } from '@ngrx/store';
import { Post, PostComment } from '@tt/data-access';
import { postsActions } from './actions';

export interface PostState {
	posts: Post[];
}

const initialState: PostState = {
	posts: [],
};

export const postsFeature = createFeature({
	name: 'postsFeature',
	reducer: createReducer(
		initialState,
		on(postsActions.postsLoaded, (state, payload) => {
			console.log(state)
			return {
				...state,
				posts: payload.posts,
			};
		}),
	),
});
