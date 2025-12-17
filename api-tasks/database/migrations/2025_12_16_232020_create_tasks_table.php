<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();

            $table->string('title');

            // CONCLUIDO | EM_ANDAMENTO | CANCELADO
            $table->string('status')->default('EM_ANDAMENTO');

            // Dono da tarefa (obrigatório)
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            // Lista é OPCIONAL
            $table->foreignId('task_list_id')
                ->nullable()
                ->constrained('task_lists')
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
