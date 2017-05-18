import React, {Component, PropTypes} from 'react';  
import classnames from 'classnames';
var DocumentTitle = require('react-document-title');
import Loading from '../../loading';

class LoginComponent extends Component {  

  constructor(props) {
    super(props);
    this.state = {
        creds: {
          email: "",
          password: ""
        }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }


  /**
   * If the input boxes change, update the state values for it
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    var creds = this.state.creds;
    creds[name] = value;

    this.setState({
      creds: creds
    });
  }

  render() {
    const {className} = this.props;
    return (
      <DocumentTitle title="Parrot - Login">
        <div className={classnames('LoginComponent', className)}>
            <form onSubmit={(e) => this.props.handleLogin(e, this.state.creds)}>
                <h1>
                    Parrot
                    {this.props.errorMessage && <span className="login-error">! {this.props.errorMessage }</span>}
                </h1>
                <input className="form-control" name="email" onChange={this.handleInputChange}
                       placeholder="email"/>
                <input className="form-control" name="password" type="password"
                       onChange={this.handleInputChange} placeholder="password"/>
                <br />
                <div className="text-center">
                    <button className="btn btn-default" type="submit">login</button>
                </div>
            </form>
            <Loading />
        </div>
      </DocumentTitle>
    )
  }
}

export default LoginComponent;