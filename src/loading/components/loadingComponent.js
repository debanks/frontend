import React, { Component } from 'react';
import classnames from 'classnames';
import FaSpinner from 'react-icons/lib/fa/spinner';
import FaPhone from 'react-icons/lib/fa/phone';

class LoadingComponent extends Component {

    render() {
        const { className } = this.props;
        return (
            <div className={classnames('LoadingComponent', className, (this.props.showing ? 'visible' : ''))}>
                <div className="icon">
                    {this.props.icon === "spinner" && <FaSpinner className="spin" />}
                    {this.props.icon === "calling" && <FaPhone className="wiggle" />}
                </div>
                <div className="text">
                    {this.props.text}
                </div>
            </div>
        );
    }
}

export default LoadingComponent;