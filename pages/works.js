import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'

const Works = () => (
  <Layout title="Works">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Works
      </Heading>

      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section>
          <WorkGridItem
            id="tictactoe"
            title="Real-Time Tic Tac Toe"
            thumbnail="/images/works/tictactoe_eyecatch.png"
            href="https://tic-tac-toe-kp86.onrender.com/"
          >
            A real-time multiplayer Tic Tac Toe game built for the web
          </WorkGridItem>
        </Section>
        <Section>
          <WorkGridItem
            id="portfolio"
            title="Portfolio"
            thumbnail="/images/works/portfolio_eyecatch.png"
            href="https://devashishgogoi-portfolio.vercel.app/"
          >
            My personal portfolio showcasing projects and skills
          </WorkGridItem>
        </Section>
        <Section delay={0.1}>
          <WorkGridItem
            id="weatherapp"
            title="Weather App"
            thumbnail="/images/works/weatherapp_eyecatch.png"
            href="https://weather-app-jhfg.onrender.com/"
          >
            A weather application providing real-time forecasts and conditions
          </WorkGridItem>
        </Section>
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Works
export { getServerSideProps } from '../components/chakra'
