import React from "react"
import Todo from "./components/Todo"
import InProgress from "./components/InProgress"
import Blocked from "./components/Blocked"
import Completed from "./components/Completed"

import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

class App extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            tasks:{todo:[],inprogress:[],blocked:[],completed:[]}
        }

        this.onAdd = this.onAdd.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.saveChanges = this.saveChanges.bind(this)
    }

	onReorder = (type, newTasks) => {
		this.setState(prev => ({
			tasks: {
			...prev.tasks,
			[type]: newTasks
			}
		}))
		localStorage.setItem("tasks", JSON.stringify({
			...this.state.tasks,
			[type]: newTasks
		}))
	}


    componentDidMount() {
        const tasks = JSON.parse(localStorage.getItem('tasks'))
        if (tasks !== null) {
            this.setState({tasks:tasks})
            console.log(tasks)
        }
        else this.setState({tasks:{
                todo: [{id: 1, task: "Task1"},{id: 2, task: "Task2"},],
                inprogress: [{id: 1, task: "Task1"},{id: 2, task: "Task2"},],
                blocked: [{id: 1, task: "Task1"},{id: 2, task: "Task2"},], 
                completed: [{id: 1, task: "Task1"},{id: 2, task: "Task2"},],
            }})
    }

    render(){
        return (
            <DndProvider backend={HTML5Backend}>
                <div className="ui-theme-light">
                    <h1>Welcome to TaskBoard</h1>
                    <div className="content">
                        <Todo tasks = {this.state.tasks.todo} onAdd = {this.onAdd}
                        onDelete={this.onDelete} onChange={this.saveChanges}
						onReorder={this.onReorder}/>
                        <InProgress tasks = {this.state.tasks.inprogress} onAdd = {this.onAdd}
                        onDelete={this.onDelete} onChange={this.saveChanges}
						onReorder={this.onReorder}/>
                        <Blocked tasks = {this.state.tasks.blocked} onAdd = {this.onAdd}
                        onDelete={this.onDelete} onChange={this.saveChanges}
						onReorder={this.onReorder}/>
                        <Completed tasks = {this.state.tasks.completed} onAdd = {this.onAdd}
                        onDelete={this.onDelete} onChange={this.saveChanges}
						onReorder={this.onReorder}/>
                    </div>
                </div>
            </DndProvider>
        )
    }

    onDelete(type, id){
        this.setState((prev) => ({
                    tasks: {
                        ...prev.tasks,
                        [type]: prev.tasks[type].filter((task) => task.id !== id)
                    }
                }))
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
    }

    saveChanges(type, id, text) {
        this.setState(prevState => {
            const updatedTasks = { ...prevState.tasks }
            const updatedArray = [...updatedTasks[type]]
            updatedArray[id - 1] = {
            ...updatedArray[id - 1],
            task: text
            }
            updatedTasks[type] = updatedArray
            localStorage.setItem("tasks", JSON.stringify(updatedTasks))
            return { tasks: updatedTasks }
        })
    }

    getFreeId(tasks){
        let freeId
        let found = false
        for (let i = 1; i < tasks.length+1; i++){
            for(let j = 0; j < tasks.length; j++){
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
        this.setState((prev) => {
            return {
                tasks:{
                    ...prev.tasks,
                    [type]: [
                        ...prev.tasks[type],
                        {id: this.getFreeId(this.state.tasks[type]),
                        task: `New ${type} task ${this.getFreeId(this.state.tasks[type])}`},
                    ]
                }
            }
        })
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks))
    }
}

export default App
