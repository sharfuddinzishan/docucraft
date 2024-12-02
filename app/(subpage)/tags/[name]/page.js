import ContentDisplay from "@/app/components/ContentDisplay";
import { getDocuments } from "@/lib/doc";

//  params is test from path tags/test
const TagPage = async ({ params: { name } }) => {
  const docs = await getDocuments();

  // Get Parent list based on order key
  // no parent docs found for test tags
  const parentDocs = docs?.filter(
    (doc) => doc.tags.includes(name) && doc.order
  );

  // Get Children list
  // children node found for test
  const childDocs = docs?.filter(
    (doc) => doc.tags.includes(name) && !doc.order
  );

  // Determine the ID to use
  // We get getDocuments in sorted
  // child node of test tag have parent id "introduction"
  let id = childDocs?.at(-1)?.parent ?? parentDocs?.at(0)?.id;

  // If a parent ID is found, ensure it matches in earlier parentDocs
  // If parent have no matched tag then select children node from childDocs
  // parentDocs is empty earlier so if is true then id is finally test
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
