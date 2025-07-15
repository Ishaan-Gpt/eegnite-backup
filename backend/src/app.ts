import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

import contactRoutes from './routes/contact';
import newsletterRoutes from './routes/newsletter';

app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
