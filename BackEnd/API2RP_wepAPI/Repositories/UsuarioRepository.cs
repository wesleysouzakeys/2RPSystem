using API2RP_wepAPI.Contexts;
using API2RP_wepAPI.Interfaces;
using Microsoft.EntityFrameworkCore;

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
            ctx.Usuarios.Add(usuario);

            ctx.SaveChanges();
        }

        public void ExcluirUsuario(Usuario usuario)
        {
            ctx.Usuarios.Remove(usuario);

            ctx.SaveChanges();
        }

        public List<Usuario> ListarTodos()
        {
            return ctx.Usuarios.Select(c => new Usuario()
            {
                IdUsuario = c.IdUsuario,
                IdTipoUsuario = c.IdTipoUsuario,
                Nome = c.Nome,
                Email = c.Email,
                Senha = c.Senha,
                Status = c.Status,

                IdTipoUsuarioNavigation = new Tiposusuario
                {
                    IdTipoUsuario = c.IdTipoUsuarioNavigation.IdTipoUsuario,
                    Titulo = c.IdTipoUsuarioNavigation.Titulo
                }
            }).ToList();
        }

        public Usuario ListarUsuario(int idUsuario)
        {
            return ctx.Usuarios.Find(idUsuario);
        }
    }
}
