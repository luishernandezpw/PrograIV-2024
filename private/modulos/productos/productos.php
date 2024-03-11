<?php
include('../../Config/Config.php');
extract($_REQUEST);

$productos = isset($productos) ? $productos : '[]';
$accion=$accion ?? '';
$class_productos = new productos($conexion);
print_r( json_encode($class_productos->recibir_datos($productos)) );

class productos{
    private $datos=[], $db, $respuesta = ['msg'=>'ok'];
    public function __construct($db){
        $this->db = $db;
    }
    public function recibir_datos($productos){
        global $accion;
        if($accion==='consultar'){
            return $this->administrar_productos();
        }else{
            $this->datos = json_decode($productos, true);
            return $this->validar_datos();
        }
    }
    private function validar_datos(){
        if( empty($this->datos['idProducto']) ){
            $this->respuesta['msg'] = 'Por error no se pudo seleccionar la ID';
        }
        if( empty($this->datos['categoria']['id']) ){
            $this->respuesta['msg'] = 'Por error no se pudo seleccionar la Categoria';
        }
        if( empty($this->datos['codigo']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el codigo del producto';
        }
        if( empty($this->datos['nombre']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el nombre del producto';
        }
        if( empty($this->datos['marca']) ){
            $this->respuesta['msg'] = 'Por favor ingrese la marca del producto';
        }
        if( empty($this->datos['presentacion']) ){
            $this->respuesta['msg'] = 'Por favor ingrese la presentacion del producto';
        }
        if( empty($this->datos['precio']) ){
            $this->respuesta['msg'] = 'Por favor ingrese el precio del producto';
        }
        return $this->administrar_productos();
    }
    private function administrar_productos(){
        global $accion;
        if( $this->respuesta['msg'] === 'ok' ){
            if( $accion==='nuevo' ){
                return $this->db->consultas('INSERT INTO productos VALUES(?,?,?,?,?,?,?,?)',
                $this->datos['idProducto'],$this->datos['categoria']['id'],$this->datos['codigo'],
                    $this->datos['nombre'],$this->datos['marca'],$this->datos['presentacion'],$this->datos['precio'],$this->datos['foto']);
            }else if($accion==='modificar' ){
                return $this->db->consultas('UPDATE productos SET idCategoria=?, codigo=?, nombre=?, marca=?, presentacion=?, precio=?, foto=? WHERE idProducto=?',
                $this->datos['categoria']['id'], $this->datos['codigo'],$this->datos['nombre'], $this->datos['marca'], $this->datos['presentacion'], 
                $this->datos['precio'], $this->datos['foto'], $this->datos['idProducto']);
            }else if($accion==='eliminar'){
                return $this->db->consultas('DELETE productos FROM productos WHERE idProducto=?',
                $this->datos['idProducto']);
            }else if($accion==='consultar'){
                $this->db->consultas('
                    SELECT productos.idProducto, productos.idCategoria, productos.codigo, productos.nombre, 
                        productos.marca, productos.presentacion, productos.precio, productos.foto, categorias.nombre AS nomcat
                    FROM productos
                        INNER JOIN categorias ON (productos.idCategoria = categorias.idCategoria)
                ');
                return $this->db->obtener_datos();
            }
        }else{
            return $this->respuesta;
        }
    }
}
?>