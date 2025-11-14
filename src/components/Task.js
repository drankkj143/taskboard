import React from "react"
import { MdDeleteForever } from "react-icons/md";

class Task extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			isEdit: false,
			text: this.props.text
		}
	}
	render(){
		return <div className="task" onClick={() => {
			if(!this.state.isEdit)
			{
				this.setState({
					isEdit: !this.state.isEdit
				})
			}
		}}>
			{this.state.isEdit ? <input defaultValue={this.state.text}
			onBlur={(e) => {
					this.setState({isEdit: !this.state.isEdit})
					this.setState({text: e.target.value})
				}}/> : this.state.text}
			
			<MdDeleteForever className="delete-icon" onClick={(ev) => {
				ev = this.props.type
				this.onClick = this.props.onDelete(ev, this.props.id)
			}}/>
			
		</div>
	}
}

export default Task