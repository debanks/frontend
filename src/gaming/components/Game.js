import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {requestPage} from '../actions';
import ContentColumns from '../../global/components/Content/ContentColumns';
import DocumentMeta from 'react-document-meta';
import {helper} from "react-stockcharts";
import StarsRating from '../../global/components/Rating/StarsRating';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import {Button} from 'react-bootstrap';
import {showEditor} from '../../global/actions';
let {fitWidth} = helper;
import '../index.sass';

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: 'content'
        }
    }

    componentWillMount() {
        this.props.loadContent(this.props.params.id);
    }

    render() {
        const {className, game, ...props} = this.props;
        const meta = {
            title: 'Davis Banks - ' + this.props.params.name,
            description: this.props.game ? this.props.game.description : this.props.params.name + ' is a game i have played and enjoyed enough to talk about.',
            canonical: 'http://davisbanks.com/game/' + this.props.params.id + "/" + this.props.params.name,
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'davis,banks,game,' + this.props.params.name
                }
            }
        };

        return (
            <DocumentMeta {...meta}>
                <div className={classnames('Game', className)}>
                    <div className="content-banner">
                        <div className="game-info-container">
                            {game.large_image_url && <img src={game.large_image_url}/>}
                            <div className="game-information">
                                <h1>{this.props.params.name}<div className="pull-right"><Button onClick={() => this.props.edit(game)}>Edit</Button></div></h1>
                                <div className="game-meta"><strong>Released: </strong> {game.release_date}</div>
                                <p>{game.description}</p>
                                {game.score > 0 &&
                                <StarsRating width={32} rating={game.score}/>}
                            </div>
                        </div>
                        <div className="action-container">
                            <div className={"action clickable" + (this.state.tab === 'content' ? " active" : "")} onClick={() => this.setState({tab: 'content'})}>Content</div>
                            <div className={"action clickable" + (this.state.tab === 'review' ? " active" : "")} onClick={() => this.setState({tab: 'review'})}>Review</div>
                            <div className="pull-right">
                                <div className="action">To Beat: {game.time_to_beat ? game.time_to_beat + " hours" : "N/A"}</div>
                                <div className="action">Playtime: {(game.playtime ? game.playtime : 0) + " Hours"}</div>
                            </div>
                        </div>
                    </div>
                    {this.state.tab === 'content' && <ContentColumns content={this.props.content} width={this.props.width}/>}
                    {this.state.tab === 'review' && <div className="content">
                        {game.review && <span className="article-html" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(draftToHtml(JSON.parse(game.review)))}}></span>}
                    </div> }
                </div>
            </DocumentMeta>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.header.user,
        game: state.gaming.game,
        content: state.gaming.content
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadContent: (id) => {
            dispatch(requestPage(id));
        },
        edit: (game) => {
            dispatch(showEditor('game', null, game, null));
        }
    }
}

Game = fitWidth(Game);

export default connect(mapStateToProps, mapDispatchToProps)(Game);