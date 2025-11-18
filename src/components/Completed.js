import React from "react"
import Title from "./Title"
import AddButton from "./AddButton"
import Task from "./Task"

class Completed extends React.Component{
	render(){
		return <div>
			<Title text = "Completed" bg = "#c6f6d5"/>
			<AddButton onAdd={this.props.onAdd} type = "completed"/>
		</div>
	}
}

export default Completed