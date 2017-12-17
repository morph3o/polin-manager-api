import { Router } from 'express';
import models from '../models';

let router = Router();

router.get('/', (req, res) => {
  models.Usuario.findAll().then((usuarios) => {
    res.json(usuarios);
  });
});

router.post('/', (req, res) => {
  models.Usuario.create(req.body).then(savedUsuario => {
    res.json(savedUsuario)
  });
});

export default router;
