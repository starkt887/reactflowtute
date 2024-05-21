import { Box, Button, FormControl, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import { IT3Delay } from '../modal/INodeData.modal'

type Props = {
  data?: IT3Delay,
  setData: (data: IT3Delay) => void,
}

const waitTypes = [
  {
    id: 1,
    title: "Minutes",
    waitType: "minutes"
  },
  {
    id: 2,
    title: "Hours",
    waitType: "hours"
  },
  {
    id: 3,
    title: "Days",
    waitType: "days"
  },
  {
    id: 4,
    title: "Weeks",
    waitType: "weeks"
  },
  {
    id: 5,
    title: "Months",
    waitType: "months"
  },
  {
    id: 6,
    title: "Years",
    waitType: "years "
  },
]

const T3DelayConfig = ({ data, setData }: Props) => {
  const [delay, setDelay] = useState<number>()
  const [waitType, setWaitType] = useState<number>(waitTypes[0].id)
  const handleDelayChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDelay(parseInt(e.target.value))
  }
  const handleWaitTypeChange = (e: SelectChangeEvent<number>) => {

    setWaitType(e.target.value as number)

  }
  const onCreateDelayClick = () => {
    if (!delay || !waitType) {
      alert("Please enter all details")
      return
    }
    let waitTypeObj = waitTypes.find((wT) => wT.id === waitType)
    setData({
      id: "t3Delay",
      waitFor: delay!,
      waitType: waitTypeObj?.waitType!
    })
  }

  return (
    <Box>
      <FormControl fullWidth>
        <Typography>
          Select Delay & Delay type
        </Typography>
        <TextField
          id='delayTxt'
          label='Enter delay in numbers'
          fullWidth
          variant='standard'
          value={delay}
          onChange={handleDelayChange}
        />
        <Select
          labelId="wait-type-label"
          id="wait-type-selector"
          variant='outlined'
          label=""
          value={waitType}
          placeholder='Select list'
          onChange={handleWaitTypeChange}
        >
          {
            waitTypes.map((waitType) => {
              return <MenuItem key={waitType.id} value={waitType.id}>{waitType.title}</MenuItem>
            })
          }
        </Select>

        <Button variant='contained' onClick={onCreateDelayClick}> Create Delay</Button>
      </FormControl>
    </Box>
  )
}

export default T3DelayConfig