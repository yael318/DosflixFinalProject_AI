import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from '@mui/material';

interface OrderDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

const OrderDialog: React.FC<OrderDialogProps> = ({ open, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  // Regular Expression for email validation

  const handleSend = () => {
    if (!emailRegex.test(email)) {
      setError('כתובת מייל לא תקינה');
      return;
    }
    setError('');
    onSubmit(email); // מחזיר להורה את כתובת המייל
    setEmail('');
    setSuccess(true); // להראות הצלחה לאחר שליחה
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setSuccess(false); // מנקים את ההצלחה כאשר סוגרים את הדיאלוג
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>הזמנת סרט</DialogTitle>
      <DialogContent>
        {!success ? (
          <>
            <Typography variant="body1" gutterBottom>
              אנא הזן את כתובת הדוא"ל שלך. לאחר התשלום יישלח אליך קישור מאובטח וסיסמה שיאפשרו צפייה בסרט למשך 5 שעות או לפי תאריך שתבחר.
            </Typography>
            <TextField
              label="כתובת מייל"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              error={!!error}
              helperText={error}
            />
          </>
        ) : (
          <Typography variant="body1" color="success.main">
            ההזמנה הושלמה בהצלחה! קישור מאובטח יישלח אליך בקרוב.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>ביטול</Button>
        {!success && (
          <Button onClick={handleSend} variant="contained">
            שלח
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default OrderDialog;

