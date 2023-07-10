using Newtonsoft.Json;
using api.Models;

namespace api.Utilities
{
    public class AccessData
    {
        // private readonly dynamic[] jsonData;
        private readonly List<Character> characters = new List<Character>();

        public AccessData()
        {
            var json = File.ReadAllText("Assets/data.json");

            characters = JsonConvert.DeserializeObject<List<Character>>(json);
        }

        public string retrieveStanceUrl(int id)
        {
            Character? value = characters.Find(el => el.Id == id);

            return value!.StanceImage;
        }

        public List<Character> retrieveData()
        {
            return characters;
        }

        public void addData(Character character)
        {
            characters.Add(character);
            dynamic json = JsonConvert.SerializeObject(characters);
            File.WriteAllText("Assets/data.json", json);
        }

        public bool verifyUniqueId(int id)
        {
            Character value = characters.Find(el => el.Id == id);

            if (value == null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}