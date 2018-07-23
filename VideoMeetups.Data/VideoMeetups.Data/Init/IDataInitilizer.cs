using System;
using System.Collections;
using System.Collections.Generic;

namespace VideoMeetups.Data.Init
{
    public interface IDataInitializer<TEntity> : IDataInitializer
    {
        new IEnumerable<TEntity> GetInitialEntities();
    }

    public interface IDataInitializer
    {
        Type GetEntityType();
        IEnumerable GetInitialEntities();
    }
}
