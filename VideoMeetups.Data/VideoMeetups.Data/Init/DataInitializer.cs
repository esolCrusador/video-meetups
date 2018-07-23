using System;
using System.Collections;
using System.Collections.Generic;

namespace VideoMeetups.Data.Init
{
    public abstract class DataInitializer<TEntity> : IDataInitializer<TEntity>
    {
        public Type GetEntityType()
        {
            return typeof(TEntity);
        }

        public abstract IEnumerable<TEntity> GetInitialEntities();

        IEnumerable IDataInitializer.GetInitialEntities()
        {
            return GetInitialEntities();
        }
    }
}
