using Microsoft.AspNetCore.Http;

namespace koudouApi.Business.Exceptions
{
    public class IdNotFoundRequestException : RequestException
    {
        public IdNotFoundRequestException(string entity, string id)
        : base(StatusCodes.Status404NotFound, $"{entity} with Id [{id}] not found.")
        {
        }

        public IdNotFoundRequestException(string entity, int id)
        : this(entity, id.ToString())
        {
        }
    }
}