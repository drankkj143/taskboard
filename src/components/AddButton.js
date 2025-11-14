import React from "react"
import { FaPlus } from "react-icons/fa6";

class AddButton extends React.Component{
	render(){
		return <FaPlus className="add-button" onClick={(ev) => {
			ev = this.props.type
			this.onClick = this.props.onAdd(ev)
		}}/>
	}
}

export default AddButton