export default (sequelize, DataType) => {
  const Usuario = sequelize.define('Usuario', {
    id_user: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rut: DataType.STRING,
    nombre: DataType.STRING,
    telefono_fijo: DataType.STRING,
    telefono_movil: DataType.STRING,
    direccion: DataType.STRING,
    email: DataType.STRING,
    empresa: DataType.STRING
  }, {
    tableName: 'TBL_USUARIO',
    timestamps: false,
    createdAt: false
  });
  return Usuario;
};
