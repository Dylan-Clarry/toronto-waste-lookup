import React from 'react';
import Item from '../Item/Item';
import './ItemList.css';

class ItemList extends React.Component {

	// checks if item is favourited
	isFavourited = (ie) => {
		for(let c = 0; c < this.props.favouriteList.length; c++) {
			if(this.props.favouriteList[c].title === ie.title) {
				return true;
			}
		}
		return false;
	}
	
	render() {
		// destructure items and onClick
		const { items, onClick } = this.props;
		return(
			<div className="item-list">
				{
					// create each item in itemList
					items.map((item, i) => {
						return(
							<Item 
								key={ i }
								item={ item }
								favourited={ this.isFavourited(item) }
								onClick={ onClick }
							/>
						)
					})
				}
			</div>
		);
	}
}

export default ItemList;
