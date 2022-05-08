
import React from 'react';
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

class App extends React.Component {
  state = {
      data : [],
      table : ''
  }
  
  columns = [
    { title: 'Id', prop: 'id' },
    { title: 'Type', prop: 'type' },
    { title: 'Cost', prop: 'cost' },
    { title: 'Status', prop: 'status' },
    { title: 'Machine', prop: 'machine_id' },
    { title: 'Contact', prop: 'contact_id' },
    { title: 'Description', prop: 'description' },
    { title: 'Created', prop: 'created_at' },
]
  componentDidMount() {
    //initialize datatable

    // GET REQUEST TO GET DATA FROM DATABASE
    fetch('/api/jobs')
    .then(res => res.json())
    .then(data => {
        this.setState({
            data: data
        })
        $(document).ready(function () {
            $('#example').DataTable();
        });
    })

    
 }
 
  render(){
    //Datatable HTML
    const style = {
        width: '100%',
        overflow: 'auto',
        background: '#fff',
        padding: '10px',
        height : '80vh',
        border: '0.1em solid black',
        'border-radius': '0.3em',
        'box-shadow': '0px 3px 12px 17px #2e2d2dfa'
    }
  return (
      
      <div className="container" style={style}>
          
        <div className="MainDiv">
          
          <table id="example" class="display">
            <thead>
                <tr>
                    {this.columns.map(column => (
                        <th>{column.title}</th>
                    ))}

                </tr>
            </thead>
            <tbody>
                {this.state.data.map(job => (
                    <tr>
                        <td>{job.id}</td>
                        <td>{job.type}</td>
                        <td>{job.cost}</td>
                        <td>{job.status}</td>
                        <td>{job.machine_id}</td>
                        <td>{job.contact_id}</td>
                        <td>{job.description}</td>
                        <td>{job.created_at}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    {this.columns.map(column => (
                        <th>{column.title}</th>
                    ))}
                </tr>
            </tfoot>
        </table>
          
        </div>
      </div>
  );
}
}
export default App;