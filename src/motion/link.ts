import { Vector3 } from "three"

const bones: Array<boneInfo> = [
    {
        parent: 11,
        child: 13,
        name: "UpperArmL"
    },
    {
        parent: 13,
        child: 15,
        name: "LowerArmL"
    },
    {
        parent: 11,
        child: 23,
        name: "SpineL"
    },
    {
        parent: 23,
        child: 25,
        name: "UpperLegL",
        origin: new Vector3(0, -1, 0)
    },
    {
        parent: 25,
        child: 27,
        name: "LowerLegL",
        origin: new Vector3(0, -1, 0)
    },
    {
        parent: 27,
        child: 29,
        name: "HeelL"
    },
    {
        parent: 27,
        child: 31,
        name: "TopFootL"
    },
    {
        parent: 29,
        child: 31,
        name: "BottomFootL"
    },

    {
        parent: 23,
        child: 24,
        name: "Hips"
    },
    {
        parent: 11,
        child: 12,
        name: "Shoulder"
    },
    {
        parent: 12,
        child: 14,
        name: "UpperArmR"
    },
    {
        parent: 14,
        child: 16,
        name: "LowerArmR"
    },
    {
        parent: 12,
        child: 24,
        name: "SpineR"
    },
    {
        parent: 24,
        child: 26,
        name: "UpperLegR",
        origin: new Vector3(0, -1, 0.3)
    },
    {
        parent: 26,
        child: 28,
        name: "LowerLegR",
        origin: new Vector3(0, -1, 0)
    },
    {
        parent: 28,
        child: 30,
        name: "HeelR"
    },
    {
        parent: 28,
        child: 32,
        name: "TopFootR"
    },
    {
        parent: 30,
        child: 32,
        name: "BottomFootR"
    },
]
export default bones

export interface boneInfo {
    name: string
    parent: number
    child: number
    origin?: Vector3
}

const New: Array<NewInfos> = [
    {
        name: "kneeR",
        parent: 26,
        child1: 24,
        child2: 28,
        origin: ["x"]
    }
]
export { 
    New as New
}


export interface NewInfos {
    name: string,
    parent: number
    child1: number
    child2: number
    origin: Array<string>
}