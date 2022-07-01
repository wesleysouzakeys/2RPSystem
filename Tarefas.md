
Você vai ter que criar um sistema que possibilite o cadastro e login de usuários, com as seguintes funções:

- Cadastrar um novo usuário;
- Listar informações de um usuário;
- Alterar o nome e tipo de um usuário;
- Excluir um usuário;
- Alterar o status de um usuário (ativo ou inativo);
- Tipos de usuário.


Regras de negócio:

- A tabela de usuários deve conter os campos nome, senha, tipo, email e status; ✅
- A tabela de tipos deve ter o tipo do usuário (geral, admin, root); ✅
- Um usuário pode ter apenas um único tipo; 
- Apenas usuários do tipo root e admin podem cadastrar novos usuários;
- Apenas usuários do tipo root e admin podem alterar qualquer informação do usuário (inclusive status);
- Apenas usuários root podem excluir usuários;
- Usuários do tipo geral só têm acesso a listar informações de seu próprio usuário, bem como alterar suas próprias informações;
- O login deve ser feito com email e senha.