import { Router } from 'express';
import models from '../models';

let router = Router();

router.get('/', (req, res) => {
  models.Usuario.findAll().then((usuarios) => {
    res.json(usuarios);
  });
});

export default router;
