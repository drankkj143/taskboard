import React from "react"
import Title from "./Title"
import AddButton from "./AddButton"
import Task from "./Task"

class InProgress extends React.Component{
	render(){
		return <div className="todo-block">
			<Title text = "In Progress"/>
			<AddButton onAdd={this.props.onAdd} type = "inprogress"/>
			<div className="tasks">
				{this.props.tasks.map((task) => <Task onDelete={this.props.onDelete} 
				type="inprogress" key={task.id} text = {task.task} id = {task.id}/>)}
			</div>
		</div>
	}
}

export default InProgress