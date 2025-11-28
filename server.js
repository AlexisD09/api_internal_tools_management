const express = require('express');
const toolsRoutes = require('./routes/tools');
const db = require('./config/database');
const app = express();
const PORT = 3000;
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDoc = YAML.load('./swagger.yaml');

app.use(express.json());

db.query('SELECT 1')
    .then(() => console.log('✓ Base de données MySQL connectée'))
    .catch(err => console.error('✗ Erreur de connexion à la base:', err.message));

app.use('/api/tools', toolsRoutes);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur l\'API REST !' });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});