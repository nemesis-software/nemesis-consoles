<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>Admin Console | Nemesis</title>
    <meta charset="utf-8"/>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>
    <meta http-equiv="Pragma" content="no-cache"/>
    <meta http-equiv="Expires" content="0"/>
    <meta name="_csrf_value" content="${_csrf.token}"/>
    <meta name="_csrf_header" content="${_csrf.headerName}"/>

    <link rel="shortcut icon" href="resources/img/favicon.ico" type="image/x-icon"/>
    <c:set var="currentLocale" value="${not empty param.lang ? param.lang : 'en_GB'}"/>
    <link href="webjars/extjs/6.2.0/build/classic/theme-gray/resources/theme-gray-all.css"
          rel="stylesheet"/>
    <script type="text/javascript" src="webjars/extjs/6.2.0/build/ext-all.js"></script>
    <script type="text/javascript"
            src="webjars/extjs/6.2.0/build/classic/locale/locale-${currentLocale}.js"></script>
    <script type="text/javascript" src="webjars/extjs/6.2.0/build/packages/charts/classic/charts.js"></script>

    <script src="webjars/jquery/1.12.1/jquery.min.js"></script>

    <script type="text/javascript" src="webjars/codemirror/5.1/lib/codemirror.js"></script>
    <link rel="stylesheet" type="text/css" href="webjars/codemirror/5.1/lib/codemirror.css"/>
    <script src="webjars/codemirror/5.1/mode/q/q.js"></script>
    <script src="webjars/codemirror/5.1/mode/sql/sql.js"></script>

    <script src="webjars/sockjs-client/1.0.3/dist/sockjs-0.3.4.js"></script>
    <script src="webjars/stomp-websocket/2.3.4/lib/stomp.js"></script>

    <link rel="stylesheet" type="text/css" href="resources/css/common.css"/>
    <link rel="stylesheet" type="text/css" href="resources/css/console.css"/>

    <script type="text/javascript" src="resources/app/locale/app-${currentLocale}.js"></script>
    <script type="text/javascript" src="resources/app/app.js"></script>

    <script type="text/javascript">
        Ext.Loader.setConfig({enabled: true});
        Ext.Loader.setPath('Ext.ux', '${pageContext.request.contextPath}/resources/app/view/ux');

    </script>
</head>
<body>
<div id="rest-base-url" style="display:none" url="${restBaseUrl}" locale="${currentLocale}">${restBaseUrl}</div>
<div id="website-base-url" style="display:none" url="${websiteBaseUrl}">${websiteBaseUrl}</div>
</body>
<div id="contextPath" style="display:none"
     ctxPath="${pageContext.request.contextPath}">${pageContext.request.contextPath}</div>
<div id="security" style="display:none" token="${_csrf.token}"></div>

<div id="token" style="display:none" value="<sec:authentication property='principal.token' htmlEscape="false" />"></div>

<div class="x-mask splashscreen" style="top:0;left:0;" id="splash-background"></div>
<div class="x-mask-msg splashscreen" id="splash-screen">
    <div class="x-splash-icon"></div>
    <div class="x-mask-msg-inner">
        <div class="x-mask-msg-text">Loading Admin Console. Please wait ...</div>
    </div>
</div>
</body>
</html>
