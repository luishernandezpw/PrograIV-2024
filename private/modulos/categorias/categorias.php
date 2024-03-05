<?php
include('../../Config/Config.php');
extract($_REQUEST);

$categorias = isset($categorias) ? $categorias : '[]';
$accion=$accion ?? '';
$class_categorias = new categorias($conexion);
print_r( json_encode($class_categorias->recibir_datos($categorias)) );

class categorias{
    private $datos=[], $db, $respuesta = ['msg'=>'ok'];
    public function __construct($db){
        $this->db = $db;
    }
    public function recibir_datos($categorias){
        global $accion;
        if($accion==='consultar'){
            return $this->administrar_categorias();
        }else{
            $this->datos = json_decode($categorias, true);
            return $this->validar_datos();
        }
    }
    private function validar_datos(){
        if( empty($this->datos['idCategoria']) ){
            $this->respuesta['msg'] = 'Por error no se pudo seleccionar la ID';
        }
        if( empty($this->datos['codigo']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el codigo de la categoria';
        }
        if( empty($this->datos['nombre']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el nombre de la categoria';
        }
        return $this->administrar_categorias();
    }
    private function administrar_categorias(){
        global $accion;
        if( $this->respuesta['msg'] === 'ok' ){
            if( $accion==='nuevo' ){
                return $this->db->consultas('INSERT INTO categorias VALUES(?,?,?)',
                $this->datos['idCategoria'],$this->datos['codigo'],$this->datos['nombre']);
            }else if($accion==='modificar' ){
                return $this->db->consultas('UPDATE categorias SET codigo=?, nombre=? WHERE idCategoria=?',
                $this->datos['codigo'],$this->datos['nombre'], $this->datos['idCategoria']);
            }else if($accion==='eliminar'){
                return $this->db->consultas('DELETE categorias FROM categorias WHERE idCategoria=?',
                $this->datos['idCategoria']);
            }else if($accion==='consultar'){
                $this->db->consultas('SELECT * FROM categorias');
                return $this->db->obtener_datos();
            }
        }else{
            return $this->respuesta;
        }
    }
}
?>