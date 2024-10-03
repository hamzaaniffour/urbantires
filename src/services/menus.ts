import { GET_MENUS } from "@/apis/graphql/menu";

export type MenuItem = {
  id: string;
  label: string;
  path?: string;
  url?: string;
  uri?: string;
  parentId: string | null;
  childItems?: {
    nodes: MenuItem[];
  };
};

type Menu = {
  parentId: any;
  id: string;
  name: string;
  menuItems: {
    nodes: MenuItem[];
  };
};

export async function getMenus(): Promise<Menu[] | null> {
  try {
    const res = await fetch(`https://dev-tastyeats.pantheonsite.io/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_MENUS,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const json = await res.json();
    return json.data.menus.nodes;
  } catch (error) {
    return null;
  }
}

export async function getMenuByName(
  name: string
): Promise<MenuItem[] | string> {
  const menus = await getMenus();
  if (menus === null) {
    return "ADD A MENU";
  }
  const menu = menus.find(
    (m: { name: string }) => m.name.toLowerCase() === name.toLowerCase()
  );
  return menu ? menu.menuItems.nodes : [];
}
