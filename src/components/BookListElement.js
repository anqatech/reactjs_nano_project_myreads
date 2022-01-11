import React from "react";


class BookListElement extends React.Component {
    render() {
        const { id, bookCoverURL, bookTitle, bookAuthor, shelf } = this.props.book

        return (
            <div className="book">
                <div className="book-top">
                    <div 
                        className="book-cover" 
                        style={{ width: 128, height: 193, backgroundImage: bookCoverURL }}
                    ></div>
                    <div className="book-shelf-changer">
                        <select name={ id } value={ shelf } onChange={ this.props.handleShelfChange }>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{ bookTitle }</div>
                <div className="book-authors">{ bookAuthor }</div>
            </div>

        )
    }
}

export default BookListElement
