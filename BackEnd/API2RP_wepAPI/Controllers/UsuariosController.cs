using API2RP_wepAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
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

        /// <summary>
        /// Lista todos os Usuários cadastrados no Banco de Dados
        /// </summary>
        /// <returns></returns>
        [Authorize(Roles = "2,3")]
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

        /// <summary>
        /// Lista apenas um Único usuário pelo Id passado
        /// </summary>
        /// <param name="idUsuario">Id do Usuário a ser Listado de forma Única</param>
        /// <returns></returns>
        [Authorize(Roles = "1,2,3")]
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

        /// <summary>
        /// Deleta um Usuário específico do Sistema
        /// </summary>
        /// <param name="idUsuario">Id do Usuário a ser Excluído</param>
        /// <returns></returns>
        [Authorize(Roles = "3")]
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

        /// <summary>
        /// Cadastra um novo usuário no sistema
        /// </summary>
        /// <param name="usuario">Objeto Usuário com as informações a serem cadastradas</param>
        /// <returns></returns>
        [Authorize(Roles = "2,3")]
        [HttpPost]
        public IActionResult Cadastrar(Usuario usuario)
        {
            try
            {
                if ((usuario != null) && usuario.IdTipoUsuario == 1 || usuario.IdTipoUsuario == 2 || usuario.IdTipoUsuario == 3)
                {
                    _context.Cadastrar(usuario);
                    return StatusCode(201);
                }
                return BadRequest("Um usuário válido é necessário para ser cadastrado");
            }
            catch (Exception err)
            {
                return BadRequest(err);
            }
        }

        /// <summary>
        /// Atualiza as informações de um Usuário
        /// </summary>
        /// <param name="usuario">Objeto usuário com informações novas</param>
        /// <returns></returns>
        [Authorize(Roles = "1,2,3")]
        [HttpPut]
        public IActionResult AtualizarUsuario(Usuario usuario)
        {
            try
            {
                if (usuario != null && usuario.IdUsuario != 0)
                {
                    _context.AtualizarUsuario(usuario);
                    return Ok();
                }
                return BadRequest("Um usuário válido é necessário para ser atualizado");
            }
            catch (Exception err)
            {
                return BadRequest(err);
            }
        }

        /// <summary>
        /// Altera o status do usuário no sistema
        /// </summary>
        /// <param name="idUsuario">Id do usuário a ser desativado ou ativado</param>
        /// <returns></returns>
        [Authorize(Roles = "2,3")]
        [HttpPatch]
        public IActionResult AlterarStatusUsuario(int idUsuario)
        {
            try
            {
                _context.AlterarStatusUsuario(idUsuario);
                return Ok();
            }
            catch (Exception err)
            {
                return BadRequest(err);
            }
        }
    }
}
