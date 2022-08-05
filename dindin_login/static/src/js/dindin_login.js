let prot = window.location.protocol;
let host = window.location.host;

function get_decode_url() {
    let url_target = '';
    $.ajax({
        async: false,
        url: "/dindin_login/get_url",
        data: {"local_url": prot + "//" + host},
        success: function (data) {
            url_target = data.encode_url;
        },
        dataType: "json"
    });
    return url_target
}
/*
* 解释一下goto参数，参考以下例子：
* var url = encodeURIComponent('http://localhost.me/index.php?test=1&aa=2');
* var goto = encodeURIComponent('https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=AppKey&response_type=code&scope=snsapi_login&state=STATE&redirect_uri='+url)
*/
let url = get_decode_url();
let obj = DDLogin({
    id: "login_container",
    goto: encodeURIComponent(url),
    style: "border:none;background-color:#FFFFFF;",
    href: "",
    width: "260",
    height: "350"
});

let hanndleMessage = function (event) {
    let origin = event.origin;
    if (origin == "https://login.dingtalk.com") { //判断是否来自ddLogin扫码事件。
        let loginTmpCode = event.data;            //拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
        console.log(">>>:loginTmpCode", loginTmpCode);
        //获取到loginTmpCode后就可以在这里构造跳转链接进行跳转了
        window.location.href = url + "&loginTmpCode=" + loginTmpCode;
    }
};

if (typeof window.addEventListener != 'undefined') {
    window.addEventListener('message', hanndleMessage, false);
} else if (typeof window.attachEvent != 'undefined') {
    window.attachEvent('onmessage', hanndleMessage);
}
/*
开发流程 : ref https://open.dingtalk.com/document/org/scan-qr-code-to-login-3rdapp

方式一：使用钉钉提供的扫码登录页面
在企业Web系统里，用户点击使用钉钉扫描登录时第三方Web系统跳转到如下地址：
https://oapi.dingtalk.com/connect/qrconnect?appid=AppKey&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=REDIRECT_URI
url里的参数需要换成第三方Web系统对应的参数。在钉钉用户扫码登录并确认后，会302到你指定的redirect_uri，并向url参数中追加临时授权码code及state两个参数。

注意 参数redirect_uri=REDIRECT_URI涉及的域名，需和登录配置的回调域名一致，否则会提示无权限访问。


** we use method 2 for dindin_login.
方式二：支持网站将钉钉登录二维码内嵌到自己页面中
用户使用钉钉扫码登录后JS会将loginTmpCode返回给网站。
JS钉钉登录主要用途：网站希望用户在网站内就能完成登录，无需跳转到钉钉域下登录后再返回，提升钉钉登录的流畅性与成功率。
网站内嵌二维码钉钉登录JS实现办法：
i. 在页面中先引入如下JS文件（支持HTTPS）
   <script src="https://g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js"></script>
ii. 在需要使用钉钉登录的地方实例以下JS对象
// * 解释一下goto参数，参考以下例子：
// * var url = encodeURIComponent('http://localhost.me/index.php?test=1&aa=2');
// * var goto = encodeURIComponent('https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=AppKey&response_type=code&scope=snsapi_login&state=STATE&redirect_uri='+url)
var obj = DDLogin({
     id:"login_container",//这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
     goto: "", //请参考注释里的方式
     style: "border:none;background-color:#FFFFFF;",
     width : "365",
     height: "400"
 });

1. 可以通过以下代码获取loginTmpCode：


2. 通过JS获取到loginTmpCode后，需要构造并跳转到如下链接：
https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=AppKey&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=REDIRECT_URI&loginTmpCode=loginTmpCode

3. 服务端通过临时授权码获取授权用户的个人信息。
调用sns/getuserinfo_bycode接口获取授权用户的个人信息，详情请参考根据sns临时授权码获取用户信息。
https://open.dingtalk.com/document/app/obtain-the-user-information-based-on-the-sns-temporary-authorization?spm=ding_open_doc.document.0.0.6d294791H9i1x3#topic-1995619
注意 通过临时授权码Code获取用户信息，临时授权码只能使用一次。

4. 根据unionid获取userid。
调用user/getbyunionid接口获取userid，详情请参考根据unionid获取用户信息。
https://open.dingtalk.com/document/app/query-a-user-by-the-union-id?spm=ding_open_doc.document.0.0.6d294791H9i1x3#topic-1960045
说明 根据unionid获取userid，需要创建企业内部应用（小程序或微应用），使用内部应用的Appkey和AppSecret调用接口access_token。

5. 根据userid获取用户详情。
调用user/get接口获取用户信息，详情请参考获取用户详情。
https://open.dingtalk.com/document/app/query-user-details?spm=ding_open_doc.document.0.0.6d294791H9i1x3#topic-1960047



*/