import { Box, IconButton, Modal, TextField, Typography } from '@mui/material';
import CategoryCard from '../components/categoryCard';
import styles from './Categories.module.css';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';

export default function Categories() {
  // localStorage.clear()
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [addCategoryValue, setAddCategoryValue] = useState('');
  const [addCategoryPriority, setAddCategoryPriority] = useState('');
  const localStorageData = JSON.parse(localStorage.getItem('categories'));
  const [localData, setLocalData] = useState(localStorageData === null ? [] : Object.entries(localStorageData));

  const handleDeleteCategory = id => {
    const updatedData = localData.filter(category => category[0] !== id);
    setLocalData(updatedData);
    localStorage.setItem('categories', JSON.stringify(Object.fromEntries(updatedData)));
  };
  

  return (
    <>
      <div className={styles.pageContainer}>
        <Typography variant='h3'>Categories</Typography>
        <div className={styles.cardContainer}>
          {localData.length ? (
            localData.map(category => (
              <CategoryCard id={category[0]} name={category[1]} key={category[0]} handleDeleteCategory={handleDeleteCategory} />
            ))
          ) : (
            <Typography>There are no categories</Typography>
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
              Add a category
            </Typography>
            <TextField
              value={addCategoryValue}
              onChange={e => setAddCategoryValue(e.target.value)}
              id="outlined-basic"
              label="Category"
              variant="outlined"
            />
            <TextField
              value={addCategoryPriority}
              onChange={e => setAddCategoryPriority(e.target.value)}
              id="outlined-basic"
              label="Priority"
              variant="outlined"
            />
            <IconButton
              onClick={() => {
                const entryID = Date.now().toString();
                const localDataCopy = [...localData];
                localDataCopy.push([entryID, addCategoryValue]);
                setLocalData(localDataCopy);
                localStorage.setItem('categories', JSON.stringify(Object.fromEntries(localDataCopy)));
                }}
                >
                <SaveIcon />
                </IconButton>
                </Box>
                </Modal>
                </div>
                </>
                );
                }