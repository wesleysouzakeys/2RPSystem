using API2RP_wepAPI.Contexts;
using API2RP_wepAPI.Interfaces;
using API2RP_wepAPI.Utils;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace API2RP_wepAPI.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        RPNetContext ctx = new RPNetContext();

        public void AlterarStatusUsuario(int idUsuario)
        {
            Usuario usuario = ListarUsuario(idUsuario);


            switch (usuario.Status)
            {
                case true:
                    usuario.Status = false;
                    break;

                case false:
                    usuario.Status = true;
                    break;
            }

            ctx.Usuarios.Update(usuario);

            ctx.SaveChanges();
        }

        public void AtualizarUsuario(Usuario usuarioAtualizado)
        {
            Usuario usuarioBuscado = ListarUsuario(usuarioAtualizado.IdUsuario);

            if (usuarioBuscado.IdTipoUsuario != 0 && usuarioBuscado.Nome != null && usuarioBuscado.Email != null && usuarioBuscado.Senha != null && usuarioBuscado != null)
            {
                usuarioBuscado.IdTipoUsuario = usuarioAtualizado.IdTipoUsuario;
                usuarioBuscado.Nome = usuarioAtualizado.Nome;
                usuarioBuscado.Email = usuarioAtualizado.Email;
                usuarioBuscado.Senha = usuarioAtualizado.Senha;
                usuarioBuscado.Status = usuarioAtualizado.Status;
            }

            ctx.Usuarios.Update(usuarioBuscado);

            ctx.SaveChanges();
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

        public Usuario Login(string email, string senha)
        {
            var usuario = ctx.Usuarios.FirstOrDefault(u => u.Email == email);

            if (usuario != null)
            {
                var rgx = new Regex(@"^\$\d[a-z]\$\d\d\$.{53}");

                if (rgx.IsMatch(usuario.Senha))
                {
                    bool comparado = Criptografia.Comparar(senha, usuario.Senha);
                    if (comparado)
                        return usuario;
                }
                else
                {
                    AtualizarCripto(usuario, usuario.IdUsuario);
                    return Login(usuario.Email, usuario.Senha);
                }
            }

            return null;
        }

        public void AtualizarCripto(Usuario usuarioBuscado, int id)
        {
            Usuario usuarioNoBanco = ListarUsuario(id);

            string senhaAtualizada = Criptografia.GerarHash(usuarioBuscado.Senha);

            usuarioNoBanco.IdUsuario = usuarioBuscado.IdUsuario;
            usuarioNoBanco.Senha = senhaAtualizada;
            usuarioNoBanco.Email = usuarioBuscado.Email;

            ctx.Usuarios.Update(usuarioNoBanco);

            ctx.SaveChanges();
        }
    }
}
