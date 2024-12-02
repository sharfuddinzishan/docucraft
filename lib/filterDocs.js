// Utility function to get root and non-root documents
export const filterDocs = (
  finalDocs,
  currentTag = null,
  validationField = "tags"
) => {
  const roots = [];
  let nonRoots = {};

  finalDocs.forEach((doc) => {
    if (currentTag) {
      const matchesField = Array.isArray(doc[validationField])
        ? doc[validationField]?.includes(currentTag)
        : doc[validationField] === currentTag;
      if (!matchesField) return;
    }

    if (!doc?.parent) {
      roots.push(doc);
    } else {
      const parentDoc = finalDocs.find((d) => d.id === doc.parent);
      if (parentDoc && !roots?.includes(parentDoc)) {
        roots.push(parentDoc);
      }
    }
  });
  roots.sort((a, b) => a.order - b.order);

  const filteredNonRoots = currentTag
    ? finalDocs.filter((doc) => {
        const matchesField = Array.isArray(doc[validationField])
          ? doc[validationField]?.includes(currentTag)
          : doc[validationField] === currentTag;
        return doc.parent && matchesField;
      })
    : finalDocs.filter((doc) => doc.parent);
  filteredNonRoots.sort((a, b) => a.order - b.order);
  nonRoots = Object.groupBy(filteredNonRoots, ({ parent }) => parent);

  return { roots, nonRoots };
};
