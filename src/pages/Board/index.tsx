import { useEffect, useState } from "react";
import { useTodoStore } from "@/utils/store";
import { DragDropContext } from "@hello-pangea/dnd";
import BoardContainer from "@/components/BoardContainer";

function Board() {
  const { filterTodoData, updateTodoDataDrag, initialFilter } = useTodoStore((state) => ({
    todoData: state.todoData,
    filterTodoData: state.filterTodoData,
    updateTodoDataDrag: state.updateTodoDataDrag,
    initialFilter: state.filtered,
  }));

  useEffect(() => {
    initialFilter();
  }, []);

  const allType = ["To Do", "Doing", "Done"];

  const [isMounted, setIsMounted] = useState(false);

  const onDragEnd = (result: any) => {
    console.log("result", result);
    const dragId = result?.draggableId;
    const { droppableId: destinationDroppableId, index: destIndex } = result?.destination;
    const { droppableId: srcDroppableId, index: srcIndex } = result?.source;

    if (destinationDroppableId === srcDroppableId && destIndex === srcIndex) {
      return;
    }

    if (destinationDroppableId === srcDroppableId) {
      const boardData = filterTodoData.get(destinationDroppableId) || [];
      const newBoardData = boardData.filter((details) => details.id !== dragId);
      const dragEle = boardData.find((details) => details.id === dragId);
      if (dragEle) {
        newBoardData.splice(destIndex, 0, dragEle);
        updateTodoDataDrag([...newBoardData], destinationDroppableId);
      }
    }

    if (destinationDroppableId !== srcDroppableId) {
      const srcBoardData = filterTodoData.get(srcDroppableId) || [];
      const newSrcData = srcBoardData.filter((details) => details.id !== dragId);
      const draggedElement = srcBoardData.find((details) => details.id === dragId);
      if (!draggedElement) {
        return;
      }
      draggedElement.type = destinationDroppableId;

      console.log("===> ~ onDragEnd ~ [...newSrcData], srcDroppableId:", [...newSrcData], srcDroppableId);
      updateTodoDataDrag([...newSrcData], srcDroppableId);
      const destBoardData = filterTodoData.get(destinationDroppableId) || [];
      destBoardData.splice(destIndex, 0, draggedElement);
      updateTodoDataDrag([...destBoardData], destinationDroppableId);
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

export default Board;
