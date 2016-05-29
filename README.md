# Brewery Locator:
This is a simple app to plot breweries for any city on a Google Map.

### Tech Stack:
Sinatra, Google Maps, and BreweryDB.


![BreweryFinder](https://github.com/hsuttong/BreweryFinder/blob/master/screenshots/breweryFinder.png "BreweryFinder")

### Quickstart:

1.  `bundle install`
2.  `shotgun config.ru`

As needed, create models & migrations with the `rake` tasks:

```
rake generate:migration  # Create an empty migration in db/migrate, e.g., rake generate:migration NAME=create_tasks
rake generate:model      # Create an empty model in app/models, e.g., rake generate:model NAME=User
```
