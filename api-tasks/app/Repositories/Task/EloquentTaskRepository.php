<?php

namespace App\Repositories\Task;

use App\Models\Task;
use Illuminate\Support\Collection;

class EloquentTaskRepository implements TaskRepositoryInterface
{
    public function listByUser(int $userId): Collection
    {
        return Task::query()
            ->where('user_id', $userId)
            ->latest()
            ->get();
    }
    

    public function findByIdForUser(int $taskId, int $userId): ?Task
    {
        return Task::query()
            ->where('id', $taskId)
            ->where('user_id', $userId)
            ->first();
    }

    public function createForUser(int $userId, array $data): Task
    {
        $data['user_id'] = $userId;
        return Task::create($data);
    }

    public function update(Task $task, array $data): Task
    {
        $task->update($data);
        return $task->refresh();
    }

    public function delete(Task $task): void
    {
        $task->delete();
    }
}
