using System;
using System.Collections.Generic;
using System.Data;
using UserModel;
using Dapper;

namespace UserRepository
{
  public class VaultKeepsRepository : DbContext
  {
    public VaultKeepsRepository(IDbConnection db) : base(db)
    {

    }
    public VaultKeeps CreateVaultKeep(VaultKeeps VaultKeep)
    {
      int id = _db.ExecuteScalar<int>(@"
                INSERT INTO vaultKeeps (userId, vaultId, keepId)
                VALUES (@UserId, @VaultId, @KeepId);
                SELECT LAST_INSERT_ID();
                ", VaultKeep);
    VaultKeep.Id = id;
    return VaultKeep;
    }
    public IEnumerable<VaultKeeps> GetByUserId(string id)
    {
      return _db.Query<VaultKeeps>("SELECT * FROM vaultKeeps INNER JOIN keeps ON keeps.id = vaultKeeps.keepId WHERE userId = @id;", new { id });
    }
    public IEnumerable<Keep> GetByVaultId(int vaultId)
    {
      return _db.Query<Keep> ("SELECT * FROM vaultkeeps INNER JOIN keeps ON keeps.id = vaultkeeps.keepId WHERE vaultkeeps.vaultId = @vaultId;", new { vaultId });
    }
    public bool DeleteVaultKeep(int id)
    {
      var i = _db.Execute(@"
      DELETE FROM vaultKeeps
      WHERE id = @id
      LIMIT 1;
      ", new { id });
      if (i > 0)
      {
        return true;
      }
      return false;
    }
  }
}