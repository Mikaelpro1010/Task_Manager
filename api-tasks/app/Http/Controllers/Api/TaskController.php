<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Services\TaskService;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function __construct(
        private readonly TaskService $taskService
    ) {}

    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $tasks = $this->taskService->listAllTasks($userId);

        return response()->json($tasks);
    }

    public function store(StoreTaskRequest $request)
    {
        $userId = $request->user()->id;

        $task = $this->taskService->createTask(
            $userId,
            $request->validated()
        );

        return response()->json($task, 201);
    }

    public function show(Request $request, int $taskId)
    {
        $userId = $request->user()->id;

        $task = $this->taskService->getTaskById(
            $taskId,
            $userId
        );

        return response()->json($task);
    }

    public function update(UpdateTaskRequest $request, int $taskId)
    {
        $userId = $request->user()->id;

        $task = $this->taskService->updateTask(
            $taskId,
            $userId,
            $request->validated()
        );

        return response()->json($task);
    }

    public function destroy(Request $request, int $taskId)
    {
        $userId = $request->user()->id;

        $this->taskService->deleteTask(
            $taskId,
            $userId
        );

        return response()->json(null, 204);
    }
}
