$(function () {
    let searchParams = new URLSearchParams(window.location.search)
    var Page = '';
    if (searchParams.has('page')) {
        Page = searchParams.get('page')
    } else {
        var VersionResults = (function () {
            var LocalVersionCIPP = null;
            $.ajax({
                async: false,
                type: 'GET',
                url: '/version_latest.txt',
                success: function (data) {
                    LocalVersionCIPP = data
                }
            });
            return LocalVersionCIPP;
        })();

        var VersionResults = (function () {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': '/api/GetVersion?localversion=' + VersionResults,
                'dataType': "json",
                'success': function (data) {
                    json = data;
                }
            });
            return json;
        })();
        document.getElementById('dashversionlocalcipp').innerHTML = VersionResults.LocalCIPPVersion;
        document.getElementById('dashversionremotecipp').innerHTML = VersionResults.RemoteCIPPVersion;
        document.getElementById('dashversionlocalcippapi').innerHTML = VersionResults.LocalCIPPAPIVersion;
        document.getElementById('dashversionremotecippapi').innerHTML = VersionResults.RemoteCIPPAPIVersion;

        if (VersionResults.OutOfDateCIPP == true) {
            console.log("CIPP Remote and Local Versions are Different")
            document.getElementById('versionalertcipp').innerHTML = '<div><strong>WARNING:&nbsp;&nbsp;</strong> The version of CIPP you are running is out of date. Your version is ' + VersionResults.LocalCIPPVersion + ' and the latest version is ' + VersionResults.RemoteCIPPVersion + '. Please Update your CIPP Repository.</div>';
            document.getElementById('versionalertcipp').classList.remove("d-none");
        }

        if (VersionResults.OutOfDateCIPPAPI == true) {
            console.log("CIPPAPI Remote and Local Versions are Different")
            document.getElementById('versionalertcippapi').innerHTML = '<div><strong>WARNING:&nbsp;&nbsp;</strong> The version of CIPP-API you are running is out of date. Your version is ' + VersionResults.LocalCIPPAPIVersion + ' and the latest version is ' + VersionResults.RemoteCIPPAPIVersion + '. Please Update your CIPP-API Repository.</div>';
            document.getElementById('versionalertcippapi').classList.remove("d-none");
        }
    }


    //scratch this after 1.5
    var jsonOptions = (function () {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': '.auth/me',
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })();
    var readerrole = $.inArray('reader', jsonOptions.clientPrincipal.userRoles)
    if (readerrole != -1) {
        document.getElementById('oldrole').classList.remove("d-none");
    }
});
