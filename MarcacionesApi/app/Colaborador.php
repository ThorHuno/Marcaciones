<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Colaborador extends Model
{
    //
    public function marcaciones(){
        return $this->hasMany('App\Marcacion');
    }
}
