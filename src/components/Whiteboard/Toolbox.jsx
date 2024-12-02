import * as Toolbar from '@radix-ui/react-toolbar'

export default function Toolbox({ setNodes }) {
    function addSquareNode() {
        setNodes(nodes => [...nodes,
        {
            id: crypto.randomUUID(),
            type: 'square',
            position: { x: 200, y: 100 },
            data: { label: 'Meu Nó' }
        },
        ])
    }

    return (
        <Toolbar.Root className="fixed inset-x-0 mx-auto bottom-4 flex z-50 w-full lg:w-3/5 items-center justify-center border border-white rounded-md bg-zinc-900/60 py-2">
            <Toolbar.Button className='size-16 bg-violet-400 rounded transition-transform hover:-translate-y-2'
                onClick={addSquareNode} />
        </Toolbar.Root>
    )
}