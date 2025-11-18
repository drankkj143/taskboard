import React from "react"
import { MdDeleteForever } from "react-icons/md";

class Task extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEdit: false,
      text: this.props.text,
      color: "#fff"
    }
  }

  getRandomColor() {
    const colors = [
      "#D7CCC8","#C5CAE9","#B2DFDB","#B0BEC5","#A5D6A7",
      "#9FA8DA","#90CAF9","#81D4FA","#80CBC4","#AED581"
    ]
    let randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
  }

  componentDidMount() {
    this.setState({
      color: this.getRandomColor()
    })
  }

  render() {
    return (
      <div
        className="task"
        style={{ background: this.state.color }}
        onClick={() => {
          if (!this.state.isEdit) {
            this.setState({ isEdit: !this.state.isEdit })
          }
        }}
      >
        {this.state.isEdit ? (
          <input
            defaultValue={this.state.text}
            onBlur={(e) => {
              this.setState({ isEdit: !this.state.isEdit })
              this.setState({ text: e.target.value })
              this.props.onChange(this.props.type, this.props.id, e.target.value)
            }}
          />
        ) : (
          this.state.text
        )}

        <MdDeleteForever
          className="delete-icon"
          onClick={() => {
            let ev = this.props.type
            this.onClick = this.props.onDelete(ev, this.props.id)
          }}
        />
      </div>
    )
  }
}

export default Task
