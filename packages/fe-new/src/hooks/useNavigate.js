import { useHistory, useLocation } from 'react-router-dom';

export function useNavigate() {
  const history = useHistory();
  const location = useLocation();

  function navigate(path, state = {}) {
    if (path && !path.startsWith("/")) { 
      history.push(`${location.pathname}/${path}`, state);
      return;
    }
    history.push(path, state);
  }

  return { navigate };
}

export function navigate(path) {
  if (typeof window !== 'undefined') {
    window.location.href = path;
  }
}
