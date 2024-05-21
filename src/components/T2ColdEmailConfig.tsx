import React, { ChangeEvent, useEffect, useState } from 'react'
import { IT2ColdEmail } from '../modal/INodeData.modal'
import { Box, Button, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'

type Props = {
  data?: IT2ColdEmail,
  setData: (data: IT2ColdEmail) => void,
}
const emailTemplates = [
  {
    id: 1,
    title: "Welcome Template",
    value: "welcome-template",
  },
  {
    id: 2,
    title: "Lead Teamplate",
    value: "lead-template"
  },
  {
    id: 3,
    title: "Follow up",
    value: "follow-up"
  }
]
const T2ColdEmailConfig = ({ data, setData }: Props) => {


  const [selectedTemplate, setSelectedTemplate] = useState<string | number>(emailTemplates[0].id)

  // useEffect(() => {
  //   if (data) {
  //     setSelectedTemplate(data.emailTemplate)
  //   }
  // }, [])
  const handleChange = (e: SelectChangeEvent<number>) => {
    console.log(e.target.value);
    setSelectedTemplate(e.target.value)

  }

  const onAddTemplateClick = () => {
    let template = emailTemplates.find((template) => template.id == selectedTemplate)
    setData({
      id: "t2ColdEmail",
      emailTemplate: template?.value!
    })
  }

  return (
    <Box>

      <FormControl fullWidth>
        <Typography>
          Select Cold email template
        </Typography>
        <Select
          labelId="email-list-label"
          id="email-list-selector"
          variant='outlined'
          label=""
          value={selectedTemplate as number}
          placeholder='Select list'
          onChange={handleChange}
        >
          {
            emailTemplates.map((template) => {
              return <MenuItem key={template.title} value={template.id}>{template.title}</MenuItem>
            })
          }
        </Select>
        <Button variant='contained' onClick={onAddTemplateClick}> Add template</Button>
      </FormControl>
    </Box>
  )
}

export default T2ColdEmailConfig