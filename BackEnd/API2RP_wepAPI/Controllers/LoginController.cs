using API2RP_wepAPI.Interfaces;
using API2RP_wepAPI.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace API2RP_wepAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUsuarioRepository _context;

        public LoginController(IUsuarioRepository context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Login(LoginViewModel LoginUsuario)
        {
            try
            {
                Usuario usuarioBuscado = _context.Login(LoginUsuario.Email, LoginUsuario.Senha);

                if (usuarioBuscado == null)
                {
                    return BadRequest("Email ou senha inválidos!" );
                }

                string permissão = "";

                switch (usuarioBuscado.IdTipoUsuario)
                {
                    case 1:
                        permissão = "Geral";
                        break;
                    case 2:
                        permissão = "Admin";
                        break;
                    case 3:
                        permissão = "Root";
                        break;
                }

                var tokenClaims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, usuarioBuscado.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, usuarioBuscado.IdUsuario.ToString()),
                    new Claim(ClaimTypes.Role, usuarioBuscado.IdTipoUsuario.ToString()),
                    new Claim("permissao", permissão)
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("2rpsystem-token-autenticacao"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var myToken = new JwtSecurityToken(
                        issuer: "2RPSystem_API",
                        audience: "2RPSystem_API",
                        claims: tokenClaims,
                        expires: DateTime.Now.AddMinutes(20),
                        signingCredentials: creds
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(myToken)
                });
            }
            catch (Exception err)
            {
                return BadRequest(err);
            }
        }
    }
}
