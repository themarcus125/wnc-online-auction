// /admin/user/edit/:id

import { useState, useEffect } from 'react'
import { matchPath, useLocation } from "react-router";

export function useAdminUser() {
  const [userId, setUserId] = useState("")
  const { pathname } = useLocation();

  useEffect(() => {
    // Case 1: /category/:categoryId, CategoryPage
    const match = matchPath(pathname, {
      path: "/admin/user/edit/:userId",
      exact: true,
      strict: false
    });
    if (match && match.params) {
      if (match.params.userId) {
        setUserId(match.params.userId)
      }
    }
  }, [pathname])

  return { userId }
}