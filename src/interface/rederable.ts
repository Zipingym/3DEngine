import { Scene } from "../three"
export default interface RenderAble {
    render: (parent: HTMLElement | Scene) => void
}