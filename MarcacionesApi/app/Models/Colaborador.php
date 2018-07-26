<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Colaborador extends Model
{
    protected $table = 'colaboradores';
    protected $fillable = ['email'];
    protected $hidden = ['created_at','updated_at'];
    //
    public function marcaciones(){
        return $this->hasMany(Marcacion::class);
    }
}
