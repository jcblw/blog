import React from 'react'
import { format } from 'date-fns'
import { Header6, Header3, Paragraph } from '../components/fonts'
import Layout from '../components/layout'
import { SEO } from '../components/seo'
import { Box } from '../components/box'

const talks = [
  {
    title: 'jsla Module of the Month Babel',
    date: '2015-05-29',
    youtube: 'TmngDf0l1c8',
    description:
      "Module of the month is a segment that highlights one of the many npm modules that make Node.js so great. This month's module was babel",
  },
  {
    title: 'Native NodeJS Apps',
    date: '2014-05-29',
    youtube: 'ClQQc41AKxo',
    description:
      'Native NodeJS apps are a relatively new breed of apps coming out of the NodeJS community that combine NodeJS and Webkit. Ill be going over : what are the options out there, what kind of things can these apps do compared to webapps, what are the current pro/cons of making a NodeJS native app, and more.',
  },
  {
    title: 'jsla Module of the Month LevelUp',
    date: '2014-08-28',
    youtube: 'vv7EtNjpuKA',
    description:
      'First in a series of Module of the Month presentations: LevelUp',
  },
  {
    title: 'Become a 10x Engineer by Avoiding Burnout',
    date: '2019-07-25',
    youtube: 'pWOYrLnhi-4',
    description:
      "Do not burn yourself out. Sitting at my desk, I had an overwhelming feeling doing too much but also getting nothing done. I would look back at my time and think I did a lot of things, but I just do not recollect any of them. It's like my body was on autopilot and my mind was taking a nap.",
  },
  {
    title: 'Visualizing sound on the web',
    date: '2017-02-25',
    youtube: 'nxRRbwVlbUE',
    description:
      'A talk about creative coding, and some audio visualization APIs',
  },
]
  .map(talk => {
    const [year, month, date] = talk.date.split('-').map(n => parseInt(n, 10))
    return {
      ...talk,
      date: new Date(year, month - 1, date),
    }
  })
  .sort(({ date: a }, { date: b }) => b.getTime() - a.getTime())

const TalksPage = () => (
  <Layout noAuthor>
    <SEO title="Talks" />
    <Header6 marginBottom="zero" color="calico">
      Latest Talks
    </Header6>
    {talks.map(talk => (
      <Box key={talk.title}>
        <Header3 marginBottom="zero" color="periwinkleGray">
          {talk.title}
        </Header3>
        <Paragraph marginTop="zero" color="aeroBlue">
          {format(talk.date, 'MMMM do yyyy')}
        </Paragraph>
        <Box
          paddingLeft="md"
          paddingRight="md"
          css={{
            position: 'relative',
            '::before': {
              content: '""',
              display: 'block',
              paddingBottom: 'calc(100% / (16/9))',
            },
            '& > :first-child': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            },
          }}
        >
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${talk.youtube}`}
            frameBorder="0"
            allowFullScreen
            title={talk.title}
          />
        </Box>
        <Paragraph>{talk.description}</Paragraph>
      </Box>
    ))}
  </Layout>
)

export default TalksPage
