import ContentDisplay from "@/app/components/ContentDisplay";
import { getDocuments } from "@/lib/doc";

const TagPage = async ({ params: { name } }) => {
  const docs = await getDocuments();
  const childDocs = docs?.filter(
    (doc) => doc.tags.includes(name) && !doc.order
  );
  const parentDocs = docs?.filter(
    (doc) => doc.tags.includes(name) && doc.order
  );

  // Determine the ID to use
  let id = childDocs?.at(-1)?.parent ?? parentDocs?.at(0)?.id;

  // If a parent ID is found, ensure it matches in parentDocs
  if (!parentDocs?.find((doc) => doc.id === id)) {
    id = childDocs?.at(-1)?.id;
  }

  // if no ID is found
  if (!id) {
    return <p>No document found.</p>;
  }

  return <ContentDisplay id={id} />;
};

export default TagPage;
