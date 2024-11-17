
# Unsichere Demo-Applikation

Diese Demo-Applikation dient dazu, häufige Sicherheitslücken in Webanwendungen zu illustrieren. Es handelt sich um eine absichtlich unsichere Anwendung, um die Bedeutung von sicheren Konfigurationen und Best Practices zu verdeutlichen.

## Inhaltsverzeichnis
1. [Installation](#installation)
2. [Verwendung](#verwendung)
3. [Sicherheitslücken und mögliche Angriffe](#sicherheitslücken-und-mögliche-angriffe)
   - Broken Access Control
   - Cryptographic Failures
   - Injection
   - Insecure Design
   - Security Misconfiguration
   - Vulnerable Components
   - Auth Failures
   - Software Integrity
   - Logging Failures
   - SSRF

## Installation

1. **Voraussetzungen**: Node.js und npm müssen installiert sein.
2. **Projekt klonen**:
   ```bash
   git clone <URL>
   cd <Projektverzeichnis>
   ```
3. **Abhängigkeiten installieren**:
   ```bash
   npm install
   ```
4. **Applikation starten**:
   ```bash
   npm start
   ```
   Die Applikation ist dann unter [http://localhost:3000](http://localhost:3000) erreichbar.

## Verwendung

Diese Applikation stellt mehrere Endpunkte bereit, die jeweils spezifische Schwachstellen demonstrieren. Navigieren Sie zu den entsprechenden Routen und beobachten Sie die Funktionsweise und das Verhalten.

## Sicherheitslücken und mögliche Angriffe

### 1. Broken Access Control (Zugriffskontrollen fehlen)
   - **Beschreibung**: Es gibt keine Zugriffskontrollen, sodass alle Benutzer auf `/admin` zugreifen und Daten aller Nutzer anzeigen können.
   - **Möglicher Angriff**: Jeder Benutzer kann sensible Informationen sehen, die eigentlich nur für Administratoren zugänglich sein sollten.

### 2. Cryptographic Failures (Kryptographische Fehler)
   - **Beschreibung**: Passwörter werden im Klartext gespeichert und verarbeitet.
   - **Möglicher Angriff**: Falls Daten aus der Datenbank kompromittiert werden, sind alle Passwörter leicht zugänglich und unverschlüsselt.

### 3. Injection (SQL-Injection)
   - **Beschreibung**: Im Endpunkt `/search` wird der Benutzerinput direkt in eine SQL-Abfrage eingebunden.
   - **Möglicher Angriff**: Ein Angreifer kann bösartige SQL-Abfragen injizieren, um Daten zu manipulieren oder zu extrahieren.

### 4. Insecure Design (Unsicheres Design)
   - **Beschreibung**: Es gibt kein Rate-Limiting für die Passwort-Zurücksetzen-Funktion (`/reset-password`).
   - **Möglicher Angriff**: Ein Angreifer könnte das System durch Überflutung mit Anfragen lahmlegen.

### 5. Security Misconfiguration (Sicherheitsfehlkonfiguration)
   - **Beschreibung**: Fehler-Stack-Traces werden bei `/debug` offengelegt.
   - **Möglicher Angriff**: Stack-Traces offenbaren oft sensible Informationen über die interne Systemstruktur und können Angreifern helfen, spezifische Schwachstellen zu finden.

### 6. Vulnerable Components (Verwundbare Komponenten)
   - **Beschreibung**: Es werden möglicherweise veraltete Bibliotheken ohne Sicherheitsupdates verwendet.
   - **Möglicher Angriff**: Veraltete Abhängigkeiten können Schwachstellen enthalten, die ein Angreifer ausnutzen kann.

### 7. Auth Failures (Schwache Authentifizierungsanforderungen)
   - **Beschreibung**: Bei der Registrierung werden keine starken Passwortrichtlinien erzwungen.
   - **Möglicher Angriff**: Benutzer könnten schwache Passwörter wählen, die leicht zu erraten sind.

### 8. Software Integrity (Softwareintegrität)
   - **Beschreibung**: Es gibt keine Integritätsprüfung für hochgeladene Dateien.
   - **Möglicher Angriff**: Ein Angreifer könnte bösartige Dateien hochladen, die möglicherweise Schadcode enthalten.

### 9. Logging Failures (Fehler beim Logging)
   - **Beschreibung**: Es werden keine sicherheitsrelevanten Logs aufgezeichnet, insbesondere bei der Geldüberweisung (`/transfer`).
   - **Möglicher Angriff**: Unautorisierte Überweisungen könnten getätigt werden, ohne dass eine Aufzeichnung erfolgt.

### 10. SSRF (Server-Side Request Forgery)
   - **Beschreibung**: Keine URL-Validierung bei `/fetch`.
   - **Möglicher Angriff**: Ein Angreifer könnte das System zwingen, auf interne Ressourcen oder Drittanbieter-Server zuzugreifen, was potenziell sensible Daten offenlegt.

## Hinweise zur Verwendung und Vorführung

- Diese Applikation ist absichtlich unsicher konfiguriert und sollte nur zu Schulungszwecken in einer isolierten Umgebung verwendet werden.
- Ziel dieser Demo ist es, Studierenden die Gefahren ungesicherter Webanwendungen zu demonstrieren und ihnen Best Practices zur Abwehr solcher Angriffe zu vermitteln.
