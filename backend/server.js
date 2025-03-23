const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
 useNewUrlParser: true,
 useUnifiedTopology: true
}).then(() => console.log("MongoDB connecté"))
 .catch(err => console.log(err));

app.use('/utilisateurs', require('./routes/utilisateurRoutes'));
app.use('/prestations', require('./routes/prestationRoutes'));
app.use('/voitures', require('./routes/voitureRoutes'));
app.use('/interventions', require('./routes/interventionRoutes'));
app.use('/notifications', require('./routes/notificationRoutes'));

app.listen(PORT, () => console.log(`Serveur démarré sur le port
${PORT}`));
