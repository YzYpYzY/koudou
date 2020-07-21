using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Koudou.Helpers
{
    public static class DateHelper
    {
        public static DateTime StringToDateTime(string date)
        {
            var dateParts = date.Split('/');
            return new DateTime(int.Parse(dateParts[2]), int.Parse(dateParts[1]), int.Parse(dateParts[0]));
        }

        public static string DateTimeToString(DateTime? date)
        {
            if(date == null)
            {
                return null;
            }
            return String.Format("{0:dd/MM/yyyy}", date);
        }
    }
}