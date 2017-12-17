import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';

import models from '../src/models';

const should = chai.should();

chai.use(chaiHttp);

describe('Usuario', () => {
  beforeEach((done) => {
    models.Usuario.findAll().then(usuarios => {
      usuarios.map(usuario => usuario.destroy());
    }).then(() => done());
  });

  afterEach((done) => {
    models.Usuario.findAll().then(usuarios => {
      usuarios.map(usuario => usuario.destroy());
    }).then(() => done());
  });

  describe('GET', () => {
    it('should return all usuarios', (done) => {
      chai.request(server)
        .get('/usuarios')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should return 1 user', (done) => {
      const usuario = {
        "id_user": 1,
        rut: "11111111-8",
        nombre: "John Doe",
        "telefono_fijo": "+56999999999",
        "telefono_movil": "+56999999999",
        direccion: "Tarapaca 380",
        email: "john.doe@email.com",
        empresa: "Empresa SPA"
      };

      models.Usuario.create(usuario).then(savedUsuario => {
        chai.request(server)
          .get('/usuarios')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
          });
      });
    })
  });

  describe('POST', () => {
    it('should create a new user', (done) => {
      const usuario = {
        "id_user": 1,
        rut: "11111111-8",
        nombre: "John Doe",
        "telefono_fijo": "+56999999999",
        "telefono_movil": "+56999999999",
        direccion: "Tarapaca 380",
        email: "john.doe@email.com",
        empresa: "Empresa SPA"
      };

      chai.request(server)
        .post('/usuarios')
        .send(usuario)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('nombre');
          res.body.nombre.should.equal("John Doe");
          done();
        });
    });
  });
});