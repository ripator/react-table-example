import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  setTableData,
  sortTableData,
  toggleCheckbox,
  allToggleCheckbox,
  closeModal,
} from '../store/actions';
import { 
  Checkbox,
  Pagination,
  TableContainer,
  Table as TableComponent,
  TableBody, TableHead,
  TableRow,
  TableCell,
  Paper,
  Box,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Modal,
} from '@mui/material';
import mockData from '../data.json';
import BaseTableBody from './BaseTableBody';

const Table = (props) => {
  const {
    tableData,
    setTableData,
    sortTableData,
    allToggleCheckbox,
    closeModal,
    isModalOpen,
    modalDetails,
  } = props;

  const columns = {
    name: 'Name',
    updated_at: 'Modified',
    storage: 'Storage',
    status: 'Status',
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const [sortConfig, setSortConfig] = useState({ column: '', direction: '' });
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [localMockData] = useState(mockData);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstIemIndex = lastItemIndex - itemsPerPage;
  const currentRows = tableData.slice(firstIemIndex, lastItemIndex);

  // Simulated API call to fetch table data
  useEffect(() => {
    const mockAPICall = setTimeout(() => {
      const data = localMockData;
      setTableData(data);
    }, 1000);

    return () => clearTimeout(mockAPICall);
  }, [setTableData, localMockData]);

  const handleSort = (column) => {
    let direction = 'asc';
    if (sortConfig.column === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ column, direction });
    sortTableData(column, direction);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    if (currentPage > totalPages -1) {
      setCurrentPage(1);
    }
  };

  const handleAllCheckboxToggle = () => {
    setIsAllChecked(!isAllChecked);
    allToggleCheckbox(!isAllChecked);
  };

  const renderTableHeader = () => {
    const columnsKeys = Object.keys(columns);
    const columnsValues = Object.values(columns);

    return columnsKeys.map((column, index) => (
      <TableCell key={column} onClick={() => handleSort(column)}>
        <Box display="flex" flexDirection="row" alignItems="flex-end">
          <Typography variant='subtitle2'>{columnsValues[index]}{' '}</Typography>
          {sortConfig.column === column && (
            <Box pl={1}>{sortConfig.direction === 'asc' ? '↑' : '↓'}</Box>
          )}
        </Box>
        
      </TableCell>
    ));
  };


  return (
    <Box>
      <TableContainer component={Paper}>
        <TableComponent sx={{ minWidth: 650 }} aria-label="table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox 
                  checked={isAllChecked}
                  onClick={() => handleAllCheckboxToggle()} 
                  color="secondary"
                  inputProps={{'aria-label': 'header-checkbox'}}
                />
              </TableCell>
              {renderTableHeader()}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {
              tableData && (
                <BaseTableBody data={currentRows} />
              )
            }
          </TableBody>
        </TableComponent>
      </TableContainer>

      <Box display="grid" gridTemplateColumns="1fr 1fr" gridTemplateRows="auto" mt={3}>
        <Box justifySelf="end" alignSelf="center">
           <Pagination 
           count={totalPages} 
           variant="outlined" 
           color="secondary" 
           shape="rounded" onChange={(e, value) => handlePageChange(value)}/> 
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center" justifySelf="end">
          <Typography variant='subtitle2' mr={2} ml={1}>Rows per page:</Typography>
          <FormControl sx={{ minWidth: 80 }} size='small'>
            <Select
              value={itemsPerPage}
              color="secondary"
              onChange={handleRowsPerPageChange}>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
          </Select>
          </FormControl>
          
        </Box>
      </Box>
      <Modal open={isModalOpen} onClose={closeModal}>
          <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, p: 4 }}>
            <Typography variant='h5'>{modalDetails.rowName}</Typography>
            <Typography variant='subtitle2'>{modalDetails.stepName}</Typography>
          </Paper>
        </Modal>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  tableData: state.tableData,
  modalDetails: state.modalDetails,
  isModalOpen: state.isModalOpen,
});

const mapDispatchToProps = {
  setTableData,
  sortTableData,
  toggleCheckbox,
  allToggleCheckbox,
  closeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);