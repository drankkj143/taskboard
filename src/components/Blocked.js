import React from "react"
import Title from "./Title"
import AddButton from "./AddButton"
import Task from "./Task"

class Blocked extends React.Component{
	render(){
		return <div className="todo-block">
			<Title text = "Blocked" bg="#fed7d7"/>
			<AddButton onAdd={this.props.onAdd} type = "blocked"/>
			<div className="tasks">
				{this.props.tasks.map((task) => <Task onDelete={this.props.onDelete} 
				type="blocked" key={task.id} text = {task.task} id = {task.id}
				onChange={this.props.onChange}/>)}
			</div>
		</div>
	}
}

export default Blocked