using System;
using System.Linq.Expressions;
using VideoMeetups.Logic.ExpressionVisitors;

namespace VideoMeetups.Logic
{
    public static class ExpressionsHelper
    {
        public static LambdaExpression ToGenericCall(this LambdaExpression callMethod, Type targetType, Type replacementType)
        {
            var visitor = new GenericCallExpressionVisitor(targetType, replacementType);

            return Expression.Lambda(visitor.Visit(callMethod.Body), callMethod.Parameters);
        }

        public static Expression<Func<TParam, TResult>> ChangeGenericParam<TParam, TResult>(this Expression<Func<TParam, TResult>> callMethod, Type targetType, Type replacementType)
        {
            return (Expression<Func<TParam, TResult>>)ToGenericCall((LambdaExpression)callMethod, targetType, replacementType);
        }
    }
}
