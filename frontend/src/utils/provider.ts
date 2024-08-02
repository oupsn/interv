import React from "react"

const nest = (children: React.ReactNode, component: React.ReactElement) =>
  React.cloneElement(component, {}, children)

export type ProviderProps = React.PropsWithChildren<{
  providers: React.ReactElement[]
}>

const Provider: React.FC<ProviderProps> = ({ children, providers }) =>
  React.createElement(
    React.Fragment,
    null,
    providers.reduceRight(nest, children),
  )

export default Provider
