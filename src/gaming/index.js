import React, {Component} from 'react';
import {connect} from 'react-redux';
import GamingComponent from './components/gamingComponent';
import './index.sass';
import {requestContent} from './actions';

class Gaming extends Component {

    render() {
        const {className, ...props} = this.props;
        return (
            <GamingComponent {...props}/>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        playing: state.gaming.playing,
        content: state.gaming.content,
        games: state.gaming.games
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadContent: () => {
            dispatch(requestContent());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gaming);