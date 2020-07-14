using System.Text.Json;
using Microsoft.AspNetCore.Http;

namespace koudouApi.Business.Exceptions
{
    [System.Serializable]
    public class RequestException : System.Exception
    {
        public int StatusCode { get; set; }

        public object Payload {get;set;}

        protected RequestException() { }

        public RequestException(int statusCode) : this() { StatusCode = statusCode; }
        public RequestException(int statusCode, string message) : base(message) { StatusCode = statusCode; }
        public RequestException(int statusCode, string message, System.Exception inner) : base(message, inner) { StatusCode = statusCode; }
        protected RequestException(
            System.Runtime.Serialization.SerializationInfo info,
            System.Runtime.Serialization.StreamingContext context) : base(info, context) { }

        public string GetJson()
        {
            return JsonSerializer.Serialize(new { StatusCode, Message, Payload });
        }
    }
}