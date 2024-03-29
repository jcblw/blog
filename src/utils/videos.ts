export const videos = [
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
  .map((talk) => {
    const [year, month, date] = talk.date.split('-').map((n) => parseInt(n, 10))
    return {
      ...talk,
      date: new Date(year, month - 1, date),
      slug: `/${talk.title.toLowerCase().replace(/ /g, '-')}`,
    }
  })
  .sort(({ date: a }, { date: b }) => b.getTime() - a.getTime())

export const getAllVideos = () => videos

export const getVideos = (limit = 3) => videos.slice(0, limit)

export const getVideo = (id: string) =>
  videos.find((video) => video.youtube === id)
