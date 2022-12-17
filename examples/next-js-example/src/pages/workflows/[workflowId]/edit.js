import axios from 'axios';
import dynamic from 'next/dynamic';

const Designer = dynamic(() => import('components/Designer'), { ssr: false });

export default function EditWorkflow({ workflowId, token }) {
  return (
    <Designer workflowId={workflowId} token={token} />
  )
}

export const getInitialProps = () => {
  return {};
};

export async function getServerSideProps(ctx) {
  const workflowId = ctx.params.workflowId;
  const url = `https://api-eu.adminix.io/api/v1/workflows/${workflowId}/generate_embeddable_link`;

  const response = await axios.post(url, {}, {
    headers: {
      Authorization: `Bearer ${process.env.ADMINIX_ACCESS_TOKEN}`,
      Accept: 'application/json',
      'Accept-Encoding': 'gzip,deflate,compress',
    },
  });

  const token = response.data.token;

  return {
    props: { workflowId, token },
  };
}
