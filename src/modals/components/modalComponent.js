import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import UserModal from './userModal';

class ModalComponent extends Component {

    render() {
        const {className} = this.props;
        return (
            <div className={classnames('ModalComponent', className, (this.props.call ? "slide-down" : "slide-up"))}>
                {this.props.showUserModal && <UserModal show={this.props.showUserModal} closeModal={this.props.closeModal} submit={this.props.updateUserInfo} user={this.props.user}/>}
            </div>
        )
    }
}

export default ModalComponent;