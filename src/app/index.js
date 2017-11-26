import React, {Component} from 'react';
import Header from '../header';
import Loading from '../loading';
import Modal from '../modals';
import Footer from '../global/components/Footer/Footer';

class App extends Component {

    render() {
        return (
            <div>
                <main className="main-component">
                    { this.props.children }
                </main>
                <Footer/>
                <Header location={this.props.location.pathname} />
                <Loading />
                <Modal/>
            </div>
        );
    }
}

export default App;