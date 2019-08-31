import '../_setup'
import { Box } from '@mujo/box'
import PropTypes from 'prop-types'
import React from 'react'
import { Container } from './container'
import { Header5, Paragraph } from './fonts'

const Header = () => (
  <Box Component="header" backgroundColor="masala">
    <Container
      display="flex"
      alignItems="baseline"
      direction="row"
      paddingTop="m"
      paddingBottom="m"
    >
      <Header5
        alt="Jacob Lowe"
        color="polar"
        marginRight="s"
        marginTop="none"
        marginBottom="none"
        display="flex"
      >
        Human tech.
      </Header5>
      <Paragraph
        flex="1"
        display="inlineFlex"
        color="blackSqueez"
        marginTop="none"
        marginBottom="none"
      >
        Personal blog of Jacob Lowe.
      </Paragraph>
    </Container>
  </Box>
)

Header.propTypes = { siteTitle: PropTypes.string }

Header.defaultProps = { siteTitle: '' }

export default Header
