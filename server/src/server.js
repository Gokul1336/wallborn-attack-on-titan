import 'dotenv/config';
import dns from 'dns';

// Force Node to use reliable public DNS servers for the MongoDB Atlas SRV lookup,
// bypassing whatever your campus network's default resolver is doing
dns.setServers(['8.8.8.8', '1.1.1.1']);

import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[server] WALLBORN API running on port ${PORT}`);
  });
}

start();