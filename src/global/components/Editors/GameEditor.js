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
import {updateImageOne, updateImageTwo, updateUrls, hideEditor} from '../../actions';
import ImageUpload from '../ImageUpload/imageUpload';
import {requestApiUpdate, requestApiInsert} from '../../../api/actions';
import ApiService from '../../../api/ApiService';
import './index.sass';
import FaClose from 'react-icons/lib/fa/close';
import FaSpinner from 'react-icons/lib/fa/spinner';

class GameEditor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorMessage: "",
            name: this.props.game ? this.props.game.name : "",
            description: this.props.game ? this.props.game.description : "",
            review: this.props.game ? this.props.game.review : "",
            featured: this.props.game ? this.props.game.featured : 0,
            image_url: this.props.game ? this.props.game.image_url : "",
            large_image_url: this.props.game ? this.props.game.large_image_url : "",
            tag: this.props.game ? this.props.game.tag : "",
            currently_playing: this.props.game ? this.props.game.currently_playing : 0,
            playtime: this.props.game ? this.props.game.playtime : 0,
            time_to_beat: this.props.game ? this.props.game.time_to_beat : 0,
            score: this.props.game ? this.props.game.score : 0,
            system: this.props.game ? this.props.game.system : "",
            release_date: this.props.game ? this.props.game.release_date : "",
            item: this.props.game && this.props.game.item_type ? this.props.game.item_type + '_' + this.props.game.item_id : '',
            contentState: this.props.game ? JSON.parse(this.props.game.review) : {
                "entityMap": {},
                "blocks": [{
                    "key": "637gr",
                    "text": "No Review Yet",
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
        state[name] = value !== "" ? parseFloat(value) : "";

        this.setState(state);
    }

    submit(event) {

        event.preventDefault();

        let errorMessage = "";
        let game = {featured: this.state.featured, delisted: this.state.delisted};
        let content = this.state.contentState;
        let htmlContent = draftToHtml(content);

        if (this.props.image_loading) {
            errorMessage += "Image loading in. "
        }

        if (!this.state.name || this.state.name === '' || !/^([A-Za-z0-9 \-!?,;_@<>:"'|~%]*)$/.test(this.state.name)) {
            errorMessage += 'Title must be filled in and not contain & or / or \\. ';
        } else {
            game.name = this.state.name;
        }

        if (!this.props.image_one || this.props.image_one === '') {
            game.image_url = null;
        } else {
            game.image_url = this.props.image_one;
        }

        if (!this.props.image_two || this.props.image_two === '') {
            game.large_image_url = null;
        } else {
            game.large_image_url = this.props.image_two;
        }

        if (!this.state.currently_playing || this.state.currently_playing === '') {
            errorMessage += 'Playing must be filled in. ';
        } else {
            game.currently_playing = this.state.currently_playing;
        }

        if (!this.state.release_date || this.state.release_date === '') {
            errorMessage += 'Release Date must be filled in. ';
        } else {
            game.release_date = this.state.release_date;
        }

        if (!this.state.system || this.state.system === '') {
            errorMessage += 'System must be filled in. ';
        } else {
            game.system = this.state.system;
        }

        game.playtime = this.state.playtime;
        game.time_to_beat = this.state.time_to_beat;
        game.review = JSON.stringify(content);
        game.htmlContent = htmlContent;
        game.score = this.state.score;

        if (!this.state.description || this.state.description === '') {
            errorMessage += 'Description must be filled in. ';
        } else {
            game.description = this.state.description;
        }

        if (errorMessage === "") {
            if (this.props.game) {
                this.props.updateObject(this.props.finishAction, 'game', game, this.props.game.id);
            } else {
                this.props.insertObject(this.props.finishAction, 'game', game);
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
            <div className={classnames('GameEditor', 'Editor', className)}>
                <a href className="editor-close" onClick={(e) => {
                    e.preventDefault();
                    this.props.editorHide()
                }}><FaClose/></a>
                <h2>{this.props.game ? 'Edit Game' : 'Create New Game'}</h2>
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
                                <label>Release Date</label>
                                <input name="release_date" type="date" value={this.state.release_date}
                                       onChange={this.handleInputChange} className="name-input"/>
                            </div>

                            <div className="input-container">
                                <label>System</label>
                                <FormControl componentClass="select" name="system" onChange={this.handleInputChange}>
                                    <option value="Switch" selected={this.state.system === 'Switch'}>Switch</option>
                                    <option value="PC" selected={this.state.system === 'PC'}>PC</option>
                                    <option value="3DS" selected={this.state.system === '3DS'}>3DS</option>
                                    <option value="Xbox One" selected={this.state.system === 'Xbox One'}>Xbox One
                                    </option>
                                    <option value="Xbox 360" selected={this.state.system === 'Xbox 360'}>Xbox 360
                                    </option>
                                    <option value="Xbox" selected={this.state.system === 'Xbox'}>Xbox</option>
                                    <option value="Gamecube" selected={this.state.system === 'Gamecube'}>Gamecube
                                    </option>
                                    <option value="DS" selected={this.state.system === 'DS'}>DS</option>
                                    <option value="GBA" selected={this.state.system === 'GBA'}>GBA</option>
                                    <option value="Gameboy" selected={this.state.system === 'Gameboy'}>Gameboy</option>
                                    <option value="Genesis" selected={this.state.system === 'Genesis'}>Genesis</option>
                                </FormControl>
                            </div>

                            <div className="input-container">
                                <label>Review</label>
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
                                <label>Score</label>
                                <input name="score" type="text" value={this.state.score}
                                       onChange={this.inputParse} className="name-input"/>
                            </div>

                            <div className="input-container">
                                <label>Tag</label>
                                <FormControl componentClass="select" name="tag" onChange={this.handleInputChange}>
                                    <option value="Action" selected={this.state.tag === 'Action'}>Action</option>
                                    <option value="Adventure" selected={this.state.tag === 'Adventure'}>Adventure
                                    </option>
                                    <option value="JRPG" selected={this.state.tag === 'JRPG'}>JRPG</option>
                                    <option value="Sports" selected={this.state.tag === 'Sports'}>Sports</option>
                                    <option value="Strategy" selected={this.state.tag === 'Strategy'}>Strategy</option>
                                    <option value="MOBA" selected={this.state.tag === 'MOBA'}>MOBA</option>
                                    <option value="First Person Shooter"
                                            selected={this.state.tag === 'First Person Shooter'}>First Person Shooter
                                    </option>
                                    <option value="Third Person Shooter"
                                            selected={this.state.tag === 'Third Person Shooter'}>Third Person Shooter
                                    </option>
                                    <option value="Battle Royale" selected={this.state.tag === 'Battle Royale'}>Battle
                                        Royale
                                    </option>
                                </FormControl>
                            </div>

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

                            <Grid style={{"padding-right": 0, "padding-left": 0}}>
                                <Row>
                                    <Col xs={6}>
                                        <div className="input-container">
                                            <label>Time To Beat</label>
                                            <input name="time_to_beat" type="text" value={this.state.time_to_beat}
                                                   onChange={this.inputParse} className="name-input"/>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="input-container">
                                            <label>Time Played</label>
                                            <input name="playtime" type="text" value={this.state.playtime}
                                                   onChange={this.inputParse} className="name-input"/>
                                        </div>
                                    </Col>
                                </Row>
                            </Grid>

                            <div className="input-container">
                                <label>Currently Playing</label>
                                <FormControl componentClass="select" name="currently_playing"
                                             onChange={this.inputParse}>
                                    <option value="1" selected={this.state.currently_playing === 1}>Yes</option>
                                    <option value="0" selected={this.state.currently_playing === 0}>No</option>
                                </FormControl>
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
        game: state.global.game,
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

export default connect(mapStateToProps, mapDispatchToProps)(GameEditor);