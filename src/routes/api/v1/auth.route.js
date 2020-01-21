const express = require('express')
let router = express.Router()

const authController = require('../../../controllers/api/v1/auth.controller')
const validation = require('../../../middlewares/validation')

/**
 * @swagger
 *
 * definitions:
 *   LoginUser:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *         format: email
 *         example: user@email.com
 *       password:
 *         type: string
 *         minLength: 8
 *   User:
 *     allOf:
 *      -  $ref: "#/definitions/LoginUser"
 *     type: object
 *     required:
 *       - name
 *     properties:
 *       name:
 *         type: string
 *         minLength: 3
 *   CompleteUser:
 *     allOf:
 *      -  $ref: "#/definitions/User"
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         format: uuid
 *       createdAt:
 *         type: string
 *         format: date-time
 *       updatedAt:
 *         type: string
 *         format: date-time
 */

/**
 *  @swagger
 *  /register:
 *    post:
 *      summary:
 *      - Register a new user
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "User to be registered"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/User"
 *      tags:
 *      - auth
 *      responses:
 *        201:
 *          description: User registered successfully
 *        409:
 *          description: E-mail already exists
 *        422:
 *          description: Some required field is missing
 */
router.post(
  '/register',
  validation.validateRegistrationBody(),
  authController.register
)

/**
 *  @swagger
 *  /login:
 *    post:
 *      summary:
 *      - Logs the user in and get an authorization token
 *      produces:
 *      - application/json
 *      parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "User to be logged"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/LoginUser"
 *      tags:
 *      - auth
 *      responses:
 *        200:
 *          description: User logged in successfully
 *        401:
 *          description: E-mail/password is wrong
 *        422:
 *          description: Some required field is missing
 */
router.post('/login', validation.validateLoginBody(), authController.login)

module.exports = router