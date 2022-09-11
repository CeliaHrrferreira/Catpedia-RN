package com.catpediareact;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.lang.annotation.Native;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Nonnull;
import com.facebook.react.modules.toast.ToastModule;

public class GetGifPackageModule implements ReactPackage
{
    @Nonnull
    @Override
    public List<NativeModule> createNativeModules(@Nonnull ReactApplicationContext reactContext)
    {
        List<NativeModule> modules = new ArrayList<NativeModule>();

        modules.add(new GetGifManager(reactContext));

        return modules;
    }

    @Nonnull
    @Override
    public List<ViewManager> createViewManagers(@Nonnull ReactApplicationContext reactContext)
    {
        List<ViewManager> modules = new ArrayList<ViewManager>();

        return modules;
    }
}
