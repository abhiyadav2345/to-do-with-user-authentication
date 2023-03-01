import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { ReactComponent as MoonIconSvg } from '../../images/icon-cross.svg';
export const CrossIcon = () => {
    return <SvgIcon component={MoonIconSvg} inheritViewBox />;
};
