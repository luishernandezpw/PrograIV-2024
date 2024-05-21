Vue.component('componente-chat', {
    data() {
        return {
            valor:'',
            chats:[],
            chat:{
                idChat: new Date().getTime(),
                from:'luis',
                message:'',
                status:'',
                fecha:new Date()
            }
        }
    },
    methods:{
        listar(){},
        guardarChat(){
            if( this.chat.message != '' ){
                this.chats.push(this.chat);
                socketio.emit('chat', this.chat);
            }else{
                alertify.error('Por favor escriba un mensaje');
            }
        },
        obtenerHistorial(){
            socketio.emit('historial');
            socketio.on('historial', (data)=>{
                this.chats = data;
            });
        }
    },
    created(){
        this.obtenerHistorial();
        socketio.on('chat', (data)=>{
            this.chats.push(data);
        });
    },
    template: `
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card text-bg-dark">
                    <div class="card-header">CHAT DE AMIGOs</div>
                    <div class="catd-body">
                        <div class="row p-1">
                            <div class="col col-md-12">
                                <ul id="ltsMensajes">
                                    <li v-for="msg in chats">
                                        {{msg.from}}: {{msg.message}}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-12">
                                <form id="frmChat" @submit.prevent="guardarChat">
                                    <input placeholder="Escriba un mensaje" 
                                        v-model="chat.message" type="text" class="form-control">
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
});