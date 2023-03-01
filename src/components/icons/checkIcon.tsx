import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { ReactComponent as MoonIconSvg } from '../../images/icon-check.svg';
export const CheckIcon = () => {
    return (
        <SvgIcon
            sx={{ height: '30px' }}
            component={MoonIconSvg}
            inheritViewBox
        />
    );
};
