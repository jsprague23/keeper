using Microsoft.AspNetCore.Mvc;
using UserRepository;
using UserModel;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace UserController
{
  [Route("api/[controller]")]
  public class VaultKeepsController : Controller
  {
    private readonly VaultKeepsRepository _db;
    public VaultKeepsController(VaultKeepsRepository repo)
    {
      _db = repo;

    }
    [Authorize]
    [HttpPost]
    public VaultKeeps CreateVaultKeep([FromBody]VaultKeeps newVaultKeep)
    {
      if(ModelState.IsValid)
      {
        var user = HttpContext.User;
        newVaultKeep.UserId = user.Identity.Name;
        return _db.CreateVaultKeep(newVaultKeep);
      }
      return null;
    }
    [HttpGet("{id}")]
    public IEnumerable<VaultKeeps> GetByVaultId(int id)
    {
      return _db.GetByVaultId(id);
    }
    [Authorize]
    [HttpGet("/{id}")]
    public IEnumerable<VaultKeeps> GetByUserId(string id) => _db.GetByUserId(id);

    [Authorize]
    [HttpDelete("{id}")]
    public bool DeleteVaultKeep(int id)
     {
       return _db.DeleteVaultKeep(id);
    }
  }
}