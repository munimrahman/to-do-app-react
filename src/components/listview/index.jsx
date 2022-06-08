import React from "react";
import { ListGroupItem, Button, ListGroup } from "reactstrap";
import PropTypes from 'prop-types'

// List Items Component
const ListItem = ({ todo, toggleSelect, toggleComplete }) => {
    return (
        <ListGroupItem className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
                <div>
                    <input
                        type='checkbox'
                        id={todo.id}
                        checked={todo.isSelect}
                        onChange={() => toggleSelect(todo.id)}
                    />
                </div>
                <div className="mx-4">
                    <h4>{todo.text}</h4>
                    <p>{todo.time.toDateString()}</p>
                </div>
            </div>
            <Button className="ml-auto" color={todo.isComplete ? "danger" : "success"} onClick={() => toggleComplete(todo.id)}>
                {todo.isComplete ? "Completed" : "Running "}
            </Button>
        </ListGroupItem>
    )
}

ListItem.propType = {
    todo: PropTypes.object.isRequired,
    toggleSelect: PropTypes.func.isRequired,
    toggleComplete: PropTypes.func.isRequired
}

const ListView = ({ todos, toggleSelect, toggleComplete }) => {
    return (
        <ListGroup>
            {todos.map(todo => (
                <ListItem
                    key={todo.id}
                    todo={todo}
                    toggleSelect={toggleSelect}
                    toggleComplete={toggleComplete}
                />
            ))}
        </ListGroup>
    )
}

ListView.propType = {
    todos: PropTypes.object.isRequired,
    toggleSelect: PropTypes.func.isRequired,
    toggleComplete: PropTypes.func.isRequired
}

export default ListView;