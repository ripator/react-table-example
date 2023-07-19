import React from 'react';
import { Paper, Button } from "@mui/material"
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { convertBytesToMBs, formatDate } from '../helpers';

const Details = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tableData } = props;
  const rowData = tableData.find((row) => row.id === parseInt(id, 10)) || JSON.parse(localStorage.getItem('detail'));

  const navigateBack = () => {
    navigate(-1);
  }

  return (
    <div>
      <Button variant="contained"  color="secondary"
      onClick={() => navigateBack()}>
        Back
      </Button>
      {
        !rowData ? (
          <div>Data not found.</div>
        ) : (
          <Paper style={{ padding: "2em", marginTop: "3em" }}>
            <h2>{rowData.name}</h2>
            <p>Modified: {formatDate(rowData.updated_at)}</p>
            <p>Storage: {convertBytesToMBs(rowData.storage)}</p>
            <p>Status: {rowData.status}</p>
          </Paper>
      
        )
      }
    
    </div>
  );
};

const mapStateToProps = (state) => ({
  tableData: state.tableData,
});

export default connect(mapStateToProps)(Details);