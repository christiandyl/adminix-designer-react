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

  const targetOrigin = useMemo(() => {
    if (window.location.hostname === 'localhost') return '*';
    return env === 'local' ? window.location.origin : apiPath.origin;
  }, [env, apiPath]);

  const save = useCallback(() => {
    frameEl.current.contentWindow.postMessage({ action: 'save' }, targetOrigin);
  }, [frameEl, targetOrigin]);
  
  const deploy = useCallback(() => {
    frameEl.current.contentWindow.postMessage({ action: 'deploy' }, targetOrigin);
  }, [frameEl, targetOrigin]);
  
  const sendAccessToken = useCallback((accessToken) => {
    frameEl.current.contentWindow.postMessage({ action: 'sendAccessToken', accessToken }, targetOrigin); 
  }, [frameEl, targetOrigin]);

  return {
    workflowId,
    frameEl,
    save,
    deploy,
    sendAccessToken,
    apiPath,
    token,
    targetOrigin,
  };
};

export default useWorkflow;
