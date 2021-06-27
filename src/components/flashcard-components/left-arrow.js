import { LeftArrowCircleIcon } from 'components/icons/icons';

export default function LeftArrowButton(props) {
	return (
		<button onClick={props.onClick} className='flashcard-switcher-arrow-button'>
			<LeftArrowCircleIcon />
		</button>
	);
}