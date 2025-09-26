"use client";

import type React from "react";

import { useEffect, useId, useMemo, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ModalTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "destructive";
export type ModalAction = {
  label: string;
  variant?: "primary" | "secondary" | "destructive";
  onClick?: () => void;
  dismissOnClick?: boolean;
  autoFocus?: boolean;
};

export type DynamicModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  tone?: ModalTone;
  actions?: ModalAction[];
  footerContent?: React.ReactNode;
  className?: string;
};

const toneClasses: Record<ModalTone, string> = {
  neutral: "text-foreground",
  info: "text-primary",
  success: "text-accent",
  warning: "text-destructive",
  destructive: "text-destructive",
};

const actionVariantClasses: Record<
  NonNullable<ModalAction["variant"]>,
  string
> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-primary",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:outline-ring",
  destructive:
    "border border-destructive text-destructive hover:bg-destructive/10 focus-visible:outline-destructive",
};

export function DynamicModal({
  open,
  onClose,
  title,
  description,
  icon,
  tone = "neutral",
  actions,
  footerContent,
  className,
}: DynamicModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const initialButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open && initialButtonRef.current) {
      initialButtonRef.current.focus();
    }
  }, [open]);

  const autoFocusIndex = useMemo(() => {
    if (!actions?.length) {
      return -1;
    }
    const index = actions.findIndex((action) => action.autoFocus);
    return index >= 0 ? index : 0;
  }, [actions]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6"
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-xl overflow-hidden rounded-xl bg-card shadow-lg ring-1 ring-border/70",
          className
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start gap-3 px-6 py-5">
          {icon ? (
            <span
              className={cn(
                "mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-xl",
                toneClasses[tone]
              )}
              aria-hidden="true"
            >
              {icon}
            </span>
          ) : null}
          <div className="flex-1">
            <h2
              id={titleId}
              className="text-lg font-semibold text-pretty text-card-foreground"
            >
              {title}
            </h2>
            {description ? (
              <p
                id={descriptionId}
                className="mt-2 text-sm leading-relaxed text-card-foreground/70"
              >
                {description}
              </p>
            ) : null}
            {footerContent ? (
              <div className="mt-4 text-sm text-card-foreground/80">
                {footerContent}
              </div>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-card-foreground/60 transition hover:bg-secondary focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {actions?.length ? (
          <div className="flex flex-wrap justify-end gap-3 border-t border-border bg-card px-6 py-4">
            {actions.map((action, index) => {
              const variant = action.variant ?? "secondary";
              const handleClick = () => {
                action.onClick?.();
                if (action.dismissOnClick !== false) {
                  onClose();
                }
              };

              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={handleClick}
                  ref={
                    index === autoFocusIndex
                      ? (initialButtonRef as React.MutableRefObject<HTMLButtonElement | null>)
                      : undefined
                  }
                  className={cn(
                    "inline-flex min-w-[112px] items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition focus-visible:outline-offset-2",
                    action.variant === "primary"
                      ? "bg-blue-900 text-white hover:bg-blue-800 focus-visible:outline-blue-900"
                      : action.variant === "secondary"
                      ? "border border-red-700 text-red-700 hover:bg-red-50 focus-visible:outline-red-600"
                      : actionVariantClasses[variant]
                  )}
                >
                  {action.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
