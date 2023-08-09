'use client'

import ManualForm from "./components/Manual"
import AutomaticForm from "./components/Automatic"

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Paper sx={{ padding: 5 }}>
        <h1> Manual layout </h1>
        <ManualForm />
        <h1> Automatic layout </h1>
        <AutomaticForm />
      </Paper>
    </Container>
  )
}
