using System;
using System.Text.Json.Serialization;

namespace API.Entities;

public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }

    //Navigation properties
    public required string MemberId { get; set; }
    [JsonIgnore]
    public Member Member { get; set; } = null!;
}
