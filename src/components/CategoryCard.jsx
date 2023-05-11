import {  Card, IconButton, Stack, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

const CategoryCard = ({id,name, handleDeleteCategory})=>{
   return <Card sx={{px: 3}}>
    <Stack direction='row' alignItems='center'>
      <Typography>
        {name}
      </Typography>
      <IconButton>
  <EditIcon />
      </IconButton>
      <IconButton onClick={()=>{handleDeleteCategory(id)}}>
  <DeleteIcon />
      </IconButton>
    </Stack>
  </Card>
}
CategoryCard.propTypes = {
  id: PropTypes.string, 
  name: PropTypes.string,
  handleDeleteCategory: PropTypes.func, 
};

export default CategoryCard