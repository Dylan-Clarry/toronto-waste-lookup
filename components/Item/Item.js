import React from 'react';
import FontAwesome from 'react-fontawesome';
import './Item.css';

const Item = ({ item, favourited, onClick }) => {
	return(
		<div className="item">
			<h3>
				<span
					className='push-right'
					onClick={ () => onClick(item) }
					role='img'
				>
					{
						// green star if favourited, grey if not
						favourited 
							? <FontAwesome 
								name='star' 
								style={{ color: '#28955D' }}
							/> 
							: <FontAwesome 
								name='star' 
								style={{ color: '#A8A8A8' }}
							/> 
					}
				</span>
				{ item.title }
			</h3>
			<div id="item-body" dangerouslySetInnerHTML={{ __html: item.body.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;nbsp;/g, ' ') }}></div>
		</div>
	);	
}

export default Item;
