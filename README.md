bot powering [happybdauthors](https://twitter.com/happybdauthors)

![Victor_Hugo_HAPPY_BIRTHDAY](/images/Victor_Hugo_HAPPY_BIRTHDAY.png)


## Recipe

* download [Wikdiata latest dump](https://www.wikidata.org/wiki/Wikidata:Database_download#JSON_dumps_.28recommended.29)
* as each line is an entity, you can filter it to keep only entities that matter to your project:
  ```
  cat dump.json |grep '36180\,' > isWriter.json
  ```

  Here the trick is that every entity with occupation-> writer (P106->Q36180) will have 36180 somewhere in the line (as a claim `numeric-id`). And tadaa, you went from a 39Go dump to a way nicer 384Mo subset

* load all the remaining entities lines in a new CouchDB database.
This would require more details but that deserves a whole repository on its own, given the amount of data to be loaded: my solution was very hacky, so if you know any tool to make that job easy, I'm interested!
Make sure to use the Wikidata id as doc `_id` to make it ever either to access.

* create the views you need using CouchDB's map functions. Here, the important view is [`byBirthday`](/design_docs/authors.json), and voila:

![authors-per-day](/images/authors-per-day.png)

a view ready to be queried by day and month by our grumpy Victor Hugo!



## the result:


![michel-verne](/images/michel-verne.png)

the magic behind the twitter card display data: [twitter metadata changed dynamically](https://github.com/inventaire/inventaire-client/blob/master/app/modules/general/lib/head_metadata.coffee) + [prerender](https://github.com/inventaire/prerender)-ing
