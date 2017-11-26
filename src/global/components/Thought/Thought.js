import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import FaQuoteLeft from 'react-icons/lib/fa/quote-left';
import FaQuoteRight from 'react-icons/lib/fa/quote-right';
import FaTag from 'react-icons/lib/fa/tag';
import FaClock from 'react-icons/lib/fa/clock-o';
import NumberFormat from '../../../services/NumberFormat';
import './index.sass';

class Thought extends Component {

    render() {
        const {className, ...props} = this.props;

        return (
            <div className={classnames('Thought', className)} onClick={this.props.close}>
                <div className="thought-container" onClick={(e) => e.stopPropagation()}>
                    {this.props.item.thumbnail_url !== null &&
                    <div className={"image-container" + (this.props.item.game_id ? ' small' : '')}><img
                        src={this.props.item.thumbnail_url}/></div>}
                    <div className="thought">
                        <FaQuoteLeft className="left-quote"/>
                        {this.props.item.description}
                        <FaQuoteRight className="right-quote"/>
                    </div>
                    <div className="action-container">
                        <div className="action first">
                            <FaClock/> {NumberFormat.formatTimeString(this.props.item.created_at)}
                        </div>
                        {this.props.item.tag && <div className="action pull-right">
                            <FaTag/> {this.props.item.tag}
                        </div>}
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Thought);