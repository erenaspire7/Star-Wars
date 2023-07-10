using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Newtonsoft.Json;


namespace api.Classes
{
    public class ImageClient
    {
        private static Cloudinary? _client;

        public ImageClient()
        {
            if (_client == null)
            {
                var json = File.ReadAllText("credentials.json");
                dynamic credentials = JsonConvert.DeserializeObject(json);

                Account account = new Account(
                    "erenaspire7",
                    credentials!["cloudinaryApiKey"].ToString(),
                    credentials!["cloudinarySecretKey"].ToString()
                );
                
                _client = new Cloudinary(account);
                _client.Api.Secure = true;
            }
        }

        public ImageUploadResult UploadBase64Image(string base64String)
        {
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription("image", new System.IO.MemoryStream(Convert.FromBase64String(base64String))),
                Folder = "Star Wars"
            };
            var result = _client!.Upload(uploadParams);
            return result;
        }

    }
}