import React from 'react'
import { Card } from 'react-bootstrap'
import './index.css'

export default function MachineCard({ id, name, status }) {
  return (
    <div className='machine'>
        <Card style={{ width: '18rem' }}>
            {/* <Card.Header>{ name }</Card.Header> */}
            <Card.Body>
                {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                <Card.Text>
                    <span>Id:</span> { id } <br/>
                    <span>Status:</span> { status }
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Card.Link href="#">View Current Job</Card.Link>
                <Card.Link href="#">View Prev Jobs</Card.Link>
            </Card.Footer>
        </Card>

    </div>
  )
}
