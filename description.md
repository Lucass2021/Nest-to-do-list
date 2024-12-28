1. To-Do List
   Uma API para gerenciar tarefas:

Rotas:

- Criar uma nova tarefa - Ok
- Listar todas as tarefas - Ok
- Atualizar o status (feito/não feito) - Ok
- Deletar uma tarefa - Ok

-- Extras:

- Tentar unificar rota de done/undone task - Ok
- Validações em cada rota
  -- Adicionar rota para editar dueDate e category - Ok
  -- Validar possíveis erros de cada rota - Ok
  -- Conferir validações - Ok
- Adicione categorias
- Prazos para as tarefas
- Incluir Swagger
- Incluir Usuários
- Testes Unitários

Docker:
docker compose up -d
docker-compose down
docker volume rm to-do-list_pgdata
