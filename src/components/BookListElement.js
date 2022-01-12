import React from "react";
import MoveDropdown from "./MoveDropdown";


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
                    <MoveDropdown 
                        id={ id }
                        shelf={ shelf }
                        handleShelfChange={ this.props.handleShelfChange }
                    />
                </div>
                <div className="book-title">{ bookTitle }</div>
                <div className="book-authors">{ bookAuthor }</div>
            </div>
        )
    }
}

export default BookListElement
