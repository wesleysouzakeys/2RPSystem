using API2RP_wepAPI.Contexts;
using API2RP_wepAPI.Interfaces;

namespace API2RP_wepAPI.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        RPNetContext ctx = new RPNetContext();

        public void AlterarStatusUsuario(int idUsuario)
        {
            throw new NotImplementedException();
        }

        public void AtualizarUsuario(Usuario usuario)
        {
            throw new NotImplementedException();
        }

        public void Cadastrar(Usuario usuario)
        {
            throw new NotImplementedException();
        }

        public void ExcluirUsuario(Usuario usuario)
        {
            throw new NotImplementedException();
        }

        public List<Usuario> ListarTodos()
        {
            return ctx.Usuarios.ToList();
        }

        public Usuario ListarUsuario(int idUsuario)
        {
            throw new NotImplementedException();
        }
    }
}
