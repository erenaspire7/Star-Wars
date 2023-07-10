namespace api.Models
{
    public class Character
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Image { get; set; } = null!;

        public string StanceImage { get; set; } = null!;

        public void fromJson(dynamic json) {
            Id = json["id"];
            Name = json["name"];
            StanceImage = json["stanceImage"];
            Image = json["image"];
        }
    }
}

