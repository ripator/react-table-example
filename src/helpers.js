export const convertBytesToMBs = (value) => {
   if (!value) {
      return "0 MB";
   }

   let formattedValue = Math.floor(value / 1000000);
   if (!Number.isInteger(formattedValue)) {
      return `${formattedValue.toFixed(2)} MB`;
   }
   return `${formattedValue} MB`
};

export const formatDate = (value) => {
   const fullDate = new Date(Number(value));
   const year = fullDate.getFullYear();
   const date = fullDate.getDate();
   const month = fullDate.toLocaleString('default', { month: 'short' });

   return `${date} ${month}, ${year}`;
}