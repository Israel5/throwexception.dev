import Lottie from 'lottie-react'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { ButtonPrimary } from '../components/ButtonPrimary'
import Pronunciation from '../components/Pronunciation'
import Toast from '../components/Toast'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import copyBioIcon from '../public/static/icons/copy-bio.json'
import downloadIcon from '../public/static/icons/download.json'
import { styled } from '../stitches.config'

export async function getStaticProps() {
  const meta = {
    title: `About ${process.env.NEXT_PUBLIC_PAGE_TITLE}`,
    description:
      'At throwException, our name reflects a fundamental concept in programming that embodies our approach to problem-solving. In many programming languages, an "exception" is an event that disrupts the normal flow of execution. When a piece of code encounters an unexpected issue, it "throws" an exception, signaling that something needs to be addressed.',
    description1: 'We embrace this concept as a metaphor for our work. Just as throwing an exception in code prompts a solution, we view challenges and disruptions as opportunities to innovate and improve. Our team is dedicated to tackling complex problems and transforming obstacles into solutions, ensuring that our clients\' systems run smoothly and efficiently.',
    tagline: 'Beyond Exceptions.',
    image: '/static/images/about.jpg',
    primaryColor: 'pink',
    secondaryColor: 'purple',
  }

  return { props: meta }
}

function About(props) {
  const { title, description, description1, image } = props
  const [toastTitle, setToastTitle] = React.useState('')
  const [toastDescription, setToastDescription] = React.useState('')
  const [showToast, setShowToast] = React.useState(false)
  const copyBioRef = React.useRef()
  const downloadRef = React.useRef()

  const renderIntro = () => {
    const name = process.env.NEXT_PUBLIC_NAME;
    return (
      <Container>
        <Section>
          <Image
            alt="throwException"
            src="/static/images/about.jpg"
            width="350"
            height="233"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAP0lEQVQImQE0AMv/AFBQUJKSkqmpqaOjowCurq7v7+/Jycm5ubkA////jIyMn5+fg4ODADAwMD09PWlpaQAAAApRGnEHblMWAAAAAElFTkSuQmCC"
            priority
          />
        </Section>
        <Section>
          <Paragraph
            css={{
              marginTop: '16px',
              '@bp2': { marginTop: '-6px' },
            }}
          >
            We are <strong>{name}</strong>, a dedicated team of engineers, developers, and cybersecurity experts based in the heart of <strong>Montreal, Canada</strong> 🇨🇦.
          </Paragraph>
          <Paragraph>
            Beyond writing code, we thrive on creating, automating, and integrating solutions. Our passion for problem-solving drives us to delve into our customers' challenges and address them with innovative technology.
          </Paragraph>
        </Section>
      </Container>
    )
  }

  const renderBio = () => {
    const btnStyle = {
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
    const iconStyle = { width: 24, height: 24, marginRight: 8 }

    return (
      <div>
        <blockquote>
          <p>{description}</p>
          <p>{description1}</p>
        </blockquote>
        <ButtonsContainer>
          <ButtonPrimary
            as="button"
            style={btnStyle}
            onClick={copyBio}
            onMouseEnter={() => copyBioRef.current?.play()}
            onMouseLeave={() => copyBioRef.current?.stop()}
          >
            <Lottie
              lottieRef={copyBioRef}
              style={iconStyle}
              animationData={copyBioIcon}
              loop={false}
              autoplay={false}
            />
            Copy Bio
          </ButtonPrimary>
          {/*<span style={{ margin: '0 20px 0 10px' }}>•</span>*/}
          {/*<ButtonPrimary*/}
          {/*  as="a"*/}
          {/*  download*/}
          {/*  role="button"*/}
          {/*  href="https://drive.google.com/file/d/1XU1FiKk0tJE5PHYPNApq8WSXpiNeVhH5/view?usp=sharing"*/}
          {/*  target="_blank"*/}
          {/*  style={btnStyle}*/}
          {/*  onClick={downloadResume}*/}
          {/*  onMouseEnter={() => downloadRef.current?.play()}*/}
          {/*  onMouseLeave={() => downloadRef.current?.stop()}*/}
          {/*>*/}
          {/*  <Lottie*/}
          {/*    lottieRef={downloadRef}*/}
          {/*    style={iconStyle}*/}
          {/*    animationData={downloadIcon}*/}
          {/*    loop={false}*/}
          {/*    autoplay={false}*/}
          {/*  />*/}
          {/*  Download Resume*/}
          {/*</ButtonPrimary>*/}
        </ButtonsContainer>
      </div>
    )
  }

  const downloadResume = () => {
    setToastTitle('Downloading...')
    setToastDescription('You can now hire me :)')
    setShowToast(true)
  }

  const copyBio = e => {
    e.preventDefault()
    navigator.clipboard.writeText(description)

    setToastTitle('Copied :D')
    setToastDescription('You can now paste it anywhere.')
    setShowToast(true)
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content={`${process.env.URL}/about`} property="og:url" />
        <meta content={`${process.env.URL}${image}`} property="og:image" />
      </Head>

      {renderIntro()}

      <h2>Our name</h2>
      {renderBio()}

      <Toast
        title={toastTitle}
        description={toastDescription}
        isSuccess={true}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </>
  )
}

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '@bp2': { flexDirection: 'row' },
})

const Paragraph = styled('p', {
  '@bp2': { margin: '15px 0' },
})

const ButtonsContainer = styled('p', {
  display: 'flex',
  alignItems: 'center',
})

const Section = styled('div', {
  marginTop: '0px',
  width: 'auto',
  '@bp2': { width: '48%' },
})

About.Layout = Base

export default About
