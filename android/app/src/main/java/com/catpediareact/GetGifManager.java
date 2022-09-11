package com.catpediareact;

import android.content.Intent;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import android.util.Log;
import com.facebook.react.bridge.Callback;
import com.facebook.react.modules.toast.ToastModule;

import javax.annotation.Nonnull;

public class GetGifManager extends ReactContextBaseJavaModule
{

    public GetGifManager(@Nonnull ReactApplicationContext reactContext)
    {
        super(reactContext);
    }

    @Nonnull
    @Override
    public String getName()
    {
        return "GetGifManager";
    }

    @ReactMethod
    public void configureUrl(String type, Callback cb)
    {
        try {
            String urlToInvoke = "https://api.thecatapi.com/v1/images/search?limit=1&size=full&mime_types=" + type;
            cb.invoke(null, urlToInvoke);
        } catch (Exception err) {
            cb.invoke(err, null);
        }
    }
}
