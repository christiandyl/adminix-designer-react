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
    primaryColor: query.primaryColor || 'red',
    fontSize: query.fontSize || 14,
    disableMessages: query.disableMessages,
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

  const onChange = useCallback((e) => {
    setFields({
      ...fields,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  }, [setFields, fields]);

  const onSubmit = useCallback(() => {
    window.location.replace(`${window.location.pathname}?workflowId=${fields.workflowId}&token=${fields.token}&env=${fields.env}&fields.region&primaryColor=${fields.primaryColor}&fontSize=${fields.fontSize}&disableMessages=${fields.disableMessages}`);
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
                <input name="primaryColor" value={fields.primaryToken} onChange={onChange} />
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
                <input name="disableMessages" value={fields.disableMessages} onChange={onChange} />
              </td>
            </tr>
          </tbody>
        </table>

        <input type="submit" value="Submit" />
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
        primaryColor={fields.primaryColor}
        fontSize={fields.fontSize}
        disableMessages={fields.disableMessages}
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

