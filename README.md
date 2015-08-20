bot powering [twitter.com/happybdauthors](https://twitter.com/happybdauthors) and [facebook.com/happybdauthors](https://www.facebook.com/happybdauthors)

![Victor_Hugo_HAPPY_BIRTHDAY](/images/Victor_Hugo_HAPPY_BIRTHDAY.png)


## Recipe

* download [Wikidata latest dump](https://www.wikidata.org/wiki/Wikidata:Database_download#JSON_dumps_.28recommended.29)
* as each line is an entity, you can filter it to keep only entities that matter to your project:
  ```
  cat dump.json |grep '36180\,' > isWriter.json
  ```

  Here the trick is that every entity with occupation-> writer (P106->Q36180) will have 36180 somewhere in the line (as a claim `numeric-id`). And tadaa, you went from a 39Go dump to a way nicer 384Mo subset

* load all the remaining entities lines in a new CouchDB database. See the [couch-wikidata-dump-importer](https://github.com/maxlath/couch-wikidata-dump-importer) for how I did that. It's a bit hacky but it works.

* create the views you need using CouchDB's map functions. Here, the important view is [`byBirthday`](/design_docs/authors.json), and voila:

![authors-per-day](/images/authors-per-day.png)

a view ready to be queried by day and month by our grumpy Victor Hugo!



## The result

* on [twitter](https://twitter.com/happybdauthors):

![michel-verne](/images/michel-verne.png)

* on [facebook](https://www.facebook.com/happybdauthors):

![adam-bartsch.png](/images/adam-bartsch.png)

and for the magic behind twitter and facebook displaying the right data despite Inventaire being a SPA: [twitter metadata changed dynamically](https://github.com/inventaire/inventaire-client/blob/master/app/modules/general/lib/head_metadata.coffee) + [prerender](https://github.com/inventaire/prerender)-ing


## Authors tomorrow

`npm run authors-tomorrow` fetches the data of the authors of the next day and help you match them with twitter users in order to improve wikidata data before the bot comes to use it.

This will open a basic web page :
![tomorrow-ui](/images/tomorrow-ui.png)

 To edit wikidata using the `validate` button, a rightly configured instance of [wikidata-agent](http://github.com/maxlath/wikidata-agent) is expected to be running on port 4115 of your machine.
