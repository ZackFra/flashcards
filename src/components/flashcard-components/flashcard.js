import { useSelector } from 'react-redux';
import ReactCardFlip from 'react-card-flip';

import Editor from './editor';

import './flashcard.css';

const styles = {
	content: {
		backgroundColor: '#F0F0F0',
		boxShadow: '6px 8px 14px 3px rgba(0,0,0,0.86)',
		width: '60vw',
		height: '40vh'
	}
}

export default function Flashcard(props) {
	
	const { cardNumber, decks, deckNumber } = useSelector(state => state);
	const currentDeck = decks[deckNumber];
	const currentCard = currentDeck.cards[cardNumber];

	return (
		<div className='d-flex justify-content-center'>
			<ReactCardFlip isFlipped={props.isFlipped} flipDirection='vertical'>

				{/* front side */}
				<div style={styles.content} onClick={props.flip}>
					<Editor isFront text={currentCard.front} />
				</div>

				{/* back side */}
				<div style={styles.content} onClick={props.flip}>
					<Editor text={currentCard.back} />
				</div>
			</ReactCardFlip>
		</div>
	)
}