import { ALL_TOGGLE_CHECKBOX, CLOSE_MODAL, OPEN_MODAL, SET_TABLE_DATA, SORT_TABLE_DATA, TOGGLE_CHECKBOX, TOGGLE_STATUS, UPDATE_NAME } from "./actionTypes";

export const setTableData = (data) => ({
   type: SET_TABLE_DATA,
   payload: data,
 });
 
 export const sortTableData = (column, direction) => ({
   type: SORT_TABLE_DATA,
   payload: { column, direction },
 });
 
 export const toggleCheckbox = (rowId) => ({
   type: TOGGLE_CHECKBOX,
   payload: rowId,
 });

 export const allToggleCheckbox = (isChecked) => ({
   type: ALL_TOGGLE_CHECKBOX,
   payload: isChecked,
 });
 
 export const updateName = (rowId, newName) => ({
   type: UPDATE_NAME,
   payload: { rowId, newName },
 });

 export const toggleStatus = (rowId) => ({
   type: TOGGLE_STATUS,
   payload: { rowId },
 });

 export const openModal = (modalDetails) => ({
   type: OPEN_MODAL,
   payload: { modalDetails },
 });

 export const closeModal = () => ({
   type: CLOSE_MODAL,
 });