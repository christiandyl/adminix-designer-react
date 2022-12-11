import { createRef, useMemo, useCallback } from 'react';

import apiPaths from '../constants/apiPaths';

const useWorkflow = ({
  workflowId,
  token,
  env = 'production',
  region = 'eu',
}) => {
  const frameEl = createRef();

  const apiPath = useMemo(() => {
    return apiPaths.find((path) => {
      return path.env === env && path.region === region;
    }); 
  }, [env, region]);

  const path = useMemo(() => (
    apiPath ? `${apiPath.origin}/embedded/workflows/${workflowId}/edit?accessToken=${token}` : null
  ), [origin, workflowId, token]);

  const save = useCallback(() => {
    frameEl.current.contentWindow.postMessage({ action: 'save' }, '*');
  }, [frameEl]);
  
  const deploy = useCallback(() => {
    frameEl.current.contentWindow.postMessage({ action: 'deploy' }, '*');
  }, [frameEl]);

  return {
    workflowId,
    path,
    frameEl,
    save,
    deploy,
  };
};

export default useWorkflow;
