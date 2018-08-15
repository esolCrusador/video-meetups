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

            return (LambdaExpression)visitor.Visit(callMethod);
        }

        public static Expression<Func<TParam, TResult>> ChangeGenericParam<TParam, TResult>(this Expression<Func<TParam, TResult>> callMethod, Type targetType, Type replacementType)
        {
            return (Expression<Func<TParam, TResult>>)ToGenericCall((LambdaExpression)callMethod, targetType, replacementType);
        }

        public static Expression<Func<TParam1, TParam2, TResult>> ChangeGenericParam<TParam1, TParam2, TResult>(this Expression<Func<TParam1, TParam2, TResult>> callMethod, Type targetType, Type replacementType)
        {
            return (Expression<Func<TParam1, TParam2, TResult>>)ToGenericCall((LambdaExpression)callMethod, targetType, replacementType);
        }
    }
}
