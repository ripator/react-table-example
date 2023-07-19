import React from 'react';
import { TableRow, TableCell, Checkbox, Box, IconButton, Typography } from '@mui/material';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { convertBytesToMBs, formatDate } from '../helpers';
import {
   toggleCheckbox,
   openModal,
 } from '../store/actions';
import NameInput from './NameInput';

const BaseTableBody = (props) => {

   const { data, toggleCheckbox, openModal } = props;
   const navigate = useNavigate();

   const statuses = {
      completed: "DONE",
      progress: "IN PROGRESS",
      paused: "PAUSED",
   };

   const styles = {
      completed: {
         color: "chartreuse",
      },
      progress: {
         color: "aqua",
      },
      paused: {
         color: "gray",
      },
   };
   
  const handleOpenModal = (e, rowName, stepName) => {
      e.stopPropagation();
      openModal({rowName, stepName});
   };

   const handleCheckboxToggle = (e, rowId) => {
      e.stopPropagation();
      toggleCheckbox(rowId);
   };
  
   
   const handleRowClick = (row) => {
      navigate(`/details/${row.id}`);
      localStorage.setItem('detail', JSON.stringify(row));
   };

    
   return data.map((row) => (
      <TableRow 
        key={row.id}
        hover
        sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
        onClick={() => handleRowClick(row)}>
        <TableCell size="small">
          <Checkbox 
          inputProps={{'aria-label': 'row-checkbox'}} 
          checked={row.checked || false} 
          color="secondary"
          onClick={(e) => handleCheckboxToggle(e, row.id)} />
        </TableCell>
        <TableCell size="small">
          {row && (<NameInput row={row} />)}
        </TableCell>
        <TableCell size="small">{formatDate(row.updated_at)}</TableCell>
        <TableCell size="small">{convertBytesToMBs(row.storage)}</TableCell>
        <TableCell size="small" align="center" justifycontent="center">
            <Typography variant="caption" sx={styles[(row.status).toLowerCase()]}>
               {statuses[(row.status).toLowerCase()]}
            </Typography>
            </TableCell>
        <TableCell size="small">
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
               {
               row.steps.map((step) => (
                  <IconButton 
                  key={step.index} 
                  onClick={(e) => handleOpenModal(e, row.name, step.automation_name)}
                  sx={{ padding: '3px', border: '1px solid aliceblue', borderRadius: '3px', marginLeft: 1 }}>
                     <img 
                     style={{  height: '30px', width: '30px', float: 'left', objectFit: 'cover'}} 
                     src={step.automation_icon_url} 
                     alt={step.automation_name} />
                  </IconButton>
               ))
               }

               <IconButton 
               onClick={(e) => handleOpenModal(e, row.name, 'Download')} 
               disabled={row.status !== 'completed'} 
               color="darkgray">
               <FileUploadOutlinedIcon />
               </IconButton>
               <IconButton onClick={(e) => handleOpenModal(e, row.name, 'Learn More')} color="darkgray">
               <MoreVertOutlinedIcon />
               </IconButton>
          </Box>
        </TableCell>
        
      </TableRow>
    ));
};

const mapStateToProps = (state) => ({
   tableData: state.tableData,
 });
 
 const mapDispatchToProps = {
   toggleCheckbox,
   openModal,
 };
 
 export default connect(mapStateToProps, mapDispatchToProps)(BaseTableBody);