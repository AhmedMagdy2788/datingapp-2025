using System;

namespace API.Dtos;

public class UserDto
{
    public required string Id { get; set; }
    public required string Email { get; set; }
    public required string UserName { get; set; }
    public string? ImageUrl { get; set; }
    public required string Token { get; set; }
    public DateTime? DateOfBirth { get; set; }
}
