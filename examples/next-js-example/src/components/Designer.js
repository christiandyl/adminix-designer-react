import { useState, useCallback, useEffect } from 'react';
import WorkflowDesigner, { useWorkflow } from 'adminix-designer-react';
import axios from 'axios';

const Designer = ({ workflowId, token }) => {
  const workflow = useWorkflow({
    workflowId,
    token,
  });

  const onSave = useCallback(() => {
    alert('onSave callback');
  }, []);

  const onDeploy = useCallback(() => {
    alert('onDeploy callback');
  }, []);

  const onDeploying = useCallback(() => {
    alert('onDeploying callback');
  }, []);
  
  const onChanged = useCallback(() => {
    console.log('onChanged callback');
  }, []);

  return (
    <WorkflowDesigner
      workflow={workflow}
      width="100%"
      height="500px"
      onSave={onSave}
      onDeploy={onDeploy}
      onDeploying={onDeploying}
      onChanged={onChanged}
      colorPrimary="#568CDC"
      fontSize="14"
      disableMessages={false}
      disableActions={false}
    />
  )
};

export default Designer;
