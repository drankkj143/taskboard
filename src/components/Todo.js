import React from "react"
import Title from "./Title"
import AddButton from "./AddButton"
import Task from "./Task"

class Todo extends React.Component{
	render(){
		return <div className="todo-block">
			<Title text = "Todo"/>
			<AddButton onAdd={this.props.onAdd} type = "todo"/>
			<div className="tasks">
				{this.props.tasks.map((task) => <Task onDelete={this.props.onDelete} 
				type="todo" key={task.id} text = {task.task} id = {task.id}/>)}
			</div>
		</div>
	}
}

export default Todo