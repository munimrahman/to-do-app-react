import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import PropTypes from 'prop-types'

class CreateToDoForm extends React.Component {
    state = {
        text: '',
        description: ''
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        this.props.createTodo(this.state)
        e.target.reset()
        this.setState({
            text: '',
            description: ''
        })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Enter Task</Label>
                    <Input
                        placeholder="Do Some Code"
                        name="text"
                        value={this.state.text}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Describe Task</Label>
                    <Input
                        type="textarea"
                        placeholder="Write Some Short Description Your Task"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <Button type="submit">Create Task</Button>
            </Form>
        );
    }
}

CreateToDoForm.propTypes = {
    createTodo: PropTypes.func.isRequired
}

export default CreateToDoForm;