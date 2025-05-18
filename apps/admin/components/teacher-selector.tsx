"use client";
import { useState } from "react";
import { Check, ChevronsUpDown, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";

type Teacher = Schema<"SimpleTeacherResponseDto">;

type TeacherSelectorProps = {
  teachers: Teacher[];
  selectedTeachers: Teacher[];
  onChange: (selectedTeachers: Teacher[]) => void;
};

export function TeacherSelector({
  teachers,
  selectedTeachers,
  onChange,
}: TeacherSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelect = (teacher: Teacher) => {
    const isSelected = selectedTeachers.some((t) => t.id === teacher.id);

    if (isSelected) {
      // Remove teacher
      onChange(selectedTeachers.filter((t) => t.id !== teacher.id));
    } else {
      // Add teacher
      onChange([...selectedTeachers, teacher]);
    }
  };

  const handleRemove = (teacherId: number) => {
    onChange(selectedTeachers.filter((t) => t.id !== teacherId));
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedTeachers.length > 0
              ? `${selectedTeachers.length} teacher${selectedTeachers.length !== 1 ? "s" : ""} selected`
              : "Select teachers..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command shouldFilter={false}>
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandInput
                placeholder="Search teachers..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="border-0 focus:ring-0"
              />
            </div>
            <CommandList>
              {filteredTeachers.length > 0 ? (
                <ScrollArea className="max-h-[300px]">
                  <CommandGroup>
                    {filteredTeachers.map((teacher) => {
                      const isSelected = selectedTeachers.some(
                        (t) => t.id === teacher.id,
                      );
                      return (
                        <CommandItem
                          key={teacher.id}
                          value={teacher.id.toString()}
                          onSelect={() => handleSelect(teacher)}
                          className="flex items-center justify-between"
                        >
                          <div className="flex flex-col">
                            <span>{teacher.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {teacher.title}
                            </span>
                          </div>
                          <Check
                            className={cn(
                              "h-4 w-4",
                              isSelected ? "opacity-100" : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </ScrollArea>
              ) : (
                <CommandEmpty>No teachers found.</CommandEmpty>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedTeachers.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
            >
              {teacher.name}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 rounded-full"
                onClick={() => handleRemove(teacher.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
