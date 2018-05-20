import React, { Component } from 'react';

export class ListDummy extends Component {  
  render() {
    return (
     <div className="dummy-holder">
        <form onSubmit={this.props.addItem}>
          <input
            autoFocus
            type="text" 
            placeholder="Folder Name" 
            value={this.props.inputValue} 
            onChange={this.props.handleChange}
            onBlur={this.props.cancelDummy}
          />
        </form>
      </div>
    );
  }
}


export default ListDummy