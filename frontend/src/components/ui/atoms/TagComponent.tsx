import React from 'react'
import styled from 'styled-components'

const _Tag = styled.span`
  font-size: 2rem;
`

export const Tag = ({ children, className }: { children: React.ReactNode; className: string }) => (
  <_Tag className={className}>{children}</_Tag>
)
