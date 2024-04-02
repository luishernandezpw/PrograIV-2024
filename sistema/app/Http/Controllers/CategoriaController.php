<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //select * from categorias
        return categoria::get();
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
    public function store(Request $request)//POST
    {
        //insert into categorias
        Categoria::create($request->all());
        return response()->json(['msg'=>'ok'], 200);
    }
    /**
     * Display the specified resource.
     */
    public function show(Categoria $categoria)
    {
        //
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categoria $categoria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Categoria $categoria)
    {
        //update categorias
        $categoria::where('idCategoria', $request['idCategoria'])->update([
            'codigo'=>$request['codigo'],
            'nombre'=>$request['nombre']
        ]);
        return response()->json(['msg'=>'ok'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Categoria $categoria)
    {
        //delete from categorias
        $categoria::where('idCategoria', $request['idCategoria'])->delete();
        return response()->json(['msg'=>'ok'], 200);
    }
}
