import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TodoDetailsProps } from "@/utils/types";
import { Draggable } from "@hello-pangea/dnd";
import { EditTodo } from "./EditTodo";
import { useState } from "react";

const TodoCard = ({ details, order }: { details: TodoDetailsProps; order: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <Draggable draggableId={details.id} index={order}>
      {(provided, snapshot) => {
        return (
          <Card className="p-3 mb-2 bg-zinc-200 last:mb-0 dark:bg-zinc-900" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => setOpen((prev) => !prev)}>
            <CardContent className="items-center justify-between px-2 py-4 space-y-4">
              <CardTitle>{details.title}</CardTitle>
              <div className="">
                <span>{details.description}</span>
              </div>
              <EditTodo open={open} setOpen={setOpen} data={details} />
            </CardContent>
          </Card>
        );
      }}
    </Draggable>
  );
};

export default TodoCard;
