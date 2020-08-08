package com.henallux.koudou.tools;

import android.util.Base64;

import org.json.JSONObject;

public class JWTUtils {

    public static JSONObject decode(String JWTEncoded) throws Exception {
        String[] split = JWTEncoded.split("\\.");
        byte[] decodedBytes = Base64.decode(split[1], Base64.URL_SAFE);
        return new JSONObject(new String(decodedBytes, "UTF-8"));
    }
}