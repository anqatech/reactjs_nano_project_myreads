import React from "react";


class MoveDropdown extends React.Component {
    render() {
        const { id, shelf } = this.props

        return (
            <div className="book-shelf-changer">
                <select name={ id } value={ shelf } onChange={ this.props.handleShelfChange }>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default MoveDropdown
