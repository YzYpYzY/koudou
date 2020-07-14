using System.Collections.Generic;

namespace koudouApi.Models.Base
{
    public class PagedResponse<TResponse>
    {
        public PagedRequestOptions Options { get; set; }
        public int TotalCount { get; set; }
        public IEnumerable<TResponse> Values { get; set; }
    }
}