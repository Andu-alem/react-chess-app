import React, { Component } from 'react';

class Header extends Component{
    state = {
        isOpen: false,
        twoPlayerMode : false
    }
    toggle = ()=>{
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(){
        return(
            <nav className="navbar navbar-expand-md navbar-dark border-bottom" style={{ backgroundColor : "#e60000" }}>
                <div className="container navbar-header">
                        <a className="navbar-brand h5 text-white offset-md-1 fw-bold" href="#">Andi's Chess Player</a>
                        <button 
                            className="nav-link btn-sm btn"
                            style={{
                                color : this.state.twoPlayerMode ? "lightgreen" : "white"
                            }}
                            onClick={()=> {
                                this.setState({ twoPlayerMode : this.props.isGameStarted ? this.state.twoPlayerMode : !this.state.twoPlayerMode })
                                return this.props.setTwoPlayerMode(prevState => {
                                    return this.props.isGameStarted ? false : !prevState;
                                })
                            }}
                            >TwoPlayerMode</button>    
                </div>
            </nav>
        )
    }
}

export default Header;