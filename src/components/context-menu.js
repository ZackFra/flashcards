import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import './context-menu.css';

let menuId = null;

export function MenuOption(props) {
	return (
		<button className='context-menu-item' onClick={props.onClick}>
			{props.children}
		</button>
	)
}

export function Menu(props) {

	return (
		<div className='context-menu-popup' style={{left: props.x, top: props.y}}>
			{props.options}
		</div>
	)
}

export function ContextMenu(props) {
	const [x, setX] = useState(null);
	const [y, setY] = useState(null);
	const [currX, setCurrX] = useState(null);
	const [currY, setCurrY] = useState(null);
	const [isVisible, setIsVisible] = useState(false);
	const [id] = useState(props.id || uuid());
	const menu = props.children[0];
	const body = props.children[1];

	// track the x and y location of the mouse
	useEffect(() => {

		const moveListener = (e) => {
			setX(e.x);
			setY(e.y);
		}

		const clickListener = (e) => {
			menuId = null;
			setIsVisible(false);
		}

		const ctxListener = (e) => {
			if(menuId !== id) {
				setIsVisible(false);
			}
		}

		document.addEventListener('click', clickListener);
		document.addEventListener('contextmenu', ctxListener);
		document.addEventListener('mousemove', moveListener);
		return () => {
			document.removeEventListener('mousemove', moveListener);
			document.removeEventListener('click', clickListener);
			document.removeEventListener('contextmenu', ctxListener);
		}
	}, [id])
	
	// prevent default ctx menu, set the position of the menu to spawn, spawn it
	const onContextMenu = (e) => {
		e.preventDefault(); 
		setCurrX(x);
		setCurrY(y);
		if(menuId !== id) {
			menuId = id;
			setIsVisible(true);
		}
	}


	return (
		<div onContextMenu={onContextMenu} className='context-menu' id={id} {...props}>
			{isVisible ? <Menu x={currX} y={currY} options={menu} /> : null}
			{body}
		</div>
	)
}