import express from 'express'
import cors from 'cors'
import path from 'path'
import powerRouter from './routes/power.routes'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/energy', powerRouter);

const frontendPath = path.join(__dirname, 'frontend');
app.use(express.static(frontendPath));

app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next()
  res.sendFile(path.join(frontendPath, 'index.html'))
});

export default app;