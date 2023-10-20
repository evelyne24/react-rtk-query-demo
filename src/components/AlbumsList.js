import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import AlbumListItem from './AlbumListItem';

function AlbumsList({ user }) {
	// queries run immediately when the component is displayed on the screen (by default)
	const { data, error, isLoading } = useFetchAlbumsQuery(user);

	// mutations give you a function to run when you want to change some data
	const [addAlbum, results] = useAddAlbumMutation();

	const handleAddAlbum = () => {
		addAlbum(user);
	};

	let content;
	if (isLoading) {
		content = <Skeleton className="h-10 w-full" times={3} />;
	} else if (error) {
		content = <div>Error loading albums.</div>;
	} else {
		content = data.map((album) => {
			return <AlbumListItem key={album.id} album={album} />;
		});
	}

	return (
		<div>
			<div className="m-2 flex flex-row items-center justify-between">
				<h3 className="text-lg font-bold">Albums for {user.name}</h3>
				<Button onClick={handleAddAlbum} loading={results.isLoading}>
					+ Add Album
				</Button>
			</div>
			<div>{content}</div>
		</div>
	);
}

export default AlbumsList;
