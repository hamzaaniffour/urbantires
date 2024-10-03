import React from "react";
import Link from "next/link";
import { getMenuByName, MenuItem } from "@/services/menus";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const hasChildItems = (item: MenuItem): item is MenuItem & { childItems: { nodes: MenuItem[] } } => {
  return !!item.childItems && item.childItems.nodes.length > 0;
};

const cleanCategoryPath = (path: string): string => {
  if (path.startsWith("/category/")) {
    return "/" + path.split("/").slice(2).join("/");
  }
  return path;
};

const MenuItemComponent = ({ item }: { item: MenuItem }) => {
  const rawHref = item.path || item.url || item.uri || `/${item.label.toLowerCase().replace(/\s+/g, "-")}`;
  const href = cleanCategoryPath(rawHref);

  return (
    <li className="relative group no-last-gap">
      <Link
        href={href}
        className={`font-semibold text-blue-950 hover:text-pink-700 transition-all text-lg py-[19px]`}
      >
        {item.label}
        {hasChildItems(item) && <MdOutlineKeyboardArrowDown className="inline-block size-5 relative -top-[1px] -ml-0.5 -mr-1" />}
      </Link>
      {hasChildItems(item) && (
        <ul className={`absolute left-0 mt-[17px] min-w-max bg-white shadow hidden group-hover:block z-40`}>
          {item.childItems.nodes.map((childItem) => (
            <li key={childItem.id}>
              <Link
                href={cleanCategoryPath(childItem.path || childItem.url || childItem.uri || `/${childItem.label.toLowerCase().replace(/\s+/g, "-")}`)}
                className={`block text-pink-700 hover:bg-pink-50 text-[15px] py-2 px-3 border-b-[1px] border-slate-200 hover:text-pink-600 capitalize font-semibold`}
              >
                {childItem.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default async function Menu() {
  const menuItems = await getMenuByName("Primary");

  if (!menuItems || typeof menuItems === "string") {
    return <div>ADD A MENU</div>;
  }

  const topLevelItems = menuItems.filter((item) => !item.parentId);

  return (
    <nav className="hidden lg:block">
      <ul className="flex justify-center items-center gap-5">
        {topLevelItems.map((item: any) => (
          <MenuItemComponent key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  );
}
