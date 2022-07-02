using System.ComponentModel.DataAnnotations;

namespace API2RP_wepAPI.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Email inválido")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Senha inválida")]
        public string Senha { get; set; }
    }
}
