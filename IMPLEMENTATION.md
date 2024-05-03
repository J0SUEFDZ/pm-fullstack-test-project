# Implementation

This is the implementation that I followed and my approach for this:

# Using the data as a JSON

First thing that I noticed, is that the `data` attribute in the `Snapshot` model is a JSON, which means I can make use of hashes and objects.

After making a simple test using the already DUMMY_DATA, I noticed that if I save the `data` with exactly the same format expected in the `graph.jsx` I won't have to
do much on the frontend-side to parse information, since I can save as it is on the backend and retrieve/display on the frontend.
That's why I stored inside `data` the `nodes` with the `id` already applied and the `links` with the attributes `source` and `target`. Using `Set` so I don't have repeated nodes/links.

# Logic behind the topics
I made use of the easy access that ruby has for hashes, storing the conversations in a way that I can make the most use of the similar object in JS.
By storing the topics in the following format:
```
{'Source' => {'Target 1' => 'Topics', 'Target 2' => 'Topics', ...}}
```
I can access this information in the frontend doing something like `topics[source][target]` using the source and target that already come from the nodes/links.
