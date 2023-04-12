import React from 'react';
import { transformItems } from './utils';

const items = [
  { id: 2, seqId: 4, parent: 5, name: "index.ts" },
  { id: 3, seqId: 3, parent: 1, name: "Sidebar" },
  { id: 4, seqId: 5, parent: 1, name: "Table" },
  { id: 7, seqId: 5, parent: 5, name: "SelectableDropdown.tsx" },
  { id: 5, seqId: 2, parent: 1, name: "AssignmentTable" },
  { id: 1, seqId: 1, parent: null, name: "components" },
  { id: 6, seqId: 2, parent: null, name: "controllers" },
];

const transformedItems = transformItems(items);

type Item = {
  id: number;
  seqId: number;
  parent: number | null;
  name: string;
  children?: Item[];
  depth?: number;
};

function App() {
  const renderItems = (items: Item[]) => {
    return items.map((item) => {
      return (
        <div key={item.id}>
          <div style={{ marginLeft: `${item.depth ? item.depth * 16 : 0}px` }}>
            {item.name}
          </div>
          {item.children && item.children.length > 0 && (
            <div style={{ marginLeft: `${(item.depth ? item.depth + 1 : 0) * 16}px` }}>
              {renderItems(item.children)}
            </div>
          )}
        </div>
      );
    });
  };

  return <div>{renderItems(transformedItems)}</div>;
}

export default App;
