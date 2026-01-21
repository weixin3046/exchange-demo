import { SVGPlaceholder } from "@/components/Icons";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <SVGPlaceholder width={48} height={48} variant="circle" color="primary" animated={true} animationType="spin" />
    </div>
  );
}
