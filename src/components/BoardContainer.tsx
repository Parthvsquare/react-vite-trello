import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { PlusCircle } from "lucide-react";
import { TodoDetailsProps } from "@/utils/types";
import TodoCard from "./TodoCard";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Droppable } from "@hello-pangea/dnd";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTodoStore } from "@/utils/store";
import { v4 as uuid4 } from "uuid";

interface IProps {
  heading: string;
  // type: "todo" | "in-progress" | "QA" | "done";
  type: string;
  data: TodoDetailsProps[] | [];
}

const BoardContainer = ({ heading, data, type }: IProps) => {
  const addList = useTodoStore((state) => state.addList);
  const [openModal, setOpenModal] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string().min(2).max(150),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addList(
      {
        id: uuid4(),
        name: values.name,
        description: values.description,
        type: type,
      },
      type
    );

    form.reset();
    setOpenModal(false);
  };

  return (
    <Droppable droppableId={type}>
      {(provided, snapshot) => (
        <Card className="h-full w-[350px] shadow-sm" ref={provided.innerRef} style={{ backgroundColor: snapshot.isDraggingOver ? "blue" : "grey" }} {...provided.droppableProps}>
          <CardHeader className="bg-background border-foreground/50 flex flex-row items-center justify-between border-b-[1px] border-solid py-3">
            <CardTitle className="text-lg">{heading}</CardTitle>
            <Dialog open={openModal} onOpenChange={setOpenModal}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="h-auto p-0">
                  <PlusCircle className="transition-all cursor-pointer lg:hover:stroke-primary" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Item</DialogTitle>
                  <DialogDescription>Add item in {heading}</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4 space-y-3">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea id="description" placeholder="Description" className="col-span-3" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="basic-scroll max-h-[calc(100vh-200px)] min-h-[350px] w-[350px] overflow-auto bg-zinc-100 px-4 pt-6 dark:bg-zinc-800">
            {data.map((value: TodoDetailsProps, index) => {
              return <TodoCard key={value.id} details={value} order={index} />;
            })}
            {provided.placeholder}
          </CardContent>
        </Card>
      )}
    </Droppable>
  );
};

export default BoardContainer;
