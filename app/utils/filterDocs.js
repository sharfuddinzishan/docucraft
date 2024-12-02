// Utility function to get root and non-root documents
export const filterDocs = (finalDocs, subPath = "tags", queryPath = null) => {
  const roots = [];
  let nonRoots = {};

  // Get Parent Node from docs
  finalDocs.forEach((doc) => {
    // If queryPath does not matches then iterate next doc
    // tags/test, search test matches with any tags of a doc
    // If doc have no test tag then skipped this from operation as only need test tag related doc
    if (queryPath) {
      const isDocMatchQuery = Array.isArray(doc[subPath])
        ? doc[subPath]?.includes(queryPath)
        : doc[subPath] === queryPath;
      if (!isDocMatchQuery) return;
    }

    // If queryPath matches then check it is parent node.
    // If doc have no parent means itself it is a parent node then push this object to roots
    if (!doc?.parent) {
      roots.push(doc);
    }
    // test have parent "introduction", so added this object to roots to show test under introduction in UI
    else {
      // Get parent node like get "introduction" object
      const parentDoc = finalDocs.find((d) => d.id === doc.parent);
      // If doc have parent then check if the parent object is already added to roots or not
      if (parentDoc && !roots?.includes(parentDoc)) {
        roots.push(parentDoc);
      }
    }
  });
  // Sort Parent Nodes to Show in a order in UI
  roots.sort((a, b) => a.order - b.order);

  // Get Children from docs
  const filteredNonRoots = queryPath
    ? finalDocs.filter((doc) => {
        const isDocMatchQuery = Array.isArray(doc[subPath])
          ? doc[subPath]?.includes(queryPath) // tags is array type
          : doc[subPath] === queryPath; // category and author is not array type
        return doc.parent && isDocMatchQuery;
        // If doc have parent then this is child node
        // Parent node also match with queryPath but we want only children
        // doc is match but it is parent, then return nothing
      })
    : finalDocs.filter((doc) => doc.parent); // If no query path found then no need to matched localhost:3000/
  // Sort Child Nodes to Show in a order in UI
  filteredNonRoots.sort((a, b) => a.order - b.order);
  // Group the child nodes with theire parent
  nonRoots = Object.groupBy(filteredNonRoots, ({ parent }) => parent);

  return { roots, nonRoots };
};
