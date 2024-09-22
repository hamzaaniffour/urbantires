// import Link from 'next/link'
// import React from 'react'

// const Menu = () => {
//   return (
//     <div className='hidden lg:flex'>
//         <ul className='flex justify-center items-center gap-6'>
//             <li><Link href="/" className='font-semibold text-black hover:text-amber-600 transition-all text-lg'>Home</Link></li>
//             <li><Link href="/" className='font-semibold text-black hover:text-amber-600 transition-all text-lg'>Sweet Treats</Link></li>
//             <li><Link href="/" className='font-semibold text-black hover:text-amber-600 transition-all text-lg'>Savory Dishes</Link></li>
//             <li><Link href="/" className='font-semibold text-black hover:text-amber-600 transition-all text-lg'>Miscellaneous</Link></li>
//             <li><Link href="/" className='font-semibold text-black hover:text-amber-600 transition-all text-lg'>Pages</Link></li>
//         </ul>
//     </div>
//   )
// }

// export default Menu


// import Link from "next/link";
// import React from "react";

// const Menu = () => {
//   const links = [
//     { name: "Aménager le jardin", link: "" },
//     { name: "Outils & Accessoires", link: "" },
//     { name: "Éléments d'eau", link: "" },
//     { name: "Blog", link: "" },
//     { name: "Contactez", link: "" },
//   ];

//   return (
//     <nav>
//       <ul className="flex justify-start items-center gap-3">
//         {links.map((link, index) => (
//           <li key={index} className={index === 0 ? "" : "no-last-gap"}>
//             <Link
//               href={link.link}
//               className="text-white transition-all hover:text-amber-100 font-semibold text-[15px]"
//             >
//               {link.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default Menu;

import React from "react";
import Link from "next/link";
import { getMenuByName, MenuItem } from "@/services/menus";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const hasChildItems = (
  item: MenuItem
): item is MenuItem & { childItems: { nodes: MenuItem[] } } => {
  return !!item.childItems && item.childItems.nodes.length > 0;
};

const cleanCategoryPath = (path: string): string => {
  if (path.startsWith("/category/")) {
    return "/" + path.split("/").slice(2).join("/");
  }
  return path;
};

const MenuItemComponent = ({ item }: { item: MenuItem }) => {
  const rawHref =
    item.path ||
    item.url ||
    item.uri ||
    `/${item.label.toLowerCase().replace(/\s+/g, "-")}`;
  const href = cleanCategoryPath(rawHref);

  if (hasChildItems(item)) {
    return (
      <>
        <li className="relative group no-last-gap">
          <Link
            href={href}
            className={`font-semibold text-black hover:text-amber-600 transition-all text-lg py-[19px]`}
          >{item.label} <MdOutlineKeyboardArrowDown className="inline-block size-5 relative -top-[1px] -ml-0.5 -mr-1" /></Link>
          <ul
            className={`absolute left-0 mt-[17px] min-w-max bg-white shadow hidden group-hover:block z-40`}
          >
            {item.childItems.nodes.map((childItem) => {
              const rawChildHref =
                childItem.path ||
                childItem.url ||
                childItem.uri ||
                `/${childItem.label.toLowerCase().replace(/\s+/g, "-")}`;
              const childHref = cleanCategoryPath(rawChildHref);
              return (
                <li key={childItem.id} className="">
                  <Link
                    href={childHref}
                    className={`block text-amber-600 hover:bg-amber-50 text-[15px] py-2 px-3 border-b-[1px] border-slate-200 hover:text-amber-500 capitalize font-semibold`}
                  >{childItem.label}</Link>
                </li>
              );
            })}
          </ul>
        </li>
      </>
    );
  }

  return (
    <li className="no-last-gap">
      <Link
        href={href}
        className={`font-semibold text-black hover:text-amber-600 transition-all text-lg py-[19px]`}
      >
        {item.label}
      </Link>
    </li>
  );
};

export default async function Menu() {
  const menuItems = await getMenuByName("Primary"); // Add this line

  if (!menuItems) {
    return <div>Menu not found</div>;
  }

  if (typeof menuItems === "string") {
    return <div>{menuItems}</div>;
  }

  // Filter top-level items (items without a parent)
  const topLevelItems = menuItems.filter((item) => !item.parentId);

  return (
    <div className="hidden lg:block">
      <ul className="flex justify-center items-center gap-5">
        {topLevelItems.map((item: any) => (
          <MenuItemComponent key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}
