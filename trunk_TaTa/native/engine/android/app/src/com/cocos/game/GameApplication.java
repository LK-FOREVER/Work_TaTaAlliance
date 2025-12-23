package com.cocos.game;

import android.app.Application;
import android.content.Context;

import AAsdk.union.Funsdk;

public class GameApplication extends Application {

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        Funsdk.attachBaseContext(this);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Funsdk.onApplicationCreate(this);
    }
}

