import React,{ Component } from 'react';
import Logo from "../images/aa.png"
class SearchBar extends Component{
    constructor(props)
    {
        super(props);

        this.state = { term:''};
    }

    render() {
         
        return (
            <div className="search-bar"> 
            <img src={Logo} alt="logo" style={{width:'114px'}}/>
           
        <input 
            value = {this.state.term}
            onChange = { event => this.onInputChange(event.target.value)} 
            placeholder="Search"/>

        </div>
    );
    }

    onInputChange = (term) => {

        this.setState({
            term,
        });

        this.props.onSearchTermChange(term);
        console.log(event.target.value);
    }
}

export default SearchBar;