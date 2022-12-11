import { useEffect } from 'react';

const WorkflowDesigner = ({
  workflow: { frameEl, path, workflowId },
  style,
  className,
  width,
  height,
  onSave,
  onDeploy,
  primaryColor,
  fontSize,
  disableMessages,
}) => {
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
  }, [onSave, onDeploy]);

  const pathWithSettings = `${path}&colorPrimary=${primaryColor}&fontSize=${fontSize}&disableMessages=${disableMessages}`;

  return (
    <iframe
      src={pathWithSettings}
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
};

export default WorkflowDesigner;