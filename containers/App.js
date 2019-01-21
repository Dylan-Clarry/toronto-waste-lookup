import React, { Component } from 'react';
import SearchBox from '../components/SearchBox/SearchBox';
import ItemList from '../components/ItemList/ItemList';
import './App.css';

class App extends Component {
	constructor() {
		super();

		// bind onSearchClick
		this.onSearchClick = this.onSearchClick.bind(this);

		// state
		this.state = {
			itemList: [],
			favouriteList: [],
			searchField: '', 
		}
	}

	// fetch data when App is mounted (added to tree)
	componentDidMount() {

		// populate itemList when promise is resolved
		fetch('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
		   .then( response => response.json() )
		   .then( items => this.setState({ itemList: items }) );
	}

	// sets searchField on search form submit
	onSearchClick = val => {
		this.setState({ searchField: val });
	}

	// toggles item on favourites list
	toggleFavourite = item => {
		let found = false;
		let newList = this.state.favouriteList;
		let c = 0;

		// loop while the item is not found in the favourites list
		while(!found && c < newList.length) {

			// if item is found, remove it from the favourites list
			if(this.state.favouriteList[c].title === item.title) {
				found = true;
				newList.splice(c, 1);
			}
			c++;
		}

		// if item was never found in favourites list, add it to the favourites list
		if(!found) {
			newList.push(item);
		}

		// set newList as new favourites list state
		this.setState(newList);
	}

  	render() {
  		// destructure itemList and searchField
		const { itemList, favouriteList, searchField } = this.state;
		let filteredItems = [];
		
		// only populate filteredItems list if searchfield is not empty
		if(searchField.length) {

			// find items that contain the matching keyword
			filteredItems = itemList.filter(item => {
				return item.keywords.toLowerCase().includes(searchField.toLowerCase());
			});
		}

		// show loading screen if data is not finished loading
		if(!itemList.length) {
			return (<h1 className='center'>Loading...</h1>);

		// does not show favourites list if there is 1 or 0 items in it
		} else if(favouriteList.length <= 1) {
			return (
				<div className="App">
		        	<h1 className='banner center'>Toronto Waste Lookup</h1>

					<div className="container">
						<SearchBox searchHandler={ this.onSearchClick } />

						<ItemList 
							items={ filteredItems } 
							favouriteList={ favouriteList }
							onClick={ this.toggleFavourite }
						/>
					</div>
		      	</div>// /App
			);
			
		// otherwise return app with favourites list
		} else {
			return(
				<div className="App">
		        	<h1 className='banner center'>Toronto Waste Lookup</h1>

					<div className="container">
						<SearchBox className='search-box' searchHandler={ this.onSearchClick } />

						<ItemList 
							items={ filteredItems } 
							favouriteList={ favouriteList }
							onClick={ this.toggleFavourite }
						/>
						<h1 className='ugh-header' >Favourites</h1>
			        	<ItemList 
							items={ favouriteList } 
							favouriteList={ favouriteList }
							onClick={ this.toggleFavourite }
						/> 
					</div>
		      	</div>// /App
			)
		}
  	}
}

export default App;

// fetch('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000')
//    .then( response => response.json() )
//    .then( data => console.log(data) )

// https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000