# Adminix designer for React.js

## Requirements

The minimum supported version of React is v16.8. If you use an older version,
upgrade React to use this library.

## Getting started

### Minimal example

First, install adminix-designer-react

```sh
npm install --save adminix-designer-react

or 

yarn add adminix-designer-react
```

Then import the component and start using it.

```jsx
import { useCallback } from 'react';
import WorkflowDesigner, { useWorkflow } from 'adminix-designer-react';

const ExampleComponent = () => {
  const workflow = useWorkflow({
    workflowId: '<workflow-id>',
    token: '<access-token>',
  });
  
  const onSaveClick = useCallback(() => {
    workflow.save();
  }, [workflow]);

  const onDeployClick = useCallback(() => {
    workflow.deploy();
  }, [workflow]);

  const onSave = useCallback(() => {
    alert('onSave callback');
  }, []);

  const onDeploy = useCallback(() => {
    alert('onDeploy callback');
  }, []);

  return (
    <WorkflowDesigner
      workflow={workflow}
      width="100%"
      height="500px"
      onSave={onSave}
      onDeploy={onDeploy}
      primaryColor="blue"
      fontSize="14"
      disableMessages={false}
    />
  );
};

export default ExampleComponent;
```
