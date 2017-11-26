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
                    <a href="mailto:davis.e.banks+website@gmail.com"><FaEnvelopeO/></a>
                    <a href="https://www.linkedin.com/in/davis-banks-318ab437" target="_blank"><FaLinkedinSquare/></a>
                    <a href="https://github.com/debanks" target="_blank"><FaGithubSquare/></a>
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