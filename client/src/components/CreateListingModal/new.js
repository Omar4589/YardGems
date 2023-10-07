import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={"something"}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Location" />}
    />
  );
}



<Combobox style={{}} onSelect={handleAddressSelection}>
<ComboboxInput
  value={value}
  onChange={handleAutoCompleteChange}
  disabled={!ready}
  className="comboBox-input"
  placeholder="Add a location"
  style={{
    ...styles.inputField,
  }}
  required
/>
<ComboboxPopover
  style={{
    zIndex: "99999",
    width: "100%",
    fontSize: "1em",
    fontFamily: "sans-serif",
  }}
>
  <ComboboxList>
    {status === "OK" &&
      data.map(({ place_id, description }) => (
        <ComboboxOption key={place_id} value={description} />
      ))}
  </ComboboxList>
</ComboboxPopover>
</Combobox>


<Input
type="date"
style={{
  ...styles.inputField,
  textAlign: "center",
}}
label="Date of the Sale"
name="dateOfSale"
fullWidth
variant="outlined"
size="small"
margin="none"
required
onChange={handleInputChange}
placeholder={formState.dateOfSale}
value={formatDateToInputValue(formState.dateOfSale)}
/>

if (name === "dateOfSale") {
  const formattedDate = dayjs(value).format("MM/DD/YYYY");
  setFormState({ ...formState, [name]: formattedDate });
} else {
  setFormState({ ...formState, [name]: value });
}