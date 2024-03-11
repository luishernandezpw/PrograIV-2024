Vue.component('componente-categorias', {
    data() {
        return {
            valor:'',
            categorias:[],
            accion:'nuevo',
            categoria:{
                idCategoria: new Date().getTime(),
                codigo:'',
                nombre:'',
            }
        }
    },
    methods:{
        buscarCategoria(e){
            this.listar();
        },
        async eliminarCategoria(idCategoria){
            if( confirm(`Esta seguro de elimina el categoria?`) ){
                this.accion='eliminar';
                await db.categorias.where("idCategoria").equals(idCategoria).delete();
                let respuesta = await fetch(`private/modulos/categorias/categorias.php?accion=eliminar&categorias=${JSON.stringify(this.categoria)}`),
                    data = await respuesta.json();
                this.nuevoCategoria();
                this.listar();
            }
        },
        modificarCategoria(categoria){
            this.accion = 'modificar';
            this.categoria = categoria;
        },
        async guardarCategoria(){
            //almacenamiento del objeto categorias en indexedDB
            await db.categorias.bulkPut([{...this.categoria}]);
            let respuesta = await fetch(`private/modulos/categorias/categorias.php?accion=${this.accion}&categorias=${JSON.stringify(this.categoria)}`),
                data = await respuesta.json();
            this.nuevoCategoria();
            this.listar();
        },
        nuevoCategoria(){
            this.accion = 'nuevo';
            this.categoria = {
                idCategoria: new Date().getTime(),
                codigo:'',
                nombre:'',
            }
        },
        async listar(){
            let collections = db.categorias.orderBy('codigo')
            .filter(categoria=>categoria.codigo.includes(this.valor) ||
                categoria.nombre.toLowerCase().includes(this.valor.toLowerCase()));
            this.categorias = await collections.toArray();
            if( this.categorias.length<=0 ){
                let respuesta = await fetch('private/modulos/categorias/categorias.php?accion=consultar'),
                    data = await respuesta.json();
                this.categorias = data;
                db.categorias.bulkPut(data);
            }
        }
    },
    template: `
        <div class="row">
            <div class="col col-md-6">
                <div class="card text-bg-dark">
                    <div class="card-header">REGISTRO DE CATEGORIAS</div>
                    <div class="catd-body">
                        <div class="row p-1">
                            <div class="col col-md-2">CODIGO</div>
                            <div class="col col-md-3">
                                <input v-model="categoria.codigo" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">NOMBRE</div>
                            <div class="col col-md-5">
                                <input v-model="categoria.nombre" type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col">
                                <button @click.prevent.default="guardarCategoria" class="btn btn-success">GUARDAR</button>
                                <button @click.prevent.default="nuevoCategoria" class="btn btn-warning">NUEVO</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col col-md-6">
                <div class="card text-bg-dark">
                    <div class="card-header">LISTADO DE CATEGORIAS</div>
                    <div class="card-body">
                        <form id="frmCategoria">
                            <table class="table table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>BUSCAR</th>
                                        <th colspan="5">
                                            <input placeholder="codigo, nombre" type="search" v-model="valor" @keyup="buscarCategoria" class="form-control">
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>CODIGO</th>
                                        <th>NOMBRE</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr @click="modificarCategoria(categoria)" v-for="categoria in categorias" :key="categoria.idCategoria">
                                        <td>{{categoria.codigo}}</td>
                                        <td>{{categoria.nombre}}</td>
                                        <td><button @click.prevent.default="eliminarCategoria(categoria.idCategoria)" class="btn btn-danger">del</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `
});