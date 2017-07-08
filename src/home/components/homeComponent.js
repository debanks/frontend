import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

class HomeComponent extends Component {

    render() {
        const {className} = this.props;
        return (
            <div className={classnames('HomeComponent', className)}>
                <div className="row no-negative-margin about content">
                    <div className="col-md-3 align-center">
                        <img className="gravatar" src="/images/delta.png"/>
                    </div>
                    <div className="col-md-9 text">
                        My name is Davis Banks and I am software engineer with experience in most facets of web development,
                        handling big data, data analysis, and machine learning.
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeComponent;
