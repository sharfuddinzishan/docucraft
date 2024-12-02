import ContentDisplay from "@/app/components/ContentDisplay";
import { getDocuments } from "@/lib/doc";

const AuthorPage = async ({ params: { name } }) => {
  // const docs = await getDocuments();
  // const { id } = docs?.find((doc) => encodeURI(doc.author) === name);

  const docs = await getDocuments();
  const getFilterTags = docs?.filter(
    (doc) => doc.author === decodeURIComponent(name)
  );
  const { id } = getFilterTags?.at(-1);
  return (
    <>
      <ContentDisplay id={id} />
    </>
  );
};

export default AuthorPage;
