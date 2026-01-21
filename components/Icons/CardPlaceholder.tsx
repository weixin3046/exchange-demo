import { cn } from "@/lib/utils";
import React from "react";
import ImagePlaceholder from "./ImagePlaceholder";
import TextPlaceholder from "./TextPlaceholder";

export interface CardPlaceholderProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  variant?: "default" | "profile" | "product" | "post" | "article" | "list";
  animated?: boolean;
  color?: "primary" | "secondary" | "muted" | "accent";
  showImage?: boolean;
  imagePosition?: "top" | "left" | "right" | "background";
  textLines?: number;
  showTitle?: boolean;
  showSubtitle?: boolean;
  showDescription?: boolean;
  children?: React.ReactNode;
}

const CardPlaceholder: React.FC<CardPlaceholderProps> = ({
  className,
  width = "100%",
  height,
  variant = "default",
  animated = true,
  color = "muted",
  showImage = true,
  imagePosition = "top",
  textLines = 3,
  showTitle = true,
  showSubtitle = true,
  showDescription = true,
}) => {
  const getLayout = () => {
    switch (variant) {
      case "profile":
        return (
          <div className={cn("flex items-center space-x-4 p-4", className)} style={{ width, height }}>
            {showImage && (
              <ImagePlaceholder width={64} height={64} variant="avatar" animated={animated} color={color} />
            )}
            <div className="flex-1 space-y-2">
              <TextPlaceholder lines={1} width="40%" variant="heading" animated={animated} color={color} />
              <TextPlaceholder lines={2} width="100%" variant="body" animated={animated} color={color} />
            </div>
          </div>
        );

      case "product":
        return (
          <div className={cn("space-y-3", className)} style={{ width, height }}>
            {showImage && (
              <ImagePlaceholder width="100%" height={200} variant="square" animated={animated} color={color} />
            )}
            <div className="space-y-2 px-2">
              <TextPlaceholder lines={1} width="60%" variant="heading" animated={animated} color={color} />
              <TextPlaceholder lines={2} width="100%" variant="body" animated={animated} color={color} />
            </div>
          </div>
        );

      case "post":
        return (
          <div className={cn("space-y-3", className)} style={{ width, height }}>
            {showImage && imagePosition === "top" && (
              <ImagePlaceholder width="100%" height={150} variant="rect" animated={animated} color={color} />
            )}
            <div className="space-y-2 px-2">
              <TextPlaceholder lines={2} width="100%" variant="heading" animated={animated} color={color} />
              <TextPlaceholder lines={textLines} width="100%" variant="body" animated={animated} color={color} />
            </div>
          </div>
        );

      case "article":
        return (
          <div className={cn("space-y-4", className)} style={{ width, height }}>
            {showImage && imagePosition === "top" && (
              <ImagePlaceholder width="100%" height={250} variant="rect" animated={animated} color={color} />
            )}
            <div className="space-y-3">
              <TextPlaceholder lines={1} width="70%" variant="heading" animated={animated} color={color} />
              <TextPlaceholder lines={1} width="50%" variant="caption" animated={animated} color={color} />
              <TextPlaceholder lines={4} width="100%" variant="body" animated={animated} color={color} />
            </div>
          </div>
        );

      case "list":
        return (
          <div className={cn("flex items-center space-x-3", className)} style={{ width, height }}>
            {showImage && (
              <ImagePlaceholder width={40} height={40} variant="square" animated={animated} color={color} />
            )}
            <div className="flex-1">
              <TextPlaceholder lines={1} width="80%" variant="body" animated={animated} color={color} />
            </div>
          </div>
        );

      default:
        return (
          <div className={cn("space-y-3", className)} style={{ width, height }}>
            {showImage && (
              <ImagePlaceholder width="100%" height={120} variant="rect" animated={animated} color={color} />
            )}
            <div className="space-y-2">
              {showTitle && (
                <TextPlaceholder lines={1} width="60%" variant="heading" animated={animated} color={color} />
              )}
              {showSubtitle && (
                <TextPlaceholder lines={1} width="40%" variant="caption" animated={animated} color={color} />
              )}
              {showDescription && (
                <TextPlaceholder lines={textLines} width="100%" variant="body" animated={animated} color={color} />
              )}
            </div>
          </div>
        );
    }
  };

  return getLayout();
};

export default CardPlaceholder;
