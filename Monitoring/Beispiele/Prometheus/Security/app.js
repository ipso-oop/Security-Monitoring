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

// Fehlgeschlagene Logins (Counter)
const failedLoginCounter = new client.Counter({
  name: 'failed_login_attempts_total',
  help: 'Anzahl fehlgeschlagener Logins',
});

// HTTP-Fehler (Counter)
const httpErrorCounter = new client.Counter({
  name: 'http_errors_total',
  help: 'Anzahl der HTTP-Fehlerantworten',
  labelNames: ['status'],
});

// Beispiel-Endpunkt für Login
app.post('/login', (req, res) => {
  const success = Math.random() > 0.5; // Zufälliger Erfolg/Fehler
  if (!success) {
    failedLoginCounter.inc();
    return res.status(401).send('Login fehlgeschlagen');
  }
  res.send('Login erfolgreich');
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
	
	 if (res.statusCode >= 400) {
      httpErrorCounter.inc({ status: res.statusCode });
    }
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
