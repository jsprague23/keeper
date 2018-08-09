using System.Collections.Generic;

namespace UserModel
{
  public class Keep
  {
    public int Id {get; set;}
    public string Name {get; set;}
    public string Image {get; set;}
    public string Description {get; set;}
    public bool PublicKeep{get; set;} = false;
    public string UserId {get; set;}
    public int Views {get; set;}= 0;
    public int KeepCount {get; set;}=0;
    public int VaultId {get; set;}

  }
}