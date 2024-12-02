import Link from "next/link";

const SearchResult = ({ results, term, clearSearchTerm }) => {
  return (
    <>
      <div className=" absolute left-0 top-12 z-[999] w-full rounded-md bg-white p-4 shadow">
        <p className="!text-lg">
          Showing results for
          <span className="font-semibold">&nbsp;&quot;{term}&quot;:</span>
        </p>
        <ul role="list" className="divide-y divide-gray-100 [&>*]:py-2">
          {results?.map((doc) => (
            <li key={doc.id} className="">
              <Link
                className="transition-all hover:text-emerald-600"
                href={`/docs/${doc.id}`}
                onClick={(event) => clearSearchTerm()}
              >
                {doc.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SearchResult;
