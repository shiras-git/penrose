import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
import moment from 'moment';

class Dishdetail extends Component {
    constructor(props) {
        super(props);
    }
    
    renderDish(dish){
        return(
         <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
            );
    }
    
    renderComments(comments){
        if (comments != null)
            return(
                <ul className="list-unstyled" >
                    
                {comments.map((comment) => {
                return(
                        <div key={comment.id}>
                            <li className="mb-3">
                                {comment.comment}
                            </li>
                            <li className="mb-3">
                                -- {comment.author} , {moment(Date(comment.date)).format('ll')}
                            </li>
                        </div>
                );}
            )}
    </ul>
    );
         else
            return(
                <div></div>
            );            
        
    }
    
    render() {         
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                   {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments </h4>
                    {this.renderComments(this.props.dish.comments)}
                </div>
            </div>
            );
    }
                                           
}

export default Dishdetail;