using Microsoft.AspNetCore.Mvc;
using UserRepository;
using UserModel;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;


namespace UserController
{
  [Route("api/[controller]")]
  public class VaultController : Controller
  {
    private readonly VaultRepository _db;
    public VaultController(VaultRepository repo)
    {
      _db = repo;
    }
    [Authorize]
    [HttpPost]
    public Vault CreateVault([FromBody]Vault newVault)
    {
      if(ModelState.IsValid)
      {
        var user = HttpContext.User;
        newVault.UserId = user.Identity.Name;
        return _db.CreateVault(newVault);
      }
      return null;
    }

    [HttpGet("vaultdetails/{id}")]
    public Vault GetById(int id)
    {
      return _db.GetByVaultId(id);
    }
    [Authorize]
    [HttpGet("userId/{id}")]
    public IEnumerable<Vault> GetByUserId(string id)
    {
      return _db.GetByUserId(id);
    }

    [Authorize]
    [HttpPut("{id}")]
    public Vault EditVault(int id, [FromBody]Vault newVault)
    {
      return _db.EditVault(id, newVault);
    }
    [Authorize]
    [HttpDelete("{id}")]
    public bool DeleteVault(int id)
     {
       return _db.DeleteVault(id);
    }
  }
}