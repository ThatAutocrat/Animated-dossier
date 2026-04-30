import { Container, Heading } from '@chakra-ui/react'
import Layout from '../components/layouts/article'

const Posts = () => (
  <Layout title="Posts">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Posts
      </Heading>
      <p>Coming soon.</p>
    </Container>
  </Layout>
)

export default Posts
export { getServerSideProps } from '../components/chakra'
