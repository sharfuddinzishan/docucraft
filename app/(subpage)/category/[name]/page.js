import ContentDisplay from "@/app/components/ContentDisplay";
import { getDocuments } from "@/lib/doc";

const CategoriesPage = async ({ params: { name } }) => {
  const docs = await getDocuments();
  const { id } = docs?.find((doc) => doc.category === name);
  return (
    <>
      <ContentDisplay id={id} />
    </>
  );
};

export default CategoriesPage;
