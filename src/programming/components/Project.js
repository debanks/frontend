import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {requestPage} from '../actions';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import ContentColumns from '../../global/components/Content/ContentColumns';
import DocumentMeta from 'react-document-meta';
import {helper} from "react-stockcharts";
import FaGithubSquare from "react-icons/lib/fa/github";
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import {showEditor} from '../../global/actions';
let {fitWidth} = helper;
import '../index.sass';

class Project extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: 'about'
        }
    }

    componentWillMount() {
        this.props.loadContent(this.props.params.name);
    }

    render() {
        const {className, project, ...props} = this.props;
        const meta = {
            title: 'Davis Banks - ' + this.props.params.name,
            description: project ? project.description : this.props.params.name + ' is a project I worked on extensively.',
            canonical: 'http://davisbanks.com/programming/' + this.props.params.name,
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'davis,banks,project,' + this.props.params.name
                }
            }
        };

        function getDate(date) {
            return ('0' + (date.getMonth() + 1)).slice(-2) + '/'
                + date.getFullYear()
        }

        let now = (new Date()).getTime();
        let start = new Date(project.start_date);
        let end = new Date(project.end_date);

        let startStr = getDate(start);
        let endStr = end.getTime() > now ? 'Ongoing' : getDate(end);

        return (
            <DocumentMeta {...meta}>
                <div className={classnames('Project', className)}>
                    <div className="content-banner">
                        <Grid className="project-info-container">
                            <Row>
                                <Col md={4}>
                                    {project.large_image_url && <img src={project.large_image_url}/>}
                                </Col>
                                <Col md={8}>
                                    <div className="project-information">
                                        <h1>{this.props.params.name}<div className="pull-right"><Button onClick={() => this.props.edit(project)}>Edit</Button></div></h1>
                                        <div className="project-meta"><strong>Timeline: </strong>{startStr} - {endStr}</div>
                                        <p>{project.description}</p>
                                        <div className="project-meta"><strong>Languages: </strong>{project.languages}</div>
                                    </div>
                                </Col>
                            </Row>
                        </Grid>
                        <div className="action-container">
                            <div className={"action clickable" + (this.state.tab === 'about' ? " active" : "")} onClick={() => this.setState({tab: 'about'})}>About</div>
                            <div className={"action clickable" + (this.state.tab === 'content' ? " active" : "")} onClick={() => this.setState({tab: 'content'})}>Content</div>
                            <div className="pull-right">
                                {project.github && <a className="action" href={project.github}><FaGithubSquare/></a> }
                            </div>
                        </div>
                    </div>
                    {this.state.tab === 'about' && <div className="content">
                        {project.about && <span className="article-html" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(draftToHtml(JSON.parse(project.about)))}}></span>}
                    </div> }
                    {this.state.tab === 'content' && <ContentColumns content={this.props.content} width={this.props.width}/>}
                </div>
            </DocumentMeta>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.header.user,
        project: state.programming.project,
        content: state.programming.content
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadContent: (name) => {
            dispatch(requestPage(name));
        },
        edit: (project) => {
            dispatch(showEditor('project', null, null, project));
        }
    }
}

Project = fitWidth(Project);

export default connect(mapStateToProps, mapDispatchToProps)(Project);