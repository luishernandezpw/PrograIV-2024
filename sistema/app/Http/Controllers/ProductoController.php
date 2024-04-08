<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //select * from productos inner join categorias
        return Producto::with('categorias')->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //insert into productos
        Producto::create($request->all());
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Producto $producto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Producto $producto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producto $producto)
    {
        //update productos
        $producto::where('idProducto', $request['idProducto'])->update([
            'idCategoria'=>$request['idCategoria'],
            'codigo'=>$request['codigo'],
            'nombre'=>$request['nombre'],
            'marca'=>$request['marca'],
            'presentacion'=>$request['presentacion'],
            'precio'=>$request['precio'],
            'foto'=>$request['foto']
        ]);
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producto $producto)
    {
        //delete from productos
        $producto::where('idProducto', $request['idProducto'])->delete();
        return response()->json(['msg'=>'ok'], 200);
    }
}
