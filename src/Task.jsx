import React from 'react'
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'

const Container = styled.div`
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 2px;
  border: 1px lightgray solid;
  background-color: ${props => props.isDragging? 'lightgray' : 'white'}
`

export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >{this.props.task.content}</Container>
        )}
      </Draggable>
    )
  }
}
