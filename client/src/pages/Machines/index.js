import React, { Component } from 'react'
import { Container, Accordion, Card, Button, Form } from 'react-bootstrap'
import AccordionItem from 'react-bootstrap/esm/AccordionItem'
import MachineCard from '../../components/MachineCard'
import JobCard from '../../components/JobCard'

export default class Machines extends Component {
    state = {
        loading : true,
        activeMachines : [],
        inactiveMachines : [],
        activeJobs : [],
        newJobs : [],
        view : "ListView",        
      }

    componentDidMount() {
        var activeMachines = []
        var inactiveMachines = []
        for(let i = 0; i < 10; i++) {
            var machine = {
                id : i,
                name : "Machine " + i,
                status : "Active"
            }
            activeMachines.push(machine)
        }
        this.setState({
            activeMachines : activeMachines.map(machine => <MachineCard {...machine} key={machine.id} />)
        }) 
        
        for(let i = 11; i < 20; i++) {
            var machine = {
                id : i,
                name : "Machine " + i,
                status : "Inactive"
            }
            inactiveMachines.push(machine)
        }
        this.setState({
            inactiveMachines : inactiveMachines.map(machine => <MachineCard {...machine} key={machine.id} />)
        })

        // get all the jobs
        fetch('/api/jobs')
        .then(res => res.json())
        .then(data => {
            var activeJobs = []
            var newJobs = []
            // Filter the jobs that are active
            data.forEach(job => {
                if(job.status === "Active") {
                    activeJobs.push(job)
                } else if(job.status === "New") {
                    newJobs.push(job)
                }
            });
            this.setState({
                activeJobs : activeJobs.map(job => <JobCard {...job} key={job.id} />),
                newJobs : newJobs.map(job => <JobCard {...job} key={job.id} />),
                loading : false
            })
        })

    }

  render() {
    return (
      <div style={{minHeight : '92vh'}}>
        {/* Machines */}
        <br/><br/>
        <Container>
        <h3>Machines</h3>
        <hr/>

        <Accordion defaultActiveKey="0">
                <Accordion.Item>
                    <Card>
                        <Card.Header>
                            <Accordion.Header>Active Machines</Accordion.Header>
                        </Card.Header>
                        <Accordion.Body>
                            <div className="machines">
                                {this.state.activeMachines}
                            </div>
                        </Accordion.Body>
                    </Card>
                </Accordion.Item>
        </Accordion>

        <br/><br/>
        <Accordion defaultActiveKey="0">
            <Accordion.Item>
                <Card>
                    <Card.Header>
                        <Accordion.Header>Inactive Machines</Accordion.Header>
                    </Card.Header>
                    <Accordion.Body>
                        <div className="machines">
                         {this.state.inactiveMachines}
                        </div>
                    </Accordion.Body>
                </Card>
            </Accordion.Item>
        </Accordion>
        <br/>
        </Container>
      </div>
    )
  }
}
