const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const usersController = require('../controllers/usersController');
const preguntasController = require('../controllers/preguntasController');

router.get('/', preguntasController.prueba_mostrar_preguntas_recientes);
router.get('/preguntas/page=:pag', preguntasController.prueba_mostrar_preguntas_recientes);


router.post('/sign-up', usersController.sign_up);
router.get('/sign-up_page', usersController.sign_up_page);

router.post('/login', usersController.login);
router.get('/login', isNotLogged, usersController.login_page);
router.get('/logout', isLogged, usersController.logout);
router.get('/atributoPregunta/:id', preguntasController.atribs);
router.get('/busqueda', preguntasController.busqueda_basica);
router.get('/preguntas/mostrar/:id', preguntasController.atribs);

//Preguntas
router.get('/preguntas/crear', isLogged, preguntasController.crear_pregunta_vista);
router.post('/preguntas/crear', isLogged, upload.single("imagen"), preguntasController.crear_pregunta);
router.get('/preguntas/mostrar-imagenes', preguntasController.prueba_mostrar_imagenes);
router.get('/preguntas/mostrar-etiquetas', preguntasController.prueba_mostrar_etiquetas);

//router.get('/preguntas/:id/responder', isLogged, preguntasController.prueba_responder_vista);
router.post('/preguntas/:id/responder', isLogged, upload.single("imagen"), preguntasController.responder_pregunta);
router.post('/preguntas/:idPregunta/responder-respuesta/:idRespuesta', isLogged, preguntasController.responder_respuesta);

//Busqueda por etiquetas
router.get('/preguntas/busqueda-por-etiquetas-vista', preguntasController.busqueda_por_etiquetas_vista);
router.get('/preguntas/busqueda-por-etiquetas', preguntasController.busqueda_basica);

//Editar nuestro perfil de usuario
router.get('/usuarios/editar-mi-perfil', isLogged, usersController.vista_editar_usuario);
router.post('/usuarios/:correo/update', usersController.actualizar_usuario);

//Ver atributos de usuario
router.get('/usuarios/:correo', usersController.mostrar);



function isLogged(req, res, next){
    if(req.session.correo){
        next();
    }
    else{
        res.redirect("/login");
    }
}

function isNotLogged(req, res, next){
    if(req.session.correo){
        res.redirect("/");
    }
    else{
        next();
    }
}

module.exports = router;

