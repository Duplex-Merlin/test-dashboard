import express, { Express } from "express";
import path from 'path';

const app: Express = express();

app.use(express.static(path.join(__dirname, '../../frontend/build')));

// Gérez vos routes ici

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});