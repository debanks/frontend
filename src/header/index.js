import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HeaderComponent from './components/headerComponent';
import './index.sass';



export default connect()(HeaderComponent);