using System.ComponentModel.DataAnnotations;

namespace API2RP_wepAPI.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Insira um E-Mail válido!")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Insira sua Senha!")]
        public string Senha { get; set; }
    }
}
