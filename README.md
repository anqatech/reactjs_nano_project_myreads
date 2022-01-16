# MyReads: A Book Tracking App

This is my solution for the first of 2 project challenges to validate and obtain the ReactJS Nanodegree at Udacity.

## DESCRIPTION

This is a library tracking app that categorizes books you have read, are currently reading or want to read. This web app is made of 2 pages, Home and Search. The Home page displays book descriptions in 3 distinct shelves named:

* Currently Reading
* Want to  Read
* Read

The Search page has an input field at the top and automatically displays book descriptions corresponding to the query being typed.

## How to Install and Run the Project

To get started with the app right away just follow these 2 easy steps:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## How to Use the Project

On the Home page you can move a book to a different shelf by using the dropdown attached to it. You can also remove a book from your personal library by selecting the None option of the dropdown. To add a new book you can go to the Search page and use the input field to query it, and when displayed you can use the dropdown menu to effectively move the searched book to one of the three shelves of the Home page.

## Project Code Structure

```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon.
│   └── index.html
└── src
    ├── components # React components used to render the home and search page.
        ├── BookListElement.js # 
        ├── BookShelf.js # Shelf where book descriptions are sitting
        ├── ListBooks.js # Page displaying 3 book shelves
        ├── MoveDropdown.js # Individual book dropdown menu for shelf move
        └── SearchBooks.js # Page for book search
    ├── App.css # Styles for the app.
    ├── App.js # This is the root of the app.
    ├── App.test.js # Used for testing.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend.
    ├── icons # Helpful images for the app.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. 
    └── index.js # This is used for DOM rendering only.
```

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
