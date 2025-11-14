import React from "react"
import Title from "./Title"
import AddButton from "./AddButton"
import Task from "./Task"

class Completed extends React.Component{
	render(){
		return <div className="todo-block">
			<Title text = "Completed" className="completed-title"/>
			<AddButton onAdd={this.props.onAdd} type = "completed"/>
			<div className="tasks">
				{this.props.tasks.map((task) => <Task onDelete={this.props.onDelete} 
				type="completed" key={task.id} text = {task.task} id = {task.id}/>)}
			</div>
		</div>
	}
}

export default Completed