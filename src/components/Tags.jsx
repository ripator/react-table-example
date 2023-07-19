import React from 'react';
import { Stack, Chip } from '@mui/material';


const Tags = (props) => {
   const { tags } = props;
   const visibleCount = 2;

   const chipStyle = {
      borderRadius: "5px",
      backgroundColor:"rgba(243, 93, 93, 0.2)",
      color: "rgba(243, 93, 93, 1)",
      fontWeight: 600,
   };
    
   return (
     <Stack direction="row" spacing={1} pl={1}>
       {
         tags.slice(0, visibleCount).map((tag) => (
           <Chip sx={chipStyle} key={tag.id} size="small" label={tag.name} />
         ))
       }
       {
         tags.length > visibleCount && (
           <Chip sx={chipStyle} size="small" label={`+ ${tags.length - visibleCount}`} />
         )
       }
     </Stack>
   )
}

export default Tags;
