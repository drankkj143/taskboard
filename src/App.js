import React from "react"
import Todo from "./components/Todo"
import InProgress from "./components/InProgress"
import Blocked from "./components/Blocked"
import Completed from "./components/Completed"
import Task from "./components/Task"
import ThemeButton from "./components/ThemeButton"

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"


class App extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            isLight: true,
            tasks:{todo:[],inprogress:[],blocked:[],completed:[]}
        }

        this.onAdd = this.onAdd.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.saveChanges = this.saveChanges.bind(this)
        this.changeTheme = this.changeTheme.bind(this)
    }


    componentDidMount() {
        try
        {
            const tasks = JSON.parse(localStorage.getItem('tasks'))
            const theme = JSON.parse(localStorage.getItem('theme'))
            if (tasks !== null)
                this.setState({tasks:tasks})
            else this.setState({tasks:{
                    todo: [{id: 1, task: "Task1"},{id: 2, task: "Task2"},],
                    inprogress: [{id: 1, task: "Task1"},{id: 2, task: "Task2"},],
                    blocked: [{id: 1, task: "Task1"},{id: 2, task: "Task2"},], 
                    completed: [{id: 1, task: "Task1"},{id: 2, task: "Task2"},],
            }})

            if (theme !== null)
                this.setState({isLight: theme})
        } catch(ex){
            this.setState({tasks:{
                    todo: [{id: 1, task: "Task1"},{id: 2, task: "Task2"},],
                    inprogress: [{id: 1, task: "Task1"},{id: 2, task: "Task2"},],
                    blocked: [{id: 1, task: "Task1"},{id: 2, task: "Task2"},], 
                    completed: [{id: 1, task: "Task1"},{id: 2, task: "Task2"},],
            }})
            this.setState({isLight: true})
        }
    }

    componentDidUpdate(_, prev){
        if (prev.isLight !== this.state.isLight){
            localStorage.setItem("theme", JSON.stringify(this.state.isLight))
            document.body.style.backgroundColor = this.state.isLight ? "#f5f5f5" : "#1a202c"
        }
    }

    render(){
        return (
            <div className={this.state.isLight ? "ui-theme-light" : "ui-theme-dark"}>
                <h1>Welcome to TaskBoard</h1>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="content">
                        {Object.keys(this.state.tasks).map((columnId) => (
                            <Droppable droppableId={columnId} key={columnId}>
                            {(provided) => (
                                <div
                                className="todo-block"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                >
                                {columnId === "todo" && <Todo {...this.getColumnProps("todo")} />}
                                {columnId === "inprogress" && <InProgress {...this.getColumnProps("inprogress")} />}
                                {columnId === "blocked" && <Blocked {...this.getColumnProps("blocked")} />}
                                {columnId === "completed" && <Completed {...this.getColumnProps("completed")} />}

                                <div className="tasks">
                                    {this.state.tasks[columnId].map((task, index) => (
                                    <Draggable
                                    key={`${columnId}-${task.id}`}
                                    draggableId={`${columnId}-${task.id}-${index}`}
                                    index={index}
                                    >
                                        {(provided) => (
                                            <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            >
                                            <Task
                                                onDelete={this.onDelete}
                                                type={columnId}
                                                id={task.id}
                                                text={task.task}
                                                onChange={this.saveChanges}
                                            />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                </div>
                                {provided.placeholder}
                                </div>
                            )}
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>
                <ThemeButton changeTheme={this.changeTheme} isLight={this.state.isLight}/>
            </div>
            
        )
    }

    changeTheme(isLight){
        this.setState({isLight: isLight})
    }

    onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const sourceCol = source.droppableId;
        const destCol = destination.droppableId;

        const sourceTasks = Array.from(this.state.tasks[sourceCol]);
        const destTasks = Array.from(this.state.tasks[destCol]);

        const [movedTask] = sourceTasks.splice(source.index, 1);

        if (sourceCol === destCol) {
            sourceTasks.splice(destination.index, 0, movedTask);
            this.setState(
            (prev) => ({
                tasks: { ...prev.tasks, [sourceCol]: sourceTasks },
            }),
            () => localStorage.setItem("tasks", JSON.stringify(this.state.tasks))
            );
        } else {
            destTasks.splice(destination.index, 0, movedTask);
            this.setState(
            (prev) => ({
                tasks: {
                ...prev.tasks,
                [sourceCol]: sourceTasks,
                [destCol]: destTasks,
                },
            }),
            () => localStorage.setItem("tasks", JSON.stringify(this.state.tasks))
            );
        }
    };


    getColumnProps(type) {
        return {
            tasks: this.state.tasks[type],
            onAdd: this.onAdd,
            onDelete: this.onDelete,
            onChange: this.saveChanges,
        };
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
            const taskIndex = updatedArray.findIndex(t => t.id === id)
            if (taskIndex !== -1) {
            updatedArray[taskIndex] = {
                ...updatedArray[taskIndex],
                task: text
            }
            }
            updatedTasks[type] = updatedArray
            return { tasks: updatedTasks }
        }, () => localStorage.setItem("tasks", JSON.stringify(this.state.tasks)))
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
