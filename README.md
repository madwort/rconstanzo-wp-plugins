#Rodrigo Constanzo's Thesis stuff

This is a grab bag of stuff that will be woven into Rod's thesis.

* Glitchy SVG text
* Infinite scrolling generative text
* Scroll to z plane images
* Springy d3 menu widget 
* Restructuring piece/project diagram

##References

###Package as Wordpress plugin(s)

http://code.tutsplus.com/articles/how-to-include-javascript-and-css-in-your-wordpress-themes-and-plugins--wp-24321


##Ideas

###Dynamic content searching widget

* jQuery :contains() selector
* $.merge(selection(improv), selection(improvisation))
* window.location.search params

Where do we put the dynamic selection of results?

#### Return JSON file with all results for all keywords
* a bit more to download, but file can be cached in browser
* how do we construct the file? 
  * stringify & manually construct?
  * can we produce JSON files for each page, then munge them together?
  * is a CSV file a better bet? less structure makes it easier to produce, we can just concat?


#### Return JSON file for each click, with (eg) 10 results
* requires server-side processing (PHP)
  
