<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Task\EloquentTaskRepository;
use App\Repositories\Task\TaskRepositoryInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(TaskRepositoryInterface::class, EloquentTaskRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
