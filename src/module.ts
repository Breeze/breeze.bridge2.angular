import { NgModule } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { config } from "breeze-client";

import { AjaxHttpClientAdapter } from "./ajax-http-client-adapter";
import { Q } from "./common";

@NgModule()
export class BreezeBridgeHttpClientModule {
    constructor(public http: HttpClient) {
        // Configure Breeze for Angular ... exactly once.
        // config breeze to use the native 'backingStore' modeling adapter appropriate for Ng
        // 'backingStore' is the Breeze default but we set it here to be explicit.
        config.initializeAdapterInstance('modelLibrary', 'backingStore', true);
        config.setQ(Q);
        config.registerAdapter('ajax', () => new AjaxHttpClientAdapter(http));
        config.initializeAdapterInstance('ajax', AjaxHttpClientAdapter.adapterName, true);
    }
}