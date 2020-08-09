package com.henallux.koudou.views.tools;

public class SexConverter {

    public static final String[] SEXS = new String[] {
            "Homme", "Femme", "Inconnu"
    };

    public static String charToText(char sex) {
        switch (sex){
            case 'U':
                return "Inconnu";
            case 'M':
                return "Homme";
            case 'F':
                return "Femme";
        }
        return "Inconnu";
    }

    public static char textToChar(String sex) {
        switch (sex){
            case "Inconnu":
                return 'U';
            case "Homme":
                return 'M';
            case "Femme":
                return 'F';
        }
        return 'U';
    }
}
