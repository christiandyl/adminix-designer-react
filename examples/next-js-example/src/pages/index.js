import Head from 'next/head';
import { useRouter } from 'next/router';
import WorkflowDesigner, { useWorkflow } from 'adminix-designer-react';
import axios from 'axios';
import { useCallback } from 'react';
import { Table, Space, Button } from 'antd';

export default function Home({ workflows }) {
  const { push } = useRouter();

  const onEditClick = useCallback((workflowId) => () => {
    push(`/workflows/${workflowId}/edit`);
  }, [push]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Table
          dataSource={workflows.records}
          pagination={false}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Description',
              dataIndex: 'description',
              key: 'description',
            },
            {
              title: 'Action',
              key: 'action',
              render: (_, record) => (
                <Space size="middle">
                  <Button type="primary" onClick={onEditClick(record.id)}>Edit</Button>
                </Space>
              ),
            },
          ]}
        />;
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const url = `https://api-eu.adminix.io/api/v1/providers/${process.env.ADMINIX_PROVIDER_ID}/workflows`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.ADMINIX_ACCESS_TOKEN}`,
      Accept: 'application/json',
      'Accept-Encoding': 'gzip,deflate,compress'
    },
  });

  const workflows = response.data;

  return {
    props: { workflows },
  };
}
