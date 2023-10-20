import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { albumsApi } from './apis/albumsApi';
import { photosApi } from './apis/photosApi';
import { usersApi } from './apis/usersApi';

export const store = configureStore({
	reducer: {
		//users: usersReducer,
		// this is to avoid using hardcoded names
		[usersApi.reducerPath]: usersApi.reducer,
		[albumsApi.reducerPath]: albumsApi.reducer,
		[photosApi.reducerPath]: photosApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(usersApi.middleware)
			.concat(albumsApi.middleware)
			.concat(photosApi.middleware);
	},
});

setupListeners(store.dispatch);

// export * from './thunks/fetchUsers';
// export * from './thunks/addUser';
// export * from './thunks/removeUser';

export {
	useFetchAlbumsQuery,
	useAddAlbumMutation,
	useRemoveAlbumMutation,
} from './apis/albumsApi';

export {
	useFetchPhotosQuery,
	useAddPhotoMutation,
	useRemovePhotoMutation,
} from './apis/photosApi';

export {
	useFetchUsersQuery,
	useAddUserMutation,
	useRemoveUserMutation,
} from './apis/usersApi';
