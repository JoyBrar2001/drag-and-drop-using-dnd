import React, { useState } from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
      className="p-4 bg-blue-500 text-white rounded shadow-md mb-2 cursor-grab"
    >
      <p className="text-lg font-semibold">{props.id}</p>
    </div>
  )
}

const App = () => {
  const [languages, setLanguages] = useState(["Javascript", "Python", "Typescript", "Rust", "Go"])

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setLanguages((items) => {
        const activeIndex = items.indexOf(active.id)
        const overIndex = items.indexOf(over.id)
        return arrayMove(items, activeIndex, overIndex)
      })
    }
  }

  console.log(languages);

  return (
    <main className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white p-8 rounded shadow-lg'>
        <h3 className='text-2xl font-bold mb-4'>The best programming languages!</h3>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={languages}
            strategy={verticalListSortingStrategy}
          >
            {languages.map((language) => (
              <SortableItem key={language} id={language} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </main>
  )
}

export default App
