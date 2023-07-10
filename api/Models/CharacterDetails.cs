namespace api.Models
{
    public class CharacterDetails
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string BirthYear { get; set; } = null!;

        public string Height { get; set; } = null!;

        public string Mass { get; set; } = null!;

        public string Hair { get; set; } = null!;

        public string Skin { get; set; } = null!;

        public string Eye { get; set; } = null!;

        public string Gender { get; set; } = null!;

        public string HomeWorld { get; set; } = null!;

        public List<string> Movies { get; set; } = null!;

        public List<string> Starships { get; set; } = null!;

        public string StanceUrl { get; set; } = null!;

        public void fromJson(
            dynamic id, dynamic detailsJson, dynamic homeWorldJson, List<string> movies, List<string> starships, string stanceUrl
        )
        {
            Id = id;
            Movies = movies;
            Starships = starships;
            StanceUrl = stanceUrl;

            Name = detailsJson["name"].ToString();
            Height = detailsJson["height"].ToString();
            Mass = detailsJson["mass"].ToString();
            Hair = detailsJson["hair_color"].ToString();

            Skin = detailsJson["skin_color"].ToString();
            Eye = detailsJson["eye_color"].ToString();
            BirthYear = detailsJson["birth_year"].ToString();
            Gender = detailsJson["gender"].ToString();
            HomeWorld = homeWorldJson["name"].ToString();


        }
    }
}

