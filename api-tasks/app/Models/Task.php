<?php

namespace App\Models;

use App\Enums\TaskStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'status',
        'user_id',
        'task_list_id',
    ];

    protected $casts = [
        'status' => TaskStatus::class,
    ];

    /**
     * Dono da tarefa
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Lista (opcional)
     */
    public function taskList()
    {
        return $this->belongsTo(TaskList::class);
    }
}
