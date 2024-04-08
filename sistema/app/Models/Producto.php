<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = ['idProducto', 'idCategoria', 'codigo', 'nombre', 'marca', 'presentacion', 'precio', 'foto'];
    public function categorias()
    {
        //select * from categorias where idCategoria = $this->idCategoria
        return $this->belongsTo(Categoria::class, 'idCategoria', 'idCategoria');
    }
}
