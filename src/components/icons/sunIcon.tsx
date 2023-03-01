import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { ReactComponent as MoonIconSvg } from '../../images/icon-sun.svg';
export const SunIcon = () => {
    return (
        <SvgIcon
            sx={{ height: '30px' }}
            component={MoonIconSvg}
            inheritViewBox
        />
    );
};
