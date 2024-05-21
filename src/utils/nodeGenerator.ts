import { Node } from "reactflow";
import { IT1LeadSource, IT2ColdEmail, IT3Delay } from "../modal/INodeData.modal";

export function createNode(id: string, data: IT1LeadSource | IT2ColdEmail | IT3Delay, nodeStyle: any) {
    // "t1LeadSource", "t2ColdEmail", "t3Delay"

    let node = {
        id: id,
        position: { x: 0, y: 0 },
        type: "nodeModal",
        data: {
            ...nodeStyle,
            dataSource: { ...data }
        },
    } as Node
    return node
}

