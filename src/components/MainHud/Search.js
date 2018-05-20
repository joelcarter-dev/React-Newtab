
import React, { Component } from 'react';
  
export class Search extends Component {
  searchable = [ 
    {
      name: "Google",
      url: "google.com//search?q="
    }, {
      name: "DuckDuckGo",
      url: "duckduckgo.com/?q=",
    }, {
      name: "Stackoverflow",
      url: "stackoverflow.com/search?q=",
    }, {
      name: "YouTube",
      url: "www.youtube.com/results?search_query=",
    }
  ];

  constructor(props) {
    super(props);
    this.state = {q: "", url: this.searchable[1].url};
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  handleChange(event) {
    this.setState({q: event.target.value});
  }

  submitSearch(event) {
    this.setState({q: event.target.value, value: ""});
    window.open("https://" + this.state.url + this.state.q);
    this.setState({q: ""})
    event.preventDefault();
  }

  selectSearch(item) {
    this.setState({url: item.url});
    console.log(this.state); 
  }

  render() {
    return (
      <div id="Search-holder">
        <div className="searchable">
            {this.searchable.map( (search, i) => {
              return <li className="searchItem" key={i} onClick={(i) => this.selectSearch(search)}>{search.name}</li>
            })}
        </div>
        <form className="search-form" onSubmit={this.submitSearch.bind(this)}>
          <div className="search-bar">
            <input autoComplete="off" type="text" name="q" value={this.state.q} placeholder="search" onChange={this.handleChange}/>
          </div>
        </form>
      </div>
    );
  }
}

export default Search