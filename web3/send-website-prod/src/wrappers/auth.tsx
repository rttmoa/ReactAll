import { Navigate, Outlet } from 'umi'
import { hooks } from '@/connectors/metaMask'
export default (props: any) => {
    const { useAccounts } = hooks;
    const accounts: any = useAccounts();
    const al = ['0x07298580CB2E76180965eF147be67e71883AeAc6', '0x08bf2999C67a807FD1708670E4C48Ada46aABAc5', '0xebaD00B2BaD5a981658706d0373B893ed1DA89e1', '0x0f355a70d27eF1376e77C6Df9d9D8d661bCDf339'];
    if (accounts?.length > 0 && al.indexOf(accounts[0]) > -1) {
        return <Outlet />;
    } else {
        return <Navigate to="/" />;
    }
}