
// import {
//   Box, Button, Typography, Dialog, DialogTitle,
//   DialogContent, TextField,Grid
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../myStore";
// import MovieCardAdmin from "../MovieCardAdmin/MovieCardAdmin";
// import { AgeGroup, CategoryGroup, MovieObject, MovieCreateDTO, MovieUpdateDTO } from "../../../models/Movie";
// import axios from 'axios';

// export const MovieListAdmin = () => {
//   const user = useSelector((state: RootState) => state.auth);
//   const [movies, setMovies] = useState<MovieObject[]>([]);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
//   const [searchText, setSearchText] = useState("");
//   const [selectedAgeGroup, setSelectedAgeGroup] = useState("all");

//   const [newMovie, setNewMovie] = useState<MovieCreateDTO>({
//     Name: "סרט חדש",
//     Description: "",
//     CodeCategory: 1,
//     AgeGroup: 2,
//     HasWoman: false,
//     LengthMinutes: 90,
//     ProductionDate: "2024-01-01", // בפורמט yyyy-MM-dd
//     PriceBase: 20,
//     PricePerExtraViewer: 5,
//     PricePerExtraView: 3,
//     MovieLink: "https://youtube.com/example",
//     Image: ""
//   });
// const fetchMovies = () => {
//   fetch("https://localhost:7229/DosFlix/Movies")
//     .then(res => res.json())
//     .then(data => {
//       setMovies(data);
//       console.log("🎬 סרטים שהתקבלו:", data);
//     })
//     .catch(err => console.error("שגיאה בטעינת הסרטים:", err));
// };

// useEffect(() => {
//   fetchMovies();
// }, []);



//   if (!user?.role || user.role !== 'admin') return null;
//   const handleChange = (e: React.ChangeEvent<any>) => {
//     const target = e.target;
//     const name = target.name;
//     const type = target.type;
//     let newValue: any;

//     if (type === 'checkbox') {
//       newValue = (target as HTMLInputElement).checked;
//     } else if (type === 'number') {
//       newValue = Number(target.value);
//     } else if (name === 'AgeGroup' || name === 'CategoryGroup') {
//       newValue = Number(target.value);
//     } else {
//       newValue = target.value;
//     }

//     setNewMovie(prev => ({ ...prev, [name]: newValue }));
//   };


//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewMovie(prev => ({ ...prev, ProductionDate: e.target.value }));
//   };





//   const filteredMovies = movies.filter(movie => {
//     const price = (movie.PriceBase ?? 0) + (movie.PricePerExtraView ?? 0) + (movie.PricePerExtraViewer ?? 0);
//     return (
//       (movie.Name?.includes(searchText) || movie.Description?.includes(searchText)) &&
//       (selectedAgeGroup === "all" || movie.AgeGroupName === selectedAgeGroup) &&
//       price >= priceRange[0] && price <= priceRange[1]
//     );
//   });

//   const handleSubmit = async () => {
//     try {
//       console.log("📦 שולחת סרט חדש:", newMovie); // ← הדפיסי את האובייקט שנשלח
//       const response = await axios.post("https://localhost:7229/DosFlix/movies",newMovie);
//       const createdMovie = response.data;
//     fetchMovies(); // ← זה ימשוך מהשרת את כל הרשימה כולל הסרט החדש

//       //setMovies(prev => [...prev, createdMovie]);
//       setDialogOpen(false);
//       setNewMovie({
//         Name: "סרט חדש",
//         Description: "",
//         CodeCategory: 1,
//         AgeGroup: 2,
//         HasWoman: false,
//         LengthMinutes: 90,
//         ProductionDate: "2024-01-01", // בפורמט yyyy-MM-dd
//         PriceBase: 20,
//         PricePerExtraViewer: 5,
//         PricePerExtraView: 3,
//         MovieLink: "https://youtube.com/example",
//         Image: ""
//       });
//       console.log("🆔 ID של הסרט החדש:", createdMovie.Id);
//       setMovies(prev => [...prev, createdMovie]); // זה מוסיף אותו לרשימה כולל ה-ID

//     } catch (err: any) {
//       console.error("שגיאה בשמירת הסרט:", err);
//       alert("אירעה שגיאה בעת שמירת הסרט. בדקי את הנתונים או את השרת.");
//     }
//   };


//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`https://localhost:7229/DosFlix/movies/${id}`);
//       setMovies(prev => prev.filter(movie => movie.Id !== id)); // הסרה מרשימה
//     } catch (err) {
//       console.error("מחיקה נכשלה", err);
//       alert("מחיקה נכשלה");
//     }
//   };

//   // const handleEdit = async (updatedMovie: MovieObject) => {
//   //   try {
//   //     await axios.put(`https://localhost:7229/DosFlix/movies/${updatedMovie.Id}`, updatedMovie);
//   //     setMovies(prev => prev.map(movie => movie.Id === updatedMovie.Id ? updatedMovie : movie));
//   //   } catch (err) {
//   //     console.error("עדכון נכשל", err);
//   //     alert("עדכון נכשל");
//   //   }
//   // };
// const handleEdit = async (updatedMovie: MovieUpdateDTO) => {
//   console.log('[Parent] handleEditMovie called with:', updatedMovie);
//   try {
//     // כאן את מבצעת את הקריאה לשרת או עדכון הסטייט המקומי
//     // למשל:
//     // await api.updateMovie(updatedMovie);

//     // עדכון הסטייט המקומי - דוגמה
//     setMovies(prevMovies => prevMovies.map(m => m.Id === updatedMovie.Id ? {...m, ...updatedMovie} : m));
//     console.log('[Parent] Movie updated successfully');
//   } catch (error) {
//     console.error('[Parent] Error updating movie:', error);
//   }
// };

//   return (
//     <Box sx={{ padding: 3, mt: '8vh' }}>
//       <div dir="rtl" className="bg-white rounded-xl p-4 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="חיפוש סרטים..."
//           value={searchText}
//           onChange={e => setSearchText(e.target.value)}
//           className="p-2 border border-gray-300 rounded"
//         />

//         <select
//           value={selectedAgeGroup}
//           onChange={e => setSelectedAgeGroup(e.target.value)}
//           className="p-2 border border-gray-300 rounded"
//         >
//           <option value="all">בחר קבוצת גיל</option>
//           <option value={AgeGroup.Babies}>תינוקות</option>
//           <option value={AgeGroup.Children}>ילדים</option>
//           <option value={AgeGroup.Teens}>נוער</option>
//           <option value={AgeGroup.Adult}>מבוגרים</option>
//           <option value={AgeGroup.GoldenAge}>גיל הזהב</option>
//         </select>

//         <div className="flex flex-col">
//           <label className="text-sm mb-1 text-gray-600">
//             טווח מחירים: ₪{priceRange[1]} - ₪{priceRange[0]}
//           </label>
//           <input
//             type="range"
//             min="0"
//             max="100"
//             step="1"
//             value={priceRange[1]}
//             onChange={e => setPriceRange([0, Number(e.target.value)])}
//             className="w-full"
//           />
//         </div>
//       </div>

//       <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
//         <Box
//           onClick={() => setDialogOpen(true)}
//           sx={{
//             border: "2px dashed #740d5c",
//             borderRadius: 2,
//             width: 250,
//             height: 350,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             cursor: "pointer",
//             backgroundColor: "#f9f9f9",
//             "&:hover": { backgroundColor: "#f1f1f1" },
//           }}
//         >
//           <AddIcon sx={{ fontSize: 60, color: "#740d5c" }} />
//           <Typography variant="h6" fontWeight="bold" color="#740d5c">
//             הוסף סרט
//           </Typography>
//         </Box>


//         {movies.map(movie => (
//           <MovieCardAdmin
//             key={movie.Id}
//             movie={movie}
//             onEdit={(updatedMovie) => handleEdit(updatedMovie)}
//             onDelete={() => handleDelete(movie.Id)}
//           />
//         ))}

//       </Box>



// <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="md" dir="rtl">
//   <DialogTitle>הוספת סרט חדש</DialogTitle>

//   <DialogContent>
//     <Grid container spacing={2} dir="rtl">
//       {[
//         { name: "Name", label: "שם הסרט" },
//         { name: "Description", label: "תיאור" },
//         { name: "MovieLink", label: "קישור לסרטון" },
//         { name: "Image", label: "קישור לתמונה" },
//         { name: "LengthMinutes", label: "אורך (בדקות)", type: "number" },
//         { name: "PriceBase", label: "מחיר בסיס", type: "number" },
//       ].map(({ name, label, type }) => (
//         <Grid item xs={12} sm={6} key={name}>
//           <TextField
//             fullWidth
//             name={name}
//             label={label}
//             type={type ?? "text"}
//             value={(newMovie as any)[name] ?? ''}
//             onChange={handleChange}
//             inputProps={{ dir: "rtl", style: { textAlign: 'right' } }}
//             InputLabelProps={{ sx: { right: 0, left: 'auto' } }}
//           />
//         </Grid>
//       ))}

//       <Grid item xs={12} sm={6}>
//         <TextField
//           fullWidth
//           name="ProductionDate"
//           label="תאריך הפקה"
//           type="date"
//           value={newMovie.ProductionDate}
//           onChange={handleDateChange}
//           InputLabelProps={{ shrink: true, sx: { right: 0, left: 'auto' } }}
//           inputProps={{ dir: "rtl", style: { textAlign: 'right' } }}
//         />
//       </Grid>

//       <Grid item xs={12} sm={6}>
//         <TextField
//           select
//           fullWidth
//           name="AgeGroup"
//           label="קבוצת גיל"
//           value={(newMovie as any).AgeGroup ?? ''}
//           onChange={handleChange}
//           SelectProps={{ native: true }}
//           inputProps={{ dir: "rtl", style: { textAlign: 'right' } }}
//           InputLabelProps={{ sx: { right: 0, left: 'auto' } }}
//         >
//           <option value=""></option>
//           <option value={AgeGroup.Babies}>תינוקות</option>
//           <option value={AgeGroup.Children}>ילדים</option>
//           <option value={AgeGroup.Teens}>נוער</option>
//           <option value={AgeGroup.Adult}>מבוגרים</option>
//           <option value={AgeGroup.GoldenAge}>גיל הזהב</option>
//         </TextField>
//       </Grid>

//       <Grid item xs={12} sm={6}>
//         <TextField
//           select
//           fullWidth
//           name="CategoryGroup"
//           label="קטגוריה"
//           value={(newMovie as any).CategoryGroup ?? ''}
//           onChange={handleChange}
//           SelectProps={{ native: true }}
//           inputProps={{ dir: "rtl", style: { textAlign: 'right' } }}
//           InputLabelProps={{ sx: { right: 0, left: 'auto' } }}
//         >
//           <option value=""></option>
//           <option value={CategoryGroup.Children}>ילדים</option>
//           <option value={CategoryGroup.Recipes}>מתכונים</option>
//           <option value={CategoryGroup.Nature}>טבע</option>
//           <option value={CategoryGroup.Plot}>עלילה</option>
//         </TextField>
//       </Grid>

//       <Grid item xs={12}>
//         <Button
//           onClick={handleSubmit}
//           variant="contained"
//           sx={{ alignSelf: 'flex-end' }}
//         >
//           שמור סרט
//         </Button>
//       </Grid>
//     </Grid>
//   </DialogContent>
// </Dialog>




//     </Box>
//   );
// };



import {
  Box, Button, Typography, Dialog, DialogTitle, DialogContent,
  TextField, Grid
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../myStore";
import MovieCardAdmin from "../MovieCardAdmin/MovieCardAdmin";
import { AgeGroup, CategoryGroup, MovieObject, MovieCreateDTO, MovieUpdateDTO } from "../../../models/Movie";
import axios from 'axios';

export const MovieListAdmin = () => {
  const user = useSelector((state: RootState) => state.auth);
  const [movies, setMovies] = useState<MovieObject[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [newMovie, setNewMovie] = useState<MovieCreateDTO>({
    Name: "",
    Description: "",
    CodeCategory: 1,
    AgeGroup: 2,
    HasWoman: false,
    LengthMinutes: 90,
    ProductionDate: "2024-01-01",
    PriceBase: 20,
    PricePerExtraViewer: 5,
    PricePerExtraView: 3,
    MovieLink: "",
    Image: ""
  });

  const fetchMovies = () => {
    axios.get("https://localhost:7229/DosFlix/Movies")
      .then(res => setMovies(res.data))
      .catch(err => console.error("שגיאה בטעינת הסרטים:", err));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (!user?.role || user.role !== 1) return null;

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type, checked } = e.target;
    setNewMovie(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === "AgeGroup" || name === "CategoryGroup" || name === "LengthMinutes" || name === "PriceBase" ? Number(value) : value)
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMovie(prev => ({ ...prev, ProductionDate: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("https://localhost:7229/DosFlix/Movies", newMovie);
      fetchMovies();
      setDialogOpen(false);
    } catch (err) {
      console.error("שגיאה בשמירת הסרט:", err);
      alert("אירעה שגיאה בעת שמירת הסרט");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://localhost:7229/DosFlix/Movies/${id}`);
      setMovies(prev => prev.filter(movie => movie.Id !== id));
    } catch (err) {
      console.error("מחיקה נכשלה", err);
      alert("מחיקה נכשלה");
    }
  };

  const handleEdit = async (updatedMovie: MovieUpdateDTO) => {
    try {
      await axios.put(`https://localhost:7229/DosFlix/Movies/${updatedMovie.Id}`, updatedMovie);
      setMovies(prev => prev.map(m => m.Id === updatedMovie.Id ? { ...m, ...updatedMovie } : m));
    } catch (err) {
      console.error("עדכון נכשל", err);
      alert("עדכון נכשל");
    }
  };

  return (
    <Box sx={{ padding: 3, mt: '8vh' }}>
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
        <Box
          onClick={() => setDialogOpen(true)}
          sx={{
            border: "2px dashed #740d5c",
            borderRadius: 2,
            width: 250,
            height: 350,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor: "#f9f9f9",
            "&:hover": { backgroundColor: "#f1f1f1" },
          }}
        >
          <AddIcon sx={{ fontSize: 60, color: "#740d5c" }} />
          <Typography variant="h6" fontWeight="bold" color="#740d5c">הוסף סרט</Typography>
        </Box>

        {movies.map(movie => (
          <MovieCardAdmin
            key={movie.Id}
            movie={movie}
            onEdit={handleEdit}
            onDelete={() => handleDelete(movie.Id)}
          />
        ))}
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="md" dir="rtl">
        <DialogTitle>הוספת סרט חדש</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} dir="rtl">
            {[
              { name: "Name", label: "שם הסרט" },
              { name: "Description", label: "תיאור" },
              { name: "MovieLink", label: "קישור לסרטון" },
              { name: "Image", label: "קישור לתמונה" },
              { name: "LengthMinutes", label: "אורך (בדקות)", type: "number" },
              { name: "PriceBase", label: "מחיר בסיס", type: "number" },
            ].map(({ name, label, type }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  fullWidth name={name} label={label} type={type ?? "text"}
                  value={(newMovie as any)[name]} onChange={handleChange}
                />
              </Grid>
            ))}

            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="ProductionDate" label="תאריך הפקה" type="date"
                value={newMovie.ProductionDate} onChange={handleDateChange} InputLabelProps={{ shrink: true }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="AgeGroup" label="קבוצת גיל" select SelectProps={{ native: true }}
                value={newMovie.AgeGroup} onChange={handleChange}>
                <option value={AgeGroup.Babies}>תינוקות</option>
                <option value={AgeGroup.Children}>ילדים</option>
                <option value={AgeGroup.Teens}>נוער</option>
                <option value={AgeGroup.Adult}>מבוגרים</option>
                <option value={AgeGroup.GoldenAge}>גיל הזהב</option>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="CodeCategory" label="קטגוריה" select SelectProps={{ native: true }}
                value={newMovie.CodeCategory} onChange={handleChange}>
                <option value={CategoryGroup.Children}>ילדים</option>
                <option value={CategoryGroup.Recipes}>מתכונים</option>
                <option value={CategoryGroup.Nature}>טבע</option>
                <option value={CategoryGroup.Plot}>עלילה</option>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button onClick={handleSubmit} variant="contained">שמור סרט</Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
