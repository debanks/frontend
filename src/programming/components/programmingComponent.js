import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import {helper} from "react-stockcharts";
import FaGithubSquare from 'react-icons/lib/fa/github-square';
let {fitWidth} = helper;

class ProgrammingComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            skill: 'all'
        }
    }

    componentWillMount() {
        this.props.loadContent();
    }

    render() {
        const {className} = this.props;
        const meta = {
            title: 'Davis Banks - Programming',
            description: 'Here are some projects and thoughts on programming I have.',
            canonical: 'http://davisbanks.com',
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'davis,banks,developer,projects,programming'
                }
            }
        };

        let now = (new Date()).getTime();

        function getDate(date) {
            return ('0' + (date.getMonth() + 1)).slice(-2) + '/'
                + date.getFullYear()
        }

        return (
            <DocumentMeta {...meta}>
                <div className={classnames('ProgrammingComponent', className)}>
                    {this.props.projects.map(function (project, key) {

                        let start = new Date(project.start_date);
                        let end = new Date(project.end_date);

                        let startStr = getDate(start);
                        let endStr = end.getTime() > now ? 'Ongoing' : getDate(end);

                        return <Grid className="project" style={{background: project.color}} key={key}>
                            <Row>
                                <a href={"/programming/" + project.name}>
                                    <Col sm={4}>
                                        <img src={project.image_url}/>
                                    </Col>
                                    <Col sm={8}>
                                        <h1>{project.name}</h1>
                                        <div className="project-meta"><strong>Timeline: </strong>{startStr} - {endStr}
                                        </div>
                                        <div className="project-meta"><strong>Employer: </strong>{project.employer}
                                        </div>
                                        <p>{project.description}</p>
                                        <div className="project-meta"><strong>Languages: </strong>{project.languages}
                                        </div>
                                        {project.github && <a href={project.github}><FaGithubSquare/></a>}
                                    </Col>
                                </a>
                            </Row>
                        </Grid>
                    }, this)}
                </div>
            </DocumentMeta>
        )
    }
}

ProgrammingComponent = fitWidth(ProgrammingComponent);

export default ProgrammingComponent;
