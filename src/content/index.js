import React, {Component} from 'react';
import {connect} from 'react-redux';
import ContentComponent from './components/contentComponent';
import './index.sass';
import {requestContent} from './actions';
import {browserHistory} from 'react-router';

class Content extends Component {

    constructor(props) {
        super(props);

        let query = this.props.location.query;
        let queryString = query.query ? query.query : false;

        this.state = {
            query: queryString ? queryString : '',
            type: query.type ? query.type : '',
        };
        this.updateType = this.updateType.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
    }

    updateQuery(query) {
        if (!query && this.state.type === "") {
            browserHistory.push("/content");
        } else if (!query) {
            browserHistory.push("/content?type=" + this.state.type);
        } else if (query && this.state.type === "") {
            browserHistory.push("/content?query=" + query);
        } else {
            browserHistory.push("/content?type=" + this.state.type + "&query=" + query);
        }
        this.setState({query: query});
    }

    updateType(url, type) {
        browserHistory.push(url);
        this.setState({type: type});
    }

    render() {
        const {className, ...props} = this.props;
        return (
            <ContentComponent {...props} query={this.state.query} type={this.state.type} updateQuery={this.updateQuery} updateType={this.updateType}/>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        content: state.content.content,
        count: state.content.coun
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadContent: (query, type) => {
            dispatch(requestContent(query, type));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);