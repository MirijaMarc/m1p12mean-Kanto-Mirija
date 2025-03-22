# Utiliser une image Node.js légère
FROM node:18-alpine

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installer les dépendances en production
RUN npm install --omit=dev

# Copier le reste du projet
COPY . .

# Exposer le port sur lequel ton app tourne (ex: 3000)
EXPOSE 3000

# Démarrer l'application
CMD ["node", "server.js"]
