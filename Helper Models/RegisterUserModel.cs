using System.ComponentModel.DataAnnotations;

namespace UserModel
{
  public class RegisterUserModel
  {
    [MaxLength(20)]
    public string Username{get; set;}
    [MaxLength(255), EmailAddress]
    public string Email {get;set;}
    [MinLength(4)]
    public string Password {get; set;}
  }
}