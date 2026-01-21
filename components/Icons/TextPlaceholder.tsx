import { cn } from "@/lib/utils";
import React from "react";

export interface TextPlaceholderProps {
  className?: string;
  lines?: number;
  width?: string | string[];
  height?: string;
  variant?: "heading" | "body" | "caption" | "label";
  animated?: boolean;
  color?: "primary" | "secondary" | "muted" | "accent";
  align?: "left" | "center" | "right";
  spacing?: "compact" | "normal" | "relaxed";
}

const TextPlaceholder: React.FC<TextPlaceholderProps> = ({
  className,
  lines = 1,
  width = "100%",
  height,
  variant = "body",
  animated = true,
  color = "muted",
  align = "left",
  spacing = "normal",
}) => {
  const heightMap = {
    heading: "h-8",
    body: "h-4",
    caption: "h-3",
    label: "h-5",
  };

  const spacingMap = {
    compact: "space-y-1",
    normal: "space-y-2",
    relaxed: "space-y-3",
  };

  const alignMap = {
    left: "",
    center: "mx-auto",
    right: "ml-auto",
  };

  const colorClasses = {
    primary: "bg-based-orange/20",
    secondary: "bg-blue-500/20",
    muted: "bg-gray-600/20",
    accent: "bg-purple-500/20",
  };

  const renderLines = () => {
    const lineArray = Array.isArray(width) ? width : [width];

    return Array.from({ length: lines }, (_, index) => {
      const lineWidth = lineArray[index] || lineArray[lineArray.length - 1] || "100%";
      const isLastLine = index === lines - 1;
      const finalWidth = isLastLine && lines > 1 ? "60%" : lineWidth;

      return (
        <div
          key={index}
          className={cn(
            "rounded",
            heightMap[variant],
            colorClasses[color],
            animated && "animate-pulse",
            alignMap[align]
          )}
          style={{
            width: finalWidth,
            height: height || undefined,
          }}
        />
      );
    });
  };

  return <div className={cn(spacingMap[spacing], className)}>{renderLines()}</div>;
};

export default TextPlaceholder;
