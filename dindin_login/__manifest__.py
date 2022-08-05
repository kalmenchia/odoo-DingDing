# -*- coding: utf-8 -*-
{
    'name': "钉钉办公-扫码登录",
    'summary': """钉钉办公-扫码登录""",
    'description': """ 钉钉办公-扫码登录 
    refer to : https://open.dingtalk.com/document/org/scan-qr-code-to-login-3rdapp
    
    """,
    'author': "SuXueFeng",
    'website': "https://www.sxfblog.com",
    'category': 'dingding',
    'version': '1.0',
    'depends': ['base', 'ali_dindin', 'mail'],
    'installable': True,
    'application': False,
    'auto_install': True,
    'data': [
        # 'security/ir.model.access.csv',
        'data/system_conf.xml',
        'views/login_templates.xml',
    ],
    # 'qweb': [
    #     'static/xml/*.xml'
    # ]

}
