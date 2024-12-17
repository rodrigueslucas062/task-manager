import { addSquareNode, addTextSquareNode } from '@/utils/utils';
import * as Toolbar from '@radix-ui/react-toolbar';

export default function Toolbox({ setNodes }) {
    return (
        <Toolbar.Root className="fixed inset-x-0 mx-auto bottom-4 flex z-50 w-full lg:w-3/5 items-center justify-center border border-white rounded-md bg-zinc-900/60 py-2 gap-2">
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
