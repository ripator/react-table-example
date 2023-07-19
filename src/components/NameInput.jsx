import React, { useState } from 'react';
import { Box, TextField, IconButton, Typography } from '@mui/material';
import { connect } from 'react-redux';
import {
   updateName, toggleStatus
 } from '../store/actions';
 import DoneIcon from '@mui/icons-material/Done';
 import CloseIcon from '@mui/icons-material/Close';
 import PlayCircleIcon from '@mui/icons-material/PlayCircle';
 import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import Tags from './Tags';
import { PROGRESS } from '../constants';

const NameInput = (props) => {
   const { row, updateName, toggleStatus } = props
   const [isNameInputOpen, setIsNameInputOpen] = useState(false);
   const [inputValue, setInputValue] = useState(row.name);


   const openNameInput = (e) => {
      e.stopPropagation();
      setIsNameInputOpen(true);
   };

   const handleNameChange = (event) => {
      const newName = event.target.value;
      setInputValue(newName)
   };

   const handleUpdateName = () => {
      updateName(row.id, inputValue);
      setIsNameInputOpen(false);
   };

   const handleToggleStatus = (e, rowId) => {
      e.stopPropagation();
      toggleStatus(rowId);
   };

   return (
      <Box display="flex" flexDirection="row" alignItems="center">
         <IconButton color="secondary" onClick={(e) => handleToggleStatus(e, row.id)}>
            {
               row.status === PROGRESS ? (
                  <PauseCircleIcon />
               ) : (
                  <PlayCircleIcon />
               )
            }
            
         </IconButton>
         {
            !isNameInputOpen && (
               <Box display="flex" flexDirection="row" alignItems="center">
                  <Box onClick={(e) => openNameInput(e)}>
                     <Typography variant="subtitle2">{row.name}</Typography>
                  </Box>
                  {
                     row.tags !== null && (
                        <Tags tags={row.tags} />
                     )
                  }
               </Box>
              
            )
          }
          {
            isNameInputOpen &&  (
               <Box display="flex" flexDirection="row" onClick={(e) => e.stopPropagation()}>
                  <Box sx={{ width: 300 }}>
                     <TextField 
                     color="secondary" 
                     size="small"
                     fullWidth onChange={(e) => handleNameChange(e)} 
                     value={inputValue} />
                  </Box>
                  <IconButton onClick={() => handleUpdateName()} color="secondary">
                     <DoneIcon />
                  </IconButton>
                  <IconButton onClick={() => setIsNameInputOpen(false)}>
                     <CloseIcon />
                  </IconButton>
               </Box>
              
            )
          }

      </Box>
   )
};

const mapStateToProps = (state) => ({
   tableData: state.tableData,
});

const mapDispatchToProps = {
   updateName,
   toggleStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(NameInput);