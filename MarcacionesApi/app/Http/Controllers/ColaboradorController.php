<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Colaborador;
use App\ViewModels\ColaboradorViewModel;

class ColaboradorController extends Controller
{
    public function getAll()
    {
        return Colaborador::all('id','email');
    }

    public function get($id)
    {
        $colaboradorDB = Colaborador::find($id);
        $colaborador = new ColaboradorViewModel();
        $colaborador->id = $colaboradorDB->id;
        $colaborador->email = $colaboradorDB->email;
        return response()->json($colaborador);
    }

    public function save(Request $request)
    {
        try
        {
            $email=$request->email;
            Colaborador::create(['email'=>$email]);
            return response()->json(['error'=>false,'msg'=>'Registro creado exitosamente'],200);
        }
        catch(Exception $ex)
        {
            return response()->json(['error'=>true,'msg'=>$ex],500);
        }
    }
}
