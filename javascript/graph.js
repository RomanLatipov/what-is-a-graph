class Graph {
  constructor(paths) {
    this.graph = {};

    this.toGraph(paths);
  }

  toGraph(paths) {
    const graph = {};

    function addToSet(arr, idx) {
      if(idx>0) 
        graph[arr[idx]].add(arr[idx-1]);
      if(idx<arr.length-1) 
        graph[arr[idx]].add(arr[idx+1]);
    }

    paths.forEach(arr => {
      for (let i=0; i<arr.length; i++) {
        if (graph[arr[i]]) {
          addToSet(arr, i);
        }
        else {
          graph[arr[i]] = new Set();
          addToSet(arr, i);
        }
      }
    })
    this.graph = graph;
  }

  isAdjacent(vertexA, vertexB) {
    return this.graph[vertexA].has(vertexB);
  }

  // array is an adjacency list
  addVertex(vertex, array) {
    this.graph[vertex] = new Set();
    array.forEach(elem => {
      if (this.graph[elem])
        this.graph[elem].add(vertex);
      else
        this.graph[elem] = new Set(vertex);
      this.graph[vertex].add(elem);
    })
  }
}

if (require.main === module) {
  // add your own tests in here
  let graph = new Graph([]);

  console.log("Expecting: {}");
  console.log(graph.graph);

  console.log("");

  graph = new Graph([["a", "b", "c"], ["b", "d"]]);

  console.log('Expecting: { a: { "b" }, b: { "a", "c", "d" }, c: { "b" }, d: { "b" }}');
  console.log(graph.graph);

  console.log("");

  console.log("Expecting: true");
  console.log(graph.isAdjacent("a", "b"));

  console.log("");

  console.log("Expecting: false");
  console.log(graph.isAdjacent("a", "c"));

  console.log("");

  graph.addVertex("e", ["a", "d"]);
  console.log('Expecting: { a: { "b", "e" }, b: { "a", "c", "d" }, c: { "b" }, d: { "b", "e" }, e: { "a", "d" } }');
  console.log(graph.graph);

  console.log("");
}

module.exports = Graph;

// Please add your pseudocode to this file
// And a written explanation of your solution
