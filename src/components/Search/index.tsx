import {
    FormControl,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import {useEffect, useState} from "react";
import CustomAutocomplete from "@/components/CustomAutocomplete";

export interface ISearchProps {
    label: string;
}

const Search = (props: ISearchProps) => {

    return <div>
        <FormControl sx={{ mt: '-16px' }} style={{ width: '95%' }}>
            <CustomAutocomplete />
        </FormControl>
    </div>
}

export default Search;