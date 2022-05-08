import React, { Component } from 'react'
import { Button, Card, Form, Container } from 'react-bootstrap'
import ContactLookup from '../ContactLookup'
import NewContact from '../NewContact/Index'
import './index.css'
import { useHistory } from "react-router-dom";

export class NewJob extends Component {
    state = {
        existingContact: true,
        job: {
            type: '',
            description: '',
            cost: '',
            status: 'New',
            machine_id: '',
            contact_id: '',
            test: ''
        },
    }
    componentDidMount() {
        fetch("/api/jobs/")
          .then(res => res.json())
          .then(posts => {
            console.log('Jobs: ', posts)
            this.setState({
              loading: false,
            //   posts: posts.map((p,ii) => <Post {...p} key={ii} />),
            });
          })
          .catch(err => console.log("API ERROR: ", err));
      }
    machineOptions = [
        { id: 1, name: 'Machine 1' },
        { id: 2, name: 'Machine 2' },
        { id: 3, name: 'Machine 3' },
        { id: 4, name: 'Machine 4' },
        { id: 5, name: 'Machine 5' }
    ]

    handleCancel = () => {
        this.props.history.push('/')
    }

    handleShow = () => {
        this.setState({ show: true })
    }
    
    saveJob = (e) => {
        console.log("save new job", this.state.job)
        fetch("/api/jobs/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content : this.state.job})
        })
        .then(res => {
            if(res.ok) {
                return res.json()
            }

            throw new Error('Content validation');
        })
        this.handleClose()
        this.props.history.push('/')
        
        
    }

    handleTypeChange = (e) => {
        console.log("type change", e.target.value)
        switch (e.target.value) {
            case 'Large Wash and Dry':
                this.setState({ job: { ...this.state.job, cost: '500' } })
                break
            case 'Medium Wash and Dry':
                this.setState({ job: { ...this.state.job, cost: '450' } })
                break
            case 'Small Wash and Dry':
                this.setState({ job: { ...this.state.job, cost: '400' } })
                break
            case 'Dry Only':
                this.setState({ job: { ...this.state.job, cost: '300' } })
                break
            case 'Large Wash Only':
                this.setState({ job: { ...this.state.job, cost: '250' } })
                break
            case 'Medium Wash Only':
                this.setState({ job: { ...this.state.job, cost: '200' } })
                break
            case 'Small Wash Only':
                this.setState({ job: { ...this.state.job, cost: '150' } })
                break
            default:
                this.setState({ job: { ...this.state.job, cost: '0' } })

        }
    }



    render() {
        return (
        <Container>
            <div className="cont">
                <div className="new-job-container">
                <Card style={{'box-shadow': 'rgb(46 45 45 / 98%) 0px 3px 12px 17px'}}>
                    <Card.Header>
                        <h3>New Wash</h3>
                    </Card.Header>
                    <Card.Body>
                        <div className='main'>
                            <Form>
                                <Form.Group  controlId="type">
                                    <Form.Label>Wash Type</Form.Label>
                                    <Form.Control as="select" placeholder='Choose Option' onChange={(e) => {
                                        console.log(e.target.value)
                                        var type = e.target.value
                                        this.handleTypeChange(e)
                                        this.setState(prevState => ({
                                            job: {
                                                ...prevState.job,
                                                type: type
                                            }
                                        }))


                                    }}>
                                        <option>Choose...</option>
                                        <option>Large Wash and Dry</option>
                                        <option>Medium Wash and Dry</option>
                                        <option>Small Wash and Dry</option>
                                        <option>Large Wash Only</option>
                                        <option>Medium Wash Only</option>
                                        <option>Small Wash Only</option>
                                        <option>Large Dry Only</option>
                                        <option>Medium Dry Only</option>
                                        <option>Small Dry Only</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="cost">
                                    <Form.Label>Cost</Form.Label>
                                    {/* output cost data */}

                                    <Form.Control type="text" value={this.state.job.cost} readOnly />
                                </Form.Group>

                                <Form.Group controlId="machine">
                                    <Form.Label>Machine</Form.Label>
                                    {/* <Form.Control type="text" onChange={(e) => this.setState({ job: { ...this.state.job, machine_id: e.target.value } })} /> */}
                                    <Form.Control as="select" placeholder='Choose Option' onChange={(e) => this.setState({ job: { ...this.state.job, machine_id: e.target.value } })}>
                                    {this.machineOptions.map(machine => {
                                        return <option key={machine.id} value={machine.id}>{machine.name}</option>
                                    }
                                    )}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="description">
                                    <Form.Label>Addtional Notes</Form.Label>
                                    <Form.Control type="textarea" onChange={(e) => this.setState({ job: { ...this.state.job, description: e.target.value } })} />
                                </Form.Group>

                                <br/>
                                <hr/>
                                Contact
                                {/* radio buttons for new or existing */}
                                <div className='checkboxes'>
                                {
                                    [true, false].map((value, index) => {
                                        return (
                                            <div className='checkbox' key={index}>
                                                <Form.Check 
                                                    type="radio"
                                                    id={`contact${index}`}
                                                    name="contact"
                                                    value={value}
                                                    onChange={(e) => this.setState({ existingContact: value })}
                                                />
                                                <label htmlFor={`contact${index}`}>{value ? 'New Contact' : 'Existing Contact'}</label>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                                <ContactLookup existingContact={this.state.existingContact}/>

                                
                            </Form>          

                        </div>
                    </Card.Body>
                    <Card.Footer>
                            <div className='buttons'>
                                    <Button className='button' variant="primary" onClick={this.saveJob}>
                                        Save
                                    </Button>
                                    <Button className='button' variant="secondary" onClick={this.handleCancel}>
                                        Cancel
                                    </Button>
                                </div>
                    </Card.Footer>
                </Card>
                </div>
            </div>
        </Container>
        )
    }
}

export default NewJob