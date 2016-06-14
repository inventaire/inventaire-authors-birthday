bot powering [twitter.com/happybdauthors](https://twitter.com/happybdauthors) and [facebook.com/happybdauthors](https://www.facebook.com/happybdauthors)

![Victor_Hugo_HAPPY_BIRTHDAY](/images/Victor_Hugo_HAPPY_BIRTHDAY.png)


## Recipe

### using SPARQL
Simply customize the [SPARQL query](https://github.com/inventaire/inventaire-authors-birthday/blob/master/lib/get_authors_by_birthday.coffee) to your needs

### using a dump and Couchdb
This was the bot's first implementation: more rigid and requiring more resources but I let it here as an inspiration:

* install [wikidata-filter](https://npmjs.com/package/wikidata-filter)
* download [Wikidata latest dump](https://www.wikidata.org/wiki/Wikidata:Database_download#JSON_dumps_.28recommended.29) and filter on the desired claim: here P106:Q36180 keeps only entities with occupation (P106) writter (Q36180):
```
curl https://dumps.wikimedia.org/wikidatawiki/entities/latest-all.json.gz |gzip -d | wikidata-filter --claim P106:Q36180 > isWriter.json
```

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
