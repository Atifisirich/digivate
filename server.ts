import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { buildSitemapXml } from './src/config/sitemap';
import { answerChat } from './src/lib/chatAssistant';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const sendPublicFile = (res: express.Response, filename: string, type: string) => {
  const distFile = path.join(process.cwd(), 'dist', filename);
  const publicFile = path.join(process.cwd(), 'public', filename);
  const file = fs.existsSync(distFile) ? distFile : publicFile;
  if (!fs.existsSync(file)) {
    res.status(404).type('text/plain').send('Not found');
    return;
  }
  res.type(type);
  res.sendFile(file);
};

app.get('/sitemap.xml', (_req, res) => {
  res.type('application/xml').send(buildSitemapXml());
});
app.get('/robots.txt', (_req, res) => sendPublicFile(res, 'robots.txt', 'text/plain'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', agency: 'DIGIVATE' });
});

app.post('/api/chat', async (req, res) => {
  const { message, conversationHistory = [] } = req.body;

  if (!message || typeof message !== 'string') {
    res.status(400).json({ error: 'Valid message string is required.' });
    return;
  }

  const result = await answerChat(message, conversationHistory);
  res.json(result);
});

// Vite middleware in dev or static files in production
async function setupVite() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      const notFound = path.join(distPath, '404.html');
      if (fs.existsSync(notFound)) {
        res.status(404).sendFile(notFound);
        return;
      }
      res.status(404).sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Digivate server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite();
