import { useState, useEffect } from 'react'
import { matchPath, useLocation } from "react-router";

export function useAdminCategory() {
  const [categoryId, setCategoryId] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    // Case 1: /category/:categoryId, CategoryPage
    const match = matchPath(pathname, {
      path: "/admin/category/edit/:categoryId",
      exact: true,
      strict: false
    });
    if (match && match.params) {
      if (match.params.categoryId) {
        setCategoryId(match.params.categoryId)
      }
    }
  }, [pathname])

  return { categoryId }
}