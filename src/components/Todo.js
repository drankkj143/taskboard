import React from "react"
import Title from "./Title"
import AddButton from "./AddButton"
import Task from "./Task"

class Todo extends React.Component{
	moveTask = (dragIndex, hoverIndex) => {
  const tasks = [...this.props.tasks]
  const [removed] = tasks.splice(dragIndex, 1)
  tasks.splice(hoverIndex, 0, removed)
  this.props.onReorder("todo", tasks)
}

	render(){
		return <div className="todo-block">
			<Title text = "Todo" bg="#edf2f7"/>
			<AddButton onAdd={this.props.onAdd} type = "todo"/>
			<div className="tasks">
				{this.props.tasks.map((task) => <Task onDelete={this.props.onDelete} 
				type="todo" key={task.id} text = {task.task} id = {task.id}
				onChange={this.props.onChange} moveTask={this.moveTask}/>)}
			</div>
		</div>
	}
}

export default Todo