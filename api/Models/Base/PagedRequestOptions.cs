using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace koudouApi.Models.Base
{
    public class PagedRequestOptions
    {
        /// <summary>
        /// The index on which to start the paging (correspond to the amount of items to skip)
        /// </summary>
        /// <value>Default: 0</value>
        public int StartIndex { get; set; } = 0;

        /// <summary>
        /// The amount of items to retrieve in one call. A value lower than or equal to 0 indicates all records must be fetched.
        /// </summary>
        /// <value>Default: 20</value>
        public int Count { get; set; } = 20;

        /// <summary>
        /// The field on which the sort function must be applied
        /// </summary>
        public string Sort { get; set; }

        /// <summary>
        /// The sort direction (ASC or DESC)
        /// </summary>
        /// <value>Default: ASC</value>
        public SortDirection SortDirection { get; set; }
    }

    public enum SortDirection
    {
        ASC,
        DESC
    }
}