import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

export const TooltipDemo = ({ children, tooltipText, side }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="select-none rounded-lg bg-zinc-950 p-2 text-sm leading-none left-4"
            sideOffset={1}
            side={side}
          >
            {tooltipText}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
