import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipIconButtonProps extends React.ComponentProps<typeof Button> {
	tooltip: string;
	side?: "top" | "right" | "bottom" | "left";
}

export const TooltipIconButton = React.forwardRef<
	HTMLButtonElement,
	TooltipIconButtonProps
>(({ tooltip, side = "bottom", children, ...props }, ref) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button ref={ref} variant="ghost" size="icon" {...props}>
						{children}
					</Button>
				</TooltipTrigger>
				<TooltipContent side={side}>
					<p>{tooltip}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
});

TooltipIconButton.displayName = "TooltipIconButton";
