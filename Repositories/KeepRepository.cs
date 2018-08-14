using System.Collections.Generic;
using System.Data;
using UserModel;
using Dapper;

namespace UserRepository
{
  public class KeepRepository : DbContext
  {
    public KeepRepository(IDbConnection db) : base(db)
    {

    }
    public Keep CreateKeep(Keep newKeep)
    {
      int id = _db.ExecuteScalar<int>(@"
    INSERT INTO keeps(name, description, image, views, keepCount, userId, publicKeep)
    VALUES (@Name, @Description, @Image, @Views, @KeepCount, @UserId, @PublicKeep);
    SELECT LAST_INSERT_ID();
    ", newKeep);
    newKeep.Id = id;   
    return newKeep;
    }
    public IEnumerable<Keep> GetAll()
    {
      return _db.Query<Keep>("SELECT * FROM keeps WHERE publicKeep = 1");
    }

    public IEnumerable<Keep> GetByUserId(int id)
    {
      return _db.Query<Keep>("SELECT * FROM keeps WHERE userId = @Id;", new { id });
    }
    public Keep GetByKeepId(int id)
    {
      return _db.QueryFirstOrDefault<Keep>("SELECT * FROM keeps WHERE id = @Id;", new { id });

    }

    public Keep EditKeep (int id, Keep Keep)
    {
      Keep.Id=id;
      var i = _db.Execute(@"
      UPDATE keeps SET
      name = @Name,
      views = @Views,
      keepCount = @KeepCount,
      description = @Description,
      image = @Image
      WHERE id = @Id
      ", Keep);
      if (i > 0)
      {
        return Keep;
      }
      return null;
    }
    public bool DeleteKeep(int id)
    {
      var i = _db.Execute(@"
      DELETE FROM keeps
      WHERE id = @Id
      LIMIT 1;
      ", new { id });
      if (i > 0 )
      {
        return true;
      }
      return false;
    }
  }
}