import React from 'react';
import './SearchBox.css';
import FontAwesome from 'react-fontawesome';

class SearchBox extends React.Component {
	constructor() {

		// call super
		super();

		// bind handlers to be passed as callbacks
		this.submitHandler = this.submitHandler.bind(this);
		this.inputHandler = this.inputHandler.bind(this);

		// state
		this.state = {
			searchInput: ''
		}
	}

	// add 'enter' event listener to form when component is mounted (added to tree)
	componentDidMount() {
		// add 'enter' key listener to form
		document.getElementById('searchInputField').addEventListener('keyup', event => {

			// prevent default action
			event.preventDefault();

			// keyCode 13 === enter key
			if(event.keyCode === 13) {

				// "click" the submit button
				document.getElementById('searchInputBtn').click();
			}

		});
	}

	// handles form submission
	submitHandler = event => {

		// prevent default action
		event.preventDefault();

		// passes searchInput to parent searchHandler
		this.props.searchHandler(this.state.searchInput);
	}

	// handles searchInputField value changes
	inputHandler = event => {

		// update current searchInput state
		this.setState({ searchInput: event.target.value })
	}

	render() {
		return(
			<form onSubmit={ this.submitHandler } className="searchbox">
				<input 
					id='searchInputField'
					type="text"
					value={ this.state.searchInput }
					onChange={ this.inputHandler }
				/>
				<button id='searchInputBtn' type="submit" ><FontAwesome 
								name='fas fa-search' 
								style={{ color: '#fff' }}
							/> </button>
			</form>
		);
	}
}

export default SearchBox;