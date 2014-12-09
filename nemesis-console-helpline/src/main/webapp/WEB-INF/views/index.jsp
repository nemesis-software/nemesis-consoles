<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>Helpline Console | Nemesis</title>
    <meta charset="utf-8"></meta>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"></meta>
    <meta http-equiv="Pragma" content="no-cache"></meta>
    <meta http-equiv="Expires" content="0"></meta>
    <link rel="shortcut icon" href="resources/img/favicon.ico" type="image/x-icon"/>
    <c:set var="currentLocale" value="${not empty param.lang ? param.lang : 'en'}"/>
    <link href="webjars/extjs/5.0.1/build/packages/ext-theme-gray/build/resources/ext-theme-gray-all.css"
          rel="stylesheet"/>
    <script type="text/javascript" src="webjars/extjs/5.0.1/build/ext-all.js"></script>
    <script type="text/javascript"
            src="webjars/extjs/5.0.1/build/packages/ext-locale/build/ext-locale-${currentLocale}.js"></script>

    <link rel="stylesheet" type="text/css" href="resources/css/common.css"/>
    <link rel="stylesheet" type="text/css" href="resources/css/console.css"/>
    <script type="text/javascript" src="resources/app/locale/app-${currentLocale}.js"></script>
    <script type="text/javascript" src="resources/app/app.js"></script>

    <script src="webjars/jquery/1.10.2/jquery.min.js"></script>
    <script src="webjars/jquery-atmosphere/2.1.6/jquery.atmosphere.js"></script>
    <script src="webjars/soundmanager2/2.97a.20131201/script/soundmanager2-nodebug-jsmin.js"></script>
</head>
<body>
<div id="rest-base-url" style="display:none" url="${restBaseUrl}" locale="${currentLocale}">${restBaseUrl}</div>
<div id="contextPath" style="display:none"
     ctxPath="${pageContext.request.contextPath}">${pageContext.request.contextPath}</div>
<div id="security" style="display:none" username="<sec:authentication property="principal.username" />"
     token="${_csrf.token}"></div>

<div class="x-mask splashscreen" style="top:0;left:0;" id="splash-background"></div>
<div class="x-mask-msg splashscreen" id="splash-screen">
    <div class="x-splash-icon"></div>
    <div class="x-mask-msg-inner">
        <div class="x-mask-msg-text">Loading Helpline Console. Please wait ...</div>
    </div>
</div>
</body>
</html>
