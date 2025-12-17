<?php

namespace App\Enums;

enum TaskStatus: string
{
    case CONCLUIDO = 'CONCLUIDO';
    case EM_ANDAMENTO = 'EM_ANDAMENTO';
    case CANCELADO = 'CANCELADO';
}
