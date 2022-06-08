import React from "react";
import { Button, Table } from "reactstrap";
import PropTypes from 'prop-types'

// Row Item
const RowItem = ({ todo, toggleSelect, toggleComplete }) => {
    return (
        <tr>
            <td scope="row">
                <input
                    type='checkbox'
                    id={todo.id}
                    checked={todo.isSelect}
                    onChange={() => toggleSelect(todo.id)}
                />
            </td>
            <td>
                {todo.time.toDateString()}
            </td>
            <td>{todo.text}</td>
            <td>
                <Button className="ml-auto" color={todo.isComplete ? "danger" : "success"} onClick={() => toggleComplete(todo.id)}>
                    {todo.isComplete ? "Completed" : "Running "}
                </Button>
            </td>
        </tr>
    )
}

RowItem.propType = {
    todo: PropTypes.object.isRequired,
    toggleSelect: PropTypes.func.isRequired,
    toggleComplete: PropTypes.func.isRequired
}

const TableView = ({ todos, toggleSelect, toggleComplete }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Time</th>
                    <th>To Do</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {todos.map(todo => (
                    <RowItem
                        key={todo.id}
                        todo={todo}
                        toggleSelect={toggleSelect}
                        toggleComplete={toggleComplete}
                    />
                ))}
            </tbody>
        </Table>
    )
}

TableView.propType = {
    todos: PropTypes.object.isRequired,
    toggleSelect: PropTypes.func.isRequired,
    toggleComplete: PropTypes.func.isRequired
}

export default TableView;