export default interface moveAble{
    setPosition:(position:THREE.Vector3) => void
    setRotation:(rotation:THREE.Euler) => void
    setScale:(scale:THREE.Vector3) => void
}