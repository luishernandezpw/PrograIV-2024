import './bootstrap';
import { createApp } from 'vue';
import Dexie from 'dexie';
import categorias from './components/CategoriaComponent.vue';
window.db = '';

const app = createApp({
    components:{
        categorias,
    },
    data(){
        return{
            forms:{
                producto:{mostrar:false},
                categoria:{mostrar:false},
                cliente:{mostrar:false},
            }
        }
    },
    methods:{
        abrirFormulario(form){
            this.forms[form].mostrar = !this.forms[form].mostrar;
            this.$refs[form].listar();
        },
        funcdb(){
            db = new Dexie("db_sistema");
            db.version(1).stores({
                categorias:'idCategoria,codigo,nombre',
                productos:'idProducto,codigo,nombre,marca,presentacion'
            });
        }
    },
    created(){
        this.funcdb();
    }
});
app.mount('#app');
