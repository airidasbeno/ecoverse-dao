import {FC} from "react";
import {useAccount} from "wagmi";

const Account: FC = () => {
    const { address } = useAccount();

    return (
        <h1>{ address }</h1>
    );
};

export default Account;
