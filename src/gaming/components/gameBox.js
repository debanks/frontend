import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {helper} from "react-stockcharts";
import StarsRating from '../../global/components/Rating/StarsRating';
let {fitWidth} = helper;

class GameBox extends Component {

    render() {
        const {className, game} = this.props;

        return (
            <div className={classnames('GameBox', className)}>
                <a href={"/game/" + game.id + "/" + game.name}>
                    <img src={game.image_url}/>
                    <h3>{game.name}</h3>
                    {game.score > 0 &&
                    <StarsRating width={24} rating={game.score}/>}
                    {game.score === null && <div className="no-score">No Score Yet</div>}
                    <p>{game.description && game.description.length > 120 ? game.description.substring(0, 120) + '...' : game.description}</p>
                    <div className="game-meta"><strong>Released:</strong> {game.release_date}</div>
                </a>
            </div>
        )
    }
}

GameBox = fitWidth(GameBox);

export default GameBox;
