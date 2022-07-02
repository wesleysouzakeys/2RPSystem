namespace API2RP_wepAPI.Interfaces
{
    public interface IUsuarioRepository
    {
        void Cadastrar(Usuario usuario);

        List<Usuario> ListarTodos();

        Usuario ListarUsuario(int idUsuario);

        void AtualizarUsuario(Usuario usuario);

        void ExcluirUsuario(Usuario usuario);

        void AlterarStatusUsuario(int idUsuario);

        Usuario Login(string email, string senha);
    }
}
