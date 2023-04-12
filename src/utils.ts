interface Item {
    id: number;
    seqId: number;
    parent: number | null;
    name: string;
    depth?: number;
    children?: Item[];
  }
  
export function transformItems(items: Item[], parent?: Item): Item[] {
    //mapping of items by their ID
    const itemsMap: Record<number, Item> = {};
    for (const item of items) {
      itemsMap[item.id] = item;
    }
  
    //setting the parent and children of each item
    for (const item of items) {
      if (item.parent !== null) {
        const parentItem = itemsMap[item.parent];
        if (parentItem) {
          if (!parentItem.children) {
            parentItem.children = [];
          }
          parentItem.children.push(item);
          item.depth = parent?.depth ? parent.depth + 1 : 0;
        }
      } else {
        item.depth = 0;
      }
    }
  
    //sorting the root items by their sequence ID and then recursively sort their children
    const rootItems = items.filter((item) => item.parent === null);
    rootItems.sort((a, b) => a.seqId - b.seqId);
    for (const rootItem of rootItems) {
      sortChildren(rootItem);
    }
  
    return rootItems;
  
    function sortChildren(item: Item) {
      if (item.children) {
        item.children.sort((a, b) => a.seqId - b.seqId);
        for (const child of item.children) {
          sortChildren(child);
        }
      }
    }
  }
  