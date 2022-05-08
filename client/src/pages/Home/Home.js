import React, { Component } from 'react'
import { Container,  Button, Form } from 'react-bootstrap'
import KanbanBoard from '../../components/KanbanBoard'
import ListView from '../../components/ListView'
// import Loading from '../components/Loading';
import './Home.css'
export class Home extends Component {

    state = {
        view : 'ListView',
    }


    render() {
        // if(this.state.loading) {
        //     return <Loading />;
        // }
        if(this.state.view === "kanban") {
            return (
                <Container>
                    <Button variant="primary" href='/job/new'>New Job</Button>
                    {/* change view radio buttons*/}
                    <div className='' style={{display : 'flex', justfyContent : 'center', alignItems : 'center'}}>
                        {
                            ['kanban', 'ListView'].map(view => {
                                return (
                                    <Form.Check
                                        key={view}
                                        type="radio"
                                        label={view}
                                        name="view"
                                        id={view}
                                        value={view}
                                        onChange={() => {
                                            this.setState({
                                                view : view
                                            })
                                        }}
                                    />
                                )
                            })
                        }
                        </div>
                    <KanbanBoard />
                </Container>
            )
            } else if(this.state.view === "ListView") {
                return (
                <div>
                    <div className='checkboxes'>
                        {
                            ['kanban', 'ListView'].map(view => {
                                return (
                                    <Form.Check
                                        key={view}
                                        type="radio"
                                        label={view}
                                        name="view"
                                        id={view}
                                        value={view}
                                        onChange={() => {
                                            this.setState({
                                                view : view
                                            })
                                        }}
                                    />
                                )
                            })
                        }
                    </div>

                    <div className="home-container">
                        <Button variant="primary" href='/job/new'>New Job</Button>
                        <br/><br/>
                        {/* Jobs */}
                        <ListView/>
                        
                </div>
                </div>
                )
                    }
    }
}

export default Home