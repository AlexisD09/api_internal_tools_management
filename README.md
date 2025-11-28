# Internal Tools API

## Technologies
- Langage: Node.js
- Framework: Express
- Base de données: MySQL
- Port API: 3306

## Quick Start

1. `docker-compose --profile mysql up -d`

2. npm install
3. npm run start
4. API disponible sur http://localhost:3306
5. Documentation: http://localhost:3306/[chemin_docs]

## Configuration
- Variables d'environnement: voir .env.example
- Configuration DB: 
  - DB_HOST = localhost
  - DB_USER = dev
  - DB_PASSWORD = dev123

## Tests
[commande_lancement_tests] - Tests unitaires + intégration

## Architecture
- Node.js + Express : Rapide, flexible, maintenable, évolution simple
- MVC : architecture permettant un code organisé, maintenable et facilement évolutif.