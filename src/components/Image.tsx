import styled from 'styled-components'

interface ImageProps {
  src: string | undefined
  alt: string | undefined
}

const StyledImage = styled.img`
  display: block;
  max-width: 764px;
  margin-block: 32px;
  margin-inline: auto;
  border-radius: 12px;
`

export const Image: React.FC<ImageProps> = ({ src, alt }) => (
  <StyledImage src={src} alt={alt} />
)
