using Microsoft.AspNetCore.Mvc;
using UserRepository;
using UserModel;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace UserController
{
  [Route("api/[controller]")]
  public class KeepController : Controller
  {
    public readonly KeepRepository _db;
    public KeepController(KeepRepository repo)
    {
      _db = repo;
    }
    [HttpPost]
    [Authorize]
    public Keep CreateKeep([FromBody]Keep newKeep)
    {
      if(ModelState.IsValid)
      {
        var user = HttpContext.User;
        newKeep.UserId = user.Identity.Name;
        return _db.CreateKeep(newKeep);
      }
      return null;
    }
    [HttpGet]
    public IEnumerable<Keep> GetAll()
    {
      return _db.GetAll();
    }
    [HttpGet("keepdetails/{id}")]
    public Keep GetById(int id)
    {
      return _db.GetByKeepId(id);
    }
    [HttpGet("user/{id}")]
    public IEnumerable<Keep> GetByUserId(int id)
    {
      return _db.GetByUserId(id);
    }
    [Authorize]
    [HttpPut("{id}")]
    public Keep EditKeep(int id, [FromBody]Keep newKeep)
    {
      return _db.EditKeep(id, newKeep);
    }
    [Authorize]
    [HttpDelete("{id}")]
    public bool DeleteKeep(int id)
     {
       return _db.DeleteKeep(id);
    }
  }
}