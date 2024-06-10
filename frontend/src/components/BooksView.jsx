import React, {useEffect, useState} from 'react'
import './booksview.css'

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../graphql/Queries";


const BooksView = () => {
    const { data } = useQuery(GET_BOOKS);
    
    const [allBooks, setAllbooks] = useState([])
    const [searchTitle, setSearchTitle] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [displayedBooksCount, setDisplayedBooksCount] = useState(10);
  
    useEffect(()=>{
        if (data) {
            setAllbooks(data?.books)
        }
    }, [data])


    useEffect(() => {
        if (searchTitle.trim() === '') {
            setFilteredBooks(allBooks);
        } else {
            const filtered = allBooks.filter(book =>
                book.title.toLowerCase().includes(searchTitle.toLowerCase())
            );
            setFilteredBooks(filtered);
        }
    }, [searchTitle, allBooks]);


    const handleSearchInputChange = (e) => {
        setSearchTitle(e.target.value);
    };

    const handleAddNewBook = (book) => {
        setSearchTitle('')
        setAllbooks([book, ...allBooks])
    };

    const handleLoadMoreBooks = () => {
        setDisplayedBooksCount(prevCount => prevCount + 10);
    };

    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        height: '200px',
      }));

    return (
    <div className='main-container'>
        
    <h1 className='container-title'><span>Tiny Tales:</span> Books for Little Dreamers</h1>

    <div className='search-book-section'>
            <input type='text' className="search-book-input" value={searchTitle} onChange={handleSearchInputChange}
              placeholder='Find book i.e title' />
            {searchTitle?
            <Grid item xs={14} md={6} className='search-list-section'>
                <List dense={true}>
                {filteredBooks.length > 0?
                    filteredBooks.map((book, index) => 
                        <ListItem secondaryAction={
                            <button className='add-book-btn' onClick={()=>handleAddNewBook(book)}>Add book</button>
                        } key={index} className='book-item'>
                        <ListItemText primary={book.title}
                            secondary={`by ${book.author}`}/>
                        </ListItem>,
                    ) : <p id='not-found-info'>Book with title "{searchTitle}" not found!</p>
            } 
                </List>
            </Grid> : ''
            }
    </div>

         
    <Box sx={{ width: '100%', paddingBottom: '50px' }}>
            <Grid container spacing={1}>
                {allBooks.slice(0, displayedBooksCount).map((book, index) => 
                    <Grid item xs={12} sm={6} md={4} lg={2} xl={2} key={index}>
                        <Item>
                            <img src={`../${book?.coverPhotoURL}`} alt="book-cover" id='book-cover'/>
                            <p id='book-title'>{book?.title}</p>
                            <div className='book-author-level'>
                                <p id="book-author">by {book?.author}</p>
                                <p id="book-author">level: {book?.readingLevel}</p>
                            </div>
                        </Item>
                    </Grid>
                )}
            </Grid>
            {displayedBooksCount < allBooks.length && (
                <div className='load-more-section'>
                    <button className='load-more-btn' onClick={handleLoadMoreBooks}>Load More</button>
                </div>
            )}
        </Box>


        </div>
    )


}
export default BooksView