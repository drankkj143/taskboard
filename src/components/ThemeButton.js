import React from "react"
import { MdLightMode } from "react-icons/md";
import { MdNightlightRound } from "react-icons/md";

class ThemeButton extends React.Component{
	render(){
		const {isLight, changeTheme} = this.props
		return <div className="theme-button" 
		onClick={() => changeTheme(!isLight)}
		style={{backgroundColor: isLight ? "#edf2f7" : "#2c313d"}}
		>
			{isLight ? <MdLightMode /> : <MdNightlightRound />}
		</div>
	}
}

export default ThemeButton