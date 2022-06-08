import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import shortid from "shortid";
import Controller from "../controllers";
import CreateToDoForm from "../createTodoForm";
import ListView from "../listview";
import TableView from "../tableview";

class Todos extends React.Component {

    state = {
        todos: [
            {
                id: 'kjsdfh',
                time: new Date(),
                text: 'Main Title',
                description: 'aldkjf ikrf',
                isComplete: false,
                isSelect: false,
            },
            {
                id: 'kksdfh',
                time: new Date(),
                text: 'Main Title 2',
                description: 'aldkjf saedrf ikrf',
                isComplete: false,
                isSelect: false,
            }
        ],
        isOpenToDoForm: false,
        searchTerm: '',
        view: 'list'
    }
    toggleSelect = toDoId => {
        const todos = [...this.state.todos]
        const todo = todos.find(t => t.id === toDoId)
        todo.isSelect = !todo.isSelect
        this.setState({ todos })
    }
    toggleComplete = toDoId => {
        const todos = [...this.state.todos]
        const todo = todos.find(t => t.id === toDoId)
        todo.isComplete = !todo.isComplete
        this.setState({ todos })
    }
    toggleForm = () => {
        this.setState({
            isOpenToDoForm: !this.state.isOpenToDoForm
        })
    }
    handleSearch = value => {
        this.setState({ searchTerm: value })
    }
    performSearch = () => {
        return this.state.todos.filter(todo => todo.text.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    }
    createTodo = todo => {
        todo.id = shortid.generate()
        todo.time = new Date()
        todo.isComplete = false
        todo.isSelect = false

        const todos = [todo, ...this.state.todos]
        this.setState({ todos })
        this.toggleForm()
    }
    handleFilter = () => { }
    changeView = e => {
        this.setState({
            view: e.target.value
        })
    }
    clearSelected = () => { }
    clearCompleted = () => { }
    reset = () => { }
    getView = () => {
        let todos = this.performSearch()
        return this.state.view === 'list' ? (
            <ListView
                todos={todos}
                toggleSelect={this.toggleSelect}
                toggleComplete={this.toggleComplete}
            />
        ) : (
            <TableView
                todos={todos}
                toggleSelect={this.toggleSelect}
                toggleComplete={this.toggleComplete}
            />
        )
    }

    render() {
        return (
            <div>
                <h1 className="display-4 text-center mb-5">To Do App</h1>
                <Controller
                    term={this.state.searchTerm}
                    toggleForm={this.toggleForm}
                    handleSearch={this.handleSearch}
                    view={this.state.view}
                    changeView={this.changeView}
                    handleFilter={this.handleFilter}
                    clearSelected={this.clearSelected}
                    clearCompleted={this.clearCompleted}
                    reset={this.reset}
                />
                <div>
                    {this.getView()}
                </div>

                <Modal isOpen={this.state.isOpenToDoForm} toggle={this.state.toggleForm}>
                    <ModalHeader toggle={this.toggleForm}>
                        Create New To Do Item
                    </ModalHeader>
                    <ModalBody>
                        <CreateToDoForm createTodo={this.createTodo} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Todos;