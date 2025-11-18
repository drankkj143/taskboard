import React from "react"
import Title from "./Title"
import AddButton from "./AddButton"
import Task from "./Task"

class InProgress extends React.Component{
	render(){
		return <div>
			<Title text = "In Progress" bg="#bee3f8"/>
			<AddButton onAdd={this.props.onAdd} type = "inprogress"/>
		</div>
	}
}

export default InProgress