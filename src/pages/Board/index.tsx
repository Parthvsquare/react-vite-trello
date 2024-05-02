import { useEffect, useState } from "react";
import { useTodoStore } from "@/utils/store";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import BoardContainer from "@/components/BoardContainer";

function Board() {
  const { filterTodoData, updateTodoData, filterTodoFn } = useTodoStore((state) => ({
    todoData: state.todoData,
    filterTodoData: state.filterTodoData,
    updateTodoData: state.updateTodoDataDrag,
    filterTodoFn: state.filtered,
  }));
  useEffect(() => {
    filterTodoFn();
  }, []);
  console.log("===> ~ file: index.tsx ~ line 10 ~ Board ~ filterTodoData", filterTodoData);

  const allType = ["To Do", "Doing", "Done"];

  const [isMounted, setIsMounted] = useState(false);

  const onDragEnd = (result: DropResult) => {
    if (!result) {
      return;
    }
    const dragId = result.draggableId;
    if (!result?.destination?.droppableId) {
      return;
    }
    const { droppableId: destDroppableId, index: destIndex } = result.destination;

    const { droppableId: srcDroppableId, index: srcIndex } = result.source;

    if (destDroppableId === srcDroppableId && destIndex === srcIndex) {
      return;
    }

    if (destDroppableId === srcDroppableId) {
      let boardData = [];
      if (filterTodoData.get(destDroppableId)?.length === 0) {
        boardData = filterTodoData.get(destDroppableId)!;
      }
      boardData = [...filterTodoData.get(destDroppableId)!];
      const newBoardData = boardData.filter((details) => details.id !== dragId);
      const dragEle = boardData.find((details) => details.id === dragId)!;
      newBoardData.splice(destIndex, 0, dragEle);
      updateTodoData([...newBoardData], destDroppableId);
    }

    if (destDroppableId !== srcDroppableId) {
      let srcBoardData = [];
      if (filterTodoData.get(destDroppableId)?.length === 0) {
        srcBoardData = filterTodoData.get(srcDroppableId)!;
      }
      srcBoardData = [...filterTodoData.get(srcDroppableId)!];
      const newSrcData = srcBoardData.filter((details) => details.id !== dragId);
      const dragEle = srcBoardData.find((details) => details.id === dragId)!;
      dragEle.type = destDroppableId;
      updateTodoData([...newSrcData], srcDroppableId);

      let destBoardData: any[] = [];
      if (filterTodoData.get(destDroppableId)) {
        destBoardData = [...filterTodoData.get(destDroppableId)!];
      }
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
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
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
