# Verwende ein Node.js-Image als Basis
FROM node:lts-alpine

# Setze das Arbeitsverzeichnis im Container auf /app
WORKDIR /app

# Kopiere package.json und package-lock.json (falls vorhanden) aus dem 'app' Verzeichnis
COPY ./app/package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den gesamten Inhalt aus dem 'app' Verzeichnis
COPY ./app /app

# Exponiere den Port
EXPOSE 3000

# Starte die App
CMD ["node", "app.js"]
