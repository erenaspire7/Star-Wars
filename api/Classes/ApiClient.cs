namespace api.Classes
{
    public class ApiClient
    {
        private static HttpClient? _client;

        private string address = "https://swapi.dev/api/";

        public ApiClient()
        {
            if (_client == null)
            {
                _client = new HttpClient();
                // _client.BaseAddress = new Uri("https://swapi.dev/api/");
            }
        }

        public async Task<string> Get(string path)
        {
            Uri url = new Uri($"{address}{path}");
            var response = await _client!.GetStringAsync(url);
            return response;
        }

        public async Task<string> GetDistinctUrl(string path)
        {
            Uri url = new Uri($"{path}");
            var response = await _client!.GetStringAsync(url);
            return response;
        }
    }
}
