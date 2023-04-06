import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Inter;
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

  pre {
    background: ${props => props.theme.color.neutral.gray04};
    padding: 12px;
    border-radius: 4px;
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
      color: #000000E5;
      overflow: hidden;
  }

  .hljs-doctag,
  .hljs-meta-keyword,
  .hljs-name,
  .hljs-strong {
    font-weight: bold;
  }

  .hljs-code,
  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-section,
  .hljs-tag {
    color: #62c8f3;
  }

  .hljs-selector-class,
  .hljs-selector-id,
  .hljs-template-variable,
  .hljs-variable {
    color: #ade5fc;
  }

  .hljs-meta-string,
  .hljs-string {
    color: #a2fca2;
  }

  .hljs-attr,
  .hljs-quote,
  .hljs-selector-attr {
    color: #7bd694;
  }

  .hljs-tag .hljs-attr {
    color: inherit;
  }

  .hljs-attribute,
  .hljs-title,
  .hljs-type {
    color: #0958d9;
  }

  .hljs-number,
  .hljs-symbol {
    color: #d36363;
  }

  .hljs-bullet,
  .hljs-template-tag {
    color: #b8d8a2;
  }

  .hljs-built_in,
  .hljs-keyword,
  .hljs-literal,
  .hljs-selector-tag {
    color: #fcc28c;
  }

  .hljs-code,
  .hljs-comment,
  .hljs-formula {
    color: #888;
  }

  .hljs-link,
  .hljs-selector-pseudo,
  .hljs-regexp {
    color: #c6b4f0;
  }

  .hljs-meta {
    color: #fc9b9b;
  }

  .hljs-deletion {
    background: #fc9b9b;
    color: #333;
  }

  .hljs-addition {
    background: #a2fca2;
    color: #333;
  }

  .hljs-operator,
  .hljs-params,
  .hljs-property,
  .hljs-punctuation {}

  .hljs-subst {
    color: #fff;
  }

  .hljs a {
    color: inherit;
  }

  .hljs a:focus,
  .hljs a:hover {
    color: inherit;
    text-decoration: underline;
  }

  .hljs mark {
    background: #555;
    color: inherit;
  }
`

export default GlobalStyle
