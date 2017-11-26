import React, {Component} from 'react';
import FaQuoteLeft from 'react-icons/lib/fa/quote-left';
import FaQuoteRight from 'react-icons/lib/fa/quote-right';
import FaTag from 'react-icons/lib/fa/tag';
import FaClock from 'react-icons/lib/fa/clock-o';
import classnames from 'classnames';
import NumberFormat from '../../../services/NumberFormat';
import './index.sass';
import Thought from '../Thought/Thought';

class ThoughtBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openThought: false
        }
        this.close = this.close.bind(this);
    }

    close() {
        this.setState({openThought: false});
    }

    render() {
        const {className, ...props} = this.props;

        return (
            <div className={classnames('ThoughtBox', 'box-container', className)}>
                <a href="#" onClick={() => this.setState({openThought: true})}>
                    {this.props.item.thumbnail_url !== null &&
                    <div className={"image-container" + (this.props.item.game_id ? ' small' : '')}><img
                        src={this.props.item.thumbnail_url}/></div>}
                    <div className="thought">
                        <FaQuoteLeft className="left-quote"/>
                        {this.props.item.description && this.props.item.description.length > 120 ? this.props.item.description.substring(0, 120) + "..." : this.props.item.description}
                        <FaQuoteRight className="right-quote"/>
                    </div>
                </a>
                <div className="action-container">
                    <div className="action first">
                        <FaClock/> {NumberFormat.formatTimeString(this.props.item.created_at)}
                    </div>
                    {this.props.item.tag && <div className="action pull-right">
                        <FaTag/> {this.props.item.tag}
                    </div>}
                </div>
                {this.state.openThought === true && <Thought item={this.props.item} close={this.close}/>}
            </div>
        )
    }
}

export default ThoughtBox;