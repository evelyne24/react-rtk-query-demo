import { GoTrashcan } from 'react-icons/go';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';
import { useRemoveUserMutation } from '../store';

function UsersListItem({ user }) {
	const [removeUser, results] = useRemoveUserMutation();

	const handleClick = () => {
		removeUser(user);
	};

	// <> is a React fragment
	const header = (
		<>
			<Button className="mr-3" loading={results.isLoading} onClick={handleClick}>
				<GoTrashcan />
			</Button>
			{results.error && <div>Error deleting user.</div>}
			{user.name}
		</>
	);

	return (
		<ExpandablePanel header={header}>
			<AlbumsList user={user} />
		</ExpandablePanel>
	);
}

export default UsersListItem;
