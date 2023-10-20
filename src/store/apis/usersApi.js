import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';
import { pause } from './utils';

const usersApi = createApi({
	reducerPath: 'users',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3005',
		fetchFn: async (...args) => {
			// REMOVE FOR PRODUCTION
			await pause(1000);
			return fetch(...args);
		},
	}),
	endpoints(builder) {
		return {
			addUser: builder.mutation({
				invalidatesTags: ['User'],
				query: () => {
					return {
						url: '/users',
						method: 'POST',
						body: {
							name: faker.name.fullName(),
						},
					};
				},
			}),
			removeUser: builder.mutation({
				invalidatesTags: ['User'],
				query: (user) => {
					return {
						url: `/users/${user.id}`,
						method: 'DELETE',
					};
				},
			}),
			fetchUsers: builder.query({
				providesTags: ['User'],
				query: () => {
					return {
						url: '/users',
						method: 'GET',
					};
				},
			}),
		};
	},
});

export const {
	useFetchUsersQuery,
	useAddUserMutation,
	useRemoveUserMutation,
} = usersApi;

export { usersApi };
