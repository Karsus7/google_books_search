// Code for Search page
import React, { Component } from "react";
import API from "../utils/API";
import { Container, Row, Col } from "../components/Grid";
import { BookList, BookListItem } from "../components/List";
import { Input, SearchButton } from "../components/Input";

class Search extends Component {

    // instatiate state for list of books retrieved from googlebooks api and bookSearch value
    state = {
        books: [],
        bookSearch: ""
    };

    handleInputChange = event => {
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        const { name, value } = event.target;
        this.setState({ [name]: value })
    };

    handleFormSubmit = event => {
        // When the form is submitted, prevent its default behavior, get book update the books state
        event.preventDefault();

        // calls googlebooks api and returns searched book when search button is clicked
        API.searchBooks(this.state.bookSearch)
            .then(res => {
                this.setState({ books: res.data.items }, function () {
                    console.log(this.state.books);
                })
            })
            .catch(err => console.log(err))
    };

    // Much of the below code is derived from 20-MERN\01-Activities\02-Stu_Recipes\Unsolved\client\src\App.js
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col size="md-12">
                            <form>
                                <Container>
                                    <Row>
                                        <Col size="xs-12 sm-12">
                                            <Input
                                                name="bookSearch"
                                                value={this.state.bookSearch}
                                                onChange={this.handleInputChange}
                                                placeholder="Search for a Book"
                                            />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col size="xs-12 sm-12">
                                            <SearchButton
                                                onClick={this.handleFormSubmit}
                                                type="success"
                                                className="input-lg"
                                            >
                                                Search
                                            </SearchButton>
                                        </Col>
                                    </Row>
                                </Container>
                            </form>
                        </Col>
                    </Row>
                    <Row>
                        <Col size="xs-12">
                            <BookList>
                                {this.state.books.map(book => {
                                    return (
                                        <BookListItem
                                            key={book.id}
                                            title={book.volumeInfo.title}
                                            authors={book.volumeInfo.authors}
                                            link={book.volumeInfo.infoLink}
                                            description={book.volumeInfo.description}
                                            image={book.volumeInfo.imageLinks.thumbnail}
                                        />);
                                })}
                            </BookList>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    };

};

export default Search;