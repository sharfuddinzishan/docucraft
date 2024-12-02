"use client";
import { filterDocs } from "@/app/utils/filterDocs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ docs }) => {
  const getPath = usePathname();
  // http://localhost:3000/tags/technology
  const paths = getPath?.split("/");
  //   ['', 'tags', 'technology']
  const validSubPaths = ["tags", "category", "author"];

  const getSubPath = validSubPaths.includes(paths[1]) ? paths[1] : null;

  const finalDocs = [...docs];
  const queryPath = validSubPaths.includes(paths?.at(1))
    ? decodeURIComponent(paths?.at(2) || "")
    : null;
  const { roots, nonRoots } = filterDocs(finalDocs, getSubPath, queryPath);

  return (
    <nav className="hidden lg:mt-10 lg:block">
      <ul role="list" className="border-l border-transparent">
        {roots.map((rootNode) => (
          <li key={rootNode.id} className="relative">
            <Link
              aria-current="page"
              className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
              href={`/docs/${rootNode.id}`}
            >
              <span className="truncate">{rootNode.title}</span>
            </Link>
            {nonRoots[rootNode.id] && (
              <ul role="list" style={{ opacity: 1 }}>
                {nonRoots[rootNode.id].map((subRoot) => (
                  <li key={subRoot.id}>
                    <Link
                      className="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                      href={`/docs/${rootNode.id}/${subRoot.id}`}
                    >
                      <span className="truncate">{subRoot.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
