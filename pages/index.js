import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { PostContainer, PostContent, PostMain } from '../components/Post'
import ShortcutHome from '../components/ShortcutHome'
import { Wrapper } from '../components/Wrapper'
import { getPersonJsonLd } from '../lib/json-ld'
import { styled } from '../stitches.config'

export async function getStaticProps() {
  return {
    props: {
      title: process.env.NAME,
      metaDescription: `${process.env.NAME} is a startup focused on software engineering, development, and cybersecurity operations. We provide code insights and security solutions.`,
      tagline: 'Software Engineering · Development · Cybersecurity operations', // Empowering Technology with Expert Software Development and Robust Security
      description: 'Code Insights, Security Solutions.',
      image: '/static/images/home-bw.jpg',
    },
  }
}

export default function Index(props) {
  const { title, metaDescription, tagline, description, image } = props

  return (
    <Wrapper>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content={process.env.URL} property="og:url" />
        <meta content={`${process.env.URL}${image}`} property="og:image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPersonJsonLd())
          }}
          key="person-jsonld"
        />
      </Head>

      <Navbar />
      <Home>
        <PostContent>
          <PostContainer>
            <div>
              <p>
                <strong>
                  {tagline}
                </strong>
                <br/>
                {description}
              </p>
              <ShortcutHome/>
            </div>
          </PostContainer>
        </PostContent>
      </Home>
      <Footer/>
    </Wrapper>
  )
}

const Home = styled(PostMain, {
  alignItems: 'center',
  display: 'flex',
  margin: '0 auto',
  '@bp2': { width: 800 },
})
