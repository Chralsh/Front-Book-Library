import { Card, IconButton, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

const BookCard = ({ id, name, description, author, categories, handleDeleteBook, handleEditBook }) => {
  const handleEdit = () => {
    handleEditBook(id);
  };

  return (
    <Card sx={{ px: 3 }}>
      <Stack direction="row" alignItems="center">
        <Typography key="name">{name}</Typography>
        <Typography key="description">{description}</Typography>
        <Typography key="author">{author}</Typography>
        {categories.map((category, index) => (
          <Typography key={index}>{category.name}</Typography>
        ))}
        <IconButton key="editButton" onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton key="deleteButton" onClick={() => handleDeleteBook(id)}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Card>
  );
};

BookCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
  categories: PropTypes.array,
  handleDeleteBook: PropTypes.func,
  handleEditBook: PropTypes.func,
};

export default BookCard;