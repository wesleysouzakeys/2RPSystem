using System;
using System.Collections.Generic;

namespace API2RP_wepAPI.Domains
{
    public partial class Tiposusuario
    {
        public Tiposusuario()
        {
            Usuarios = new HashSet<Usuario>();
        }

        public int IdTipoUsuario { get; set; }
        public string Titulo { get; set; } = null!;

        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
