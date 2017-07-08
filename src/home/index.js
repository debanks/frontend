import React, {Component} from 'react';  
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';  
import HomeComponent from './components/homeComponent';
import './index.sass';

class Home extends Component {

  render() {
    const {className, ...props} = this.props;
    return (
        <HomeComponent {...props}/>
    )
  }
}

export default connect()(Home);