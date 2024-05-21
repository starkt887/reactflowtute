import { Box, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react'
import { IT1LeadSource } from '../modal/INodeData.modal'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {
    data?: IT1LeadSource,
    setData: (data: IT1LeadSource) => void,
}

const T1LeadSourceConfig = ({ data, setData }: Props) => {
    // const [createList, setCreateList] = useState(false)
    const [emailList, setEmailList] = useState<string>("")
    const [previewEmailList, setPreviewEmailList] = useState<string>("")

    useEffect(() => {
        if (data)
            setEmailList(data?.emailList?.join(','))
    }, [])

    const handleEmailListChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmailList(e.target.value)
    }
    const onCreateListClick = () => {
        if (!emailList) {
            alert("Please enter atleast 1 email")
        }
        setPreviewEmailList(emailList)
        let list = emailList.trim().split('\n')
        setData({
            id: "t1LeadSource",
            emailList: list
        })

    }

    return (
        <Box>
            <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <TextField
                        id='emailList'
                        label='Enter email list (one email per line)'
                        multiline={true}
                        rows={5}
                        fullWidth
                        variant='standard'
                        value={emailList}
                        onChange={handleEmailListChange}
                    />

                    <ArrowForwardIosIcon />

                    <TextField
                        id='emailList'
                        label='List of emails'
                        multiline={true}
                        rows={5}
                        fullWidth
                        variant='standard'
                        value={previewEmailList}
                        disabled
                    />
                </Box>
                <Stack>

                    <Button variant='contained' onClick={onCreateListClick}> Create List</Button>
                    {/* <Typography variant='h6' textAlign='center'>
                        Or
                    </Typography>
                    <Button variant='outlined' onClick={() => setCreateList(false)}> Select List</Button> */}
                </Stack>
            </Box>
            {/* </> :
                <FormControl fullWidth>
                    <Button 
                    variant='contained' 
                    onClick={() => setCreateList(true)}>Create New List</Button>
                    <Typography variant='h6' textAlign='center'>
                        Or
                    </Typography>

                    <Select
                        labelId="email-list-label"
                        id="email-list-selector"
                        variant='outlined'
                        value={1}
                        label=""
                        placeholder='Select list'
                    // onChange={handleChange}
                    >
                        <MenuItem value={1}>Select email list</MenuItem>
                        <MenuItem value={2}>No List yet</MenuItem>
                    </Select>
                </FormControl>} */}

        </Box>
    )
}

export default T1LeadSourceConfig