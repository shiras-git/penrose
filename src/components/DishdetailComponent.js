import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
        CardTitle, Breadcrumb, BreadcrumbItem,
        Collapse, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import moment from 'moment';
    
class CommentForm extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            author: '',
            rating : '',
            comment: '',
            touched: {
                author: false,
                rating: false,
                comment: false
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);        
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitComments = this.handleSubmitComments.bind(this);
        this.state = {
            isModalOpen: false
        };
    }
    
      validate(author, rating, comment) {

        const errors = {
            author: '',
            rating: '',
            comment: ''
        };

        if (this.state.touched.author && author.length < 3)
            errors.firstname = 'Author should be >= 3 characters';
        else if (this.state.touched.author && author.length > 15)
            errors.author = 'Author should be <= 15 characters';
            

        return errors;
    }

    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    
     toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }

     handleSubmitComments(values) {
        this.toggleModal();
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    
    render(){
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);
        return(
            <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmitComments(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control"
                                        defaultValue="5"
                                        validators={{
                                            required
                                        }}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".rating"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" 
                                        validators={{
                                            required
                                        }}/>
                                    <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required: 'Required'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            </div>
        )
    }
}

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

    function RenderComments({ dish, comments }) {
        if (dish != null){
            if (comments != null){
                return(
                    <div>
                        <h4>Comments </h4>
                        <ul className="list-unstyled" id={dish.id}>
                            {comments.map((comment) => {
                                if (comment.dishId == dish.id)
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
                        <CommentForm></CommentForm>
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
                        <RenderComments comments={props.comments} dish={props.dish} />
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