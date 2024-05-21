import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import NodeModal from './NodeModal';
import {
    PersonAdd,
    AccessAlarmOutlined,
    MailOutline
} from '@mui/icons-material';
import T1LeadSourceConfig from './T1LeadSourceConfig';
import T2ColdEmailConfig from './T2ColdEmailConfig';
import T3DelayConfig from './T3DelayConfig';
import { IT1LeadSource, IT2ColdEmail, IT3Delay } from '../modal/INodeData.modal';


type Props = {
    title?: string,
    open: boolean,
    setOpen: (state: boolean) => void,
    isAtInit: boolean,
    selectedNode: string,
    setSelectedNode: (nodeTemplate: string) => void,
    data: IT1LeadSource | IT2ColdEmail | IT3Delay,
    setData: (data: IT1LeadSource | IT2ColdEmail | IT3Delay) => void
    addNode: () => void
}

const NodeSelector = ({
    title,
    open,
    setOpen,
    isAtInit,
    selectedNode,
    setSelectedNode,
    setData,
    addNode }: Props) => {


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {title || "Select a Node"}
                </DialogTitle>
                <DialogContent>
                    {!selectedNode &&
                        (isAtInit ?
                            <>
                                Lead Source
                                <Box sx={{
                                    cursor: "pointer"
                                }}
                                    onClick={() => { setSelectedNode("t1LeadSource") }}
                                >
                                    <NodeModal
                                        id='t1LeadSource'
                                        dragging={false}
                                        isConnectable={false}
                                        selected={false}
                                        type='none'
                                        xPos={0}
                                        yPos={0}
                                        zIndex={1}
                                        data={{
                                            title: "Lead Source",
                                            description: "",
                                            color: "#d36689",
                                            icon: <PersonAdd />,
                                            showAsTemplate: true
                                        }}
                                    />
                                </Box>

                            </>
                            :
                            <>
                                Out Reach
                                <Box sx={{
                                    cursor: "pointer"
                                }}
                                    onClick={() => { setSelectedNode("t2ColdEmail") }}
                                >
                                    <NodeModal
                                        id='t2ColdEmail'
                                        dragging={false}
                                        isConnectable={false}
                                        selected={false}
                                        type='none'
                                        xPos={0}
                                        yPos={0}
                                        zIndex={1}
                                        data={{
                                            title: "Cold Email",
                                            description: "",
                                            color: "#9054D8",
                                            icon: <MailOutline />,
                                            showAsTemplate: true
                                        }} />
                                </Box>
                                Condition
                                <Box sx={{
                                    cursor: "pointer"
                                }}
                                    onClick={() => { setSelectedNode("t3Delay") }}
                                >
                                    <NodeModal
                                        id='t3Delay'
                                        dragging={false}
                                        isConnectable={false}
                                        selected={false}
                                        type='none'
                                        xPos={0}
                                        yPos={0}
                                        zIndex={1}
                                        data={{
                                            title: "Wait",
                                            description: "",
                                            color: "#6EC2FC",
                                            icon: <AccessAlarmOutlined />,
                                            showAsTemplate: true
                                        }} />
                                </Box>
                            </>)
                    }



                    {/* Lead source config */}
                    {

                        selectedNode === "t1LeadSource" &&
                        <T1LeadSourceConfig setData={setData} />
                    }
                    {/* Outreach config */}
                    {
                        selectedNode === "t2ColdEmail" &&
                        <T2ColdEmailConfig setData={setData} />
                    }
                    {/* Conditio config */}
                    {
                        selectedNode === "t3Delay" &&
                        <T3DelayConfig setData={setData} />
                    }

                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        variant='outlined'>Close</Button>
                    <Button
                        onClick={addNode}
                        autoFocus
                        variant='contained'>
                        Insert Node
                    </Button>
                </DialogActions>
            </Dialog >
        </div >
    )
}

export default NodeSelector

{/* <DialogContentText id="alert-dialog-description">
Let Google help apps determine location. This means sending anonymous
location data to Google, even when no apps are running.
</DialogContentText> */}