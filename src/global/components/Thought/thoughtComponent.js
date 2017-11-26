import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {Button, FormControl} from 'react-bootstrap';
import {submitThought, updateImageOne} from '../../actions';
import ImageUpload from '../ImageUpload/imageUpload';
import FaSpinner from 'react-icons/lib/fa/spinner';
import './index.sass';

class ThoughtComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            thoughtFocus: this.props.opened ? this.props.opened : false,
            thought: "",
            item: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.inputParse = this.inputParse.bind(this);
        this.submit = this.submit.bind(this);
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

    submit() {

        if (this.state.thought.length === 0 || this.props.image_loading) {
            return;
        }

        let thought = {
            thought: this.state.thought,
            coin_id: this.state.coin_id === 0 ? null : this.state.coin_id,
            image_url: this.props.image_one !== "" ? this.props.image_one : null
        };

        if (this.state.item !== "") {
            thought.item = this.state.item
        }

        this.props.submit(thought);
        this.setState({thought: "", thoughtFocus: false, coin_id: 0});
        this.textarea.value = "";
        this.props.clearImage();
        if (this.props.close) {
            this.props.close();
        }
    }

    render() {
        const {className, ...props} = this.props;

        return (
            <div className={classnames('ThoughtComponent', className)}>
                <textarea name="thought" onChange={this.handleInputChange} className={this.state.thoughtFocus ? "active" : ""}
                          onFocus={() => this.setState({thoughtFocus: true})} ref={ref => this.textarea = ref}
                          placeholder="Post a thought...." maxLength={255}></textarea>
                {(this.state.thoughtFocus || this.state.thought !== "") && <div className="thought-buttons">

                    {this.props.image_one === "" && this.props.image_loading === false && <ImageUpload type="button" action={updateImageOne}/>}
                    {this.props.image_one === "" && this.props.image_loading && <FaSpinner className="spin" />}
                    {this.props.image_one !== "" && <img className="thought-image" src={this.props.image_one}/>}
                    <FormControl className="coin-select" componentClass="select" name="item" onChange={this.handleInputChange}>
                        <option value="" selected={this.state.item === ""}>No Linked Item</option>
                        {this.props.items.map(function(item,key) {
                            let keyId = item.type + "_" + item.item_id;
                            return <option value={keyId} key={key} selected={(this.state.item === keyId)}>{item.headline} - {item.type}</option>
                        }, this)}
                    </FormControl>
                    <div className="right-aligned">
                        <span className="characters">{this.state.thought.length} / 255</span>
                        <Button onClick={() => {
                            this.textarea.value = "";
                            this.setState({thought: "", thoughtFocus: false, coin_id:0});
                            this.props.clearImage();
                            if (this.props.close) {
                                this.props.close();
                            }
                        }}>Cancel</Button>
                        <Button bsStyle="success" onClick={this.submit}>Post</Button>
                    </div>
                </div>}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.header.user,
        items: state.header.items,
        image_one: state.global.image_one,
        image_loading: state.global.image_loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        submit: (thought) => {
            dispatch(submitThought(thought, false));
        },
        clearImage: () => {
            dispatch(updateImageOne(""))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThoughtComponent);