import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields() {
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="title">Title</InputLabel>
          <Select
            labelId="title_label"
            id="title_id"
            value={title}
            onChange={handleChange}
            autoWidth
            label="Title"
          >
            <MenuItem value={1}>Mr</MenuItem>
            <MenuItem value={2}>Miss</MenuItem>
            <MenuItem value={3}>Mrs</MenuItem>
            <MenuItem value={4}>Ms</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="name_id"
          label="Name"
          placeholder=".."
          multiline
          variant="outlined"
        />
      </div>
      <div>
        <TextField
            id="email_id"
            label="Email"
            placeholder="xxx@xxx.com"
            multiline
            variant="outlined"
          />
        <TextField
          id="skill_id"
          label="Skill(separate with ',')"
          placeholder="Python,C,Java"
          multiline
          variant="outlined"
        />
      </div>
      <div>
      <TextField
          id="experience_id"
          label="Experience"
          placeholder="Start-End:Experience."
          multiline
          variant="outlined"
        />
      
      </div>
    </Box>
  );
}
