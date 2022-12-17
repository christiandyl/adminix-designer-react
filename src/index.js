import React, { useMemo, useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';

import WorkflowDesigner, { useWorkflow } from './lib';

const App = () => {
  const query = useMemo(() => {
    const entries = new URLSearchParams(window.location.search).entries();

    return Array.from(entries).reduce((obj, [key, value]) => ({
      ...obj, [key]: value,
    }), {});
  }, []);

  const [fields, setFields] = useState({
    workflowId: query.workflowId,
    token: query.token,
    env: query.env,
    region: query.region,
    colorPrimary: query.colorPrimary || '#568CDC',
    fontSize: query.fontSize || 14,
    disableMessages: query.disableMessages,
    disableActions: query.disableActions,
  });

  const workflow = useWorkflow({
    workflowId: fields.workflowId,
    token: fields.token,
    env: fields.env,
    region: fields.region,
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

  const onDeploying = useCallback(() => {
    alert('onDeploying callback');
  }, []);
  
  const onChanged = useCallback(() => {
    console.log('onChanged callback');
  }, []);

  const onChange = useCallback((e) => {
    setFields({
      ...fields,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }, [setFields, fields]);

  const onSubmit = useCallback(() => {
    window.location.replace(`${window.location.pathname}?workflowId=${fields.workflowId}&token=${fields.token}&env=${fields.env}&fields.region&colorPrimary=${fields.colorPrimary}&fontSize=${fields.fontSize}&disableMessages=${fields.disableMessages}&disableActions=${disableActions}`);
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <td>Workflow ID</td>
              <td>
                <input name="workflowId" value={fields.workflowId} onChange={onChange} />
              </td>
            </tr>
            <tr>
              <td>Token</td>
              <td>
                <input name="token" value={fields.token} onChange={onChange} />
              </td>
            </tr>
            <tr>
              <td>Environment</td>
              <td>
                <select name="env" onChange={onChange}>
                  <option value="local" selected={fields.env === 'local'}>Local</option>
                  <option value="production" selected={fields.env === 'production'}>Production</option>
                  <option value="staging" selected={fields.env === 'staging'}>Staging</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Region</td>
              <td>
                <select name="region" onChange={onChange}>
                  <option value="us" selected={fields.env === 'us'}>USA</option>
                  <option value="eu" selected={fields.env === 'eu'}>Europe</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Primary color</td>
              <td>
                <input name="colorPrimary" value={fields.colorPrimary} onChange={onChange} />
              </td>
            </tr>
            <tr>
              <td>Font size</td>
              <td>
                <input name="fontSize" value={fields.fontSize} onChange={onChange} />
              </td>
            </tr>
            <tr>
              <td>Disable messages</td>
              <td>
                <select name="disableMessages" onChange={onChange}>
                  <option value="true" selected={fields.disableMessages === 'true'}>Yes</option>
                  <option value="false" selected={fields.disableMessages === 'false'}>No</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Disable actions</td>
              <td>
                <select name="disableActions" onChange={onChange}>
                  <option value="true" selected={fields.disableActions === 'true'}>Yes</option>
                  <option value="false" selected={fields.disableActions === 'false'}>No</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <input type="submit" value="Save" />
      </form>

      <br/>
      
      <input type="button" value="Save" onClick={onSaveClick} />
      <input type="button" value="Deploy" onClick={onDeployClick} />

      <WorkflowDesigner
        workflow={workflow}
        width="100%"
        height="500px"
        onSave={onSave}
        onDeploy={onDeploy}
        onDeploying={onDeploying}
        onChanged={onChanged}
        colorPrimary={fields.colorPrimary}
        fontSize={fields.fontSize}
        disableMessages={fields.disableMessages === 'true'}
        disableActions={fields.disableActions === 'true'}
      />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

