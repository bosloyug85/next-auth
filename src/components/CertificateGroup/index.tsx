import { Card, CardHeader, Divider, Grid, Typography, CardContent, Avatar, Box, FormControlLabel, Button } from "@mui/material";
import { Checkbox } from "flowbite-react";
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import GroupIcon from '@mui/icons-material/Group';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Tilt } from "react-tilt";
import CertificateIcon from "../CertificateIcon";
import FileDownloadButton from "../FileDownloadButton";
import { useAppContext } from "@/context/AppContext";

const defaultOptions = {
	reverse:        false, 
	max:            3,    
	perspective:    1000,  
	scale:          1,   
	speed:          1000,  
	transition:     true,   
	axis:           null,   
	reset:          true,    
	easing:         "cubic-bezier(.03,.98,.52,.99)",
}


const CertificateGroup = ({ certificateGroup }: { certificateGroup: any }) => {
    const { title, certificates } = certificateGroup;
    const { state, dispatch } = useAppContext();

    const handleChangeCheckbox = (checked: boolean, documentId: string) => {
        if(checked) {
            dispatch({ type: "ADD_DOCUMENT_ID_FOR_EXPORT", payload: documentId });
            return;
        }

        dispatch({ type: "REMOVE_DOCUMENT_ID_FROM_EXPORT", payload: documentId });
    }

    return <div>
        <Typography color="#666666" marginTop={10} fontSize={16}>{title}</Typography>
        <Divider style={{ margin: '15px 0px' }} />
        <Grid container spacing={2}>
            { certificates && certificates.map((item: any) => (
                <Grid item xs={4}>
                    <Tilt options={defaultOptions}>
                    <Card>
                        <CardHeader style={{ backgroundColor: '#2196f3', padding: '10px 30px' }} titleTypographyProps={{ color: 'white', fontWeight: 300 }} title={
                            <Box style={{ display: 'flex', alignItems: 'center' }}><CertificateIcon /><Typography style={{ fontSize: 14, fontWeight: 300 }}>{item.title}</Typography></Box>
                        } 
                        action={<FormControlLabel control={<Checkbox style={{ height: '30px', width: '20px' }} />} label={null} />} />
                        <CardContent style={{ padding: '20px 0px' }}>
                            <Box style={{ padding: '10px 30px' }}>
                                <Box sx={{ display: 'flex' }}>
                                    <Avatar style={{ height: 90, width: 90 }} src={`https://employeecertificates/employeecertificates${item.employeeLogoUri}`} />
                                    <Box style={{ marginLeft: '20px' }}>
                                        <Typography fontWeight={500} color="#666666">{ item.employeeName }</Typography>
                                        <Typography fontSize={12} fontWeight={500} color="#666666" display="flex" alignItems="center" marginBottom="3px"><PersonIcon style={{ height: 16, color: '#2196f3' }} /> email: { item.employeeEmailAddress }</Typography>
                                        <Typography fontSize={12} fontWeight={500} color="#666666" display="flex" alignItems="center" marginBottom="3px"><PhoneIphoneIcon style={{ height: 16, color: '#2196f3' }} /> phone: { item.employeePhoneNumber }</Typography>
                                        <Typography fontSize={12} fontWeight={500} color="#666666" display="flex" alignItems="center" marginBottom="3px"><ApartmentIcon style={{ height: 16, color: '#2196f3' }} /> id: { item.employeeAdId }</Typography>
                                        <Typography fontSize={12} fontWeight={500} color="#666666" display="flex" alignItems="center" marginBottom="3px"><GroupIcon style={{ height: 16, color: '#2196f3' }} /> { item.employeeBusinessUnit }</Typography>
                                    </Box>
                                </Box>

                            </Box>

                            <Divider style={{ margin: '20px 0px' }} />

                            <Box style={{ padding: '10px 30px' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Box width="50%">
                                        <Typography fontSize={12} fontWeight={400} color="#666666"><span style={{ fontWeight: 600 }}>Vendor:</span> {item.vendor}</Typography>
                                    </Box>
                                    <Box width="50%">
                                        <Typography fontSize={12} fontWeight={400} color="#666666"><span style={{ fontWeight: 600 }}>Date:</span> {item.validFromDate} - {item.validToDate ?? null}</Typography>
                                    </Box>
                                </Box>

                                <Divider style={{ margin: '20px 0px' }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Box width="50%">
                                        <Typography fontSize={12} fontWeight={400} color="#666666"><span style={{ fontWeight: 600 }}>Description:</span> {item.description ?? '/'}</Typography>
                                    </Box>
                                    <Box width="50%">
                                        <Typography fontSize={12} fontWeight={400} color="#666666"><span style={{ fontWeight: 600 }}>Keywords:</span> {item.keywords ?? '/'}</Typography>
                                    </Box>
                                </Box>

                                <Divider style={{ margin: '20px 0px' }} />
                                {/* { JSON.stringify(item) } */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    { item.certificates && item.certificates.map((certificate: any, index: number) => (
                                        <Box key={index} width="50%" display="flex" alignItems="center" justifyContent="space-between">
                                            <FileDownloadButton languageId={certificate.languageId} label={'Download'} fileUrl={certificate.fileUri} />
                                            <FormControlLabel
                                                label={<Typography style={{ fontSize: 10 }}>Select</Typography>}
                                                style={{ fontSize: '10px' }}
                                                control={<Checkbox onChange={(e: any) => handleChangeCheckbox(e.target.checked, certificate.documentId)} />}
                                            />
                                        </Box>
                                    )) }
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                    </Tilt>
                </Grid>
            )) }
        </Grid>
    </div>
}

export default CertificateGroup;