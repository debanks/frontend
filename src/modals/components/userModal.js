import React, { Component } from 'react';
import classnames from 'classnames';
import { Modal, Button} from 'react-bootstrap';

class UserModal extends Component {

    constructor(props) {
        super(props);

        let schedule = this.getSchedule(this.props.user);

        this.state = {
            phone: this.props.user ? this.props.user.phone : "",
            schedule: schedule,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {

        let schedule = this.getSchedule(this.props.user);

        this.setState({
            phone: this.props.user ? this.props.user.phone : "",
            schedule: schedule,
        })
    }

    getSchedule(user) {
        let defaultArray = new Array(24+1).join('0').split('').map(parseFloat);
        let schedule = {};
        let days = ["sunday","monday",'tuesday','wednesday','thursday','friday','saturday'];

        if (user && user.schedule) {
            let keys = Object.keys(user.schedule);
            for (let i = 0; i < keys.length; i++) {
                let day = keys[i];
                schedule[day] = defaultArray;
                let characters = user.schedule[day] ? user.schedule[day].split('') : [];
                if (characters.length !== 24) {
                    continue;
                }

                for (let j = 0; j < characters.length; j++) {
                    schedule[day][j] = parseFloat(characters[j]);
                }
            }
        } else {
            for (let i = 0; i < days.length; i++) {
                schedule[days[i]] = defaultArray;
            }
        }

        return schedule;
    }

    /**
     * If the input boxes change, update the state values for it
     */
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    submit(event) {

        event.preventDefault();

        let user = this.props.user;
        let schedule = {};
        let keys = Object.keys(this.state.schedule);

        for (let i = 0; i < keys.length; i++) {
            schedule[keys[i]] = this.state.schedule[keys[i]].join('');
        }

        user.phone = this.state.phone;
        user.schedule = schedule;

        this.props.submit(user);
        this.props.closeModal('userModal');
    }

    render() {
        const { className } = this.props;
        return (
            <div className={classnames('UserModal', className)}>

                <Modal bsSize="lg" show={this.props.show} onHide={(e) => this.props.closeModal('userModal')} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Edit Phone Number</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="user-modal">
                            <label htmlFor="phone">Phone Number</label>
                            <input name="phone" value={this.state.phone} onChange={this.handleInputChange}/>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={(e) => this.props.closeModal('userModal')}>Close</Button>
                        <Button onClick={(e) => this.submit(e)}>Submit</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default UserModal;