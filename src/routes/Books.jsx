import { Box, IconButton, Modal, TextField, Typography } from '@mui/material';
import BookCard from '../components/BookCard';
import styles from './Books.module.css';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';

export default function Books() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addBookName, setAddBookName] = useState('');
  const [addBookDescription, setAddBookDescription] = useState('');
  const [addBookAuthorId, setAddBookAuthorId] = useState(''); 
  const [addBookCategories, setAddBookCategories] = useState('');
  const [editBookId, setEditBookId] = useState('');
  const [editBookName, setEditBookName] = useState('');
  const [editBookDescription, setEditBookDescription] = useState('');
  const [editBookAuthorId, setEditBookAuthorId] = useState(''); 
  const [editBookCategories, setEditBookCategories] = useState([]);
  const localStorageData = JSON.parse(localStorage.getItem('books'));
  const [localData, setLocalData] = useState(localStorageData === null ? [] : Object.entries(localStorageData));

  const handleDeleteBook = (id) => {
    const updatedData = localData.filter((book) => book[0] !== id);
    setLocalData(updatedData);
    localStorage.setItem('books', JSON.stringify(Object.fromEntries(updatedData)));
  };

  const handleEditBook = (id, name, description, author, categories) => {
    setEditModalVisible(true);
    setEditBookId(id);
    setEditBookName(name);
    setEditBookDescription(description);
    setEditBookAuthorId(author); 
    setEditBookCategories(categories);
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setEditBookId('');
    setEditBookName('');
    setEditBookDescription('');
    setEditBookAuthorId(''); 
    setEditBookCategories([]);
  };

  const handleSaveBook = () => {
    const updatedBook = {
      name: editBookName,
      description: editBookDescription,
      author: editBookAuthorId, 
      categories: editBookCategories,
    };

    const updatedData = localData.map((book) => {
      if (book[0] === editBookId) {
        return [book[0], updatedBook];
      }
      return book;
    });

    setLocalData(updatedData);
    localStorage.setItem('books', JSON.stringify(Object.fromEntries(updatedData)));

    handleCancelEdit();
  };

  const authorOptions = [];
  for (let i = 1; i <= 10; i++) {
    const author = {
      id: i,
      name: `Author ${i}`,
    };
    authorOptions.push(author);
  }

  return (
    <>
      <div className={styles.pageContainer}>
        <Typography variant="h3">Books</Typography>
        <div className={styles.cardContainer}>
          {localData.length ? (
            localData.map((book) => (
              <BookCard
                id={book[0]}
                name={book[1].name}
                description={book[1].description}
                author={book[1].author.name}
                categories={Object.values(book[1].categories)}
                key={book[0]}
                handleDeleteBook={handleDeleteBook}
                handleEditBook={handleEditBook}
              />
            ))
          ) : (
            <Typography>There are no books</Typography>
          )}
        </div>
        <IconButton onClick={() => setAddModalVisible(true)}>
          <AddIcon />
        </IconButton>
        <Modal open={addModalVisible} onClose={() => setAddModalVisible(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add a Book
            </Typography>
            <TextField
              value={addBookName}
              onChange={(e) => setAddBookName(e.target.value)}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
            <TextField
              value={addBookDescription}
              onChange={(e) => setAddBookDescription(e.target.value)}
              id="outlined-basic"
              label="Description"
              variant="outlined"
            />
            <TextField
              value={addBookAuthorId} 
              onChange={(e) => setAddBookAuthorId(e.target.value)} 
              id="outlined-basic"
              label="Author"
              variant="outlined"
            />
            <TextField
              value={addBookCategories}
              onChange={(e) =>
                setAddBookCategories(e.target.value.split(',').map((category) => category.trim()))
              }
              id="outlined-basic"
              label="Categories"
              variant="outlined"
            />
            <IconButton
              onClick={() => {
                const entryID = Date.now().toString();
                const localDataCopy = [...localData];
                localDataCopy.push([
                  entryID,
                  {
                    name: addBookName,
                    description: addBookDescription,
                    author: addBookAuthorId, 
                    categories: addBookCategories,
                  },
                ]);
                setLocalData(localDataCopy);
                localStorage.setItem('books', JSON.stringify(Object.fromEntries(localDataCopy)));
                setAddBookName('');
                setAddBookDescription('');
                setAddBookAuthorId(''); 
                setAddBookCategories('');
                setAddModalVisible(false);
              }}
            >
              <SaveIcon />
            </IconButton>
          </Box>
        </Modal>
        <Modal open={editModalVisible} onClose={handleCancelEdit}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Book
            </Typography>
            <TextField
              value={editBookName || ''}
              onChange={(e) => setEditBookName(e.target.value)}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
            <TextField
              value={editBookDescription || ''}
              onChange={(e) => setEditBookDescription(e.target.value)}
              id="outlined-basic"
              label="Description"
              variant="outlined"
            />
            <TextField
              value={editBookAuthorId || ''}
              onChange={(e) => setEditBookAuthorId(e.target.value)}
              id="outlined-basic"
              label="Author"
              variant="outlined"
            />
            <TextField
              value={editBookCategories || ''}
              onChange={(e) => setEditBookCategories(e.target.value.split(',').map((category) => category.trim()))}
              id="outlined-basic"
              label="Categories"
              variant="outlined"
            />
            <IconButton onClick={handleSaveBook}>
              <SaveIcon />
            </IconButton>
          </Box>
        </Modal>
      </div>
    </>
  );
}