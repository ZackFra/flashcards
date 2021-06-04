import { FlashcardIcon } from './icons';
import './deck-option.css';

export default function DeckOption({name}) {
	return (
		<div className='deck-option'>
			<p className='text-center m-0'>{name}</p>
			<FlashcardIcon />
		</div>
	)
}