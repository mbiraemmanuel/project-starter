import React, {useState} from 'react'
import { Card, Accordion } from 'react-bootstrap'
// import './index.css'
import MachineCard from '../MachineCard'
export default function Active(props) {

  const [machine, setMachine] = useState(props.data)
  console.log('Active ', props)
  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item>
          <Card>
            <Card.Header>
            <Accordion.Header>Active Machines</Accordion.Header>
            </Card.Header>
              <Accordion.Body>
                <div className="machines">
                  {/* {machine.map(machine => (
                    <MachineCard {...machine} key={machine.id} />
                  ))} */}
                  {machine}
                </div>
              </Accordion.Body>
          </Card>
        </Accordion.Item>
      </Accordion>
    </div>

  )
}
