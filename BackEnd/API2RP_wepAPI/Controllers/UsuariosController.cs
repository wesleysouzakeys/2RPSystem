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
    }
}
