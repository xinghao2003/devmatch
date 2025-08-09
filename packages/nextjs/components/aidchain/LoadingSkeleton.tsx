import React from "react";

interface LoadingSkeletonProps {
  type?: "card" | "list" | "stats" | "form";
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  type = "card", 
  count = 1, 
  className = "" 
}) => {
  const renderCardSkeleton = () => (
    <div className="glass-card animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-white/10 rounded-lg"></div>
          <div>
            <div className="h-4 bg-white/10 rounded mb-2 w-16"></div>
            <div className="h-3 bg-white/10 rounded w-32"></div>
          </div>
        </div>
        <div className="w-16 h-6 bg-white/10 rounded-full"></div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-white/10 rounded w-full"></div>
        <div className="h-3 bg-white/10 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-3 bg-white/10 rounded w-16"></div>
            <div className="h-3 bg-white/10 rounded w-8"></div>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg animate-pulse">
          <div className="w-10 h-10 bg-white/10 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-white/10 rounded mb-2 w-24"></div>
            <div className="h-3 bg-white/10 rounded w-32"></div>
          </div>
          <div className="w-16 h-6 bg-white/10 rounded-full"></div>
        </div>
      ))}
    </div>
  );

  const renderStatsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card animate-pulse">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white/10 rounded-full"></div>
            <div className="ml-4">
              <div className="h-3 bg-white/10 rounded mb-2 w-20"></div>
              <div className="h-8 bg-white/10 rounded w-12"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFormSkeleton = () => (
    <div className="glass-card animate-pulse">
      <div className="h-8 bg-white/10 rounded mb-2"></div>
      <div className="h-4 bg-white/10 rounded mb-6 w-2/3"></div>
      <div className="space-y-5">
        <div>
          <div className="h-3 bg-white/10 rounded mb-2 w-16"></div>
          <div className="h-12 bg-white/10 rounded-xl"></div>
        </div>
        <div>
          <div className="h-3 bg-white/10 rounded mb-2 w-20"></div>
          <div className="h-12 bg-white/10 rounded-xl"></div>
        </div>
        <div>
          <div className="h-3 bg-white/10 rounded mb-2 w-24"></div>
          <div className="h-12 bg-white/10 rounded-xl"></div>
        </div>
        <div className="h-12 bg-white/10 rounded-xl w-32"></div>
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return renderCardSkeleton();
      case "list":
        return renderListSkeleton();
      case "stats":
        return renderStatsSkeleton();
      case "form":
        return renderFormSkeleton();
      default:
        return renderCardSkeleton();
    }
  };

  if (type === "list" || type === "stats") {
    return <div className={className}>{renderSkeleton()}</div>;
  }

  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={i > 0 ? "mt-4" : ""}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};
