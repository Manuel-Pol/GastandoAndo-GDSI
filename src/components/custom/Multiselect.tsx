import * as React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import * as ScrollArea from '@radix-ui/react-scroll-area'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { EntityWithIdAndDescription, EntityWithIdAndDescriptionFields, EntityWithIdFields } from '@/types/baseEntities';

interface MultiselectProps {
  options: EntityWithIdAndDescription[],
  selectedOptions: EntityWithIdAndDescription[],
  onSelect: (selected: EntityWithIdAndDescription) => void,
  onUnselect: (selected: EntityWithIdAndDescription) => void
}

const Multiselect = ({ options, selectedOptions, onSelect, onUnselect }: MultiselectProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);

  const handleUnselect = React.useCallback(
    (option: EntityWithIdAndDescription) => {
      onUnselect(option);
    },
    [selectedOptions, onUnselect]
  );

  const handleSelect = React.useCallback(
    (option: EntityWithIdAndDescription) => {
      onSelect(option);
    },
    [selectedOptions, onSelect]
  );

  const filteredOptions = options.filter(
    (option) => !selectedOptions.some((selected) => selected[EntityWithIdFields.Id] === option[EntityWithIdFields.Id])
  );

  return (
    <Command className="overflow-visible bg-transparent">
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selectedOptions.map((option) => (
            option[EntityWithIdFields.Id] !== 0 &&
                <Badge key={option[EntityWithIdFields.Id]} className='bg-gray-200 hover:bg-gray-100 cursor-pointer'
                       onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleUnselect(option);
                      }}
                >
                {option[EntityWithIdAndDescriptionFields.Description]}
                <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
                </Badge>
          ))}
          <CommandInput
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Buscar amigos..."
            className="ml-2 outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      {open && filteredOptions.length > 0 && (
        <div className="relative mt-2">
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <ScrollArea.Root className='w-full h-[140px] rounded-md overflow-hidden border border-input'>
              <ScrollArea.Viewport className='w-full h-full rounded'>
                <CommandList className='bg-white'>
                  <CommandEmpty>Sin opciones</CommandEmpty>
                  <CommandGroup>
                    {filteredOptions.map((option) => (
                      <CommandItem
                        key={option[EntityWithIdFields.Id]}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={() => {
                          handleSelect(option);
                          setInputValue('');
                        }}
                        className="cursor-pointer bg-gray-100"
                      >
                        {option[EntityWithIdAndDescriptionFields.Description]}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar className='flex select-none touch-none p-0.5 bg-transparent transition-colors duration-[160ms] ease-out data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5'
                                    orientation='vertical'
              >
                <ScrollArea.Thumb className="flex-1 bg-neutral-700 rounded-[10px] relative hover:bg-neutral-600 before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
          </div>
        </div>
      )}
    </Command>
  );
};

export default Multiselect;
