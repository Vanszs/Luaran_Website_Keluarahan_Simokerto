'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
  Stack,
} from '@mui/material';
import AppTheme from '../shared-theme/AppTheme';
import { useMockApi, Submission } from '../hooks/useMockApi';

interface RejectDialogProps {
  open: boolean;
  submission: Submission | null;
  onClose: () => void;
}

export default function RejectDialog({ open, submission, onClose }: RejectDialogProps) {
  const { rejectSubmission, refreshSubmissions } = useMockApi();
  const [reason, setReason] = useState('');
  const [snackbar, setSnackbar] = useState<{open:boolean;message:string;severity:'success'|'error'}>({open:false,message:'',severity:'success'});

  const handleConfirm = async () => {
    if (!submission) return;
    await rejectSubmission(submission.id, reason);
    setSnackbar({ open: true, message: 'Pengajuan ditolak', severity: 'success' });
    await refreshSubmissions();
    onClose();
  };

  return (
    <AppTheme>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" TransitionProps={{ appear: true }}>
        <DialogTitle>Tolak Pengajuan</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Alasan Penolakan"
              value={reason}
              onChange={e => setReason(e.target.value)}
              fullWidth
              multiline
              rows={4}
              size="small"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Batal</Button>
          <Button variant="contained" color="error" onClick={handleConfirm}>Konfirmasi</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </AppTheme>
  );
}
