import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

class HeaderComponent extends Component {

    render() {
        const {className} = this.props;
        return (
            <div className={classnames('HeaderComponent', className)}>
                <div className="title">Davis Banks</div>
                <div className="pull-right nav-links">
                    <a href="/" className="nav-link">Home</a>
                    <a href="/" className="nav-link">Blog</a>
                    <a href="/" className="nav-link">Projects</a>
                </div>
            </div>
        )
    }
}

export default HeaderComponent;