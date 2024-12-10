const express = require('express');
const client = require('prom-client');

// Erstelle eine Express-App
const app = express();
const port = 3000;

// Prometheus-Metriken initialisieren
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total', // Name der Metrik
  help: 'Anzahl der HTTP-Anfragen', // Beschreibung
  labelNames: ['method', 'status'], // Labels für die Metrik
});

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Dauer der HTTP-Anfragen in Sekunden',
  labelNames: ['method', 'status'],
});

// Standard-Prometheus-Metriken aktivieren
client.collectDefaultMetrics();

// Middleware zur Erfassung von HTTP-Anfragen
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer(); // Timer starten

  res.on('finish', () => {
    // Labels setzen und Metriken aktualisieren
    httpRequestCounter.inc({ method: req.method, status: res.statusCode });
    end({ method: req.method, status: res.statusCode });
  });

  next();
});

// Beispiel-Endpunkt
app.get('/', (req, res) => {
  res.send('Hello, Prometheus!');
});

// Prometheus-Metriken-Endpunkt
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
