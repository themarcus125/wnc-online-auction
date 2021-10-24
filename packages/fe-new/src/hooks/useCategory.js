import { useState, useEffect } from 'react'
import { matchPath, useLocation } from "react-router";

export function useCategory() {
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    // Case 1: /category/:categoryId, CategoryPage
    const matchCase1 = matchPath(pathname, {
      path: "/category/:categoryId",
      exact: true,
      strict: false
    });
    if (matchCase1 && matchCase1.params) {
      if (matchCase1.params.categoryId) {
        setCategoryId(matchCase1.params.categoryId);
      }
    }

    // Case 2: /category/:categoryId/:subCategoryId, CategoryProductPage
    const matchCase2 = matchPath(pathname, {
      path: "/category/:categoryId/:subCategoryId",
      exact: true,
      strict: false
    });
    if (matchCase2 && matchCase2.params) {
      if (matchCase2.params.categoryId) {
        setCategoryId(matchCase2.params.categoryId);
      }
      if (matchCase2.params.subCategoryId) {
        setSubCategoryId(matchCase2.params.subCategoryId);
      }
    }
  }, [pathname])

  return { categoryId, subCategoryId }
}