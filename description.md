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
  -- Listar apenas categorias ativas - Ok
  -- Deletar uma categoria - Ok
  -- Edição de categoria - Ok
  -- Atualizar o isActive - Ok
- Verificar todo o fluxo de task e categorias e vinculo de categorias com tasks - Ok
- Listar a categoria da task (Ajuste no findAll, findOne, updateStatus e Delete das tasks) - Ok
- Listar todas as tasks vinculadas a uma categoria - Ok
- Adicionar a possibilidade de vincular uma categoria APÓS criar uma task (Criação de tasks com category null) - Ok
- Adicionar a possibilidade de vincular uma dueDate APÓS criar uma task (Criação de tasks com dueDate null) - Ok
- Adicionar status para tasks não concluídas (Testar atualização automatica e criar rota para isDone e overdue) - Ok
- Listar todas as categorias com isActive (false) - Ok
- Tornar category com name unico - Ok
- Listar todas as tasks overdue - Ok
- Listar todas as tasks com isDone (true ou false) - Ok
- Listar tasks por data (dueDate) - Ok

- Incluir Usuários
  -- Criar uma conta (user normal) - Ok
  -- JWT e password encript - Ok
  -- Criar novos usuários (admin) - Ok
  -- Listar todos os usuários (admin only) - Ok (Adicionar validação JWT)
  -- Listar apenas um usuário (admin only) - Ok (Adicionar validação JWT)
  -- Banir/excluir usuários (admin only) - Ok (Adicionar validação JWT)
  -- Vincular criação de tasks com users - Ok
  -- Aplicar validação do JWT nas rotas - Ok
  -- Verificar validações de JWT e encript password nas rotas de user - Ok
  -- Verificar validação de user admin - Ok
  -- Tornar um user admin - Ok
  -- Mensagem de banimento ao logar - Ok

- Incluir Swagger - Ok
- Substituir rota active e inactive no categories por padrão usado via query params no tasks - Ok
- Implementar lastLoginAt - Ok
- Aplicação com Prisma
- Testes Unitários
- Verificar se todo o conteúdo está em inglês (código, mensagens de erro, consoles.log....)

Docker:
docker compose up -d
docker-compose down
docker volume ls
docker volume rm to-do-list_pgdata
