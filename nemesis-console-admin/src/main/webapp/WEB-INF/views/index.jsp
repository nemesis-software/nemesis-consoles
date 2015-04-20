<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>Admin Console | Nemesis</title>
    <meta charset="utf-8"></meta>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"></meta>
    <meta http-equiv="Pragma" content="no-cache"></meta>
    <meta http-equiv="Expires" content="0"></meta>
    <meta name="_csrf_value" content="${_csrf.token}"/>
    <meta name="_csrf_header" content="${_csrf.headerName}"/>

    <link rel="shortcut icon" href="resources/img/favicon.ico" type="image/x-icon"/>
    <c:set var="currentLocale" value="${not empty param.lang ? param.lang : 'en'}"/>
    <link href="webjars/extjs/5.2.0-SNAPSHOT/build/packages/ext-theme-gray/build/resources/ext-theme-gray-all.css"
          rel="stylesheet"/>
    <script type="text/javascript" src="webjars/extjs/5.2.0-SNAPSHOT/build/ext-all.js"></script>
    <script type="text/javascript"
            src="webjars/extjs/5.2.0-SNAPSHOT/build/packages/ext-locale/build/ext-locale-${currentLocale}.js"></script>
    <script type="text/javascript" src="webjars/extjs/5.2.0-SNAPSHOT/build/packages/ext-charts/build/ext-charts.js"></script>

    <script src="webjars/jquery/1.11.2/jquery.min.js"></script>
    <script src="webjars/jquery-atmosphere/2.2.3/jquery.atmosphere.js"></script>

    <script type="text/javascript" src="webjars/codemirror/5.1/lib/codemirror.js"></script>
    <link rel="stylesheet" type="text/css" href="webjars/codemirror/5.1/lib/codemirror.css"></link>
    <script src="webjars/codemirror/5.1/mode/q/q.js"></script>

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
<div id="expiryTime" style="display:none" value="<sec:authentication property='principal.expiryTime' />"></div>
<div id="username" style="display:none" value="<sec:authentication property='principal.username' />"></div>


<div class="x-mask splashscreen" style="top:0;left:0;" id="splash-background"></div>
<div class="x-mask-msg splashscreen" id="splash-screen">
    <div class="x-splash-icon"></div>
    <div class="x-mask-msg-inner">
        <div class="x-mask-msg-text">Loading Admin Console. Please wait ...</div>
    </div>
</div>
</body>
</html>
