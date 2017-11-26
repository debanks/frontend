import React, {Component} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {requestPage} from '../actions';
import DocumentMeta from 'react-document-meta';
import {helper} from "react-stockcharts";
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import {Button, Grid, Row, Col} from 'react-bootstrap';
import {showEditor} from '../../global/actions';
import NumberFormat from '../../services/NumberFormat';
import ProjectBox from '../../global/components/ContentBoxes/ProjectBox';
import GameBox from '../../global/components/ContentBoxes/GameBox';
let {fitWidth} = helper;
import '../index.sass';

class Article extends Component {

    componentWillMount() {
        this.props.loadContent(this.props.params.id);
    }

    render() {
        const {className, article, item, ...props} = this.props;
        const meta = {
            title: 'Davis Banks - ' + this.props.params.title,
            description: this.props.game ? this.props.game.description : this.props.params.title + ' is a game i have played and enjoyed enough to talk about.',
            canonical: 'http://davisbanks.com/article/' + this.props.params.id + "/" + this.props.params.title,
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: 'davis,banks,game,' + this.props.params.title
                }
            }
        };

        return (
            <DocumentMeta {...meta}>
                <div className={classnames('Article', className)}>
                    <Grid>
                        <Row>
                            <Col md={item !== null ? 9 : 12}>
                                <h1>{article.title}
                                    <div className="pull-right"><Button
                                        onClick={() => this.props.edit(article)}>Edit</Button></div>
                                </h1>
                                <div className="article-meta">
                                    Created {NumberFormat.formatTimeString(article.created_at)}</div>
                                <div className="content">
                                    {article.content && <span className="article-html"
                                                              dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(draftToHtml(JSON.parse(article.content)))}}></span>}
                                </div>
                            </Col>
                            {item !== null && <Col md={3}>
                                {item.type === 'project' &&
                                <ProjectBox item={item}/>}
                                {item.type === 'game' &&
                                <GameBox item={item}/>}
                            </Col>}
                        </Row>
                    </Grid>
                </div>
            </DocumentMeta>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.header.user,
        article: state.content.article,
        item: state.content.item
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadContent: (id) => {
            dispatch(requestPage(id));
        },
        edit: (article) => {
            dispatch(showEditor('article', article, null, null));
        }
    }
}

Article = fitWidth(Article);

export default connect(mapStateToProps, mapDispatchToProps)(Article);