import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

    function RenderDish({ dish }) {
        if (dish != null){
            return(
                 <Card key={dish.id}>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        }
        else {
            return(
                <div></div>
            )
        }

    }

    function RenderComments({ dish }) {
        if (dish != null){
            if (dish.comments != null){
                return(
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments </h4>
                        <ul className="list-unstyled">
                            {dish.comments.map((comment) => {
                                return(
                                    <div key={comment.id}>
                                        <li className="mb-3">
                                            {comment.comment}
                                        </li>
                                        <li className="mb-3">
                                            -- {comment.author} , {moment(Date(comment.date)).format('ll')}
                                        </li>
                                    </div>
                                )}
                            )}
                        </ul>
                    </div>
                )
            }
        }
        else {
            return(
                <div></div>
            )
        }
    }

    const DishDetail = (props) => {
        if (props.dish != null)
             return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
            );
        else 
            return (
                <div></div>
            );
        }
                                           

export default DishDetail;