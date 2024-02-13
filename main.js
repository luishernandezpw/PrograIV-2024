var app = new Vue({
    el: '#app',
    data:{
        forms:{
            producto:{mostrar:false},
            categoria:{mostrar:false},
            cliente:{mostrar:false},
        }
    },
    methods:{
        abrirFormulario(form){
            this.forms[form].mostrar = !this.forms[form].mostrar;
            this.$refs[form].listar();
        }
    }
});
async function seleccionarFoto(imagen){
    let archivo = imagen.files[0];
    if(archivo){
        let blob = await img(archivo, 1),
            reader = new FileReader();
        reader.onload = e=>{
            app.$refs.producto.producto.foto=e.target.result;
        };
        reader.readAsDataURL(blob);
    }
}