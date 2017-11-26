import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import DocumentMeta from 'react-document-meta';
import ContentColumns from '../../global/components/Content/ContentColumns';
import GameBox from './gameBox';
import {helper} from "react-stockcharts";
let {fitWidth} = helper;

class GamingComponent extends Component {

    componentWillMount() {
        this.props.loadContent();
    }

    render() {
        const {className} = this.props;
        const meta = {
            title: 'Davis Banks - Web Developer',
            description: 'My name is Davis Banks and I am a web developer that loves to play and talk about video games.',
            canonical: 'http://davisbanks.com/game',
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'davis,banks,developer,video,game,switch,xbox'
                }
            }
        };

        return (
            <DocumentMeta {...meta}>
                <div className={classnames('GamingComponent', className)}>
                    <div className="playing">
                        <h1 className="gaming-title">What I'm Playing</h1>
                        <div className="games-container">
                            {this.props.playing.map(function (game, key) {
                                return <GameBox game={game} key={key}/>
                            }, this)}
                        </div>
                    </div>
                    <ContentColumns content={this.props.content} width={this.props.width} rows={2}/>
                    <div className="games">
                        <h1 className="gaming-title">All Games I've Played</h1>
                        <div className="games-container">
                            {this.props.games.map(function (game, key) {
                                return <GameBox game={game} key={key}/>
                            }, this)}
                        </div>
                    </div>
                </div>
            </DocumentMeta>
        )
    }
}

GamingComponent = fitWidth(GamingComponent);

export default GamingComponent;
