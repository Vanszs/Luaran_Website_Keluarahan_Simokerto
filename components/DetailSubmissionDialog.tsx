// @ts-nocheck
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Paper,
  Breadcrumbs,
  Chip,
  Stack,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/material';
import AppTheme from '../shared-theme/AppTheme';
import { Submission } from '../hooks/useMockApi';
import ApproveDialog from './ApproveDialog';
import RejectDialog from './RejectDialog';

interface DetailSubmissionDialogProps {
  open: boolean;
  submission: Submission | null;
  onClose: () => void;
}

export default function DetailSubmissionDialog({ open, submission, onClose }: DetailSubmissionDialogProps) {
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  if (!submission) return null;

  const history = [
    { label: 'Pending', time: submission.submittedAt },
    submission.status !== 'pending' && { label: 'Proses', time: submission.processedAt || submission.submittedAt },
    submission.status === 'approved' && { label: 'Selesai', time: submission.processedAt },
    submission.status === 'rejected' && { label: 'Ditolak', time: submission.processedAt },
  ].filter(Boolean);

  return (
    <AppTheme>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" TransitionProps={{ appear: true }}>
        <DialogTitle>
          <Breadcrumbs>
            <Typography color="inherit">Admin</Typography>
            <Typography color="inherit">Pengajuan</Typography>
            <Typography color="text.primary">Detail</Typography>
          </Breadcrumbs>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              {/* Left column showing submitted fields */}
              {Object.entries(submission.data).map(([key, value]) => (
                <Stack key={key} direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Typography variant="subtitle2" width={120}>{key}</Typography>
                  <Typography variant="body2">{String(value)}</Typography>
                </Stack>
              ))}
              <Chip label={`Mode: ${submission.mode}`} sx={{ mt: 1 }} />
            </Grid>
            <Grid item xs={12} md={6}>
              {submission.mode === 'Online' ? (
                <Stack spacing={1}>
                  {/* Render uploaded attachments thumbnails */}
                  {(submission.data.attachments || []).map((file: any, idx: number) => (
                    <Paper key={idx} sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2">{file.name}</Typography>
                      <Button size="small">Unduh</Button>
                    </Paper>
                  ))}
                </Stack>
              ) : (
                <Paper sx={{ p: 2 }}>
                  <Typography variant="body2">Ambil di: {submission.data.pickupLocation}</Typography>
                  <Typography variant="body2">Tanggal: {submission.data.pickupDate}</Typography>
                </Paper>
              )}
              <Timeline sx={{ mt: 2 }}>
                {history.map((h, idx) => (
                  <TimelineItem key={idx}>
                    <TimelineSeparator>
                      <TimelineDot />
                      {idx < history.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="body2">{h.label}</Typography>
                      <Typography variant="caption">{h.time}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApproveOpen(true)} variant="contained">Setujui</Button>
          <Button onClick={() => setRejectOpen(true)} color="error" variant="outlined">Tolak</Button>
        </DialogActions>
      </Dialog>
      <ApproveDialog open={approveOpen} submission={submission} onClose={() => setApproveOpen(false)} />
      <RejectDialog open={rejectOpen} submission={submission} onClose={() => setRejectOpen(false)} />
    </AppTheme>
  );
}
