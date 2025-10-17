using System;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Dtos;
using API.Entities;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsersAsync(AppDbContext context)
    {
        if (context.Users.Any()) return;

        var membersData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        var seedMembers = JsonSerializer.Deserialize<List<SeedUserDto>>(membersData, options);

        if (seedMembers == null) return;

        foreach (var seedMember in seedMembers)
        {
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                Id = seedMember.Id,
                Email = seedMember.Email,
                UserName = seedMember.UserName.ToLower(),
                DateOfBirth = seedMember.DateOfBirth.ToDateTime(TimeOnly.MinValue),
                ImageUrl = seedMember.ImageUrl,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd")),
                PasswordSalt = hmac.Key,
                Member = new Member
                {
                    Id = seedMember.Id,
                    UserName = seedMember.UserName,
                    DateOfBirth = seedMember.DateOfBirth,
                    Created = seedMember.Created,
                    LastActive = seedMember.LastActive,
                    Description = seedMember.Description,
                    Gender = seedMember.Gender,
                    City = seedMember.City,
                    Country = seedMember.Country,
                    ImageUrl = seedMember.ImageUrl
                }
            };
            user.Member.Photos.Add(new Photo
            {
                MemberId = seedMember.Id,
                Url = seedMember.ImageUrl!,
                IsMain = true
            });
            context.Users.Add(user);
        }

        await context.SaveChangesAsync();
    }
}
