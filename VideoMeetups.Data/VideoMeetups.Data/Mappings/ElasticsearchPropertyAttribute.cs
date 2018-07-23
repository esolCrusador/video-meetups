using Nest;

namespace VideoMeetups.Data.Mappings
{
    public class ElasticsearchPropertyAttribute : ElasticsearchPropertyAttributeBase
    {
        public ElasticsearchPropertyAttribute(FieldType type) : base(type)
        {
        }
    }
}
