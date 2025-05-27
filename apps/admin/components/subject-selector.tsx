"use client";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
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
import { Check, ChevronsUpDown, Search, X } from "lucide-react";
import { useState } from "react";

type Subject = Schema<"SimpleSubjectResponseDto">;

type SubjectSelectorProps = {
  subjects: Subject[];
  selectedSubjects: Subject[];
  onChange: (selectedSubjects: Subject[]) => void;
};

export function SubjectSelector({
  subjects,
  selectedSubjects,
  onChange,
}: SubjectSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelect = (subject: Subject) => {
    const isSelected = selectedSubjects.some((s) => s.id === subject.id);

    if (isSelected) {
      // Remove subject
      onChange(selectedSubjects.filter((s) => s.id !== subject.id));
    } else {
      // Add subject
      onChange([...selectedSubjects, subject]);
    }
  };

  const handleRemove = (subjectId: number) => {
    onChange(selectedSubjects.filter((s) => s.id !== subjectId));
  };

  const filteredSubjects = subjects.filter((subject) => {
    const searchLower = searchQuery.toLowerCase();
    return subject.name.includes(searchLower);
  });

  return (
    <div className="relative space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedSubjects.length > 0
              ? `${selectedSubjects.length} predmet${selectedSubjects.length !== 1 ? "a" : ""} izabrano`
              : "Izaberi predmete..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full max-w-[min(90vw,1000px)] p-0"
          align="start"
        >
          <Command shouldFilter={false}>
            <div className="flex items-center border-b px-3">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandInput
                placeholder="Pretraži predmete..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="border-0 focus:ring-0"
              />
            </div>
            <CommandList>
              {filteredSubjects.length > 0 ? (
                <ScrollArea className="max-h-[300px]">
                  <CommandGroup>
                    {filteredSubjects.map((subject) => {
                      const isSelected = selectedSubjects.some(
                        (s) => s.id === subject.id,
                      );
                      return (
                        <CommandItem
                          key={subject.id}
                          value={subject.id.toString()}
                          onSelect={() => handleSelect(subject)}
                          className={cn(
                            "flex items-center justify-between py-4",
                            isSelected && "bg-muted/50",
                          )}
                        >
                          <div className="flex flex-col">
                            <span>{subject.name}</span>
                            <span className="overflow-hidden text-xs text-ellipsis whitespace-nowrap text-muted-foreground">
                              {subject.description.slice(0, 150) + "..."}
                            </span>
                          </div>

                          <Check
                            className={cn(
                              "size-6",
                              isSelected ? "opacity-100" : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </ScrollArea>
              ) : (
                <CommandEmpty>Nema pronađenih predmeta.</CommandEmpty>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedSubjects.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedSubjects.map((subject) => (
            <div
              key={subject.id}
              className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
            >
              {subject.name}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 rounded-full"
                onClick={() => handleRemove(subject.id)}
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
