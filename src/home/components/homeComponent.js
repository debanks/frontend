import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import ArticleBox from "../../global/components/ContentBoxes/ArticleBox";
import ThoughtBox from "../../global/components/ContentBoxes/ThoughtBox";
import GameBox from "../../global/components/ContentBoxes/GameBox";
import ProjectBox from "../../global/components/ContentBoxes/ProjectBox";
import ContentColumns from '../../global/components/Content/ContentColumns';
import {helper} from "react-stockcharts";
let {fitWidth} = helper;

class HomeComponent extends Component {

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
            title: 'Davis Banks - Web Developer',
            description: 'My name is Davis Banks and I am a web developer that has experience in MySQL, Python, React, Angular, PHP, HTML, CSS, and JS.',
            canonical: 'http://davisbanks.com',
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'davis,banks,developer,engineer,mysql,php,react,web'
                }
            }
        };

        return (
            <DocumentMeta {...meta}>
                <div className={classnames('HomeComponent', className)}>
                    <div className="home-banner">
                        <img src="/images/background_extra_small.jpg"
                             className="home-background-image hidden-xl hidden-lg hidden-md hidden-sm"/>
                        <img src="/images/background_small.jpg"
                             className="home-background-image hidden-xl hidden-lg hidden-md hidden-xs"/>
                        <img src="/images/background_medium.jpg"
                             className="home-background-image hidden-xl hidden-lg hidden-sm hidden-xs"/>
                        <img src="/images/background_large.jpg"
                             className="home-background-image hidden-md hidden-sm hidden-xs hidden-xl"/>
                        <img src="/images/background_extra_large.jpg"
                             className="home-background-image show-xl hidden-lg hidden-md hidden-sm hidden-xs"/>
                        <Grid className="banner-content">
                            <Row>
                                <Col lg={9} md={8} sm={7}>
                                    <div className="home-text">
                                        <h2>Welcome!</h2>
                                        <p>
                                            My name is Davis Banks and I am a software engineer, web developer, and avid
                                            gamer. My expertise
                                            is in data architecture and backend web development, but I dabble in
                                            frontend
                                            development and machine learning.
                                        </p>
                                    </div>
                                    <Button bsStyle="success" className="learn-more-btn" target="_blank"
                                            href="https://drive.google.com/open?id=0ByOmlaZTmFk7NDdUMUxuMXhteVU">My Resume</Button>
                                </Col>
                                <Col lg={3} md={4} sm={5}>
                                    {this.props.top && this.props.top.type === 'article' &&
                                    <ArticleBox item={this.props.top}/>}
                                    {this.props.top && this.props.top.type === 'thought' &&
                                    <ThoughtBox item={this.props.top}/>}
                                    {this.props.top && this.props.top.type === 'project' &&
                                    <ProjectBox item={this.props.top}/>}
                                    {this.props.top && this.props.top.type === 'game' &&
                                    <GameBox item={this.props.top}/>}
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                    <ContentColumns content={this.props.articles} width={this.props.width} rows={1}/>
                    <div className={"home-skills " + this.state.skill}>
                        <div className="skill-tabs">
                            <div className={"skill" + (this.state.skill === 'all' ? ' active' : '')} onClick={() => this.setState({skill: 'all'})}>Skills</div>
                            <div className={"skill" + (this.state.skill === 'react' ? ' active' : '')} onClick={() => this.setState({skill: 'react'})}>React JS</div>
                            <div className={"skill" + (this.state.skill === 'php' ? ' active' : '')} onClick={() => this.setState({skill: 'php'})}>PHP</div>
                            <div className={"skill" + (this.state.skill === 'database' ? ' active' : '')} onClick={() => this.setState({skill: 'database'})}>Databases</div>
                            <div className={"skill" + (this.state.skill === 'angular' ? ' active' : '')} onClick={() => this.setState({skill: 'angular'})}>Angular JS</div>
                            <div className={"skill hidden-xs" + (this.state.skill === 'python' ? ' active' : '')} onClick={() => this.setState({skill: 'python'})}>Python</div>
                            <div className={"skill hidden-xs" + (this.state.skill === 'it' ? ' active' : '')} onClick={() => this.setState({skill: 'it'})}>IT</div>
                        </div>
                        <div className="skill-container">
                            {this.state.skill === 'all' && <div>
                                <h2>My Skills</h2>
                                <p className="experience">Experience: 6 Years</p>
                                <p>
                                    I am a software engineer and web developer with a strong mathematics background
                                    and some training in machine learning. I have a Bachelor's in Science for
                                    Mathematics and Computer Science from the University of California San Diego that I
                                    received in 2012. Since then I've been working in San Diego doing web development
                                    and internal software development for various places.
                                </p>
                                <div className="skill-project">
                                    Favorite Projects: <a href="/project/SpirAI">SpirAI</a>, <a href="/project/AdHive">AdHive</a>,
                                    &nbsp;<a href="/project/Website">Personal Website</a>
                                </div>
                            </div>}
                            {this.state.skill === 'react' && <div>
                                <h2>ReactJS</h2>
                                <p className="experience">Experience: 2 Years</p>
                                <p>
                                    I started using ReactJS on the <a href="/project/Smaug">Smaug Project</a> and found
                                    more interesting than Angular and have been using it ever since. I'm still improving
                                    in ReactJS and continue to change how I like to structure and build components in it.
                                    I use React Sagas, React Redux, React Router, React Bootstrap, React Icons, a few other
                                    components that depend on the needs of the project.
                                </p>
                                <div className="skill-project">
                                    Projects: <a href="/project/SpirAI">SpirAI</a>, <a href="/project/Smaug">Smaug</a>,
                                    &nbsp;<a href="/project/Website">Personal Website</a>
                                </div>
                            </div>}
                            {this.state.skill === 'php' && <div>
                                <h2>PHP</h2>
                                <p className="experience">Experience: 6 Years</p>
                                <p>
                                    PHP was my first introduction into web development in school and the language of choice
                                    in my first job at NIF. I started with just raw PHP for both front and backend
                                    web development and now just use it on the backend in conjunction with Supervisord,
                                    Beanstalkd, and Laravel for jobs engines and an API. PHP gets a lot of shit as a
                                    programming language, mostly deservedly so, but is definitely useable and isn't that
                                    bad if you still to a strict structure for the project.
                                </p>
                                <div className="skill-project">
                                    Projects: <a href="/project">All</a>
                                </div>
                            </div>}
                            {this.state.skill === 'database' && <div>
                                <h2>Databases</h2>
                                <p className="experience">Experience: 6 Years</p>
                                <p>
                                    In each of my jobs I tend to be the person that designs and manages the data for the
                                    project. This ranged from small data in NIF (Users and communities) to huge datasets
                                    at Underground Elephant (10s of millions of pings and ads). I've done this using
                                    MongoDB and MySQL and tend to prefer MySQL for most projects. I've managed these datasets
                                    on a budget and implemented many aggregation services and archiving to keep costs low.
                                </p>
                                <div className="skill-project">
                                    Projects: <a href="/project">All</a>
                                </div>
                            </div>}
                            {this.state.skill === 'angular' && <div>
                                <h2>Angular JS</h2>
                                <p className="experience">Experience: 3 Years</p>
                                <p>
                                    AngularJS 1.0 (very minimal experience with 2.0) was the frontend of choice when I
                                    first started at Underground Elephant. I have stopped using it recently in preference
                                    to ReactJS, but found it adequate when doing basic frontend design. <a href="/project/Stampede">Stampede</a>
                                    and <a href="/project/AdHive">AdHive</a> were built entirely off of AngularJS and handled the
                                    huge feature sets we wanted in those projects.
                                </p>
                                <div className="skill-project">
                                    Projects: <a href="/project/AdHive">AdHive</a>, <a href="/project/Stampede">Stampede</a>
                                </div>
                            </div>}
                            {this.state.skill === 'python' && <div>
                                <h2>Python</h2>
                                <p className="experience">Experience: 2 Years</p>
                                <p>
                                    Between classes in college, and using Python for machine learning, Python has been
                                    a robust and reasonably fast language to get small projects up and running. I've used
                                    it mostly as a command-line projects with scipy and matplot to run regressions and
                                    small neural networks to see if anything can be learned from certain datasets. I
                                    have enjoyed Python even though it functions a little differently from other languages.
                                </p>
                                <div className="skill-project">
                                    Projects: <a href="/project/Paradigm">Paradigm</a>
                                </div>
                            </div>}
                            {this.state.skill === 'it' && <div>
                                <h2>IT</h2>
                                <p className="experience">Experience: 3 Years</p>
                                <p>
                                    I have been forced to learn a lot about IT over the years out of necessity. From this
                                    website to SpirAI i was the only developer to get the site up and running. From EC2
                                    servers, RDS instances, SSL certifications, to load balancers to handle traffic I have
                                    had to touch it all now. I monitor our google analytics and webmaster to make sure
                                    we maintain traffic and are targeting/watching how we affect certain browsers and screen sizes.
                                </p>
                                <div className="skill-project">
                                    Projects: <a href="/project/SpirAI">SpirAI</a>, <a href="/project/Scicrunch">Scicrunch</a>,
                                    &nbsp;<a href="/project/Website">Personal Website</a>
                                </div>
                            </div>}
                        </div>
                    </div>
                    <ContentColumns content={this.props.projects} title="PROJECTS" width={this.props.width} rows={1}/>
                    <Grid className="education">
                        <Row>
                            <Col sm={6} md={5} lg={4}>
                                <img src="/images/ucsd.jpg"/>
                            </Col>
                            <Col sm={6} md={7} lg={8}>
                                <h1>Education</h1>
                                <p><strong>School:</strong> University of California San Diego</p>
                                <p><strong>Major:</strong> Bachelor's of Science in Mathematics and Computer Science</p>
                                <p><strong>Graduated:</strong> June 2012</p>
                                <div className="description">
                                    I went to UCSD for mathematics in the Fall of 2008 and graduated with a joint major
                                    in Mathematics and Computer Science. We were one of the last students in the old
                                    curriculum that taught C early on. During my 4 years we were introduced to C, Java,
                                    C++, Python, Prolog, and OCaml. We had a few project classes that involved making
                                    full pieces of software and presenting them to the whole class
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </DocumentMeta>
        )
    }
}

HomeComponent = fitWidth(HomeComponent);

export default HomeComponent;
