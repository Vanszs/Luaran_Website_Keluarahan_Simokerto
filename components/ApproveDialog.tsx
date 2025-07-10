'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import AppTheme from '../shared-theme/AppTheme';
import { useMockApi, Submission } from '../hooks/useMockApi';

interface ApproveDialogProps {
  open: boolean;
  submission: Submission | null;
  onClose: () => void;
}

export default function ApproveDialog({ open, submission, onClose }: ApproveDialogProps) {
  const { approveSubmission, templates, refreshSubmissions } = useMockApi();
  const [noSurat, setNoSurat] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [snackbar, setSnackbar] = useState<{open:boolean;message:string;severity:'success'|'error'}>({open:false,message:'',severity:'success'});

  const handleConfirm = async () => {
    if (!submission) return;
    await approveSubmission(submission.id, noSurat);
    setSnackbar({ open: true, message: 'Pengajuan disetujui', severity: 'success' });
    await refreshSubmissions();
    onClose();
  };

  return (
    <AppTheme>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" TransitionProps={{ appear: true }}>
        <DialogTitle>Setujui Pengajuan</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Nomor Surat" value={noSurat} onChange={e => setNoSurat(e.target.value)} fullWidth size="small" />
            <Button variant="outlined" component="label">
              Upload PDF
              <input hidden type="file" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
            </Button>
            {file && (
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>{file.name}</Typography>
            )}
            <Button variant="contained" disabled={!submission} onClick={() => {/* preview template using embed */}}>
              Preview Template ({templates[0]?.name})
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Batal</Button>
          <Button variant="contained" onClick={handleConfirm}>Konfirmasi</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </AppTheme>
  );
}
