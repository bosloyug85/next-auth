import {Breadcrumbs, Link, Typography} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';

export interface IBreadcrumbsComponentProps {
    breadcrumbs: any[];
}

const BreadcrumbsComponent = (props: IBreadcrumbsComponentProps) => {
    const { breadcrumbs } = props

    return <Breadcrumbs aria-label="breadcrumb">
        { breadcrumbs && breadcrumbs.map((item: any, index: number) => (
            <div key={index}>
                {item.clickable ? <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    variant={item.isActive ? 'body2' : ''}
                    color={ item.isActive ? '' : 'text.primary'}
                    href={item.link}
                >
                    { item.isHome && <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> }
                    {item.title}
                </Link> : <Typography
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="text.primary"
                >
                    <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    {item.title}
                </Typography>}
            </div>
        )) }
    </Breadcrumbs>
}

export default BreadcrumbsComponent;