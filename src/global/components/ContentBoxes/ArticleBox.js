import React, {Component} from 'react';
import classnames from 'classnames';
import NumberFormat from '../../../services/NumberFormat';
import FaTag from 'react-icons/lib/fa/tag';
import FaClock from 'react-icons/lib/fa/clock-o';
import './index.sass';

class ArticleBox extends Component {

    render() {
        const {className, ...props} = this.props;

        let url = "/content/" + this.props.item.item_id + "/" + this.props.item.headline;

        return (<div className={classnames('ArticleBox', 'box-container', className)}>

                    <a href={url}>
                        {this.props.item.thumbnail_url !== null &&
                        <div className="image-container small"><img src={this.props.item.thumbnail_url}/></div>}
                        <h2>{this.props.item.headline}</h2>

                        <p>
                            {this.props.item.description && this.props.item.description.length > 120 ? this.props.item.description.substring(0, 120) + '...' : this.props.item.description}
                        </p>
                        <div className="action-container">
                            <div className="action first">
                                <FaClock/> {NumberFormat.formatTimeString(this.props.item.created_at)}
                            </div>
                            {this.props.item.tag && <div className="action pull-right">
                                <FaTag/> {this.props.item.tag}
                            </div>}
                        </div>
                    </a>
            </div>
        )
    }
}

export default ArticleBox;
