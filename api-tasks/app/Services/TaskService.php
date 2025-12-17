<?php

namespace App\Services;

use App\Models\Task;
use App\Repositories\Task\TaskRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Collection;

class TaskService
{
    public function __construct(
        private readonly TaskRepositoryInterface $repo
    ) {}

    public function listAllTasks(int $userId): Collection
    {
        return $this->repo->listByUser($userId);
    }

    public function getTaskById(int $taskId, int $userId): Task
    {
        $task = $this->repo->findByIdForUser($taskId, $userId);

        if (!$task) {
            throw new ModelNotFoundException('Task not found');
        }

        return $task;
    }

    public function createTask(int $userId, array $data): Task
    {
        return $this->repo->createForUser($userId, $data);
    }

    public function updateTask(int $taskId, int $userId, array $data): Task
    {
        $task = $this->getTaskById($taskId, $userId);
        return $this->repo->update($task, $data);
    }

    public function deleteTask(int $taskId, int $userId): void
    {
        $task = $this->getTaskById($taskId, $userId);
        $this->repo->delete($task);
    }
}
