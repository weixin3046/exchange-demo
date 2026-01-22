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
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-white">SVG Placeholder - Shapes</h2>

        {/* Basic Shapes */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-300">Basic Shapes</h3>
          <div className="flex flex-wrap gap-4">
            <div className="text-center">
              <SVGPlaceholder variant="circle" size="lg" color="primary" />
              <p className="mt-2 text-sm text-gray-400">Circle</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="square" size="lg" color="secondary" />
              <p className="mt-2 text-sm text-gray-400">Square</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="triangle" size="lg" color="accent" />
              <p className="mt-2 text-sm text-gray-400">Triangle</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="star" size="lg" color="gradient" />
              <p className="mt-2 text-sm text-gray-400">Star</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="hexagon" size="lg" color="rainbow" />
              <p className="mt-2 text-sm text-gray-400">Hexagon</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="heart" size="lg" color="neon" />
              <p className="mt-2 text-sm text-gray-400">Heart</p>
            </div>
          </div>
        </div>

        {/* Advanced Shapes */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-300">Advanced Shapes</h3>
          <div className="flex flex-wrap gap-4">
            <div className="text-center">
              <SVGPlaceholder variant="diamond" size="lg" color="primary" />
              <p className="mt-2 text-sm text-gray-400">Diamond</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="oval" size="lg" color="secondary" />
              <p className="mt-2 text-sm text-gray-400">Oval</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="wave" size="lg" color="accent" />
              <p className="mt-2 text-sm text-gray-400">Wave</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="cylinder" size="lg" color="gradient" />
              <p className="mt-2 text-sm text-gray-400">Cylinder</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="cube" size="lg" color="rainbow" />
              <p className="mt-2 text-sm text-gray-400">Cube</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="arrow" size="lg" color="neon" />
              <p className="mt-2 text-sm text-gray-400">Arrow</p>
            </div>
          </div>
        </div>

        {/* Styles */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-300">Styles</h3>
          <div className="flex flex-wrap gap-4">
            <div className="text-center">
              <SVGPlaceholder variant="circle" size="lg" color="primary" style="filled" />
              <p className="mt-2 text-sm text-gray-400">Filled</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="circle" size="lg" color="primary" style="outline" />
              <p className="mt-2 text-sm text-gray-400">Outline</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="circle" size="lg" color="primary" style="dashed" />
              <p className="mt-2 text-sm text-gray-400">Dashed</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="circle" size="lg" color="primary" style="dotted" />
              <p className="mt-2 text-sm text-gray-400">Dotted</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="circle" size="lg" color="primary" style="pattern" />
              <p className="mt-2 text-sm text-gray-400">Pattern</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="circle" size="lg" color="primary" style="texture" />
              <p className="mt-2 text-sm text-gray-400">Texture</p>
            </div>
          </div>
        </div>

        {/* Animations */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-300">Animations</h3>
          <div className="flex flex-wrap gap-4">
            <div className="text-center">
              <SVGPlaceholder variant="circle" size="lg" color="primary" animationType="pulse" />
              <p className="mt-2 text-sm text-gray-400">Pulse</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="circle" size="lg" color="secondary" animationType="spin" />
              <p className="mt-2 text-sm text-gray-400">Spin</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="circle" size="lg" color="accent" animationType="bounce" />
              <p className="mt-2 text-sm text-gray-400">Bounce</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="circle" size="lg" color="gradient" animationType="scale" />
              <p className="mt-2 text-sm text-gray-400">Scale</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="circle" size="lg" color="rainbow" animationType="rotate" />
              <p className="mt-2 text-sm text-gray-400">Rotate</p>
            </div>
            <div className="text-center">
              <SVGPlaceholder variant="circle" size="lg" color="neon" animationType="morph" />
              <p className="mt-2 text-sm text-gray-400">Morph</p>
            </div>
          </div>
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
