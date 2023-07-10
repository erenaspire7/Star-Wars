using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

using api.Classes;
using api.Models;
using api.Utilities;



namespace api.Controllers
{
    [Route("api/character")]
    [ApiController]

    public class CharacterController : ControllerBase
    {
        private readonly ApiClient _apiClient;
        private readonly AccessData _accessor;

        private readonly ImageClient _imageClient;

        public CharacterController(ApiClient client, AccessData accessor, ImageClient imageClient)
        {
            _apiClient = client;
            _accessor = accessor;
            _imageClient = imageClient;
        }
        // GET: api/character/details/1
        [HttpGet("details/{id}")]
        public async Task<ActionResult<CharacterDetails>> GetDetails(int id)
        {
            List<string> movies = new List<string>();
            List<string> starships = new List<string>();

            // Get Details FROM API
            var jsonResponse = await _apiClient.Get($"people/{id}");
            dynamic detailsJson = JsonConvert.DeserializeObject(jsonResponse);

            if (detailsJson.ContainsKey("detail") && detailsJson["detail"] == "Not found")
            {
                return NotFound();
            }

            var homeWorldUrl = detailsJson["homeworld"].ToString();
            var movieUrls = detailsJson["films"];
            var shipUrls = detailsJson["starships"];

            var homeWorldJsonResponse = await _apiClient.GetDistinctUrl(homeWorldUrl);
            dynamic homeWorldJson = JsonConvert.DeserializeObject(homeWorldJsonResponse);

            foreach (dynamic el in movieUrls)
            {
                var url = el.ToString();
                var res = await _apiClient.GetDistinctUrl(url);
                dynamic json = JsonConvert.DeserializeObject(res);

                movies.Add(json["title"].ToString());
            }

            foreach (dynamic el in shipUrls)
            {
                var url = el.ToString();
                var res = await _apiClient.GetDistinctUrl(url);
                dynamic json = JsonConvert.DeserializeObject(res);

                starships.Add(json["name"].ToString());
            }

            var stanceUrl = _accessor.retrieveStanceUrl(id);

            CharacterDetails details = new CharacterDetails();
            details.fromJson(id, detailsJson, homeWorldJson, movies, starships, stanceUrl);

            return details;
        }

        // GET: api/character/all
        [HttpGet("all")]
        public async Task<ActionResult<List<Character>>> GetAll()
        {
            List<Character> characters = _accessor.retrieveData();

            return characters;
        }

        // POST: api/character/create
        [HttpPost("create")]
        public async Task<ActionResult<Character>> AddCharacter(Character character)
        {
            string url = $"people/?search={character.Name}";

            var response = await _apiClient.Get(url);

            dynamic json = JsonConvert.DeserializeObject(response);

            if (json["count"] == 0)
            {
                return NotFound();
            }

            if (json["count"] > 1)
            {
                return BadRequest();
            }

            var characterUrl = json["results"][0]["url"];

            var id = characterUrl.ToString().Split("/")[5];

            character.Id = int.Parse(id);

            if (!_accessor.verifyUniqueId(character.Id)) {
                return BadRequest();
            }

            var imageResult = _imageClient.UploadBase64Image(character.Image);
            character.Image = imageResult.SecureUrl.ToString();

            var stanceImageResult = _imageClient.UploadBase64Image(character.StanceImage);
            character.StanceImage = stanceImageResult.SecureUrl.ToString();

            _accessor.addData(character);

            return character;
        }
    }

}

