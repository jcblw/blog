import { ImageResponse } from '@vercel/og'

const h = (type, props) => {
  return {
    type,
    props,
  }
}

export default async function (request) {
  return new ImageResponse(
    h('div', {
      style: {
        fontSize: 128,
        fontSize: 128,
        background: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
      children: 'Hello world !',
    }),
    {
      width: 1200,
      height: 600,
    }
  )
}
