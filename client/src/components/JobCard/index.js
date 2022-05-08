import React, { Component } from 'react'
import { Container, Accordion, Card, Button } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'; // Import
import './index.css'

export default class JobCard extends Component {

    componentDidMount() {
        console.log(this.props.id)
    }
  render() {
    return (
      <div>
          <Card style={{ width: '18rem' }}>
                <Card.Body>
                    {/* <Card.Title>{this.props.type}</Card.Title> */}
                    {/* test */}
                    <span className='bold'>Type</span> : {this.props.type}
                    <br/>
                    <span className='bold'>Description</span> : {this.props.description}
                    <br/>
                    <span className='bold'>Cost</span> : {this.props.cost}
                    <br/>
                    <span className='bold'>Status</span> : {this.props.status}
                    <br/>
                    <span className='bold'>Machine</span> : {this.props.machine_id}
                    <br/>
                    <span className='bold'>Contact</span> : {this.props.contact_id}
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary">Edit</Button>          
                        &nbsp;
                        &nbsp;
                        &nbsp;
                    <Button variant="danger" onClick={() => {
                        // ask the user if they want to delete the job
                        // if they do, delete the job
                        // alert("Are you sure you want to delete this job?")
                        var answer = window.confirm("Are you sure you want to delete this job?");
                        if (answer) {
                            fetch('/api/jobs/' + this.props.id, {
                                method : 'DELETE'
                            })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                            }
                            )
                        }
                    }}>Delete</Button>
                </Card.Footer>
          </Card>
      </div>
    )
  }
}
