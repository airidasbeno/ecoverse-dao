import {Skeleton} from "antd";
import Jazzicon, {jsNumberForAddress} from "react-jazzicon";

const JazzIcons = ({seed, size}: { seed: string; size?: number }) => {
    if (!seed) return <Skeleton.Avatar active size={40}/>;

    if (size) return <Jazzicon seed={jsNumberForAddress(seed)} diameter={size}/>;

    return <Jazzicon seed={jsNumberForAddress(seed)}/>;
};

export default JazzIcons;
