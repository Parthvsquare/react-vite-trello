import { useEffect, useState } from "react";
import { useTodoStore } from "@/utils/store";
import { DragDropContext } from "@hello-pangea/dnd";
import BoardContainer from "@/components/BoardContainer";

function App() {
  const { filterTodoData, updateTodoData } = useTodoStore((state) => ({
    todoData: state.todoData,
    filterTodoData: state.filterTodoData,
    updateTodoData: state.updateTodoData,
  }));

  const allType = ["todo", "in-progress", "QA", "done"];

  const [isMounted, setIsMounted] = useState(false);

  const onDragEnd = (result: any) => {
    const dragId = result?.draggableId;
    const { droppableId: destDroppableId, index: destIndex } = result?.destination;
    const { droppableId: srcDroppableId, index: srcIndex } = result?.source;

    if (destDroppableId === srcDroppableId && destIndex === srcIndex) {
      return;
    }

    if (destDroppableId === srcDroppableId) {
      const boardData = [...filterTodoData.get(destDroppableId)];
      const newBoardData = boardData.filter((details) => details.id !== dragId);
      const dragEle = boardData.find((details) => details.id === dragId);
      newBoardData.splice(destIndex, 0, dragEle);
      updateTodoData([...newBoardData], destDroppableId);
    }

    if (destDroppableId !== srcDroppableId) {
      const srcBoardData = [...filterTodoData.get(srcDroppableId)];
      const newSrcData = srcBoardData.filter((details) => details.id !== dragId);
      const dragEle = srcBoardData.find((details) => details.id === dragId);
      dragEle.type = destDroppableId;
      updateTodoData([...newSrcData], srcDroppableId);

      const destBoardData = [...filterTodoData.get(destDroppableId)];
      destBoardData.splice(destIndex, 0, dragEle);
      updateTodoData([...destBoardData], destDroppableId);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="p-5 overflow-auto basic-scroll">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-5">
          {allType.map((name) => {
            return <BoardContainer key={name} heading={name} data={filterTodoData.get(name) || []} type={name} />;
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
