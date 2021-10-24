import { useHistory, useLocation } from 'react-router-dom';

export function useNavigate() {
  const history = useHistory();
  const location = useLocation();

  function navigate(path, params) {
    if (path && !path.startsWith('/')) {
      history.push({
        pathname: `${location.pathname}/${path}`,
        state: params,
      });
      return;
    }
    history.push({
      pathname: path,
      state: params,
    });
  }

  return { navigate };
}

export function navigate(path) {
  if (typeof window !== 'undefined') {
    window.location.href = path;
  }
}
