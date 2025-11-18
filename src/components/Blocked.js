import React from "react"
import Title from "./Title"
import AddButton from "./AddButton"
import Task from "./Task"

class Blocked extends React.Component{
	render(){
		return <div>
			<Title text = "Blocked" bg="#fed7d7"/>
			<AddButton onAdd={this.props.onAdd} type = "blocked"/>
		</div>
	}
}

export default Blocked