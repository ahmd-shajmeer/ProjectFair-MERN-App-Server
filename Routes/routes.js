const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const multerConfig = require('../Middleware/multerMiddleware')

// route for register
router.post('/register',userController.register) 
// route for login
router.post('/login',userController.login) 
// route for adding project
router.post('/add-project',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)
// route for view projects in homepage
router.get('/home-projects',projectController.getHomeProjects)
// route for view all projects
router.get('/all-projects',jwtMiddleware,projectController.getAllProjects)
// route for view user specifed projects 
router.get('/user-projects',jwtMiddleware,projectController.getUserProjects)
// route for edit projects
router.put('/project/edit/:pid',jwtMiddleware,multerConfig.single("projectImage"),projectController.editProject)
// route for delete project
router.delete('/project/delete/:pid',jwtMiddleware,projectController.removeProject)
// route for user profile update
router.put('/user/edit',jwtMiddleware,multerConfig.single("profileImage"),userController.editProfile)

module.exports = router