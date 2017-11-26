import React, {Component} from 'react';
import classnames from 'classnames';
import NumberFormat from '../../../services/NumberFormat';
import FaClock from 'react-icons/lib/fa/clock-o';
import FaTag from 'react-icons/lib/fa/tag';
import './index.sass';

class ProjectBox extends Component {

    render() {
        const {className, ...props} = this.props;

        let url = "/programming/" + this.props.item.headline;

        let today = new Date();
        let start = new Date(this.props.item.meta_data_1);
        let end = new Date(this.props.item.meta_data_2);

        function getDate(date) {
            return ('0' + (date.getMonth()+1)).slice(-2) + '/'
                + date.getFullYear()
        }

        return (<div className={classnames('ProjectBox', 'box-container', className)}>
                <a href={url}>
                    {this.props.item.thumbnail_url !== null &&
                    <div className="image-container small"><img src={this.props.item.thumbnail_url}/></div>}
                    <h2>{this.props.item.headline}</h2>

                    <p>
                        {this.props.item.description && this.props.item.description.length > 120 ? this.props.item.description.substring(0, 120) + '...' : this.props.item.description}
                    </p>
                    <div className="action-container">
                        <div className="action first">
                            <FaClock/> {getDate(start)} - {end.getTime() > today.getTime() ? 'Ongoing' : getDate(end)}
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

export default ProjectBox;
