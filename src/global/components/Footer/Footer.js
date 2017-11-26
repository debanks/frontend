import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import FaEnvelopeO from 'react-icons/lib/fa/envelope-o';
import FaLinkedinSquare from 'react-icons/lib/fa/linkedin-square';
import FaGithubSquare from 'react-icons/lib/fa/github-square';
import './index.sass';

class Footer extends Component {

    render() {
        const {className, ...props} = this.props;

        return (
            <div className={classnames('Footer', className)}>
                <img src="/images/delta.png" className="footer-image"/>
                <div className="footer-text">DAVIS BANKS</div>
                <div className="icons">
                    <a href=""><FaEnvelopeO/></a>
                    <a href=""><FaLinkedinSquare/></a>
                    <a href=""><FaGithubSquare/></a>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.header.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);