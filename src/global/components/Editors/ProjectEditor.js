import React, {Component} from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {
    Button,
    Grid,
    Row,
    Col,
    FormControl,
    Alert
} from 'react-bootstrap';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {updateImageOne, updateUrls, updateImageTwo, hideEditor} from '../../actions';
import ImageUpload from '../ImageUpload/imageUpload';
import {requestApiUpdate, requestApiInsert} from '../../../api/actions';
import ApiService from '../../../api/ApiService';
import './index.sass';
import FaClose from 'react-icons/lib/fa/close';
import FaSpinner from 'react-icons/lib/fa/spinner';

class ProjectEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: "",
            name: this.props.project ? this.props.project.name : "",
            description: this.props.project ? this.props.project.description : "",
            about: this.props.project ? this.props.project.about : "",
            type: this.props.project ? this.props.project.type : "general",
            featured: this.props.project ? this.props.project.featured : 0,
            image_url: this.props.project ? this.props.project.image_url : "",
            large_image_url: this.props.project ? this.props.project.large_image_url : "",
            item: this.props.project && this.props.project.item_type ? this.props.project.item_type + '_' + this.props.project.item_id : '',
            start_date: this.props.project ? this.props.project.start_date : "",
            end_date: this.props.project ? this.props.project.end_date : "",
            languages: this.props.project ? this.props.project.languages : "",
            employer: this.props.project ? this.props.project.employer : "",
            github: this.props.project ? this.props.project.github : "",
            color: this.props.project ? this.props.project.color : "",
            contentState: this.props.project ? JSON.parse(this.props.project.about) : {
                "entityMap": {},
                "blocks": [{
                    "key": "637gr",
                    "text": "",
                    "type": "unstyled",
                    "depth": 0,
                    "inlineStyleRanges": [{
                        length: 13,
                        offset: 0,
                        style: "fontsize-18"
                    }],
                    "entityRanges": [],
                    "data": {}
                }]
            }
        };

        this.props.setUrls(this.state.image_url, this.state.large_image_url);

        this.updateSelected = this.updateSelected.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        this.inputParse = this.inputParse.bind(this);
    }

    onEditorStateChange(editorState) {

        this.setState({
            contentState: editorState,
        });
    };

    updateSelected(e, key, value) {
        e.preventDefault();

        let arr = this.state[key];

        let index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        } else {
            arr.push(value);
        }

        this.setState({
            [key]: arr
        });
        return false;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let state = this.state;
        state[name] = value;

        this.setState(state);
    }

    inputParse(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let state = this.state;
        state[name] = parseFloat(value);

        this.setState(state);
    }

    submit(event) {

        event.preventDefault();

        let errorMessage = "";
        let project = {featured: this.state.featured, delisted: this.state.delisted};
        let content = this.state.contentState;
        let htmlContent = draftToHtml(content);

        if (this.props.image_loading) {
            errorMessage += "Image loading in. "
        }

        if (!this.state.name || this.state.name === '' || !/^([A-Za-z0-9 \-!?,;_@<>:"'|~%]*)$/.test(this.state.name)) {
            errorMessage += 'Name must be filled in and not contain & or / or \\. ';
        } else {
            project.name = this.state.name;
        }

        if (!this.props.image_one || this.props.image_one === '') {
            project.image_url = null;
        } else {
            project.image_url = this.props.image_one;
        }

        if (!this.props.image_two || this.props.image_two === '') {
            project.large_image_url = null;
        } else {
            project.large_image_url = this.props.image_two;
        }

        if (!this.state.languages || this.state.languages === '') {
            errorMessage += 'Languages must be filled in. ';
        } else {
            project.languages = this.state.languages;
        }

        if (!this.state.color || this.state.color === '') {
            errorMessage += 'Languages must be filled in. ';
        } else {
            project.color = this.state.color;
        }

        if (!this.state.employer || this.state.employer === '') {
            errorMessage += 'Employer must be filled in. ';
        } else {
            project.employer = this.state.employer;
        }

        if (!this.state.end_date || this.state.end_date === '') {
            errorMessage += 'Release Date must be filled in. ';
        } else {
            project.end_date = this.state.end_date;
        }

        if (!this.state.start_date || this.state.start_date === '') {
            errorMessage += 'System must be filled in. ';
        } else {
            project.start_date = this.state.start_date;
        }

        project.github = this.state.github;
        project.about = JSON.stringify(content);
        project.htmlContent = htmlContent;

        if (!this.state.description || this.state.description === '') {
            errorMessage += 'Description must be filled in. ';
        } else {
            project.description = this.state.description;
        }

        if (errorMessage === "") {
            if (this.props.project) {
                this.props.updateObject(this.props.finishAction, 'project', project, this.props.project.id);
            } else {
                this.props.insertObject(this.props.finishAction, 'project', project);
            }
            this.props.editorHide();
        } else {
            this.setState({errorMessage: errorMessage});
        }
    }

    uploadImage(event) {
        console.log(event);
        return ApiService.performImageUrl(event);
    }

    render() {
        const {className} = this.props;

        return (
            <div className={classnames('ProjectEditor', 'Editor', className)}>
                <a href className="editor-close" onClick={(e) => {
                    e.preventDefault();
                    this.props.editorHide()
                }}><FaClose/></a>
                <h2>{this.props.project ? 'Edit Project' : 'Create New Project'}</h2>
                {this.state.errorMessage !== "" && <Alert bsStyle="danger">
                    {this.state.errorMessage}
                </Alert>}
                <Grid>
                    <Row>
                        <Col md={8}>
                            <div className="input-container">
                                <label>Name</label>
                                <input name="name" type="text" value={this.state.name}
                                       onChange={this.handleInputChange} className="title-input"/>
                            </div>

                            <div className="input-container">
                                <label>Description</label>
                                <FormControl className="summary-area" defaultValue={this.state.description}
                                             name="description"
                                             onChange={this.handleInputChange} componentClass="textarea"/>
                            </div>

                            <div className="input-container">
                                <label>Github</label>
                                <input name="github" type="text" value={this.state.github}
                                       onChange={this.handleInputChange}/>
                            </div>

                            <div className="input-container">
                                <label>Languages</label>
                                <input name="languages" type="text" value={this.state.languages}
                                       onChange={this.handleInputChange}/>
                            </div>

                            <div className="input-container">
                                <label>About</label>
                                <Editor
                                    initialContentState={this.state.contentState}
                                    onContentStateChange={this.onEditorStateChange}
                                    toolbar={{
                                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'colorPicker', 'link', 'image', 'remove', 'history'],
                                        inline: {
                                            inDropdown: false,
                                            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace']
                                        },
                                        fontSize: {
                                            options: [18, 24, 36],
                                            defaultFontSize: 18
                                        },
                                        fontFamily: {
                                            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana']
                                        },
                                        colorPicker: {
                                            colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
                                                'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
                                                'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
                                                'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
                                                'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
                                                'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
                                        },
                                        image: {
                                            urlEnabled: true,
                                            uploadEnabled: true,
                                            alignmentEnabled: true,
                                            uploadCallback: this.uploadImage,
                                            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                            alt: {present: false, mandatory: false},
                                            defaultSize: {
                                                height: 'auto',
                                                width: 'auto',
                                            },
                                        }
                                    }}
                                />
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="input-container">
                                <label>Tag</label>
                                <FormControl componentClass="select" name="tag" onChange={this.handleInputChange}>
                                    <option value="Web Dev" selected={this.state.tag === 'Web Dev'}>Web Dev
                                    </option>
                                    <option value="Software" selected={this.state.type === 'Software'}>Software
                                    </option>
                                </FormControl>
                            </div>

                            <Grid style={{"padding-right": 0, "padding-left": 0}}>
                                <Row>
                                    <Col xs={6}>
                                        <div className="input-container">
                                            <label>Start Date</label>
                                            <input name="start_date" type="date" value={this.state.start_date}
                                                   onChange={this.handleInputChange}/>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="input-container">
                                            <label>End Date</label>
                                            <input name="end_date" type="date" value={this.state.end_date}
                                                   onChange={this.handleInputChange}/>
                                        </div>
                                    </Col>
                                </Row>
                            </Grid>

                            <Grid style={{"padding-right": 0, "padding-left": 0}}>
                                <Row>
                                    <Col xs={6}>
                                        <div className="input-container">
                                            <label>Employer</label>
                                            <input name="employer" type="text" value={this.state.employer}
                                                   onChange={this.handleInputChange}/>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="input-container">
                                            <label>Color</label>
                                            <input name="color" type="text" value={this.state.color}
                                                   onChange={this.handleInputChange}/>
                                        </div>
                                    </Col>
                                </Row>
                            </Grid>

                            <div className="input-container">
                                <label>Thumbnail URL</label>
                                <ImageUpload action={updateImageOne}/>
                                {this.props.image_loading && this.props.image_one === "" &&
                                <FaSpinner className="spin image-spin"/>}
                                {this.props.image_one !== "" &&
                                <img className="art-image" src={this.props.image_one}/>}
                            </div>

                            <div className="input-container">
                                <label>Large Image URL</label>
                                <ImageUpload action={updateImageTwo}/>
                                {this.props.image_loading && this.props.image_two === "" &&
                                <FaSpinner className="spin image-spin"/>}
                                {this.props.image_two !== "" &&
                                <img className="art-image" src={this.props.image_two}/>}
                            </div>

                            <div className="input-container">
                                <label>Featured</label>
                                <FormControl componentClass="select" name="featured" onChange={this.inputParse}>
                                    <option value="1" selected={this.state.featured === 1}>Yes</option>
                                    <option value="0" selected={this.state.featured === 0}>No</option>
                                </FormControl>
                            </div>

                            <Button onClick={(e) => this.props.close()}>Close</Button>
                            <Button onClick={(e) => this.submit(e)}>Submit</Button>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.header.user,
        project: state.global.project,
        image_one: state.global.image_one,
        image_two: state.global.image_two,
        image_loading: state.global.image_loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        insertObject: (action, method, object) => {
            dispatch(requestApiInsert(method, object, action));
        },
        updateObject: (action, method, object, objectId) => {
            dispatch(requestApiUpdate(method, object, objectId, action));
        },
        setUrls: (thumb, large) => {
            dispatch(updateUrls(thumb, large));
        },
        editorHide: () => {
            dispatch(hideEditor())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEditor);