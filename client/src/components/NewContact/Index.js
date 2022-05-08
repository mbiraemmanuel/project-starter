import React, { Component } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

export default class NewContact extends Component {
    state = {
        show: false,
        contact: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            preferredContact: '',
        }
    }

    handleClose = () => {
        this.setState({ show: false })
    }
    
    handleShow = () => {
        this.setState({ show: true })
    }

    saveContact = () => {
        const { firstName, lastName, email, phone, preferredContact } = this.state.contact
        if(firstName && lastName && email && phone && preferredContact) {
            this.props.saveContact(this.state.contact)
            this.handleClose()
        }
    }
    render() {
        return (
        <div>
            <Button variant="primary" onClick={this.handleShow}>
                New Contact
            </Button>

            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" onChange={(e) => this.setState({ contact: { ...this.state.contact, firstName: e.target.value } })} />
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name" onChange={(e) => this.setState({ contact: { ...this.state.contact, lastName: e.target.value } })} />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" onChange={(e) => this.setState({ contact: { ...this.state.contact, email: e.target.value } })} />
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="Phone" onChange={(e) => this.setState({ contact: { ...this.state.contact, phone: e.target.value } })} />
                        </Form.Group>
                        <Form.Group controlId="preferredContact">
                            <Form.Label>Preferred Contact</Form.Label>
                            <Form.Control as="select" onChange={(e) => this.setState({ contact: { ...this.state.contact, preferredContact: e.target.value } })}>
                                <option>Email</option>
                                <option>Phone</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.saveContact}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
        )
    }
}
