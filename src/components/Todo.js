import React from "react"
import Title from "./Title"
import AddButton from "./AddButton"
import Task from "./Task"

class Todo extends React.Component{
	render(){
		return <div>
			<Title text = "Todo" bg="#edf2f7"/>
			<AddButton onAdd={this.props.onAdd} type = "todo"/>
		</div>
	}
}

export default Todo