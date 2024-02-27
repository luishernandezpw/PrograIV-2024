var db;
const funcdb = ()=>{
    db = new Dexie("db_sistema");
    db.version(1).stores({
        categorias:'idCategoria,codigo,nombre',
        productos:'idProducto,codigo,nombre,marca,presentacion'
      });
};
funcdb();