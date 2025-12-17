<?php

namespace App\Repositories\Task;

use App\Models\Task;
use Illuminate\Support\Collection;

interface TaskRepositoryInterface
{
    public function listByUser(int $userId): Collection;

    public function findByIdForUser(int $taskId, int $userId): ?Task;

    public function createForUser(int $userId, array $data): Task;

    public function update(Task $task, array $data): Task;

    public function delete(Task $task): void;
}
