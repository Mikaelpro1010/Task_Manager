<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskList extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'user_id',
    ];

    /**
     * Dono da lista
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Tarefas da lista
     */
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
