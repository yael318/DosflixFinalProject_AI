
import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Typography,
    Box,
    TextField,
    Button,
    Checkbox,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const TaskList = () => {
    const [tasks, setTasks] = useState([
        { text: 'לאשר חשבוניות ממתינות', done: false },
        { text: 'לבדוק דוחות מכירה יומיים', done: false },
        { text: 'לעדכן לו״ז פגישות', done: false },
        { text: 'לבדוק הרשאות גישה לעובדים', done: false },
    ]);

    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { text: newTask, done: false }]);
            setNewTask('');
        }
    };

    const toggleDone = (index: number) => {
        const updated = [...tasks];
        updated[index].done = !updated[index].done;
        setTasks(updated);
    };

    const deleteTask = (index: number) => {
        const updated = tasks.filter((_, i) => i !== index);
        setTasks(updated);
    };

    return (
        <Box dir="rtl">
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'right' }}>
                ✅ רשימת משימות
            </Typography>

            {/* הוספת משימה */}
            <Box display="flex" gap={1} mb={2}>
                <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="הוספת משימה חדשה..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    inputProps={{ style: { direction: 'rtl', textAlign: 'right' } }}
                />
                {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={addTask}
                    startIcon={<Add />}
                >
                    הוסף
                </Button> */}
                <Button
                    variant="contained"
                    color={newTask.trim() ? "primary" : "inherit"}
                    onClick={addTask}
                    startIcon={<Add />}
                    disabled={!newTask.trim()}
                >
                    הוסף
                </Button>

            </Box>

            <List sx={{ padding: 0 }}>
                {tasks.map((task, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        dir="rtl"
                        sx={{
                            bgcolor: task.done ? '#e8f5e9' : 'transparent',
                            borderBottom: '1px solid #eee',
                            borderRadius: 1,
                            px: 1,
                            py: 0.5,
                            transition: 'background 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >

                        <Checkbox
                            checked={task.done}
                            onChange={() => toggleDone(index)}
                            color="success"
                        />
                        {/* תוכן המשימה + ריבוע סימון */}
                        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                            <ListItemText
                                primary={task.text}
                                primaryTypographyProps={{ sx: { textAlign: 'right' } }}
                            />
                            <IconButton
                                onClick={() => deleteTask(index)}
                                color="error"
                                sx={{ ml: 1 }}
                            >
                                <Delete />
                            </IconButton>
                        </Box>
                    </ListItem>
                ))}
            </List>

        </Box>
    );
};

export default TaskList;
