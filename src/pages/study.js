import React from 'react';

import Navbar from '../components/navbar';
import Controls from '../components/controls';
import DeckModal from '../components/deck-modal';
import FlashcardSwitcher from '../components/flashcard-switcher';

class Study extends React.Component {

	render() {
		return (
			<>	
				{/* only visible if deckModalIsVisible is true */}
				<DeckModal />
				
				<Navbar />
				<div className='container-fluid d-lg-flex flex-row align-items-center justify-content-center'>
					<FlashcardSwitcher />
				</div>
				<Controls />
			</>
		)
	}
}

export default Study;