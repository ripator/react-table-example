import { PROGRESS } from "../constants";
import { ALL_TOGGLE_CHECKBOX, CLOSE_MODAL, OPEN_MODAL, SET_TABLE_DATA, SORT_TABLE_DATA, TOGGLE_CHECKBOX, TOGGLE_STATUS, UPDATE_NAME } from "./actionTypes";

const initialState = {
   tableData: [],
   isModalOpen: false,
   modalDetails: {rowName: '', stepName: ''},
 };
 
 const tableReducer = (state = initialState, action) => {
   switch (action.type) {
     case SET_TABLE_DATA:
       return {
         ...state,
         tableData: action.payload,
       };
     case SORT_TABLE_DATA:
      const { column, direction } = action.payload;
        const sortedData = [...state.tableData].sort((a, b) => {
          if (direction === 'asc') {
            return a[column] > b[column] ? 1 : -1;
          } else if (direction === 'desc') {
            return a[column] < b[column] ? 1 : -1;
          }
          return 0;
        });
 
       return {
         ...state,
         tableData: sortedData,
       };
     case TOGGLE_CHECKBOX:
       const updatedData = state.tableData.map((row) =>
         row.id === action.payload ? { ...row, checked: !row.checked } : row
       );
       return {
         ...state,
         tableData: updatedData,
       };
     case ALL_TOGGLE_CHECKBOX:
       const allCheckedData = state.tableData.map((row) =>(
         { ...row, checked: action.payload }
       ));
       return {
         ...state,
         tableData: allCheckedData,
       };
     case UPDATE_NAME:
       const { rowId, newName } = action.payload;
       const updatedNameData = state.tableData.map((row) =>
         row.id === rowId ? { ...row, name: newName } : row
       );
       return {
         ...state,
         tableData: updatedNameData,
       };
     case TOGGLE_STATUS:
         const newStatusData = state.tableData.map((row) => {
         const savedStatus = row.status;
         const inProgress = PROGRESS;
         
         if ( row.id === action.payload.rowId && row.status !== inProgress ) {
            return { ...row, status: inProgress, prevStatus: savedStatus };
         }
         if ( row.id === action.payload.rowId && row.status === inProgress ) {
            return { ...row, status: row.prevStatus, prevStatus: inProgress};
         }
         return {...row};
        });
         return {
            ...state,
            tableData: newStatusData,
         };

      case OPEN_MODAL:
         const { modalDetails } = action.payload;
         return {
            ...state,
            isModalOpen: true,
            modalDetails: {rowName: modalDetails.rowName, stepName: modalDetails.stepName},
         };
         
      case CLOSE_MODAL:
         return {
            ...state,
            isModalOpen: false,
            modalDetails: {rowName: '', stepName: ''},
         };      
     default:
       return state;
   }
 };
 
 export default tableReducer;