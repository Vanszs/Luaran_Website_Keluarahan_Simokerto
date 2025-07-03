'use client';

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import Layout from '../../../components/layout/Layout';

export default function HelpPage() {
  const faqs = [
    {
      question: 'Bagaimana cara mengelola laporan warga?',
      answer: 'Masuk ke menu Laporan untuk melihat, memproses, dan menindaklanjuti laporan yang masuk dari warga.'
    },
    {
      question: 'Bagaimana cara menambah admin baru?',
      answer: 'Hanya superadmin yang dapat mengelola admin. Masuk ke menu Admin untuk menambah atau mengelola admin.'
    },
    {
      question: 'Bagaimana cara mengaktifkan sistem alert?',
      answer: 'Masuk ke menu Sistem Alert untuk mengatur dan mengaktifkan notifikasi otomatis kepada warga.'
    },
    {
      question: 'Bagaimana cara melihat statistik?',
      answer: 'Menu Statistik menyediakan data lengkap tentang laporan, warga, dan aktivitas sistem.'
    }
  ];

  const quickLinks = [
    {
      title: 'Panduan Admin',
      description: 'Panduan lengkap penggunaan sistem',
      icon: <DescriptionIcon />
    },
    {
      title: 'Video Tutorial',
      description: 'Tutorial penggunaan dalam bentuk video',
      icon: <HelpIcon />
    }
  ];

  return (
    <Layout title="Bantuan">
      <Box sx={{ p: 1 }}>
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Pusat Bantuan PINTAR
        </Typography>

        <Grid container spacing={2}>
          {/* FAQ Section */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, border: `1px solid ${theme => theme.palette.divider}` }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Pertanyaan Umum (FAQ)
              </Typography>
              
              {faqs.map((faq, index) => (
                <Accordion key={index} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="body2" fontWeight={500}>
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Paper>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, border: `1px solid ${theme => theme.palette.divider}`, mb: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Tautan Cepat
              </Typography>
              
              {quickLinks.map((link, index) => (
                <Card key={index} sx={{ mb: 1, border: `1px solid ${theme => theme.palette.divider}` }}>
                  <CardContent sx={{ p: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {link.icon}
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {link.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {link.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Paper>

            {/* Contact Info */}
            <Paper sx={{ p: 2, border: `1px solid ${theme => theme.palette.divider}` }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Kontak Support
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <PhoneIcon color="primary" sx={{ fontSize: 18 }} />
                <Typography variant="body2">
                  (031) 123-4567
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon color="primary" sx={{ fontSize: 18 }} />
                <Typography variant="body2">
                  support@pintar.go.id
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}
