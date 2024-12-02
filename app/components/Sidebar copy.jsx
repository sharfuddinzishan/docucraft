"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = ({ docs }) => {
  const getPath = usePathname();
  const paths = getPath?.split("/");
  const validSubPaths = ["tags", "categories", "authors"];
  const [roots, setRoots] = useState([]);
  const [nonRoots, setNonRoots] = useState({});

  useEffect(() => {
    let getRoots = [];
    let getNonRoots = {};

    if (paths && validSubPaths.includes(paths[1])) {
      const currentTag = paths[2];
      const copyDocs = [...docs];
      copyDocs.forEach((doc) => {
        if (doc?.tags?.includes(currentTag)) {
          if (!doc.parent) {
            getRoots.push(doc);
          } else {
            const parentDoc = copyDocs.find(
              (innerDoc) => innerDoc.id === doc.parent
            );
            if (parentDoc && !getRoots.includes(parentDoc)) {
              getRoots.push(parentDoc);
            }
          }
        }
      });

      getNonRoots = Object.groupBy(
        docs.filter((doc) => doc.parent && doc?.tags?.includes(currentTag)),
        ({ parent }) => parent
      );
    } else {
      getRoots = docs.filter((doc) => !doc.parent);
      getNonRoots = Object.groupBy(
        docs.filter((doc) => doc.parent),
        ({ parent }) => parent
      );
    }

    console.log("Final Roots", getRoots);
    setRoots([...getRoots]);
    setNonRoots({ ...getNonRoots });
  }, [getPath, docs]);

  return (
    <>
      <nav className="hidden lg:mt-10 lg:block">
        <ul role="list" className="border-l border-transparent">
          {console.log("roots ", roots)}
          {roots?.map((rootNode) => (
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
    </>
  );
};

export default Sidebar;
