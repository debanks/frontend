import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Grid, Row, Col, Button, FormControl} from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import FaSearch from 'react-icons/lib/fa/search';
import FaClose from 'react-icons/lib/fa/close';
import ContentColumns from '../../global/components/Content/ContentColumns';
import {helper} from "react-stockcharts";
let {fitWidth} = helper;

class ContentComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            skill: 'all',
            searchText: this.props.query,
            loading: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.query = this.query.bind(this);
        this.change = this.change.bind(this);
        this.clearQuery = this.clearQuery.bind(this);
    }

    componentWillMount() {
        this.props.loadContent(this.state.searchText, this.props.type);
    }

    /**
     * If the input boxes change, update the state values for it
     */
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let state = this.state;
        state[name] = value;

        this.setState(state);
    }

    query(e) {
        e.preventDefault();
        this.setState({loading: true});
        this.props.updateQuery(this.state.searchText);
        this.props.loadContent(this.state.searchText, this.props.type);
        setTimeout(function () {
            this.setState({loading: false});
        }.bind(this), 500);
    }

    change(e, type, url) {
        e.preventDefault();
        this.setState({loading: true});
        this.props.updateType(url, type);
        this.props.loadContent(this.state.searchText, type);
        setTimeout(function () {
            this.setState({loading: false});
        }.bind(this), 500);
    }

    clearQuery(e) {
        e.preventDefault();
        this.setState({loading: true});
        this.setState({searchText: ""});
        this.props.updateQuery(false);
        this.props.loadContent("", this.props.type);
        setTimeout(function () {
            this.setState({loading: false});
        }.bind(this), 500);
    }

    render() {
        const {className} = this.props;
        const meta = {
            title: 'Davis Banks - Content',
            description: 'My name is Davis Banks and I like to talk about things I am working on and gaming.',
            canonical: 'http://davisbanks.com/content',
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'davis,banks,developer,engineer,content'
                }
            }
        };

        let queryQ = this.props.query ? "query=" + this.props.query : false;
        let typeQ = this.props.contentType ? "type=" + this.props.type : false;
        let typeUrl = "/content?";
        let apiUrl = "/api/content?";

        if (typeQ || queryQ) {

            if (queryQ && typeQ) {
                typeUrl = typeUrl + queryQ + "&";
                apiUrl = apiUrl + queryQ + "&type=" + this.props.contentType;
            } else if (queryQ) {
                typeUrl = typeUrl + queryQ + "&";
                apiUrl = apiUrl + queryQ;
            } else if (typeUrl) {
                apiUrl = apiUrl + "type=" + this.props.contentType;
            }
        }

        return (
            <DocumentMeta {...meta}>
                <div className={classnames('ContentComponent', className)}>
                    <Grid className="content-searching">
                        <Row>
                            <Col md={8}>
                                <a className={"content-type" + (this.props.type === "" ? " active" : "")} onClick={(e) => this.change(e, "", typeUrl)} href={typeUrl}>All</a>
                                <a className={"content-type" + (this.props.type === "article" ? " active" : "")} onClick={(e) => this.change(e, "article", typeUrl + "type=article")} href={typeUrl + "type=article"}>Articles</a>
                                <a className={"content-type" + (this.props.type === "thought" ? " active" : "")} onClick={(e) => this.change(e, "thought", typeUrl + "type=thought")} href={typeUrl + "type=thought"}>Thoughts</a>
                                <a className={"content-type" + (this.props.type === "game" ? " active" : "")} onClick={(e) => this.change(e, "game", typeUrl + "type=game")} href={typeUrl + "type=game"}>Games</a>
                                <a className={"content-type" + (this.props.type === "project" ? " active" : "")} onClick={(e) => this.change(e, "project", typeUrl + "type=project")} href={typeUrl + "type=project"}>Projects</a>
                            </Col>
                            <Col md={4}>
                                <form onSubmit={(e) => this.query(e)} className="content-form">
                                    <FormControl placeholder="Search through content" type="text" name="searchText"
                                                 value={this.state.searchText}
                                                 onChange={this.handleInputChange}/>
                                    <FaSearch className="content-search" onClick={(e) => this.query(e)}/>
                                    {this.state.searchText !== "" &&
                                    <a className="search-clear" href onClick={(this.clearQuery)}><FaClose/></a>}
                                </form>
                            </Col>
                        </Row>
                    </Grid>
                    <ContentColumns content={this.props.content} width={this.props.width} count={this.props.count} url={apiUrl}/>
                </div>
            </DocumentMeta>
        )
    }
}

ContentComponent = fitWidth(ContentComponent);

export default ContentComponent;
