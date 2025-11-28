const express = require('express');
const router = express.Router();
const toolController = require('../controllers/toolController');
const validateTool = require("../middlewares/toolMiddleware");

/**
 * @swagger
 * /api/tools:
 *  get:
 *      tags:
 *          - Tools
 *      summary: Récupère tous les outils.
 *      responses:
 *          200:
 *              description: Récupère la liste complète des outils ou filtrée selon les critères founris. La réponse inclut le nombre total dans la base, le nombre correspondant aux filtre appliqués ainsi que les filtres utilisés.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                type: array
 *                                items:
 *                                  type: object
 *                                  properties:
 *                                    id:
 *                                      type: integer
 *                                      example: 1
 *                                    name:
 *                                      type: string
 *                                      example: "Slack"
 *                                    description:
 *                                      type: string
 *                                      example: "Team messaging platform"
 *                                    vendor:
 *                                      type: string
 *                                      example: "Slack Technologies"
 *                                    category:
 *                                      type: string
 *                                      example: "Communication"
 *                                    monthly_cost:
 *                                      type: number
 *                                      format: float
 *                                      example: 8.00
 *                                    owner_department:
 *                                      type: string
 *                                      example: "Engineering"
 *                                    status:
 *                                      type: string
 *                                      example: "active"
 *                                    website_url:
 *                                      type: string
 *                                      format: uri
 *                                      example: "https://slack.com"
 *                                    active_users_count:
 *                                      type: integer
 *                                      example: 25
 *                                    created_at:
 *                                      type: string
 *                                      format: date-time
 *                                      example: "2025-05-01T09:00:00Z"
 *                              total:
 *                                type: integer
 *                                example: 20
 *                              filtered:
 *                                type: integer
 *                                example: 15
 *                              filters_applied:
 *                                type: object
 *                                additionalProperties:
 *                                  type: string
 *                                example:
 *                                  department: "Engineering"
 *                                  status: "active"
 */
router.get('/', toolController.getTools);
/**
 * @swagger
 * /api/tool/:id:
 *  get:
 *      tags:
 *          - Tools
 *      summary: Récupère un outil avec son ID.
 *      parameters:
 *        - in: path
 *          name: toolId
 *          schema:
 *              type: integer
 *          required: true
 *          description: ID de l'outil
 *      responses:
 *          200:
 *              description: Récupère l'outil spécifique à l'ID fournis. La réponse inclut des metrics sur les 30 derniers jours, le nombre de sessions ainsi que les sessions moyenne en minutes.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                type: array
 *                                items:
 *                                  type: object
 *                                  properties:
 *                                    id:
 *                                      type: integer
 *                                      example: 1
 *                                    name:
 *                                      type: string
 *                                      example: "Slack"
 *                                    description:
 *                                      type: string
 *                                      example: "Team messaging platform"
 *                                    vendor:
 *                                      type: string
 *                                      example: "Slack Technologies"
 *                                    category:
 *                                      type: string
 *                                      example: "Communication"
 *                                    monthly_cost:
 *                                      type: number
 *                                      format: float
 *                                      example: 8.00
 *                                    owner_department:
 *                                      type: string
 *                                      example: "Engineering"
 *                                    status:
 *                                      type: string
 *                                      example: "active"
 *                                    website_url:
 *                                      type: string
 *                                      format: uri
 *                                      example: "https://slack.com"
 *                                    active_users_count:
 *                                      type: integer
 *                                      example: 25
 *                                    created_at:
 *                                      type: string
 *                                      format: date-time
 *                                      example: "2025-05-01T09:00:00Z"
 *                              usage_metrics:
 *                                type: object
 *                                properties:
 *                                  last_30_days:
 *                                    type: object
 *                                    properties:
 *                                      total_sessions:
 *                                          type: number
 *                                          example: 127
 *                                      avg_session_minutes:
 *                                          type: number
 *                                          example: 45
 */
router.get('/:id', toolController.getTool);
/**
 * @swagger
 * /api/tool/:
 *  post:
 *      tags:
 *          - Tools
 *      summary: Créer un outil.
 *      parameters:
 *        - in: body
 *          name: tool
 *          schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  vendor:
 *                      type: string
 *                  website_url:
 *                      type: string
 *                  category_id:
 *                      type: number
 *                  monthly_cost:
 *                      type: number
 *                  owner_department:
 *                      type: string
 *                      enum:
 *                          - Engineering
 *                          - Sales
 *                          - Marketing
 *                          - HR
 *                          - Finance
 *                          - Operations
 *                          - Design
 *          required: true
 *          description: Objet avec toutes les informations essentiel à la création d'un outil.
 *      responses:
 *          200:
 *              description: Créer un nouvel outil. La réponse inclut l'outil nouvellement créé.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                type: integer
 *                                example: 1
 *                              name:
 *                                type: string
 *                                example: "Slack"
 *                              description:
 *                                type: string
 *                                example: "Team messaging platform"
 *                              vendor:
 *                                type: string
 *                                example: "Slack Technologies"
 *                              category:
 *                                type: string
 *                                example: "Communication"
 *                              monthly_cost:
 *                                type: number
 *                                format: float
 *                                example: 8.00
 *                              owner_department:
 *                                type: string
 *                                example: "Engineering"
 *                              status:
 *                                type: string
 *                                example: "active"
 *                              website_url:
 *                                type: string
 *                                format: uri
 *                                example: "https://slack.com"
 *                              active_users_count:
 *                                type: integer
 *                                example: 25
 *                              created_at:
 *                                type: string
 *                                format: date-time
 *                                example: "2025-05-01T09:00:00Z"
 */
router.post('/', validateTool, toolController.postTool);
/**
 * @swagger
 * /api/tool/:id:
 *  put:
 *      tags:
 *          - Tools
 *      summary: Mettre à jours un outil.
 *      parameters:
 *        - in: path
 *          name: toolId
 *          schema:
 *              type: integer
 *          required: true
 *          description: ID de l'outil
 *        - in: body
 *          name: tool
 *          schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  vendor:
 *                      type: string
 *                  website_url:
 *                      type: string
 *                  category_id:
 *                      type: number
 *                  monthly_cost:
 *                      type: number
 *                  owner_department:
 *                      type: string
 *                      enum:
 *                          - Engineering
 *                          - Sales
 *                          - Marketing
 *                          - HR
 *                          - Finance
 *                          - Operations
 *                          - Design
 *          required: true
 *          description: Tous les champs sont optionnels, mais si fournis, ils seront mis à jour.
 *      responses:
 *          200:
 *              description: Créer un nouvel outil. La réponse inclut l'outil nouvellement créé.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                type: integer
 *                                example: 1
 *                              name:
 *                                type: string
 *                                example: "Slack"
 *                              description:
 *                                type: string
 *                                example: "Team messaging platform"
 *                              vendor:
 *                                type: string
 *                                example: "Slack Technologies"
 *                              category:
 *                                type: string
 *                                example: "Communication"
 *                              monthly_cost:
 *                                type: number
 *                                format: float
 *                                example: 8.00
 *                              owner_department:
 *                                type: string
 *                                example: "Engineering"
 *                              status:
 *                                type: string
 *                                example: "active"
 *                              website_url:
 *                                type: string
 *                                format: uri
 *                                example: "https://slack.com"
 *                              active_users_count:
 *                                type: integer
 *                                example: 25
 *                              created_at:
 *                                type: string
 *                                format: date-time
 *                                example: "2025-05-01T09:00:00Z"
 */
router.put('/:id', validateTool(true), toolController.updateTool);

module.exports = router;