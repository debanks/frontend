import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Navbar, MenuItem, NavDropdown, Nav, Button} from 'react-bootstrap';
import FaGamepad from 'react-icons/lib/fa/gamepad';
import FaNewspaperO from 'react-icons/lib/fa/newspaper-o';
import FaCommentingO from 'react-icons/lib/fa/commenting-o';
import FaClose from 'react-icons/lib/fa/close';
import FaCode from 'react-icons/lib/fa/code';
import ThoughtComponent from '../../global/components/Thought/thoughtComponent';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';
import ArticleEditor from '../../global/components/Editors/ArticleEditor';
import GameEditor from '../../global/components/Editors/GameEditor';
import ProjectEditor from '../../global/components/Editors/ProjectEditor';

class HeaderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showThought: false,
            login: false,
            creds: {
                password: "",
                email: ""
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        if (this.props.user) {
            this.props.getItems();
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let state = this.state;
        state.creds[name] = value;

        this.setState(state);
    }

    render() {
        const {className} = this.props;

        let isStats = this.props.location.indexOf("/programming") > -1;
        let isCoins = this.props.location.indexOf("/gaming") > -1;
        let isContent = this.props.location.indexOf("/content") > -1;

        let accountIcon = (user) => <span>
            <img className="user-icon" src={user.profile_photo_url}/> {user.name}
        </span>;

        return (
            <div className={classnames('HeaderComponent', className)}>
                <Navbar collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/"><img src="/images/delta.png"/> Davis Banks</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>

                    <Navbar.Collapse>
                        <Nav className="close-nav">
                            <li className={isStats ? "active" : ""}><a href="/programming"><FaCode /> Programming</a></li>
                            <li className={isCoins ? "active" : ""}><a href="/game"><FaGamepad /> Gaming</a></li>
                            <li className={isContent ? "active" : ""}><a href="/content"><FaNewspaperO/> Content</a></li>
                        </Nav>
                        <Nav className="no-divider" pullRight>
                            {this.props.user && this.state.showThought === false && <li><Button onClick={() => this.setState({showThought: true})}><FaCommentingO/> Post</Button></li>}
                            {this.props.user && this.state.showThought && <li><Button bsStyle="danger" onClick={() => this.setState({showThought: false})}><FaClose /> Close</Button></li>}
                            {this.props.user && <NavDropdown title={accountIcon(this.props.user)} id="basic-nav-dropdown-1">
                                <MenuItem onClick={() => this.props.editorShow('article')}>Add Articles</MenuItem>
                                <MenuItem onClick={() => this.props.editorShow('project')}>Add Project</MenuItem>
                                <MenuItem onClick={() => this.props.editorShow('game')}>Add Game</MenuItem>
                                <MenuItem divider/>
                                <MenuItem href="" onClick={(e) => {
                                    e.preventDefault();
                                    this.props.handleLogout()
                                }}>Logout</MenuItem>
                            </NavDropdown>}
                            {!this.props.user && <li className={"login" + (this.state.login ? " active" : "")}>
                                <a onClick={() => {this.setState({login: true});}} href="#">
                                    Log In
                                </a>
                                {this.state.login === true && <RootCloseWrapper noWrap onRootClose={() => this.setState({login: false})}><div className="login-container">
                                    <form onSubmit={(e) => this.props.login(e, this.state.creds)}>
                                        <input name="email" placeholder="Email" onChange={this.handleInputChange}/>
                                        <input name="password" type="password" placeholder="Password" onChange={this.handleInputChange}/>
                                        <Button type="submit" bsStyle="primary">Login</Button>
                                    </form>
                                </div></RootCloseWrapper>}
                            </li>}
                        </Nav>
                    </Navbar.Collapse>
                    {this.state.showThought && this.props.user && <ThoughtComponent opened={true} items={this.props.items} action={false} close={() => this.setState({showThought: false})}/>}
                </Navbar>
                {this.props.show === 'article' && <ArticleEditor/>}
                {this.props.show === 'game' && <GameEditor/>}
                {this.props.show === 'project' && <ProjectEditor/>}
            </div>
        )
    }
}

export default HeaderComponent;