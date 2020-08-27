import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './shared/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@sq/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from '@sq/app/app.effects';
import { appFeatureName, appReducer } from '@sq/app/app.reducer';
import { metaReducers } from '@sq/app/metareducers';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forFeature(appFeatureName, appReducer),
    StoreModule.forRoot(
      { router: routerReducer },
      {
        metaReducers,
        runtimeChecks: {},
      },
    ),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 25, // Retains last 25 states
        })
      : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
