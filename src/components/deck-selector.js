import { Button } from 'react-bootstrap';

import DeckOption from './deck-option';
import { LeftArrowIcon, RightArrowIcon } from './icons';

export default function DeckSelector() {
	

	return (
		<>
			<Button variant='dark'>
				<LeftArrowIcon />
			</Button>
			<DeckOption name='Y33t' />
			<DeckOption name='swag' />
			<DeckOption name='yay' />
			<Button variant='dark'>
				<RightArrowIcon />
			</Button>
		</>
	)
}