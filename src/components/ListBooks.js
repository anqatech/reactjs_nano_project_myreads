import React from "react";
import BookShelf from "./BookShelf";
import * as BooksAPI from '../BooksAPI'


class ListBooks extends React.Component {
    // state = {
    //     currentlyReadingList: [
    //         {
    //             bookCoverURL: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")',
    //             bookTitle: 'To Kill a Mockingbird',
    //             bookAuthor: 'Harper Lee',
    //             shelf: 'currentlyReading'
    //         },
    //         {
    //             bookCoverURL: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")',
    //             bookTitle: "Ender's Game",
    //             bookAuthor: 'Orson Scott Card',
    //             shelf: 'currentlyReading'
    //         }
    //     ],
    //     wantToReadList: [
    //         {
    //             bookCoverURL: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")',
    //             bookTitle: '1776',
    //             bookAuthor: 'David McCullough',
    //             shelf: 'wantToRead'
    //         },
    //         {
    //             bookCoverURL: 'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")',
    //             bookTitle: "Harry Potter and the Sorcerer's Stone",
    //             bookAuthor: 'J.K. Rowling',
    //             shelf: 'wantToRead'
    //         }
    //     ],
    //     readList: [
    //         {
    //             bookCoverURL: 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")',
    //             bookTitle: 'The Hobbit',
    //             bookAuthor: 'J.R.R. Tolkien',
    //             shelf: 'read'
    //         },
    //         {
    //             bookCoverURL: 'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")',
    //             bookTitle: "Oh, the Places You'll Go!",
    //             bookAuthor: 'Seuss',
    //             shelf: 'read'
    //         },
    //         {
    //             bookCoverURL: 'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")',
    //             bookTitle: 'The Adventures of Tom Sawyer',
    //             bookAuthor: 'Mark Twain',
    //             shelf: 'read'
    //         }
    //     ]
    // }

    state = {
        currentlyReadingList: [],
        wantToReadList: [],
        readList: []
    }

    tempFunction = rawData => {
        const data = rawData.map(book => ({
            bookCoverURL: book.imageLinks.thumbnail,
            bookTitle: book.title,
            bookAuthor: book.authors.join(', '),
            shelf: book.shelf
        }))

        this.setState(previousSate => ({
            currentlyReadingList: data.filter(book => book.shelf === 'currentlyReading'),
            wantToReadList: data.filter(book => book.shelf === 'wantToRead'),
            readList: data.filter(book => book.shelf === 'read')
        }))

        let currentlyReadingList = data.filter(book => book.shelf === 'currentlyReading')
        let wantToReadList = data.filter(book => book.shelf === 'wantToRead')
        let readList = data.filter(book => book.shelf === 'read')

        console.log(currentlyReadingList)
        console.log(wantToReadList)
        console.log(readList)
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then(books => {
                this.tempFunction(books)
            })
    }

    render() {
        return (
            <div className="list-books">
                <header className="list-books-title">
                    <h1>MyReads</h1>
                </header>
                <div className="list-books-content">
                    <div>
                        <BookShelf 
                            shelfTitle='Currently Reading'
                            bookList={ this.state.currentlyReadingList }
                        />

                        <BookShelf 
                            shelfTitle='Want to Read'
                            bookList={ this.state.wantToReadList }
                        />

                        <BookShelf 
                            shelfTitle='Read'
                            bookList={ this.state.readList }
                        />
                    </div>
                </div>
                <div className="open-search">
                <button onClick={ () => this.props.toggleShowSearchPage() }>Add a book</button>
                </div>
            </div>
        )
    }
}

export default ListBooks
