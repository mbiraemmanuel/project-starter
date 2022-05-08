import React, {useState, useEffect} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import JobCard from '../JobCard';
import uuid from 'react-uuid'

const onDragEnd = (result, columns, setColumns) => {
    console.log('result', result);
    if(!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        console.log('Source Items', sourceItems);
        console.log('Dragged Item', removed);
        console.log('Destination Items', destItems);
        console.log('Destination Column', destColumn);
        console.log('Draggable Id', destination.droppableId);

        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        });
        // update the database
        fetch('/api/jobs/'+ removed.db_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: removed.db_id,
                status: destColumn.name
            })
        })
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
}
export default function KanbanBoard() {
    const [columns, setColumns] = useState({})
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        
        // fetch jobs from backend
        // set columns to new state
        const tempColumns = {
          [uuid()]: {
            name: "New",
            items: []
          },
          [uuid()]: {
            name: "Preparing",
            items: []
          },
          [uuid()]: {
            name: "Washing",
            items: []
          },
          [uuid()]: {
            name: "Drying",
            items: []
        },
          [uuid()]: {
            name: "Done",
            items: []
          }
        };
        
        fetch('/api/jobs')
        .then(res => res.json())
        .then(data => { 
            var temp_columns = {...tempColumns}
            data.forEach(job => {
                // loop through columns properties checking name with job.status
                // if name matches, push job to column
                console.log('job', job)
                job = {...job, id: uuid(), db_id: job.id}
                for (var key in temp_columns) {
                    if (temp_columns[key].name === job.status) {
                        temp_columns[key].items.push(job)
                    }
                }

            })
            console.log('Items', jobs)
            console.log('Columns', temp_columns)
            setColumns(temp_columns)

        })
        // setColumns(columnsFromBackend)

    }, [])

    return (
        
      <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                        //   background: "white",
                          padding: 4,
                          width: '19rem',
                          minHeight: '84vh',
                          opacity : '5',
                          'background-color': "rgba(255,255,255,0.4)"
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                    //   padding: 16,
                                      margin: "0 0 9px 0",
                                      minHeight: "50px",
                                    //   backgroundColor: snapshot.isDragging
                                    //     ? "#263B4A"
                                    //     : "#456C86",
                                    //   color: "white",
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {/* {item.content} */}
                                    <JobCard {...item} />

                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
    )
}
