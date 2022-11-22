<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Mockery\Exception;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{

            $listaProductos = Producto::all();

        }catch (Exception $e){

            return response()->json(['res' => false, 'message' => 'Error al obtener los productos','error' => $e]);

        }

        return response()->json(['res' => true, 'productos'=>$listaProductos]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response

    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->json()->all(), [
            'nombre' => ['required', 'string'],
            'precio' => ['required', 'integer']
        ]);

        if($validator->fails()){

            return response()->json(['res' => false, 'validator'=>$validator->messages()]);

        }

        $producto = new Producto();
        $producto->nombre = $request->json('nombre');
        $producto->precio = $request->json('precio');

        try{

            $producto->save();

        }catch (Exception $e){

            return response()->json(['res' => false, 'message' => 'Error al insertar un producto', 'error' => $e]);

        }

        return response()->json(['res' => true, 'producto'=>$producto]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{

            $producto = Producto::find($id);

            if($producto == null){
                return response()->json(['res' => false, 'message' => 'Error, producto no encontrado']);
            }

        }catch (Exception $e){
            return response()->json(['res' => false, 'message' => 'Error al obtener el producto', 'error' => $e]);
        }

        return response()->json(['res' => true, 'producto'=>$producto]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
        try{

            $producto = Producto::find($id);

            if($producto == null){

                return response()->json(['res' => false, 'message' => 'Error, producto no encontrado']);

            }

        }catch (Exception $e){

            return response()->json(['res' => false, 'message' => 'Error al obtener el producto', 'error' => $e]);

        }

        try{//try catch que valida la opción pa editar un producto

           $producto->fill($request->json()->all());

        }catch (Exception $e){

            return response()->json(['res' => false, 'message' => 'Error al editar el producto', 'error' => $e]);

        }

        $producto->save();
        return response()->json($producto);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try{

            $producto = Producto::find($id);

            if($producto == null){

                return response()->json(['res' => false, 'message' => 'Error, producto no encontrado']);

            }

        }catch (Exception $e){

            return response()->json(['res' => false, 'message' => 'Error al obtener el producto', 'error' => $e]);

        }

        $validator = Validator::make($request->json()->all(),[
            'nombre' => ['required', 'string'],
            'precio' => ['required', 'integer']
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), HTTP_BAD_REQUEST);
        }

        try{
            $producto->update($request->all());
        }catch (Exception $e){
            return response()->json(['res' => false, 'message' => 'Error al editar el producto', 'error' => $e]);
        }

        return $producto;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{

            $producto = Producto::find($id);

            if($producto == null){

                return response()->json(['res' => false, 'message' => 'Error, producto no encontrado']);

            }

        }catch (Exception $e){

            return response()->json(['res' => false, 'message' => 'Error al obtener el producto', 'error' => $e]);

        }

        try{

            $producto->delete();

        }catch (Exception $e){

            return response()->json(['res' => false, 'message' => 'Error al eliminar el producto', 'error' => $e]);

        }

        return response()->json(['res' => true, 'message' => 'Producto eliminado', 'Producto' => $producto]);
    }
}
