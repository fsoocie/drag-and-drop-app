import React from 'react'
import styled from 'styled-components'
import Task from './Task'
import {Draggable, Droppable} from 'react-beautiful-dnd'

const Container = styled.div`
  border-radius: 2px;
  border: 1px lightgray solid;
  margin: 8px;
  width: 220px;
  background-color: white;
  
  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease-out;
  background-color: ${props => props.isDraggingOver? 'skyblue' : 'white'};
  flex-grow: 1;
  min-height: 100px
`

export default class Column extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {(provided) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Title
              {...provided.dragHandleProps}
            > {this.props.column.title} </Title>
            <Droppable droppableId={this.props.column.id} type='task'>
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                  {...provided.droppableProps}
                >
                  {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    )
  }
}


