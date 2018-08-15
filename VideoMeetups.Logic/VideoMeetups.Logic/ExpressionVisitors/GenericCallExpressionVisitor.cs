using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace VideoMeetups.Logic.ExpressionVisitors
{
    public class GenericCallExpressionVisitor : ExpressionVisitor
    {
        private readonly Dictionary<ParameterExpressionKey, Expression> _parametersReplacements;
        private readonly Dictionary<Type, Type> _typeReplacements;

        public GenericCallExpressionVisitor(Type targetType, Type replacementType)
        {
            _typeReplacements = new Dictionary<Type, Type>
            {
                {targetType, replacementType }
            };
            _parametersReplacements = new Dictionary<ParameterExpressionKey, Expression>();
        }

        protected override Expression VisitLambda<T>(Expression<T> node)
        {
            LambdaExpression lambda = node;
            Expression body = lambda.Body;
            var parameters = lambda.Parameters.ToArray();

            for (int i = 0, length = parameters.Length; i < length; i++)
            {
                var param = parameters[i];
                // Parameters will be cached in _parametersReplacements and used during replacement of body.
                var newParam = this.VisitParameter(param);
                if (param != newParam)
                {
                    parameters[i] = (ParameterExpression)newParam;
                }
            }

            body = this.Visit(body);

            return Expression.Lambda(body, lambda.TailCall, parameters);
        }

        protected override Expression VisitNew(NewExpression node)
        {
            ConstructorInfo constructor = node.Constructor;
            if(TryReplaceType(constructor.DeclaringType, out Type newDeclaringType))
            {
                var argumentTypes = constructor.GetParameters().Select(pi => pi.ParameterType).ToArray();
                TryReplaceGenericArguments(argumentTypes, out argumentTypes);

                constructor = newDeclaringType.GetConstructor(argumentTypes);

                return Expression.New(constructor, node.Arguments.Select(arg => this.Visit(arg)));
            }

            return base.VisitNew(node);
        }

        protected override Expression VisitParameter(ParameterExpression parameterExpression)
        {
            var cacheKey = new ParameterExpressionKey(parameterExpression);

            if(_parametersReplacements.TryGetValue(cacheKey, out Expression expression))
            {
                return expression;
            }

            if (TryReplaceType(parameterExpression.Type, out Type newType))
            {
                expression = Expression.Parameter(newType, parameterExpression.Name);
                _parametersReplacements.Add(cacheKey, expression);

                return expression;
            }

            return base.VisitParameter(parameterExpression);
        }

        protected override Expression VisitMethodCall(MethodCallExpression methodExpression)
        {
            Type[] genericArguments = methodExpression.Method.GetGenericArguments();
            MethodInfo methodInfo = methodExpression.Method;
            IReadOnlyCollection<Expression> arguments = methodExpression.Arguments;
            Expression instance = methodExpression.Object;

            bool hasChanges = false;

            if (TryReplaceType(methodInfo.DeclaringType, out Type newType))
            {
                methodInfo = newType.GetMethod(methodInfo.Name, genericArguments.Length, methodInfo.GetParameters().Select(pi => pi.ParameterType).ToArray());
                instance = this.Visit(instance);/*Replacing internal arguments to avoid generic types mismatch */

                hasChanges = true;
            }

            if (TryReplaceGenericArguments(genericArguments, out Type[] newGenericArgs))
            {
                methodInfo = methodInfo.GetGenericMethodDefinition().MakeGenericMethod(newGenericArgs);
                arguments = arguments.Select(arg =>
                   this.Visit(arg)/*Replacing internal arguments to avoid generic types mismatch */
                ).ToList();

                hasChanges = true;
            }

            if (hasChanges)
            {
                return Expression.Call(instance, methodInfo, arguments);
            }

            return base.VisitMethodCall(methodExpression);
        }

        private bool TryReplaceGenericArguments(Type[] genericArgs, out Type[] newGenericArgs)
        {
            if (genericArgs != null && genericArgs.Length > 0)
            {
                newGenericArgs = null;

                for (int i = 0; i < genericArgs.Length; i++)
                {
                    var argType = genericArgs[i];

                    if (TryReplaceType(argType, out Type newArgType))
                    {
                        if (newGenericArgs == null)
                        {
                            newGenericArgs = genericArgs.ToArray();
                        }

                        newGenericArgs[i] = newArgType;
                    }
                }

                if (newGenericArgs != null)
                {
                    return true;
                }
            }

            newGenericArgs = genericArgs;
            return false;
        }

        private bool TryReplaceType(Type type, out Type newType)
        {
            if (_typeReplacements.TryGetValue(type, out newType))
            {
                return type != newType;
            }

            var genericArgs = type.GetGenericArguments();
            if (TryReplaceGenericArguments(genericArgs, out Type[] newGenericArgs))
            {
                newType = type.GetGenericTypeDefinition().MakeGenericType(newGenericArgs);
                _typeReplacements.Add(type, newType);
                return true;
            }

            newType = type;
            _typeReplacements.Add(type, newType);
            return false;
        }

        private struct ParameterExpressionKey : IEquatable<ParameterExpressionKey>
        {
            public ParameterExpressionKey(ParameterExpression expr)
            {
                this.Name = expr.Name;
                this.Type = expr.Type;
                this.ByRef = expr.IsByRef;
            }

            public string Name { get; set; }
            public Type Type { get; set; }
            public bool ByRef { get; set; }

            public bool Equals(ParameterExpressionKey other)
            {
                return this.Name == other.Name && this.Type == other.Type && this.ByRef == other.ByRef;
            }

            public override int GetHashCode()
            {
                return this.Name.GetHashCode() ^ this.Type.GetHashCode() * 32 ^ this.ByRef.GetHashCode() * 634;
            }
        }
    }
}
