import React, { useEffect, useCallback } from 'react';

const WorkflowDesigner = ({
  workflow: { frameEl, workflowId, apiPath, sendAccessToken, token, targetOrigin },
  style,
  className,
  width,
  height,
  onSave,
  onDeploy,
  onDeploying,
  onChanged,
  colorPrimary,
  fontSize,
  disableMessages,
  disableActions,
}) => {
  const onLoad = useCallback(() => {
    sendAccessToken(token)
  }, [sendAccessToken, token]);

  useEffect(() => {
    const callback = (e) => {
      try {
        const decodedMsg = JSON.parse(e.data);

        if (decodedMsg.message) {
          if (decodedMsg.message === 'statusChange') {
            if (decodedMsg.payload.status === 'saved') {
              onSave();
            } else if (decodedMsg.payload.status === 'deployed') {
              onDeploy();
            } else if (decodedMsg.payload.status === 'deploying') {
              onDeploying();
            } else if (decodedMsg.payload.status === 'changed') {
              onChanged();
            } else {
              console.info('Unsupported status', decodedMsg.payload.status)
            }
          }
        }
      } catch (err) {
        console.info('Skipping a message with this data', e.data)
      }
    };

    window.addEventListener('message', callback);

    return () => {
      window.removeEventListener('message', callback);
    };
  }, [onSave, onDeploy, onDeploying, onChanged]);

  if (!apiPath) return null;

  const path = `${apiPath.origin === '' ? '' : `https://${apiPath.origin}`}/embedded/workflows/${workflowId}/edit?&colorPrimary=${encodeURIComponent(colorPrimary)}&fontSize=${fontSize}&disableMessages=${disableMessages}&disableActions=${disableActions}`;

  return (
    <iframe
      src={path}
      onLoad={onLoad}
      width={width}
      height={height}
      frameBorder="0"
      style={style}
      className={className}
      ref={frameEl}
      title={`Workflow ${workflowId}`}
    />
  );
};

WorkflowDesigner.defaultProps = {
  onSave: () => {},
  onDeploy: () => {},
  onDeploying: () => {},
  onChanged: () => {},
  width: '100%',
  height: '500px',
  colorPrimary: '#568CDC',
  fontSize: 14,
  disableMessages: false,
  disableActions: false,
};

export default WorkflowDesigner;
