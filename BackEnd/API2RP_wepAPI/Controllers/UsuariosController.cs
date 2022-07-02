using API2RP_wepAPI.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API2RP_wepAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioRepository _context;

        public UsuariosController(IUsuarioRepository context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult ListarTodos()
        {
            try
            {
                List<Usuario> usuarios = _context.ListarTodos();
                return Ok(usuarios);
            }
            catch (Exception err)
            {
                return BadRequest(err);
            }
        }

        [HttpGet("{idUsuario}")]
        public IActionResult ListarUsuario(int idUsuario)
        {
            try
            {
                return Ok(_context.ListarUsuario(idUsuario));
            }
            catch (Exception err)
            {
                return BadRequest(err);
            }
        }

        [HttpDelete("{idUsuario}")]
        public IActionResult DeletarUsuario(int idUsuario)
        {
            try
            {
                Usuario usuario = _context.ListarUsuario(idUsuario);

                if (usuario != null)
                {
                    _context.ExcluirUsuario(usuario);
                    return NoContent();
                }
                return BadRequest("Usuário não encontrado");
            }
            catch (Exception err)
            {
                return BadRequest(err);
            }
        }

        [HttpPost]
        public IActionResult Cadastrar(Usuario usuario)
        {
            try
            {
                if (usuario != null)
                {
                    _context.Cadastrar(usuario);
                    return Ok();
                }
                return BadRequest("Um usuário é necessário para ser cadastrado");
            }
            catch (Exception err)
            {
                return BadRequest(err);
            }
        }
    }
}
