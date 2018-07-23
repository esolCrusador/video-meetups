using System;
using System.Collections.Generic;
using System.Reflection;

namespace VideoMeetups.Data.Init
{
    public class PropertyMetadataResolver
    {
        private readonly Dictionary<string, Func<PropertyInfo, Nest.IProperty>> _propertyFactories;

        public PropertyMetadataResolver()
        {
            _propertyFactories = new Dictionary<string, Func<PropertyInfo, Nest.IProperty>>
            {
                { typeof(string).FullName, prop => new Nest.TextProperty()},
                { typeof(int).FullName, prop => new Nest.NumberProperty(Nest.NumberType.Integer) },
                { typeof(decimal).FullName, prop => new Nest.NumberProperty(Nest.NumberType.ScaledFloat){ScalingFactor = Math.Pow(10, 2) /* TODO: Add some attribute for decimals. */} },
                { typeof(DateTime).FullName, prop => new Nest.DateProperty() }
            };
        }

        public Nest.IProperty Resolve(PropertyInfo propertyInfo)
        {
            return _propertyFactories[propertyInfo.PropertyType.FullName](propertyInfo);
        }
    }
}
