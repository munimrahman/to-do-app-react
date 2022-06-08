import React from "react";
import { Button, Input } from "reactstrap";
import PropTypes from 'prop-types'

const Search = ({ term, handleSearch, toggleForm }) => {
    return (
        <div className="d-flex">
            <Input
                placeholder="Enter Your Search Term"
                className="mr-3"
                value={term}
                onChange={e => handleSearch(e.target.value)}
            />
            <Button color="success" onClick={toggleForm}>
                New
            </Button>
        </div>
    )
}

Search.propTypes = {
    term: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired,
    toggleForm: PropTypes.func.isRequired
}

export default Search;