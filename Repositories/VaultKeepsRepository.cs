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
    public VaultKeeps CreateVaultKeep(VaultKeeps newVaultKeep)
    {
      int id = _db.ExecuteScalar<int>(@"
                INSERT INTO vaultKeeps (userId, vaultId, keepId)
                VALUES (@UserId, @VaultId, @KeepId)
                SELECT LAST_INSERT_ID();
                ", newVaultKeep);
    newVaultKeep.Id = id;
    return newVaultKeep;
    }
    public IEnumerable<VaultKeeps> GetByUserId(string id)
    {
      return _db.Query<VaultKeeps>("SELECT * FROM vaultKeeps WHERE userId = @id;", new { id });
    }
    public IEnumerable<VaultKeeps> GetByVaultId(int vaultId)
    {
      return _db.Query<VaultKeeps> ("SELECT * FROM vaults WHERE id = @vaultId;", new { vaultId });
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