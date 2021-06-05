import { 
	AiOutlineLeft, 
	AiOutlineRight, 
	AiOutlineLeftCircle, 
	AiOutlineRightCircle,
	AiFillPlusCircle
} from 'react-icons/ai';
import './icons.css';

export function FlashcardIcon(props) {
	return <img src="/assets/images/flashcards.jpg" className='flashcard-icon' alt='flashcard' {...props} />
}

export function LeftArrowIcon() {
	return <AiOutlineLeft className='arrow-icon' />
}

export function RightArrowIcon() {
	return <AiOutlineRight className='arrow-icon' />
}

export function RightArrowCircleIcon() {
	return <AiOutlineRightCircle className='arrow-circle-icon' />
}

export function LeftArrowCircleIcon() {
	return <AiOutlineLeftCircle className='arrow-circle-icon' />
}

export function PlusInCircleIcon() {
	return <AiFillPlusCircle className='plus-in-circle-icon' />
}