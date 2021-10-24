import { useState, useEffect } from 'react'
import { matchPath, useLocation } from "react-router";

export function useProduct() {
  const [productId, setProductId] = useState("")
  const { pathname } = useLocation();

  useEffect(() => {
    // Case 1: /category/:categoryId, CategoryPage
    const match = matchPath(pathname, {
      path: "/product/:productId",
      exact: true,
      strict: false
    });
    if (match && match.params) {
      if (match.params.productId) {
        setProductId(match.params.productId)
      }
    }
  }, [pathname])

  return { productId }
}