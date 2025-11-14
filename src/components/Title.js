import React from "react"

class Title extends React.Component{
	render(){
		return <p>
			{this.props.text}
		</p>
	}
}

export default Title