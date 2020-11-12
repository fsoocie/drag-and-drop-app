import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset'
import initialData from './initialData'
import Column from './Column'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
`

class InnerList extends React.PureComponent {
  render() {
    const {tasks, column, index} = this.props
    column.taskIds.map(taskId => tasks[taskId])
    return <Column key={column.id} column={column} tasks={tasks} index={index} />
  }
}


class App extends React.Component {
  state = initialData

  onDragEnd = result => {
    const {source, destination, draggableId, type} = result

    if (!destination) {
      return
    }
    if (source.index === destination.index &&
        source.droppableId === destination.droppableId
    ) return

    if (type === 'column') {
      const newColumnsOrder = Array.from(this.state.columnOrder)
      newColumnsOrder.splice(source.index, 1)
      newColumnsOrder.splice(destination.index, 0, draggableId)
      const newState = {
        ...this.state,
        columnOrder: newColumnsOrder
      }
      this.setState(newState)
      return
    }

    const startColumn = this.state.columns[source.droppableId]
    const finishColumn = this.state.columns[destination.droppableId]

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0 , draggableId)

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }
      this.setState(newState)
      return;
    }
    const newStartTaskIds = Array.from(startColumn.taskIds)
    newStartTaskIds.splice(source.index, 1)
    const newStartColumn = {
      ...startColumn,
      taskIds: newStartTaskIds
    }

    const newFinishTaskIds = Array.from(finishColumn.taskIds)
    newFinishTaskIds.splice(destination.index, 0, draggableId)
    const newFinishColumn = {
      ...finishColumn,
      taskIds: newFinishTaskIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [startColumn.id]: newStartColumn,
        [finishColumn.id]: newFinishColumn
      }
    }
    this.setState(newState)
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId='all-columns' direction='horizontal' type='column'>
          {(provided) => (
            <Container
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns[columnId]
                return <InnerList key={column.id} column={column} index={index} tasks={this.state.tasks}/>
              })}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>

      </DragDropContext>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);



