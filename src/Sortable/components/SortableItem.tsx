import { Hand } from 'lucide-react';
import { createContext, useContext, useMemo } from 'react';
import type { CSSProperties, PropsWithChildren } from 'react';

import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
  id: UniqueIdentifier;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

export function SortableItem({ children, id }: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
    listStyleType: 'none',

    marginBottom: '2rem',
    // cursor: "move",
    // userSelect: "none",
  };

  return (
    <SortableItemContext.Provider value={context}>
      <li className='SortableItem' ref={setNodeRef} style={style}>
        {children}
      </li>
    </SortableItemContext.Provider>
  );
}

export function DragHandle() {
  const { attributes, listeners, ref } = useContext(SortableItemContext);

  const dragButton = {
    cursor: 'move',
    padding: '0.2rem',
    border: 'none',
    backgroundColor: 'var(--color-background)',
    borderRadius: '0.5rem',
  };

  return (
    <button style={dragButton} {...attributes} {...listeners} ref={ref}>
      <Hand />
    </button>
  );
}
