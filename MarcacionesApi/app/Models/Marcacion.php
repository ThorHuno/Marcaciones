<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Marcacion extends Model
{
    protected $table = 'marcaciones';
    protected $fillable = ['Hour','IsEnter','IpAddress'];
    //
    public function colaborador(){
        return $this->belongsTo(Colaborador::class);
    }
}
