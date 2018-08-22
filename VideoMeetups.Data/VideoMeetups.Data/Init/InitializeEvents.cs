using System;
using System.Collections.Generic;
using System.Text;
using VideoMeetups.Data.Entities;

namespace VideoMeetups.Data.Init
{
    public class InitializeEvents : DataInitializer<EventEntity>
    {
        public override IEnumerable<EventEntity> GetInitialEntities()
        {
            yield break;
        }
    }
}
