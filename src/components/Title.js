import React from "react"

class Title extends React.Component{
	render(){
		return <p style={{background: this.props.bg ? this.props.bg : 'grey'}}>
			{this.props.text}
		</p>
	}
}

export default Title