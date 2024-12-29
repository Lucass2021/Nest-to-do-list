1. To-Do List
   Uma API para gerenciar tarefas:

Rotas:

- Criar uma nova tarefa - Ok
- Listar todas as tarefas - Ok
- Atualizar o status (feito/não feito) - Ok
- Deletar uma tarefa - Ok

-- Extras:

- Tentar unificar rota de done/undone task - Ok
- Validações em cada rota - Ok
  -- Adicionar rota para editar dueDate e category - Ok
  -- Validar possíveis erros de cada rota - Ok
  -- Conferir validações - Ok
- Adicionar UUID para tasks - Ok
- Adicione categorias
  -- Criar novas categorias - Ok
  -- Listar todas as categorias - Ok
  -- Listar apenas uma categoria - Ok
  -- Listar apenas categorias ativas
  -- Listar categorias por data (createdAt e updatedAt)
  -- Deletar uma categoria
  -- Vincular categoria com task
  -- Tornar categoria e dueDate obrigatórias
  -- Adicionar ordenação de categorias e tasks
- Prazos para as tarefas
- Incluir Swagger
- Incluir Usuários
- Testes Unitários
- Aplicação com Prisma

Docker:
docker compose up -d
docker-compose down
docker volume rm to-do-list_pgdata
