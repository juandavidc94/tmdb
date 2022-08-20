import React, { useState, useEffect } from 'react';
import './App.css';
import MovieBox from './components/MovieBox';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import Pagination from './components/Pagination'
const API_URL = "https://rec9d6i0yh.execute-api.us-east-1.amazonaws.com/develop/movies";

function App() {

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(({ body: { results } }) => {
        setMovies(results);
      })
  }, [])

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = movies.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">

        <Container fluid>
          <Navbar.Brand href="/">MovieDb App</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>

          <Navbar.Collapse id="nabarScroll">
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images8.alphacoders.com/103/1030999.png"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Thor</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images8.alphacoders.com/815/815755.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Spiderman</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images8.alphacoders.com/487/487170.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Spiderman</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        {movies.length ? (
          <div className="container">
            <div className="grid">
              {currentPosts.map((movieReq) =>
                <MovieBox key={movieReq.id} {...movieReq} />)}
            </div>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={movies.length}
              paginate={paginate}
            />
          </div>
        ) : (
          <h2>No se encuentran peliculas :(</h2>
        )}
      </div>
    </>

  );
}

export default App;
