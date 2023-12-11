"use client"

import { Box, CircularProgress, Container} from "@mui/material";
import BreadcrumbsComponent from "@/components/Breadcrumbs";
import SearchComponent from "@/components/CustomAutocomplete";
import CertificateGroup from "@/components/CertificateGroup";
import { useAppContext } from "@/context/AppContext";

const Dashboard = () => {
    const { state, dispatch } = useAppContext();
 
    const breadcrumbs = [
        {
            isActive: false,
            clickable: true,
            isHome: true,
            title: "SagaEmployeeCertificate",
            link: "https://www.google.com"
        },
        {
            isActive: false,
            clickable: true,
            isHome: false,
            title: "Search Certificates",
            link: "https://www.google.com"
        }
    ];

    return <div>
        <Container maxWidth="xl" style={{ paddingTop: 50, paddingBottom: 100 }}>
            <BreadcrumbsComponent breadcrumbs={breadcrumbs} />

            <SearchComponent />

            {/* { JSON.stringify(state.readyForExport) } */}

            { !state.isLoading ?
            <div style={{ paddingTop: '0px' }}>
                { state.certificateGroups && state.certificateGroups.map((item, index) => (
                    <CertificateGroup key={index} certificateGroup={item} />
                )) }
            </div>
            : <Box height={500} display="flex" alignItems="center" justifyContent="center">
                <CircularProgress />
              </Box> }
        </Container>
    </div>
}

export default Dashboard;