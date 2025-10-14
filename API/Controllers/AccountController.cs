using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Dtos;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDbContext context, ITokenService tokenService) : BaseApiController
{
    [HttpPost("register")] //POST: api/account/register
    public async Task<ActionResult<AppUser>> Register([FromBody] RegisterDto registerDto)
    {
        if (await UserExists(registerDto.UserName)) return BadRequest("Username is taken");
        if (await EmailExists(registerDto.Email)) return BadRequest("Email is taken");
        using var hmac = new HMACSHA512();
        var user = new AppUser
        {
            UserName = registerDto.UserName.ToLower(),
            Email = registerDto.Email.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key,
            DateOfBirth = registerDto.DateOfBirth ?? DateTime.MinValue
        };
        context.Users.Add(user);
        await context.SaveChangesAsync();
        return Ok(user.ToDto(tokenService));
    }
    
    [HttpPost("login")] //POST: api/account/login
    public async Task<ActionResult<UserDto>> Login([FromBody] LoginDto loginDto)
    {
        var user = await context.Users.SingleOrDefaultAsync(u => u.Email == loginDto.Email.ToLower());
        if (user == null) return Unauthorized("Invalid email");
        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
        }
        return Ok(user.ToDto(tokenService));
    }

    private async Task<bool> UserExists(string username)
    {
        return await context.Users.AnyAsync(u => u.UserName == username.ToLower());
    }
    private async Task<bool> EmailExists(string email)
    {
        return await context.Users.AnyAsync(u => u.Email == email.ToLower());
    }
}
