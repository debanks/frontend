import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import FaStar from 'react-icons/lib/fa/star';
import './index.sass';

class StarsRating extends Component {

    render() {
        const {className, rating, width} = this.props;

        let size = width ? width : 24;

        return (
            <div className={classnames('StarsRating', className)} title={rating + '%'}>
                <div className="star" style={{width: size, height: size, "font-size": size}}>
                    <FaStar/>
                    <div className="star-container" style={{width: (Math.min(rating / 20, 1) * 100) + '%'}}>
                        <FaStar/>
                    </div>
                </div>
                <div className="star" style={{width: size, height: size, "font-size": size}}>
                    <FaStar/>
                    <div className="star-container"
                         style={{width: (Math.max(Math.min((rating - 20) / 20, 1) * 100, 0)) + '%'}}>
                        <FaStar/>
                    </div>
                </div>
                <div className="star" style={{width: size, height: size, "font-size": size}}>
                    <FaStar/>
                    <div className="star-container"
                         style={{width: (Math.max(Math.min((rating - 40) / 20, 1) * 100, 0)) + '%'}}>
                        <FaStar/>
                    </div>
                </div>
                <div className="star" style={{width: size, height: size, "font-size": size}}>
                    <FaStar/>
                    <div className="star-container"
                         style={{width: (Math.max(Math.min((rating - 60) / 20, 1) * 100, 0)) + '%'}}>
                        <FaStar/>
                    </div>
                </div>
                <div className="star" style={{width: size, height: size, "font-size": size}}>
                    <FaStar/>
                    <div className="star-container"
                         style={{width: (Math.max(Math.min((rating - 80) / 20, 1) * 100, 0)) + '%'}}>
                        <FaStar/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(StarsRating);