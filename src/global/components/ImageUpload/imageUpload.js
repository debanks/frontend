import React, {Component} from 'react';
import {connect} from 'react-redux';
import './index.sass';
import FaImage from 'react-icons/lib/fa/image';
import {imageUpload} from '../../actions';
import {Button} from 'react-bootstrap';

class ImageUpload extends Component {

    render() {
        const {className, ...props} = this.props;


        return (
            <div className="ImageUpload">
                {this.props.type === 'button' && <div className="file-button">
                    <label htmlFor="file-image"><FaImage/></label>
                    <input type="file" id="file-image" className="hidden" onChange={(e) => this.props.uploadImage(e.target.files, this.props.action)}/>
                </div>}
                {this.props.type !== 'button' && <input type="file" onChange={(e) => this.props.uploadImage(e.target.files, this.props.action)}/>}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.header.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        uploadImage: (file, action) => {
            dispatch(imageUpload(file, action));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);