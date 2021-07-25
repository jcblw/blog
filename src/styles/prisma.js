import { Global } from '@emotion/core'
import React from 'react'
import { names } from './colors'

export const PrismaStyles = () => (
  <>
    <Global
      styles={{
        "code[class*='language-'], pre[class*='language-'] ": {
          color: names.pictonBlue,
          background: 'none',
          fontFamily: "'Inconsolata', monospace",
          fontSize: '1em',
          textAlign: 'left',
          whiteSpace: 'pre',
          wordSpacing: 'normal',
          wordBreak: 'normal',
          wordWrap: 'normal',
          lineHeight: 1.5,

          tabSize: 4,
          hyphens: 'none',
        },

        "code[class*='language-'] *": {
          fontFamily: "'Inconsolata', monospace",
        },

        /* Code blocks */
        "pre[class*='language-']": {
          padding: '1em',
          margin: '0.5em 0',
          overflow: 'auto',
        },

        ":not(pre) > code[class*='language-'], pre[class*='language-']": {
          background: names.vulcan,
          borderRadius: '0.5em',
        },

        /* Inline code */
        ":not(pre) > code[class*='language-']": {
          padding: '0.1em',
          borderRadius: '0.3em',
          whiteSpace: 'normal',
        },

        '.token.comment, .token.block-comment, .token.prolog, .token.doctype, .token.cdata': {
          color: names.steelGrey,
        },

        '.token.punctuation': {
          color: names.white,
        },

        '.token.tag, .token.attr-name, .token.namespace, .token.deleted': {
          color: '#e2777a',
        },

        '.token.function-name': {
          color: '#6196cc',
        },

        '.token.boolean, .token.number, .token.function': {
          color: names.calico,
        },

        '.token.property, .token.class-name, .token.constant, .token.symbol': {
          color: '#f8c555',
        },

        '.token.selector, .token.important, .token.atrule, .token.keyword, .token.builtin': {
          color: '#cc99cd',
        },

        '.token.string, .token.char, .token.attr-value, .token.regex, .token.variable': {
          color: names.aeroBlue,
        },

        '.token.operator, .token.entity, .token.url': {
          color: names.periwinkleGray,
        },

        '.token.important, .token.bold': {
          fontWeight: 'bold',
        },

        '.token.italic': {
          fontStyle: 'italic',
        },

        '.token.entity': {
          cursor: 'help',
        },

        '.token.inserted': {
          color: 'green',
        },
      }}
    />
  </>
)
