import React, { createContext, useContext, useState } from "react";

interface AppKnowledgeContextType {
  visitedPages: Set<string>;
  addVisitedPage: (page: string) => void;
  getProgress: () => number;
}

const AppKnowledgeContext = createContext<AppKnowledgeContextType | undefined>(
  undefined
);

export const AppKnowledgeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visitedPages, setVisitedPages] = useState<Set<string>>(new Set());

  const addVisitedPage = (page: string) => {
    setVisitedPages((prev) => {
      const newSet = new Set(prev);
      newSet.add(page);
      return newSet;
    });
  };

  const getProgress = () => {
    // Calculate progress based on visited pages
    const totalPages = 6; // Home, Doctors, Medicine, Equipment, Cart, Profile
    return (visitedPages.size / totalPages) * 100;
  };

  return (
    <AppKnowledgeContext.Provider
      value={{ visitedPages, addVisitedPage, getProgress }}
    >
      {children}
    </AppKnowledgeContext.Provider>
  );
};

export const useAppKnowledge = () => {
  const context = useContext(AppKnowledgeContext);
  if (context === undefined) {
    throw new Error(
      "useAppKnowledge must be used within an AppKnowledgeProvider"
    );
  }
  return context;
};
