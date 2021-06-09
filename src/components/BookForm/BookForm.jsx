import { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';


function BookForm({ getBooks }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    console.log(`Adding book`, { title, author });

    // TODO - axios request to server to add book
    axios.post('/books', { title, author })
      .then(response => {
        // Empty inputs:
        setTitle('');
        setAuthor('');
        // Have to trigger .get after .post:
        // STILL USING PROPS?!
        getBooks();
      })
      .catch(error => {
        console.log('Error in /books post:', error);
      })

  };

  return (
    <section>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <TextField
          required
          label="Title"
          placeholder="Title"
          variant="outlined"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <TextField
          required
          label="Author"
          placeholder="Author"
          variant="outlined"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />

        <button type="submit">
          Add Book
        </button>
      </form>
      <Button variant="contained" color="primary">
        Primary
        </Button>
      <Button variant="contained" color="secondary">
        Secondary
        </Button>
    </section>
  );
}

export default BookForm;