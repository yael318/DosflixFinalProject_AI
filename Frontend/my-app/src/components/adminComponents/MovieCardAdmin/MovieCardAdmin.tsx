
// // import {
// //   Card,
// //   CardMedia,
// //   CardContent,
// //   Typography,
// //   Box,
// //   IconButton,
// //   CardActions,
// //   Tooltip
// // } from "@mui/material";
// // import EditIcon from "@mui/icons-material/Edit";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import { MovieObject } from "../../../models/Movie";

// // interface Props {
// //   movie: MovieObject;
// //   onEdit: () => void;
// //   onDelete: () => void;
// // }

// // const MovieCardAdmin = ({ movie, onEdit, onDelete }: Props) => {
// //   return (
// //     <Card sx={{ width: 280, borderRadius: 3, boxShadow: 3, overflow: "hidden" }}>
// //       {/* תמונה */}
// //       <CardMedia
// //         component="img"
// //         height="160"
// //         image={movie.Image || "https://via.placeholder.com/280x160?text=No+Image"}
// //         alt={movie.Name}
// //         sx={{ objectFit: "cover" }}
// //       />

// //       {/* תוכן */}
// //       <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
// //         <Typography variant="h6" fontWeight="bold" color="primary">
// //           {movie.Name}
// //         </Typography>

// //         <Typography variant="body2" color="text.secondary" noWrap>
// //           {movie.Description}
// //         </Typography>

// //         <Box display="flex" justifyContent="space-between" mt={1}>
// //           <Typography variant="body2">אורך: {movie.LengthMinutes} דק'</Typography>
// //           <Typography variant="body2">
// //             ₪{(movie.PriceBase ?? 0) + (movie.PricePerExtraView ?? 0) + (movie.PricePerExtraViewer ?? 0)}
// //           </Typography>
// //         </Box>

// //         <Typography variant="caption" color="text.secondary">
// //           מספר צפיות: {movie.TotalViews ?? 0}
// //         </Typography>
// //       </CardContent>

// //       {/* פעולות */}
// //       <CardActions disableSpacing sx={{ justifyContent: "flex-end", px: 1 }}>
// //         <Tooltip title="עריכה">
// //           <IconButton onClick={onEdit} color="primary">
// //             <EditIcon />
// //           </IconButton>
// //         </Tooltip>
// //         <Tooltip title="מחיקה">
// //           <IconButton onClick={onDelete} color="error">
// //             <DeleteIcon />
// //           </IconButton>
// //         </Tooltip>
// //       </CardActions>
// //     </Card>
// //   );
// // };

// // export default MovieCardAdmin;
// import {
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Box,
//   IconButton,
//   CardActions,
//   Tooltip
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { MovieObject,MovieUpdateDTO } from "../../../models/Movie";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// type MovieCardAdminProps = {
//   movie: MovieObject;
//   onEdit: (updatedMovie: MovieUpdateDTO) => void;
//   onDelete: () => void;
// };


// export const MovieCardAdmin = ({ movie, onEdit, onDelete }: MovieCardAdminProps) => {
//   return (
//     <Card
//       sx={{
//         backgroundColor: '#f8fafc',
//         color: '#3e3e3e',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         boxShadow: 6,
//         borderRadius: 4,
//         overflow: 'hidden',
//         transition: 'transform 0.3s',
//         '&:hover': {
//           transform: 'scale(1.05)',
//           boxShadow: 12,
//         }
//       }}
//     >
//       <CardMedia
//         component="img"
//         height="190"
//         image={movie.Image}
//         alt={movie.Name}
//       />
//       <CardContent sx={{ flexGrow: 1, overflow: 'hidden' }}>
//         <Typography
//           gutterBottom
//           variant="h6"
//           component="div"
//           dir="rtl"
//           sx={{
//             color: '#3e3e3e',
//             display: '-webkit-box',
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: 'vertical',
//             overflow: 'hidden',
//           }}
//         >
//         </Typography>

//         <Box sx={{ height: 80, overflow: 'hidden', textOverflow: 'ellipsis' }}>
//           <Typography
//             variant="body2"
//             color="text.secondary"
//             dir="rtl"
//             sx={{ fontSize: 14, lineHeight: 1.4, color: '#3e3e3e' }}
//           >
//             {movie.Description}
//           </Typography>
//         </Box>

//         <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} dir="rtl">
//           <Box display="flex" alignItems="center" gap={0.5}>
//             <VisibilityIcon sx={{ fontSize: 18, color: '#3e3e3e' }} />
//             <Typography variant="body2" sx={{ fontSize: 13, color: '#3e3e3e' }}>
//               {movie.TotalViews}
//             </Typography>
//           </Box>
//           <Box display="flex" alignItems="center" gap={0.5}>
//             <AccessTimeIcon sx={{ fontSize: 18, color: '#3e3e3e' }} />
//             <Typography variant="body2" sx={{ fontSize: 13, color: '#3e3e3e' }}>
//               {movie.LengthMinutes} דקות
//             </Typography>
//           </Box>
//         </Box>
//         <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} dir="ltr">
//           <Typography
//             variant="h6"
//             dir="ltr"
//             sx={{
//               display: 'inline-block',
//               px: 1.5,
//               py: 0.5,
//               backgroundColor: '#b8399a41',
//               borderRadius: 1,
//               fontWeight: 'bold',
//               color: '#3e3e3e',
//               fontSize: '0.875rem',
//             }}
//           >
//             ₪{movie.PriceBase }  מחיר בסיסי 
//        </Typography>
//         </Box>
//       </CardContent>


//       {/* כפתורי עריכה ומחיקה */}
//       <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 1 }}>
//         <Box></Box>
//         <Box>
//           <Tooltip title="עריכה">
//             <IconButton onClick={onEdit} color="primary">
//               <EditIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="מחיקה">
//             <IconButton onClick={onDelete} color="error">
//               <DeleteIcon />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </CardActions>

//     </Card>
//   )

// };

// export default MovieCardAdmin;
// import {
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Box,
//   IconButton,
//   CardActions,
//   TextField,
//   Tooltip,
//   Button
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Close";
// import { useState } from "react";
// import { MovieObject, MovieUpdateDTO } from "../../../models/Movie";

// type MovieCardAdminProps = {
//   movie: MovieObject;
//   onEdit: (updatedMovie: MovieUpdateDTO) => void;
//   onDelete: () => void;
// };

// const MovieCardAdmin = ({ movie, onEdit, onDelete }: MovieCardAdminProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedMovie, setEditedMovie] = useState<MovieUpdateDTO>({
//     Id: movie.Id,
//     Name: movie.Name,
//     Description: movie.Description,
//     PriceBase: movie.PriceBase,
//     LengthMinutes: movie.LengthMinutes,
//     MovieLink: movie.MovieLink,
//     Image: movie.Image,
//   });

//   // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const { name, value } = e.target;
//   //   setEditedMovie(prev => ({
//   //     ...prev,
//   //     [name]: name === "PriceBase" || name === "LengthMinutes" ? Number(value) : value,
//   //   }));
//   // };

//   // const handleSave = () => {
//   //   onEdit(editedMovie);
//   //   setIsEditing(false);
//   // };

//   // const handleCancel = () => {
//   //   setIsEditing(false);
//   //   setEditedMovie({
//   //     Id: movie.Id,
//   //     Name: movie.Name,
//   //     Description: movie.Description,
//   //     PriceBase: movie.PriceBase,
//   //     LengthMinutes: movie.LengthMinutes,
//   //     MovieLink: movie.MovieLink,
//   //     Image: movie.Image,
//   //   });
//   // };
// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const { name, value } = e.target;
//   console.log(`[MovieCardAdmin] handleChange: ${name} = ${value}`);
//   setEditedMovie(prev => ({
//     ...prev,
//     [name]: name === "PriceBase" || name === "LengthMinutes" ? Number(value) : value,
//   }));
// };

// const handleSave = () => {
//   console.log('[MovieCardAdmin] handleSave called with:', editedMovie);
//   onEdit(editedMovie);
//   setIsEditing(false);
// };

// const handleCancel = () => {
//   console.log('[MovieCardAdmin] handleCancel called, resetting editedMovie');
//   setIsEditing(false);
//   setEditedMovie({
//     Id: movie.Id,
//     Name: movie.Name,
//     Description: movie.Description,
//     PriceBase: movie.PriceBase,
//     LengthMinutes: movie.LengthMinutes,
//     MovieLink: movie.MovieLink,
//     Image: movie.Image,
//   });
// };

//   return (
//     <Card sx={{ width: 250, display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: 6 }}>
//       <CardMedia
//         component="img"
//         height="160"
//         image={editedMovie.Image}
//         alt={movie.Name}
//       />
//       <CardContent dir="rtl" sx={{ flexGrow: 1 }}>
//         {isEditing ? (
//           <>
//             <TextField
//               fullWidth
//               name="Name"
//               label="שם הסרט"
//               value={editedMovie.Name}
//               onChange={handleChange}
//               variant="standard"
//               inputProps={{ dir: "rtl" }}
//             />
//             <TextField
//               fullWidth
//               name="Description"
//               label="תיאור"
//               value={editedMovie.Description}
//               onChange={handleChange}
//               variant="standard"
//               multiline
//               rows={2}
//               inputProps={{ dir: "rtl" }}
//             />
//             <TextField
//               fullWidth
//               name="PriceBase"
//               label="מחיר"
//               type="number"
//               value={editedMovie.PriceBase}
//               onChange={handleChange}
//               variant="standard"
//               inputProps={{ dir: "rtl" }}
//             />
//             <TextField
//               fullWidth
//               name="LengthMinutes"
//               label="אורך בדקות"
//               type="number"
//               value={editedMovie.LengthMinutes}
//               onChange={handleChange}
//               variant="standard"
//               inputProps={{ dir: "rtl" }}
//             />
//           </>
//         ) : (
//           <>
//             <Typography variant="h6" fontWeight="bold" gutterBottom>{movie.Name}</Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40 }}>
//               {movie.Description}
//             </Typography>
//             <Typography variant="caption">⏱ {movie.LengthMinutes} דקות</Typography><br />
//             <Typography variant="caption">💰 ₪{movie.PriceBase}</Typography>
//           </>
//         )}
//       </CardContent>

//       <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 1 }}>
//         {isEditing ? (
//           <>
//             <IconButton onClick={handleSave} color="success">
//               <SaveIcon />
//             </IconButton>
//             <IconButton onClick={handleCancel} color="inherit">
//               <CancelIcon />
//             </IconButton>
//           </>
//         ) : (
//           <>
//             <IconButton onClick={() => setIsEditing(true)} color="primary">
//               <EditIcon />
//             </IconButton>
//             <IconButton onClick={onDelete} color="error">
//               <DeleteIcon />
//             </IconButton>
//           </>
//         )}
//       </CardActions>
//     </Card>
//   );
// };

// export default MovieCardAdmin;
import {
  Card, CardMedia, CardContent, Typography,
  TextField, CardActions, IconButton
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import { MovieObject, MovieUpdateDTO } from "../../../models/Movie";

interface Props {
  movie: MovieObject;
  onEdit: (updatedMovie: MovieUpdateDTO) => void;
  onDelete: () => void;
}

const MovieCardAdmin = ({ movie, onEdit, onDelete }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMovie, setEditedMovie] = useState<MovieUpdateDTO>({
    Id: movie.Id,
    Name: movie.Name,
    Description: movie.Description,
    PriceBase: movie.PriceBase,
    LengthMinutes: movie.LengthMinutes,
    MovieLink: movie.MovieLink,
    Image: movie.Image,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedMovie(prev => ({
      ...prev,
      [name]: name === "PriceBase" || name === "LengthMinutes" ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    onEdit(editedMovie);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedMovie({
      Id: movie.Id,
      Name: movie.Name,
      Description: movie.Description,
      PriceBase: movie.PriceBase,
      LengthMinutes: movie.LengthMinutes,
      MovieLink: movie.MovieLink,
      Image: movie.Image,
    });
  };

  return (
    <Card sx={{ width: 250, borderRadius: 3, boxShadow: 6 }}>
      <CardMedia
        component="img"
        height="160"
        image={editedMovie.Image}
        alt={movie.Name}
      />
      <CardContent dir="rtl">
        {isEditing ? (
          <>
            <TextField fullWidth name="Name" label="שם הסרט" value={editedMovie.Name} onChange={handleChange} variant="standard" />
            <TextField fullWidth name="Description" label="תיאור" value={editedMovie.Description} onChange={handleChange} variant="standard" />
            <TextField fullWidth name="PriceBase" label="מחיר" type="number" value={editedMovie.PriceBase} onChange={handleChange} variant="standard" />
            <TextField fullWidth name="LengthMinutes" label="אורך בדקות" type="number" value={editedMovie.LengthMinutes} onChange={handleChange} variant="standard" />
          </>
        ) : (
          <>
            <Typography variant="h6">{movie.Name}</Typography>
            <Typography variant="body2" color="text.secondary">{movie.Description}</Typography>
            <Typography variant="caption">⏱ {movie.LengthMinutes} דקות</Typography><br />
            <Typography variant="caption">💰 ₪{movie.PriceBase}</Typography>
          </>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        {isEditing ? (
          <>
            <IconButton onClick={handleSave} color="success"><SaveIcon /></IconButton>
            <IconButton onClick={handleCancel}><CancelIcon /></IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={() => setIsEditing(true)} color="primary"><EditIcon /></IconButton>
            <IconButton onClick={onDelete} color="error"><DeleteIcon /></IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default MovieCardAdmin;
