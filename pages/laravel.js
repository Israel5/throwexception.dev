import { AnimateSharedLayout } from 'framer-motion'
import Head from 'next/head'
import FeaturedArticle from '../components/FeaturedArticle'
import { ListGroup } from '../components/ListGroup'
import ListItem from '../components/ListItem'
import Base from '../layouts/Base'
import { getAllPosts, getPostBySlug } from '../lib/blog'
import stripHtml from '../lib/strip-html'
import { styled } from '../stitches.config'

export async function getStaticProps() {
  const allPosts = getAllPosts(['date', 'skip', 'slug', 'title', 'category'], ['laravel'])
  // console.log(allPosts)

  const featuredParams = [
    'date',
    'slug',
    'title',
    'image',
    'content',
    'description',
  ]

  const featuredPosts = [
    getPostBySlug(
      'a-complete-guide-for-the-f1-visa-interview-part-i',
      featuredParams,
    ),
    getPostBySlug(
      'a-complete-guide-for-the-f1-visa-interview-part-ii',
      featuredParams,
    ),
  ]

  return {
    props: {
      title: `Laravel ${process.env.NEXT_PUBLIC_PAGE_TITLE}`,
      tagline: 'Artisans of the Web',
      image: '/static/images/articles.jpg',
      primaryColor: 'yellow',
      secondaryColor: 'pink',
      featuredPosts,
      allPosts,
    },
  }
}

function Articles(props) {
  const renderFeatured = () => {
    return props.featuredPosts.map((post, index) => {
      return (
        <FeaturedArticle
          key={index}
          index={index}
          href={`/${post.slug}/`}
          title={post.title}
          description={post.description}
          image={post.image}
          stats={post.stats}
          content={post.content}
        />
      )
    })
  }

  const renderAll = () => {
    return props.allPosts.map((post, index) => {
      if (!post.skip) {
        return (
          <ListItem
            key={index}
            index={index}
            href={`/${post.slug}/`}
            title={post.title}
            description={post.description}
            date={post.date}
            content={post.content}
          />
        )
      }
    })
  }

  const { title, image } = props
  const description = `Immerse yourself in <strong>${props.allPosts.length}</strong> articles that dissect the decisions behind building resilient software. We cover everything from development frameworks to cybersecurity practices, offering a behind-the-scenes look at the tech choices that matter.`

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content={`${process.env.URL}/laravel`} property="og:url" />
        <meta content={`${process.env.URL}${image}`} property="og:image" />
      </Head>

      <AnimateSharedLayout>
        <p dangerouslySetInnerHTML={{ __html: description }} />

        <h2>Featured Articles</h2>
        <FeaturedArticles>{renderFeatured()}</FeaturedArticles>

        <h2>All Articles</h2>
        <ListGroup>{renderAll()}</ListGroup>
      </AnimateSharedLayout>
    </>
  )
}

const FeaturedArticles = styled('div', {
  margin: '10px 0 0 -20px',
  '@bp2': { display: 'flex', justifyContent: 'space-between' },
})

Articles.Layout = Base

export default Articles
