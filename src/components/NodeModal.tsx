import { Box, IconButton, SvgIconProps, Typography } from '@mui/material'
import React, { ReactElement, useEffect } from 'react'
import { Handle, NodeProps, Position, useReactFlow } from 'reactflow'
import CloseIcon from '@mui/icons-material/Close';
import { IT1LeadSource, IT2ColdEmail, IT3Delay } from '../modal/INodeData.modal';

type Props = {
    icon: ReactElement<SvgIconProps>,
    title: string,
    description: string,
    color: string,
    showAsTemplate: boolean,
    dataSource?: IT1LeadSource | IT2ColdEmail | IT3Delay | any
}


const NodeModal = ({ data, id }: NodeProps<Props>) => {

    const { title, description, icon, color, showAsTemplate, dataSource } = data;

    const { deleteElements } = useReactFlow()
    useEffect(() => {

        console.log(dataSource);



    }, [])


    const deleteNode = () => {
        console.log(id);
        deleteElements({ nodes: [{ id }] })
    }

    return (
        <Box
            sx={{
                height: "auto",
                minWidth: "200px",
                border: " 1px solid #eee",
                padding: " 5px",
                borderRadius: "5px",
                background: "white",
                "&:hover": {
                    "& .btnIconClose": {
                        display: "flex",
                    }
                }
            }}
        >
            {!showAsTemplate && <>
                <Handle id='top' type="target" position={Position.Top} isConnectable={true} />
                <Handle id='bottom' type="source" position={Position.Bottom} isConnectable={true} />
            </>
            }

            <IconButton
                className='btnIconClose'
                sx={{
                    display: "none",
                    position: "fixed",
                    background: "red",
                    padding: "1px",
                    top: "-10px",
                    left: "200px",
                }}
                onClick={deleteNode}
            >
                <CloseIcon
                    sx={{
                        fontSize: "15px"
                    }} />
            </IconButton>
            <Box
                sx={{
                    display: "flex",
                }}
            >
                <Box sx={{
                    padding: "10px 14px 10px 14px",
                    border: "1px solid",
                    color: `${color}`,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "5px",
                    background: `${color}1a`
                }}>
                    {/* <PersonAddIcon /> */}
                    {icon}
                </Box>
                <Box sx={{
                    ml: 2
                }}>
                    <Typography variant='subtitle1' textAlign="left">
                        {title}
                    </Typography>
                    <Typography variant='caption'>
                        {description}

                    </Typography>


                </Box>
            </Box>
            {
                !showAsTemplate &&
                <Box display="flex" justifyContent="space-between">
                    <Typography variant='caption' color='primary'>
                        Data:
                    </Typography>
                    {dataSource &&
                        <Typography variant='caption' color='primary'>
                            {dataSource?.emailTemplate
                            }
                            {dataSource && dataSource?.waitFor &&
                                `Wait For: ${dataSource?.waitFor}
                         Wait Type: ${dataSource?.waitType}`}

                        </Typography>}
                </Box>
            }

        </Box>
    )
}

export default NodeModal