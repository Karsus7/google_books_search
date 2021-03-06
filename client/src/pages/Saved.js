// Basic code taken from 18-React\01-Activities\23-Stu_PupsterApp\Solved\src\pages\Search.js
// Provides the code for the Saved page, to be exported to App.js
import React, { Component } from "react";
import API from "../utils/API";
import { Container, Row, Col } from "../components/Grid";
import { BookList, BookListItem } from "../components/List";

class Save extends Component {

    // state is an empty array provided for savedBooks
    state = {
        savedBooks: []
    };

    // loads saved books when Saved page loads
    // Taken from 18-React\01-Activities\20-Stu_AJAX\Solved\src\components\OmdbContainer.js
    componentDidMount() {
        this.loadBooks();
    };

    // "event" required due to syntax, not actually doing anything
    loadBooks = event => {

        API.getBooks()
            .then(res => {
                this.setState({ savedBooks: res.data }, function () {
                    console.log(this.state.savedBooks);
                })
            })
            .catch(err => console.log(err))
    };

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col size="xs-12">
                            <BookList>
                                {this.state.savedBooks.map(book => {
                                    return (
                                        // List of saved books details
                                        <BookListItem
                                            key={book._id}
                                            title={book.title}
                                            authors={book.authors}
                                            link={book.link}
                                            description={book.description}
                                            image={book.image}
                                            id={book._id}
                                            loadBooks={this.loadBooks}
                                        />
                                    );
                                })}
                            </BookList>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    };

};

export default Save;