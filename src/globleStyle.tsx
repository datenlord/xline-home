import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Inter;
    line-height: 1.5;
  }

  a {
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-block: 0;
  }

  p {
    margin-block: 0;
    line-height: 1.2;
  }

  ul, ol {
    list-style-type: none;
    margin-block: 0;
    padding-inline-start: 0;
  }

  ol + ul {
    margin-left: 20px;
  }

  pre {
    background: ${props => props.theme.color.neutral.gray04};
    padding: 12px;
    border-radius: 4px;
    overflow-x: scroll;
  }

  code {
    font-size: 16px;
    padding: 4px;
    border-radius: 4px;
    background: ${props => props.theme.color.neutral.gray04};
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  }

  pre code {
    padding: 0;
  }

  .hljs {
    font-size: 16px;
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    color: #333;
    overflow: hidden;
  }
  /* .hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #333;
  background: #f8f8f8;
} */
  .hljs-comment,
  .hljs-quote {
    color: #998;
    font-style: italic;
  }
  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-subst {
    color: #333;
    font-weight: 700;
  }
  .hljs-literal,
  .hljs-number,
  .hljs-tag .hljs-attr,
  .hljs-template-variable,
  .hljs-variable {
    color: teal;
  }
  .hljs-doctag,
  .hljs-string {
    color: #d14;
  }
  .hljs-section,
  .hljs-selector-id,
  .hljs-title {
    color: #900;
    font-weight: 700;
  }
  .hljs-subst {
    font-weight: 400;
  }
  .hljs-class .hljs-title,
  .hljs-type {
    color: #458;
    font-weight: 700;
  }
  .hljs-attribute,
  .hljs-name,
  .hljs-tag {
    color: navy;
    font-weight: 400;
  }
  .hljs-link,
  .hljs-regexp {
    color: #009926;
  }
  .hljs-bullet,
  .hljs-symbol {
    color: #990073;
  }
  .hljs-built_in,
  .hljs-builtin-name {
    color: #0086b3;
  }
  .hljs-meta {
    color: #999;
    font-weight: 700;
  }
  .hljs-deletion {
    background: #fdd;
  }
  .hljs-addition {
    background: #dfd;
  }
  .hljs-emphasis {
    font-style: italic;
  }
  .hljs-strong {
    font-weight: 700;
  }
`

export default GlobalStyle
