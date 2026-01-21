import React from "react";
import { CardPlaceholder, ImagePlaceholder, Placeholder, SVGPlaceholder, TextPlaceholder } from "./index";

export const PlaceholderExamples: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <h1 className="mb-6 text-2xl font-bold text-white">Placeholder Components Examples</h1>

      {/* Basic Placeholder */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Basic Placeholder</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Placeholder width="100%" height="60px" variant="skeleton" />
          <Placeholder width="100%" height="60px" variant="shimmer" color="primary" />
          <Placeholder width="100%" height="60px" variant="pulse" color="secondary" />
        </div>
      </section>

      {/* SVG Placeholder */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">SVG Placeholder</h2>
        <div className="flex space-x-4">
          <SVGPlaceholder variant="circle" size="md" color="primary" />
          <SVGPlaceholder variant="square" size="lg" color="secondary" />
          <SVGPlaceholder variant="avatar" size="xl" color="muted" />
        </div>
      </section>

      {/* Image Placeholder */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Image Placeholder</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ImagePlaceholder width="100%" height="120px" variant="square" />
          <ImagePlaceholder width="100%" height="120px" variant="card" />
          <ImagePlaceholder width="100%" height="120px" variant="avatar" />
          <ImagePlaceholder width="100%" height="120px" variant="banner" />
        </div>
      </section>

      {/* Text Placeholder */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Text Placeholder</h2>
        <div className="space-y-4">
          <TextPlaceholder lines={1} width="60%" variant="heading" />
          <TextPlaceholder lines={3} width="100%" variant="body" />
          <TextPlaceholder lines={2} width={["80%", "60%"]} variant="caption" />
        </div>
      </section>

      {/* Card Placeholder */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Card Placeholder</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CardPlaceholder variant="profile" />
          <CardPlaceholder variant="product" />
          <CardPlaceholder variant="post" />
          <CardPlaceholder variant="article" />
          <CardPlaceholder variant="list" />
          <CardPlaceholder variant="default" />
        </div>
      </section>
    </div>
  );
};

export default PlaceholderExamples;
