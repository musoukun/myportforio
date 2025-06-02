"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AssistantModalPrimitive } from "@assistant-ui/react";
import { cn } from "@/lib/utils";

const AssistantModal = AssistantModalPrimitive.Root;

const AssistantModalTrigger = React.forwardRef<
	React.ElementRef<typeof AssistantModalPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AssistantModalPrimitive.Trigger>
>(({ className, ...props }, ref) => (
	<AssistantModalPrimitive.Trigger
		ref={ref}
		className={cn("", className)}
		{...props}
	/>
));
AssistantModalTrigger.displayName = AssistantModalPrimitive.Trigger.displayName;

const AssistantModalContent = React.forwardRef<
	React.ElementRef<typeof AssistantModalPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AssistantModalPrimitive.Content>
>(({ className, ...props }, ref) => (
	<AssistantModalPrimitive.Content
		ref={ref}
		className={cn(
			"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
			className
		)}
		{...props}
	/>
));
AssistantModalContent.displayName = AssistantModalPrimitive.Content.displayName;

const AssistantModalHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"flex flex-col space-y-1.5 text-center sm:text-left",
			className
		)}
		{...props}
	/>
);
AssistantModalHeader.displayName = "AssistantModalHeader";

const AssistantModalFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			"flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
			className
		)}
		{...props}
	/>
);
AssistantModalFooter.displayName = "AssistantModalFooter";

const AssistantModalTitle = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Title
		ref={ref}
		className={cn(
			"text-lg font-semibold leading-none tracking-tight",
			className
		)}
		{...props}
	/>
));
AssistantModalTitle.displayName = DialogPrimitive.Title.displayName;

const AssistantModalDescription = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Description
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
AssistantModalDescription.displayName = DialogPrimitive.Description.displayName;

export {
	AssistantModal,
	AssistantModalTrigger,
	AssistantModalContent,
	AssistantModalHeader,
	AssistantModalFooter,
	AssistantModalTitle,
	AssistantModalDescription,
};
