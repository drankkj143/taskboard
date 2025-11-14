import React from "react"
import Todo from "./components/Todo"
import InProgress from "./components/InProgress"
import Blocked from "./components/Blocked"
import Completed from "./components/Completed"

class App extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			tasks:{
				todo: [
					{id: 1, task: "Task1"},
					{id: 2, task: "Task2"},
				],
				inprogress: [
					{id: 1, task: "Task1"},
					{id: 2, task: "Task2"},
				],
				blocked: [
					{id: 1, task: "Task1"},
					{id: 2, task: "Task2"},
				], 
				completed: [
					{id: 1, task: "Task1"},
					{id: 2, task: "Task2"},
				],
			}
		}

		this.onAdd = this.onAdd.bind(this)
		this.onDelete = this.onDelete.bind(this)
	}

	componentDidMount() {
		const tasks = JSON.parse(localStorage.getItem('tasks'))
		if (tasks !== null) this.setState({tasks: tasks})
		else this.setState({tasks:{
				todo: [{id: 1, task: "Task1"},{id: 2, task: "Task2"},],
				inprogress: [{id: 1, task: "Task1"},{id: 2, task: "Task2"},],
				blocked: [{id: 1, task: "Task1"},{id: 2, task: "Task2"},], 
				completed: [{id: 1, task: "Task1"},{id: 2, task: "Task2"},],
			}})
	}

	render(){
		return <div className="ui-theme-light">
			<h1>Welcome to TaskBoard</h1>
			<div className="content">
				<Todo tasks = {this.state.tasks.todo} onAdd = {this.onAdd}
				onDelete={this.onDelete}/>
				<InProgress tasks = {this.state.tasks.inprogress} onAdd = {this.onAdd}
				onDelete={this.onDelete}/>
				<Blocked tasks = {this.state.tasks.blocked} onAdd = {this.onAdd}
				onDelete={this.onDelete}/>
				<Completed tasks = {this.state.tasks.completed} onAdd = {this.onAdd}
				onDelete={this.onDelete}/>
			</div>
		</div>
	}

	onDelete(type, id){
		switch(type)
		{
			case 'todo':
				this.setState((prev) => ({
					tasks: {
						...prev.tasks,
						todo: prev.tasks.todo.filter((task) => task.id !== id)
					}
				}))
				break
			case 'inprogress':
				this.setState((prev) => ({
					tasks: {
						...prev.tasks,
						inprogress: prev.tasks.inprogress.filter((task) => task.id !== id)
					}
				}))
				break
			case 'blocked':
				this.setState((prev) => ({
					tasks: {
						...prev.tasks,
						blocked: prev.tasks.blocked.filter((task) => task.id !== id)
					}
				}))
				break
			case 'completed':
				this.setState((prev) => ({
					tasks: {
						...prev.tasks,
						completed: prev.tasks.completed.filter((task) => task.id !== id)
					}
				}))
				break
		}
		localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
	}

	getFreeId(tasks)
	{
		let freeId
		let found = false
		for (let i = 1; i < tasks.length+1; i++)
		{
			for(let j = 0; j < tasks.length; j++)
			{
				if (tasks[j].id === i) break
				if (j === tasks.length-1) {
					found = true
					freeId = i
				}
			}
			if(found) break
		}
		return found ? freeId : tasks.length+1
	}

	onAdd(type){
		switch(type)
		{
			case 'todo':
				this.setState((prev) => {
					return {
						tasks:{
							...prev.tasks,
							todo: [
								...prev.tasks.todo,
								{id: this.getFreeId(this.state.tasks.todo),
								task: `New ${type} task ${this.getFreeId(this.state.tasks.todo)}`},
							]
						}
					}
				})
				break
			case 'inprogress':
				this.setState((prev) => {
					return {
						tasks:{
							...prev.tasks,
							inprogress: [
								...prev.tasks.inprogress,
								{id: this.getFreeId(this.state.tasks.inprogress),
								task: `New ${type} task ${this.getFreeId(this.state.tasks.inprogress)}`},
							]
						}
					}
				})
				break
			case 'blocked':
				this.setState((prev) => {
					return {
						tasks:{
							...prev.tasks,
							blocked: [
								...prev.tasks.blocked,
								{id: this.getFreeId(this.state.tasks.blocked),
								task: `New ${type} task ${this.getFreeId(this.state.tasks.blocked)}`},
							]
						}
					}
				})
				break
			case 'completed':
				this.setState((prev) => {
					return {
						tasks:{
							...prev.tasks,
							completed: [
								...prev.tasks.completed,
								{id: this.getFreeId(this.state.tasks.completed),
								task: `New ${type} task ${this.getFreeId(this.state.tasks.completed)}`},
							]
						}
					}
				})
				break
		}
		localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
	}
}

export default App