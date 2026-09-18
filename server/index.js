import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import familyRoutes from './routes/familyRoutes.js';
import triageRoutes from './routes/triageRoutes.js';
import hospitalRoutes from './routes/hospitalRoutes.js';
import healthCardRoutes from './routes/healthCardRoutes.js';
import sosRoutes from './routes/sosRoutes.js';
import prescriptionRoutes from './routes/prescriptionRoutes.js';
import whatsappRoutes from './routes/whatsappRoutes.js';
import kioskRoutes from './routes/kioskRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load root .env first, then local .env if present
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Extract client connection URLs from environment variables (e.g. Render Dashboard)
const envOrigins = [
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL,
  ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [])
]
  .filter(Boolean)
  .map(url => url.trim().replace(/\/+$/, ''));

const allowedOrigins = [
  'https://arogyarakshak-ai.netlify.app',
  'http://localhost:5173',
  'http://localhost:5000',
  'http://localhost:3000',
  ...envOrigins
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server, mobile app, and same-origin requests without Origin header
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/+$/, '');
    const isAllowed =
      allowedOrigins.includes(cleanOrigin) ||
      cleanOrigin.endsWith('.netlify.app') ||
      cleanOrigin.includes('localhost') ||
      cleanOrigin.includes('127.0.0.1');

    if (isAllowed) {
      return callback(null, true);
    }
    // Allow all configured domains or fallback
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For Twilio Webhook forms

// Initialize DB connection
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/family', familyRoutes);
app.use('/api/triage', triageRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/health-card', healthCardRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/kiosk', kioskRoutes);
app.use('/api/appointments', appointmentRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ArogyaRakshak AI Backend',
    timestamp: new Date().toISOString()
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[ArogyaRakshak Server] Running on http://localhost:${PORT}`);
  });
}

export default app;
