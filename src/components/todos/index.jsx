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
                id: 'kks54dfh',
                time: new Date(),
                text: 'Salman Emon',
                description: 'aldkjf saedrf ikrf',
                isComplete: false,
                isSelect: false,
            },
            {
                id: 'kksdjhgbkjfh',
                time: new Date(),
                text: 'Azad Hossain',
                description: 'aldkjf saedrf ikrf',
                isComplete: false,
                isSelect: false,
            },
            {
                id: '41saa',
                time: new Date(),
                text: 'Munim Rahman',
                description: 'aldkjf saedrf ikrf',
                isComplete: false,
                isSelect: false,
            }
        ],
        isOpenToDoForm: false,
        searchTerm: '',
        view: 'list',
        filter: 'all'
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
    handleFilter = filter => {
        this.setState({ filter })
    }
    performFilter = todos => {
        const { filter } = this.state;
        if (filter === 'completed') {
            return todos.filter(todo => todo.isComplete)
        } else if (filter === 'running') {
            return todos.filter(todo => !todo.isComplete)
        } else {
            return todos
        }
    }
    changeView = e => {
        this.setState({
            view: e.target.value
        })
    }
    clearSelected = () => {
        const todos = this.state.todos.filter(todo => !todo.isSelect)
        this.setState({ todos })
    }
    clearCompleted = () => {
        const todos = this.state.todos.filter(todo => !todo.isComplete)
        this.setState({ todos })
    }
    reset = () => {
        this.setState({
            isOpenToDoForm: false,
            searchTerm: '',
            view: 'list',
            filter: 'all'
        })
    }
    getView = () => {
        let todos = this.performSearch()
        todos = this.performFilter(todos)
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