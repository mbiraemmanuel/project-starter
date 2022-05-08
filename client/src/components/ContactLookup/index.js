import React, { Component } from 'react'
import {Form}   from 'react-bootstrap'
import Select from 'react-select'

export default class ContactLookup extends Component {
    options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    render() {
        if(!this.props.existingContact) {
            return (
                <Select options={this.options} onChange={(e)=> {console.log(e.value)}} />
            )
        } else {
            return (
                // new contact
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" />
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" placeholder="Phone" />
                    </Form.Group>
                    <Form.Group controlId="preferredContact">
                        <Form.Label>Preferred Contact</Form.Label>
                        <Form.Control as="select" defaultValue="email">
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                        </Form.Control>
                    </Form.Group>

                </Form>
            )
        }
                
    }
}
