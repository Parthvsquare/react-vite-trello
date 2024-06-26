import { cn } from "@/utils/lib/utils";
import { useTodoStore } from "@/utils/store";
import { TodoDetailsProps, allType, formSchema } from "@/utils/types";
import { Droppable } from "@hello-pangea/dnd";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import TodoCard from "./TodoCard";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface IProps {
  heading: string;
  type: string;
  data: TodoDetailsProps[] | [];
}

const BoardContainer = ({ heading, data, type }: IProps) => {
  const addList = useTodoStore((state) => state.addList);
  const [openModal, setOpenModal] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addList(
      {
        id: uuidv4(),
        title: values.title,
        description: values.description,
        type: values.type ?? type,
      },
      values.type ?? type
    );

    form.reset();
    setOpenModal(false);
  };

  return (
    <Droppable droppableId={type}>
      {(provided, snapshot) => (
        <Card className="h-full min-w-[350px] shadow-sm" ref={provided.innerRef} {...provided.droppableProps}>
          <CardHeader className="bg-background border-foreground/50 flex flex-row items-center justify-between border-b-[1px] border-solid py-3 rounded-t-lg">
            <CardTitle className="text-lg">{heading}</CardTitle>
            <Dialog open={openModal} onOpenChange={setOpenModal}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="h-auto p-0">
                  <PlusCircle className="transition-all cursor-pointer lg:hover:stroke-primary" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Todo</DialogTitle>
                  <DialogDescription>Add item in {heading}</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4 space-y-3">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Todo Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Todo type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={type}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Todo Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent defaultValue={type}>
                              {allType.map((value, index) => {
                                return (
                                  <SelectItem value={value} key={index + value}>
                                    {value}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
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
          <CardContent
            className={cn(
              "overflow-y-scroll basic-scroll max-h-[calc(100vh-200px)] h-full min-w-[350px] px-4 pt-6 transition-colors  duration-300 ease-in-out",
              snapshot.isDraggingOver ? "bg-zinc-600 dark:bg-zinc-600" : "bg-zinc-100 dark:bg-zinc-800"
            )}
          >
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
