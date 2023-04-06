import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import styled from 'styled-components'
import { Title } from '@/components/Title'
import { Text } from '@/components/Text'
import { Font } from '@/components/Font'
import { Divider } from '@/components/Divider'
import { List, ListItem } from '@/components/List'
import { Image } from '@/components/Image'
import { Blockquote } from '@/components/Blockquote'

const Main = styled.main`
  padding: 64px;
`

const markdown = `
  # Header 1
  ## Header 2
  ### Header 3
  #### Header 4
  ##### Header 5
  ###### Header 6


  This text is *italic* _italic_.

  This text is **bold** __bold__.

  This text is ***mix*** ___mix___.
  
  This text is ~~mix~~ ~~mix~~.

  - - -

  This is a unordered list

  - list 1
  - list 2
  - list 3

  This is a ordered list

  1. list 1
  2. list 2
  3. list 3

  > This is a zone

  This is a javascripe code block: \`const hello = 'Hello Word'\`

  ~~~ ts
  let num: number = 1
  console.log(num)
  ~~~

`

// const module = import.meta.glob('/public/demo/blog/*/*.md', { as: 'raw', eager: true })
// console.log(module)

const TestPage = () => {
  return (
    <Main>
      <ReactMarkdown
        children={markdown}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ level, children }) => (
            <Title level={level} children={children} />
          ),
          h2: ({ level, children }) => (
            <Title level={level} children={children} />
          ),
          h3: ({ level, children }) => (
            <Title level={level} children={children} />
          ),
          h4: ({ level, children }) => (
            <Title level={level} children={children} />
          ),
          h5: ({ level, children }) => (
            <Title level={level} children={children} />
          ),
          h6: ({ level, children }) => (
            <Title level={level} children={children} />
          ),
          p: ({ children }) => <Text children={children} />,
          em: ({ children }) => <Font children={children} />,
          strong: ({ children }) => <Font type={'bold'} children={children} />,
          hr: () => <Divider />,
          ul: ({ depth, ordered, className, children }) => (
            <List
              depth={depth}
              ordered={ordered}
              className={className}
              children={children}
            />
          ),
          ol: ({ depth, ordered, className, children }) => (
            <List
              depth={depth}
              ordered={ordered}
              className={className}
              children={children}
            />
          ),
          li: ({ children }) => <ListItem children={children} />,
          img: ({ src, alt }) => <Image src={src} alt={alt} />,
          blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
        }}
      />
    </Main>
  )
}

export default TestPage
