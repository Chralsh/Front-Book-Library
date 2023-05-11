import { Card, IconButton, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

const AuthorCard = ({ id, name, bio, handleDeleteAuthor }) => {
  return (
    <Card sx={{ px: 3 }}>
      <Stack direction="row" alignItems="center">
        <Typography>{name}</Typography>
        <Typography>{bio}</Typography>
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDeleteAuthor(id)}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Card>
  );
};
AuthorCard.propTypes = {
  id: PropTypes.string, 
  name: PropTypes.string,
  bio: PropTypes.string,
  handleDeleteAuthor: PropTypes.func, 
};

export default AuthorCard;
