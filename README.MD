# Welcome to the Breeze-Angular bridge #

A bridge that configures Breeze to work with Angular out of the box.

This is the updated bridge using the new HttpClient service and is recommended for Angular 4.3 and up. The older bridge using the deprecated Http service can be found [here](https://github.com/Breeze/breeze.bridge.angular).

# Change Log #

### 1.0.0.beta.0 November 20, 2017 ###

Initial beta release

# Prerequisites #

- Breeze client npm package 1.6.3 or higher
- Angular 4.3.0 or higher

# Installation #

1. Install breeze-client

	`npm install breeze-client --save`

2. Install breeze-bridge2-angular

	`npm install breeze-bridge2-angular --save`

# Usage #

A comprehensive example app that makes use of the bridge can be found here: [https://github.com/Breeze/temphire.angular](https://github.com/Breeze/temphire.angular).

To use the bridge in your own application, the following steps are required.

Import `BreezeBridgeHttpClientModule` and `HttpClientModule` and add it to the app module's imports.

```
import { BreezeBridgeHttpClientModule } from 'breeze-bridge2-angular';
import { HttpClientModule } from '@angular/common/http';
```

```
@NgModule({
    imports: [
        BreezeBridgeHttpClientModule,
        HttpClientModule
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
```

Now we can use Breeze normally from something like a data service for example.

```
import { Injectable } from '@angular/core';
import { EntityManager, EntityQuery } from 'breeze-client';
import { Customer } from './entities';

@Injectable()
export class DataService {

    private _em: EntityManager;

    constructor() {
        this._em = new EntityManager();
    }

    getAllCustomers(): Promise<Customer[]> {
        let query = EntityQuery.from('Customers').orderBy('companyName');

        return this._em.executeQuery(query)
            .then(res => res.results)
            .catch((error) => {
                console.log(error);
                return Promise.reject(error);
            });
    }
}
```
