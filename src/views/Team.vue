<template>
    <div class="home">
        <Header />
        <section class="section-animate section-a"></section>
        <div class="section-inner-center">
            <div class="team_warp">
                <h2>我的团队</h2>
                <table class="data additional-toggle" style="display: table">
                    <tbody >
                        <tr class="js-stagger">
                            <td >团队人数</td>
                            <td >
                                70
                            </td>
                        </tr>
                        <tr class="js-stagger">
                            <td >团队收益</td>
                            <td >
                                70000 <span >USDT /</span> 222229.6
                                <span >SpaceX</span>
                            </td>
                        </tr>
                        <tr class="js-stagger">
                            <td >团队算力</td>
                            <td >
                                2000000 <span >/ ALL</span>
                            </td>
                        </tr>
                        <tr class="js-stagger">
                            <td >我的邀请人数</td>
                            <td >
                                100
                            </td>
                        </tr>
                        <tr class="js-stagger">
                            <td >我的邀请奖励</td>
                            <td >
                                1000USDT
                            </td>
                        </tr>
                        <tr class="js-stagger">
                            <td >上级地址</td>
                            <td style="text-align: right;">
                                <span class="address_txt">0xE02785c089bF7025dF03A5e022bF8c7a5319177f</span>
                            </td>
                        </tr>
                        <tr class="js-stagger">
                            <td >我的邀请链接</td>
                            <td style="text-align: right;">
                                <span class="address_txt">0xE02785c089bF7025dF03A5e022bF8c7a5319177f</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="ref_wrapper">
			        <span class="text">复制邀请链接</span>
		        </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<style scoped lang="less">
.ref_wrapper{
    margin-top: 20px;
    cursor: pointer;
    text-align: center;
    padding: 10px 15px;
    border: 1px solid #fff;
}
.team_warp{
    h2{
        text-align: left;
    }
}
.ref_wrapper{

}
.address_txt{
    color: #fff !important;
    display: inline-block;
    max-width: 200px;
    text-align: right;
    cursor: text;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
table {
    width: 100%;
    margin-top: 30px;
}
table td {
    font: 600 16px/18px D-DIN-Regular,Arial,Verdana,sans-serif;
    text-align: left;
    color: #fff;
    padding: 20px 0;
    border-bottom: 1pt solid rgba(255,255,255,.3);
}
table.data td {
    text-align: right;
}
table.data td:first-child {
    font: 14px/18px D-DIN-Bold,Arial,Verdana,sans-serif;
    text-align: left;
}
table.data td {
    text-align: right;
}
table.data td span {
    color: #868686;
}
</style>
