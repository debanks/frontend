import React, {Component} from 'react';  
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';  
import HomeComponent from './components/homeComponent';
var DocumentTitle = require('react-document-title');
import './index.sass';

class Home extends Component {  

  constructor(props) {
    super(props);
    this.state = {
        recentCalls: [
          {duration: 45, disposition: "Not Interested", inserted_at: "2017-05-15 08:18:20"},
          {duration: 5, disposition: "Consumer Answering Machine", inserted_at: "2017-05-15 08:17:12"},
          {duration: 33, disposition: "DNC", inserted_at: "2017-05-15 08:16:54"},
          {duration: 265, disposition: "Consumer Transferred Successfully", inserted_at: "2017-05-15 08:11:33"},
          {duration: 45, disposition: "Consumer Never Reachable", inserted_at: "2017-05-15 08:11:01"},
        ]
    }
  }

  render() {
    const {className, ...props} = this.props;
    return (
        <HomeComponent recent={this.state.recentCalls} {...props}/>
    )
  }
}

function mapStateToProps(state, ownProps) {  
  return {}
}

function mapDispatchToProps(dispatch) {  
  return {}
}

export default connect()(Home);