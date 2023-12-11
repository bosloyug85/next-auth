import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/system";
import { Box, Button, Checkbox, Chip, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import SearchTypeFilter from "../SearchTypeFilter";
import { useSession } from "next-auth/react";
import { useAppContext } from "@/context/AppContext";
import BulkExportButton from "../BulkExportButton";

interface IOption {
    id: number | undefined;
    name: string;
}

const CustomAutocomplete = styled(Autocomplete)({
    "& .MuiChip-root": {
        height: 30,
        position: "relative",
        zIndex: 0,
        "&:after": {
            content: '""',
            right: 10,
            top: 6,
            height: 12,
            width: 12,
            position: "absolute",
            zIndex: -1,
        },
    },
});

 const SearchComponent = () => {
    const { state, dispatch } = useAppContext();
    const { data: session }: any = useSession<any>();
    const [value, setValue] = useState<IOption[]>([]); // Update the type to string[]
    const [tempInput, setTempInput] = useState("");
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fixedValues, setFixedValues] = useState([]);
    const [responseFromApi, setResponseFromApi] = useState<any>(null);
    const [keywords, setKeywords] = useState([]);

    useEffect(() => {
        const doesObjectExist = value.some((obj: any) => obj.id === undefined);
        if(!doesObjectExist && responseFromApi && responseFromApi.searchFixedValues) {

            const { searchFixedValues } = responseFromApi;
            let fixedValues = searchFixedValues.map((value: string) => {
                let object = {} as IOption;
                object.id = undefined;
                object.name = value;
            
                return object;
            });
            setValue([...value, ...fixedValues]);
        }
    }, [value]);


    const handleSearch = () => {
        setLoading(true);
        dispatch({ type: "SET_LOADING", payload: true });
        console.log('PERFORM SEARCH FOR PARAMS ---- ',);
        let filters =  state.filters;

        axios.post('https://employeecertificates/employeecertificates/api/v1/certificate?pageNumber=1&pageSize=20', filters).then(res => {
            setLoading(false);
            dispatch({ type: "SET_CERTIFICATE_GROUPS", payload: res.data });
            setTimeout(() => { // remove this in prod.
                dispatch({ type: "SET_LOADING", payload: false });
            }, 500);
        });
    }

    const transformCertificateData = (data: any) => {
        const { certificateTitles, certificateTypes, certificateVendors, searchFixedValues } = data;

        searchFixedValues.map((fixedValue: string) => {
            setValue([...value, { id: undefined, name: fixedValue }]);
            dispatch({ type: "UPDATE_KEYWORDS", payload: [fixedValue] });
        })

        const transformArray = (arr: string[] | any[], type: string) =>
            arr.map((item) => ({ name: item.name || item, type }));

        const transformedData = [
            ...transformArray(certificateTitles, 'Type'),
            ...transformArray(certificateTypes, 'Vendor'),
            ...transformArray(certificateVendors, 'Business Units'),
        ];

        return transformedData;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://employeecertificates/employeecertificates/api/v1/common/filters');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                // console.log('DATA', data);

                // Assuming data is an array of options, update the state
                let finalTransformedData = await transformCertificateData(data);
                // console.log('FD ', finalTransformedData);
                setOptions(finalTransformedData);
                // setResponseFromApi(finalTransformedData);

                let fixedOptions = finalTransformedData?.searchFixedValues.map((value: string) => {
                    let object = {} as IOption;
                    object.id = undefined;
                    object.name = value;
                
                    return object;
                });
                setFixedValues(fixedOptions);

                // console.log("OPT --- ", options);
                return;
            } catch (error) {
                console.error('Error fetching options:', error.message);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (event: any, newInputValue: string) => {
        // Update temporary input value when typing
        setTempInput(newInputValue);
    };

    const handleBlur = () => {
        // Add custom tag when input is not empty and onBlur occurs
        if (tempInput.trim() !== "") {
            setValue([...value, { id: null, name: tempInput.trim() }]);
            let values = value.map(item => item.name);
            values.push(tempInput.trim());
            setTempInput(""); // Clear temporary input value
            // console.log('LOG ---- ', [...state.filters.keywords, tempInput.trim()])
        
            dispatch({ type: "UPDATE_KEYWORDS", payload: values });
            
        }
    };

    const handleChangeSearchType = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setValue((event.target as HTMLInputElement).value);
        console.log('event ', event.target.value);
        dispatch({ type: "UPDATE_SEARCH_TYPE", payload: (event.target as HTMLInputElement).value });
    };

    const handleChangeActive = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "UPDATE_ONLY_ACTIVE", payload: !event.target.checked });
        console.log('CHGHH', event.target.checked)
    }

    return (
        <div>
            <Grid container mt={5}>
                <Grid xs={8}>
                    <CustomAutocomplete
                        multiple
                        limitTags={3}
                        fullWidth={true}
                        id="tags-standard"
                        style={{ width: '95%' }}
                        options={options}
                        value={value}
                        onChange={(event: React.ChangeEvent<{}>, newValue: IOption[]) => {
                            setValue(newValue);
                            let values = newValue.map(item => item.name);
                            dispatch({ type: "UPDATE_KEYWORDS", payload: values });
                        }} // Update the type to React.ChangeEvent<{}> and string[]
                        inputValue={tempInput}
                        getOptionLabel={(option) => option.name}
                        onInputChange={handleInputChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Search Keyword"
                                margin="normal"
                                fullWidth
                                style={{ backgroundColor: 'white' }}
                                onBlur={handleBlur}
                            />
                        )}
                        freeSolo
                        filterSelectedOptions
                        renderOption={(props, option: string) => (
                            <li {...props}>{option.name}</li>
                        )}
                        // renderTags={(tagValue, getTagProps) =>
                        //     tagValue.map((option, index) => (
                        //       <Chip
                        //         label={option.name}
                        //         {...getTagProps({ index })}
                        //         disabled={fixedValues?.indexOf(option) !== -1}
                        //       />
                        //     ))
                        //   }
                    />
                </Grid>
                <Grid xs={4}>
                    <LoadingButton
                        onClick={handleSearch}
                        style={{ height: '56px', fontWeight: 500, marginTop: '16px', backgroundColor: 'rgb(33, 150, 243)' }}
                        loading={loading}
                        // loadingPosition="start"
                        variant="contained"
                        fullWidth={true}
                    >
                        Search
                    </LoadingButton>
                </Grid>
            </Grid>
            <FormControl style={{ marginTop: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                {session && session.user ?
                    <FormControlLabel control={<Checkbox onChange={handleChangeActive}  />} label="Only active" />
                : null }
                <FormLabel id="demo-radio-buttons-group-label" style={{ marginRight: '10px' }}>Search Type</FormLabel>
                <RadioGroup
                    row
                    onChange={handleChangeSearchType}
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={state.filters.searchType}
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="1" control={<Radio />} label="Union" />
                    <FormControlLabel value="0" control={<Radio />} label="Intersection" />
                </RadioGroup>
            </FormControl>
            <Box width="100%" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Box>
                    {state.certificateGroups.length ?
                    <>
                        {state.readyForExport.length ? 
                        <BulkExportButton url="https://employeecertificates/employeecertificates/api/v1/certificate/pdfs" fileType="pdf" label="Export PDF" style={{ marginRight: '30px', color: '#666666' }} icon={<img src="/pdf.svg" />} documentIds={state.readyForExport} />
                        : null }
                        <BulkExportButton url={`https://employeecertificates/employeecertificates/api/v1/certificate/certificatesexcel?localizationId=1`} fileType="xls" label="Export Excel" style={{ marginRight: '30px', color: '#666666' }} icon={<img src="/xlsx.svg" />} documentIds={{ localizationId : 1, keywords: state.filters.keywords, searchType: state.filters.searchType }} />
                    </> 
                    : null }
                    {/* <Button startIcon={<img src="/pdf.svg" />} style={{ marginRight: '30px', color: '#666666' }}>Export PDF</Button>
                    <Button startIcon={<img src="/xlsx.svg" />} style={{ marginRight: '30px', color: '#666666' }}>Export Excel</Button> */}
                    <FormControlLabel style={{ marginRight: 0 }} control={<Checkbox onChange={handleChangeActive}  />} label="Selected All" />
                </Box>
            </Box>
            <Box width="100%" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 20 }}>
                { state.certificateGroups.length ? 
                    <Typography color="#666666" fontWeight={400}>{state.certificateGroups.length} Search Results</Typography>
                : null }
            </Box>
        </div>
    );
}

export default SearchComponent;