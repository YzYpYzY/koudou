using Koudou.Data.Enums;

namespace Koudou.Data.Helpers
{
    public static class SexTypesConverter
    {
        public static SexTypes FromData(char? sex)
        {
            switch(sex){
                case 'M': return SexTypes.Male;
                case  'F': return SexTypes.Female;
                default: return SexTypes.Unknow;
            }
        }
        
        public static char FromEnum(SexTypes sex)
        {
            switch(sex){
                case SexTypes.Male: return 'M';
                case SexTypes.Female : return 'F';
                default: return 'U';
            }
        }
    }
}