import BookList from '../BookList/BookList';
import BookForm from '../BookForm/BookForm';
import {useEffect} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import './App.css';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1a237e'
    },
    secondary: {
      main: '#9fa8da'
    }
  }
})

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Getting books on page load:
    getBooks();
  }, []) // Empty array  means run only once at load!


  // TODO - GET Book List from server

  const getBooks = () => {
    console.log('In getBooks');
    // Axios call to DB to import:
    axios.get('/books')
      .then(response => {
        // response.data is the data from the DB.  (result.rows on server side)
        // At least for this week, this is where we sent data to redux.
        // Redux has to be synchronous, so we have to wait for the .then
        dispatch({
          type: 'SET_BOOKS',
          payload: response.data
        }) // End dispatch
      }) // End .then
      .catch(error => {
        console.log('Error in /books GET:', error);
      }); // End .catch
  } // End getBooks

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header><h1>Books w/ Redux!</h1></header>
        <main>
          <BookForm getBooks={getBooks} />
          <BookList />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;