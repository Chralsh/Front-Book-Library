import { Box, IconButton, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import AuthorCard from '../components/AuthorCard';
import styles from './Authors.module.css';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';


export default function Authors() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addAuthorName, setAddAuthorName] = useState('');
  const [addAuthorBio, setAddAuthorBio] = useState('');

  const [authorsData, setAuthorsData] = useState([]);

  const handleAddAuthor = () => {
    const newAuthor = {
      id: Date.now().toString(),
      name: addAuthorName,
      bio: addAuthorBio,
      createdAt: new Date().toISOString(),
      createdBy: 'admin', // Replace with the actual admin's ID or username
    };
    
    const clearLocalStorage = () => {
      localStorage.clear();
    };
    window.addEventListener('beforeunload', clearLocalStorage);

    const updatedAuthorsData = [...authorsData, newAuthor];
    setAuthorsData(updatedAuthorsData);

    // Clear input fields
    setAddAuthorName('');
    setAddAuthorBio('');

    // Close the modal
    setAddModalVisible(false);
  };

  const handleDeleteAuthor = (id) => {
    const updatedAuthorsData = authorsData.filter((author) => author.id !== id);
    setAuthorsData(updatedAuthorsData);
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <Typography variant="h3">Authors</Typography>
        <div className={styles.cardContainer}>
          {authorsData.length ? (
            authorsData.map((author) => (
              <AuthorCard
                id={author.id}
                name={author.name}
                bio={author.bio}
                key={author.id}
                handleDeleteAuthor={handleDeleteAuthor}
              />
            ))
          ) : (
            <Typography>There are no authors</Typography>
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
              Add an Author
            </Typography>
            <TextField
              value={addAuthorName}
              onChange={(e) => setAddAuthorName(e.target.value)}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
            <TextField
              value={addAuthorBio}
              onChange={(e) => setAddAuthorBio(e.target.value)}
              id="outlined-basic"
              label="Bio"
              variant="outlined"
            />
            <IconButton onClick={handleAddAuthor}>
              <SaveIcon />
            </IconButton>
          </Box>
        </Modal>
      </div>
    </>
  );
}