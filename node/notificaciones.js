window.permitirNotificaciones = "defaul";
if( !Notification ){
    alert("Tu navegador no soporta notificaciones");
}
if( Notification.permission !== "granted" ){
    Notification.requestPermission().then((result) => {
        permitirNotificaciones = result;
        console.log(permitirNotificaciones);
    });
}if (Notification.permission==="granted"){
    permitirNotificaciones = "granted";
} else{
    permitirNotificaciones = "denied";
}

function mostrarNotificaciones(title, msg){
    console.log(permitirNotificaciones, msg);
    if( permitirNotificaciones === "granted" ){
        let opciones = {
            body: msg,
        };
        let notificacion = new Notification(title, opciones);
        console.log(notificacion);
    }
}