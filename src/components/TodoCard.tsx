import { Card, CardContent } from "./ui/card";
import { TodoDetailsProps } from "@/utils/types";
import { Draggable } from "@hello-pangea/dnd";
import { CheckoutTable } from "./CheckoutTable";

const TodoCard = ({ details, order }: { details: TodoDetailsProps; order: number }) => {
  return (
    <Draggable draggableId={details.id} index={order}>
      {(provided, snapshot) => (
        <Card className="p-3 mb-2 bg-zinc-200 last:mb-0 dark:bg-zinc-900" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <CardContent className="flex items-center justify-between p-0">
            <div className="w-64 m-2 truncate">
              <span> {details.name}</span>
            </div>
            <CheckoutTable />
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default TodoCard;
