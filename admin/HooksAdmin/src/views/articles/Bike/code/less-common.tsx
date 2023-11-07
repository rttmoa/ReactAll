const page = 
`@import './default.less';
@import './loading.less';
ul,li{
    list-style: none;
}
.clearfix{
    &::after{
        content:' ';
        clear:both;
        display: block;
        visibility: hidden;
    }
}
.container{
    .nav-left{
        background-color:#001529;
        color: #ffffff;
        height: calc(100vh);
    }
    .main{
        height: calc(100vh);
        background-color: @colorL;
        overflow: auto;
    }
    .content{
        position: relative;
        padding: 20px;
    }
}

.content-wrap{
    background: #ffffff;
    border: 1px solid #e8e8e8;
    margin-top: -3px;
    .ant-table-wrapper{
        margin-left: -1px;
        margin-right: -2px;
    }
}
.ant-card{
    button{
        margin-right: 10px;
    }
}`
export default page
