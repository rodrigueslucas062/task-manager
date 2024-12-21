import { addSquareNode, addTextSquareNode } from '@/utils/utils';
import * as Toolbar from '@radix-ui/react-toolbar';
import { Cursor, HandGrabbing } from 'phosphor-react';

export default function Toolbox({ setNodes }) {
    return (
        <Toolbar.Root
            className="fixed inset-x-0 mx-auto bottom-4 flex z-50 w-2/4 items-center border border-white rounded-md bg-zinc-900/10 backdrop-blur-sm px-3 pt-2 gap-2"
            aria-label="Formatting options"
        >
            <Toolbar.ToggleGroup
                type="single"
                defaultValue="pointer"
                aria-label="Cursor type"
                className='flex flex-col gap-1 pb-2'
            >
                <Toolbar.ToggleItem
                    className="inline-flex size-8 flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white text-zinc-900 px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet-400 hover:text-violet-900 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet-700 data-[state=on]:bg-violet-300 data-[state=on]:text-violet-900"
                    value="pointer"
                    aria-label="Cursor pointer"
                >
                    <Cursor size={24} weight="duotone" />
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem
                    className="inline-flex size-8 flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-white text-zinc-900 px-[5px] text-[13px] leading-none text-mauve11 outline-none first:ml-0 hover:bg-violet-400 hover:text-violet-900 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet-700 data-[state=on]:bg-violet-300 data-[state=on]:text-violet-900"
                    value="hand"
                    aria-label="Hand"
                >
                    <HandGrabbing size={24} weight="duotone" />
                </Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>
            <Toolbar.Separator className="mx-2 bg-white" />
            <Toolbar.Button
                className="size-16 bg-violet-400 rounded transition-transform hover:-translate-y-2"
                onClick={() => addSquareNode({ setNodes })}
            />
            <Toolbar.Button
                className="size-16 bg-blue-400 rounded-md transition-transform hover:-translate-y-2"
                onClick={() => addTextSquareNode({ setNodes })}
            />
        </Toolbar.Root>

    );
}
