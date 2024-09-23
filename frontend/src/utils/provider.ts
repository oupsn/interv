import {
  cloneElement,
  createElement,
  FC,
  Fragment,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react"

const nest = (children: ReactNode, component: ReactElement) =>
  cloneElement(component, {}, children)

export type ProviderProps = PropsWithChildren<{
  providers: ReactElement[]
}>

const Provider: FC<ProviderProps> = ({ children, providers }) =>
  createElement(Fragment, null, providers.reduceRight(nest, children))

export default Provider
