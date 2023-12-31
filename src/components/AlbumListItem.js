import { useRemoveAlbumMutation } from '../store';
import PhotosList from './PhotosList';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import { GoTrashcan } from 'react-icons/go';

function AlbumListItem({ album }) {
	const [removeAlbum, results] = useRemoveAlbumMutation();

	const handleClick = () => {
		removeAlbum(album);
	};

	const header = (
		<>
			<Button
				className="mr-2"
				onClick={handleClick}
				loading={results.isLoading}
			>
				<GoTrashcan />
			</Button>
			{album.title}
		</>
	);

	return (
		<ExpandablePanel key={album.id} header={header}>
			<PhotosList album={album} />
		</ExpandablePanel>
	);
}

export default AlbumListItem;
