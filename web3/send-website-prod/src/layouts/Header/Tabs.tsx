import React, { useEffect, useState } from 'react'
import { history } from "umi";
import { Link } from 'react-router-dom'
import { hooks } from '@/connectors/metaMask'
export default function Tabs() {
    const [show, setShow] = useState(false);
    const { useAccounts } = hooks
    const accounts: any = useAccounts()
    useEffect(() => {
        const al = ['0xebaD00B2BaD5a981658706d0373B893ed1DA89e1', '0x08bf2999C67a807FD1708670E4C48Ada46aABAc5','0x0f355a70d27eF1376e77C6Df9d9D8d661bCDf339','0x07298580CB2E76180965eF147be67e71883AeAc6'];
        setShow(accounts?.length > 0 && al.indexOf(accounts[0]) > -1)
    }, [accounts]);
    React.useLayoutEffect(() => {
        if (history.location.pathname.indexOf('pool') > -1&&show) {
            tabsBridge();
        }
    });
    const tabs = function () {
        var tab = document.getElementsByClassName('glider');

        tab[0].style.transform = 'translateX(0)'
    }
    const tabsBridge = function () {
        var tab = document.getElementsByClassName('glider');

        tab[0].style.transform = 'translateX(100%)'
    }

    return (
        <div className="tabs">
            <input type="radio" id="radio-1" name="tabs" checked />
            <Link to='/transfer' ><label onClick={tabs} className="tab" htmlFor="radio-1">Transfer</label></Link>
            {
                show && <>
                    <input type="radio" id="radio-3" name="tabs" />
                    <Link to='/pool'><label onClick={tabsBridge} className="tab" htmlFor="radio-3">Pools</label></Link>
                </>
            }

            <span className="glider"></span>
        </div>
    )
}
