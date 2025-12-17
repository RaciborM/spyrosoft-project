import express from 'express'
import cors from 'cors'
import powerRouter from './routes/power.routes'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/energy', powerRouter);

export default app;