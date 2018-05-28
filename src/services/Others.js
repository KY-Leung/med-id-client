import withQuery from "with-query";

import delay from 'await-delay'

import Cookies from 'universal-cookie';

const base = "/api/v1/index.php";


const cookies = new Cookies();


class Druidapi {

    setCookie(c_name, value, exdays, path) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        if (path !== undefined) c_value += "; path=" + path;
        document.cookie = c_name + "=" + c_value;
    }

    getCookie(c_name) {
        var c_value = document.cookie;
        var c_start = c_value.indexOf(" " + c_name + "=");
        if (c_start == -1) {
            c_start = c_value.indexOf(c_name + "=");
        }
        if (c_start == -1) {
            c_value = null;
        }
        else {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = c_value.length;
            }
            c_value = unescape(c_value.substring(c_start, c_end));
        }
        return c_value;
    }

    removeItem(key) {
        localStorage.removeItem(key);
        // cookies.remove(key, {path: '/'});
//        this.setCookie(key, '', null, '/');
    }

    getAllItems() {
        let alljson = localStorage.getAll();


        if ((alljson === "undefined") || !(alljson)) {
            return undefined;
        }

        return alljson;
    }

    getItem(key) {
        var logindatajson = localStorage.getItem(key);
        // // let logindatajson = cookies.get(key);
        // let logindatajson = this.getCookie(key);


        if ((logindatajson === "undefined") || !(logindatajson)) {
            return {};
        }

        if (typeof logindatajson === 'string') {
            if (logindatajson === "") {
                return {};
            }
            try {

                logindatajson = JSON.parse(logindatajson);
            }
            catch (e) {
                return logindatajson;
            }
        }


        return logindatajson;
    }

    setItem(key, obj) {
        let jsonstr = JSON.stringify(obj);
        localStorage.setItem(key, jsonstr )
        // cookies.set(key, jsonstr );
        // this.setCookie(key, jsonstr, null, '/');
        // this.getItem(key);
    }

    setLoginData() {
        this.logindata = this.getItem('logindata');
    }

    getHeaders(options) {
        const headers = new Headers();
        if (!(options.body instanceof FormData)) {
            headers.append('Content-Type', 'application/json');
        }

        var accessToken = this.logindata && this.logindata.accessToken;
        if (accessToken) headers.append("accessToken", accessToken);


        return headers;
    }

    user(id) {

        const opts = {
            url: '/users/' + id,
        };

        return this.callApi(opts);

    }

    getUserTagsAssignment() {

        const opts = {
            url: this.withAccount(`/users/${this.logindata.userId}/systemTags`)
        };

        return this.callApi(opts);

    }

    getAllUsers() {
        const opts = {
            url: this.withAccount('/users/'),
            urlParams: { userId: this.logindata.userId }
        };
        return this.callApi(opts);
    }

    withUser(inurl) {
        var url = '/users/' + this.logindata.userId + inurl;
        return url;
    }

    withAccount(inurl) {
        var url = '/accounts/' + this.logindata.accountId + inurl;
        return url;
    }

    addSort(data, urlParams) {

        var sobj = {};

        if (!data.sortField)
            return urlParams;

        switch (data.sortOrder) {
            case 'ascending':
                sobj.orderbyAsc = data.sortField
                break;
            case 'descending':
                sobj.orderby = data.sortField
                break;
            default:
                break;
        }


        urlParams = Object.assign({}, sobj, urlParams);

        return urlParams;

    }

    getFilter(data) {
        let filter = (data.systemValue === 'ALL') ? {} : { sid: data.systemValue };
        filter = { ...filter, ...data.filter };
        return JSON.stringify(filter);
    }

    getFilterSystemLandscape(data) {
        let filter = (data.systemValue === 'ALL') ? {} : { systemId: data.systemValue };
        filter = { ...filter, ...data.filter };
        return JSON.stringify(filter);
    }

    saveFilterVariant(payload) {
        const opts = {
            url: this.withAccount('/reports/filter'),
            method: 'POST',
            body: JSON.stringify(payload)
        };
        return this.callApi(opts);
    }

    loadFilterVariants(context) {
        const opts = {
            url: this.withAccount('/reports/filters'),
            urlParams: {
                section: encodeURIComponent(context)
            }
        };
        return this.callApi(opts);
    }

    jobs(data) {

        var urlParams = {
            userId: this.logindata.userId,
            page: data.page,
            perPage: data.perPage,
        };


        urlParams = this.addSort(data, urlParams);

        const opts = {
            url: this.withAccount('/jobs/'),
            urlParams: urlParams,
        };
        return this.callApi(opts);
    }

    table(data) {
        const tablename = data.tablename;
        const tableUrl = data.tableUrl;

        var urlParams = {
            userId: tableUrl === "server" ? "" : this.logindata.userId,
            page: data.page,
            perPage: data.perPage,
            datestr: data.dateRangeValue,
            filter: tableUrl === "server" ? JSON.stringify({ sid: "000" }) : this.getFilter(data),
            sid: (data.systemValue === 'ALL') ? '' : data.systemValue,
            search: JSON.stringify(data.search),
        };

        if (data.tagsFilter && data.tagsFilter === 'withoutTags') {
            urlParams.tag_ids = 'null';
        } else if (data.tagsFilter && data.tagsFilter.length > 0) {
            urlParams.tag_ids = data.tagsFilter;
        }


        urlParams = this.addSort(data, urlParams);

        const opts = {
            url: this.withAccount('/' + tableUrl),
            urlParams: urlParams
        };
        return this.callApi(opts);
    }
    shareToSlack(data){
        data = data || {};
        data.platform='slack';
        data.userId = this.logindata.userId;
        const opts = {
            method: 'POST',
            url: '/accounts/' + this.logindata.accountId + '/share',
            body: JSON.stringify(data),
        };
        return this.callApi(opts);
    }
    calendarEvents(data) {
        var urlParams = {
        };
        const opts = {
            url: '/account/' + this.logindata.accountId + '/calendarevents' + '?datestr=' + data.start + '--' + data.end
        };
        return this.callApi(opts);
    }

    createCalendarEvent(data) {
        const opts = {
            method: 'PUT',
            url: '/account/' + this.logindata.accountId + '/calendarevents',
            body: JSON.stringify(data),
        };
        return this.callApi(opts);
    }

    editCalendarEvent(data) {
        const opts = {
            method: 'POST',
            url: '/account/' + this.logindata.accountId + '/calendarevents/',
            body: JSON.stringify(data),
        };
        return this.callApi(opts);
    }

    deleteCalendarEvent(data) {
        const opts = {
            method: 'DELETE',
            url: '/account/' + this.logindata.accountId + '/calendarevents/' + data,
        };
        return this.callApi(opts);
    }

    systemLandscape(data) {
        let urlParams = {
            userId: this.logindata.userId,
            filterstr: this.getFilterSystemLandscape(data)
        };
        const userAutO = this.logindata;
        const opts = {
            url: '/accounts/' + userAutO.accountId + '/reports/healthoverview',
            urlParams: urlParams
        };
        return this.callApi(opts, false);
    }

    systemLandscapeData(systemId) {
        let urlParams = {
            userId: this.logindata.userId
        };
        const userAutO = this.logindata;
        const opts = {
            url: this.withAccount(`/systems/${systemId}/config`),
            urlParams: urlParams
        };
        return this.callApi(opts, false);
    }

    getDownloads() {
        const opts = {
            url: this.withAccount('/dlcollector/downloads')
        };
        return this.callApi(opts, false);
    }

    getAllTags() {
        const opts = {
            url: this.withAccount('/tags?entities=true&entity_type=System')
        };
        return this.callApi(opts);
    }

    deleteTag(tag) {
        const opts = {
            url: this.withAccount(`/tags/${tag.tag_id}`),
            method: 'DELETE'
        };
        return this.callApi(opts);
    }

    assignTagToSystems(payload) {
        const opts = {
            url: this.withAccount('/tags/systems'),
            method: 'POST',
            body: JSON.stringify(payload)
        };
        return this.callApi(opts);
    }

    unassignTag(tag, entity_type, entity_name) {
        const opts = {
            url: this.withAccount(`/tags/${tag.tag_id}/entity`),
            method: 'DELETE',
            body: JSON.stringify({ entity_type, entity_name })
        };
        return this.callApi(opts);
    }

    createChannel(tableUrl, data) {
        let urlParams = {
            userId: this.logindata.userId
        };

        data.creator = this.logindata.email;

        const opts = {
            method: "PUT",
            url: this.withAccount('/' + tableUrl),
            urlParams: urlParams,
            body: JSON.stringify(data),
        };
        return this.callApi(opts);
    }

    editChannel(tableUrl, data) {
        const opts = {
            method: "POST",
            url: this.withAccount(`/${tableUrl}/${data.id}`),
            body: JSON.stringify(data),
        };
        return this.callApi(opts);
    }

    deleteChannel(tableUrl, data) {
        const opts = {
            method: "DELETE",
            url: this.withAccount(`/${tableUrl}/${data.id}`),
        };
        return this.callApi(opts);
    }

    createUserAccount(tableUrl, data) {
        const opts = {
            method: "PUT",
            url: this.withAccount('/' + tableUrl + '/' + data.email),
            body: JSON.stringify(data),
        };
        return this.callApi(opts);
    }

    editUserAccount(tableUrl, data) {
        const opts = {
            method: "POST",
            url: this.withAccount(`/${tableUrl}/${data.userId}`),
            body: JSON.stringify(data),
        };
        return this.callApi(opts);
    }

    deleteUserAccount(tableUrl, data) {
        const opts = {
            method: "DELETE",
            url: this.withAccount(`/${tableUrl}/${data.userId}`),
        };
        return this.callApi(opts);
    }

    assignAccountSystems(tableUrl, userId, systems) {
        const opts = {
            method: "POST",
            url: this.withAccount(`/${tableUrl}/${userId}/systems`),
            body: JSON.stringify(systems)
        };
        return this.callApi(opts);
    }

    assignAccountChannels(userId, channels) {
        const opts = {
            method: "POST",
            url: this.withAccount(`/updateUserChannels/${userId}`),
            body: JSON.stringify(channels)
        };
        return this.callApi(opts, false);
    }

    getAccountChannelAssignments(userId) {
        const opts = {
            method: "GET",
            url: this.withAccount(`/users/${userId}/channels`),
        };
        return this.callApi(opts);
    }

    getAccountSystemAssignments(userId) {
        const opts = {
            method: "GET",
            url: this.withAccount(`/users/${userId}/systems`),
        };
        return this.callApi(opts);
    }

    sendFeedback(data) {
        const opts = {
            method: 'POST',
            url: this.withAccount('/feedback/' + this.logindata.userId),
            body: data,
        };
        return this.callApi(opts);
    }

    getIncidentSystemAvailability(data) {
        const options = {
            url: this.withAccount('/reports/availability'),
            urlParams: {
                userId: this.logindata.userId,
                datestr: data.dateRangeValue,
                sid: data.sid
            }
        }
        return this.callApi(options);
    }

    getChart(data) {
        const chartUrl = data.chartUrl
        const urlParams = {
            userId: this.logindata.userId,
            datestr: data.dateRangeValue,
            filter: this.getFilter(data),
            sid: (data.systemValue === 'ALL') ? '' : data.systemValue,
        };
        const opts = {
            url: this.withAccount('/' + chartUrl),
            urlParams: urlParams
        };
        return this.callApi(opts);
    }

    getSystemsKPI() {
        const opts = {
            url: this.withAccount('/kpi'),
            // mock: 'KPI'
        };
        return this.callApi(opts);
    }

    getSystemsKPIMetrics(data) {
        const urlParams = {
            userId: this.logindata.userId,
            datestr: data.dateRangeValue,
            metricId: data.metricId,
            sid: data.systemValue,
        };

        const opts = {
            method: 'GET',
            url: this.withAccount('/reports/metrics/list/v2'),
            urlParams: urlParams,
            // mock: 'metricsperformance'
        };
        return this.callApi(opts, false);
    }

    getIncidentSummary(incidentId) {
        const opts = {
            method: 'GET',
            url: this.withAccount('/reports/incidentSummary/' + incidentId),
            // mock: 'summary'
        };
        return this.callApi(opts, false);
    }

    getIncidentSeasonality(incidentId) {
        const opts = {
            method: 'GET',
            url: this.withAccount('/reports/incidentSeasonality/' + incidentId)
        };
        return this.callApi(opts, false);
    }

    getIncidentContext(incidentId) {
        const opts = {
            method: 'GET',
            url: this.withAccount('/reports/metrics/incidentContext/' + incidentId)
        };
        return this.callApi(opts, false);
    }

    getIncidentCorrelation(incidentId) {
        const urlParams = {
            incidentId: incidentId
        };
        const opts = {
            method: 'GET',
            url: this.withAccount('/metrics/correlations/v2'),
            urlParams: urlParams,
            // mock: 'correlation'
        };
        return this.callApi(opts, false);
    }

    getCorrelatedCharts(selectedGroup, instance, datestr) {
        const urlParams = {
            instance: instance,
            monitorclass: selectedGroup.monitorclass,
            "System&object": selectedGroup.object,
            metric: selectedGroup.metric,
            datestr: datestr
        };
        const opts = {
            method: 'GET',
            url: this.withAccount('/reports/metrics/list/v2'),
            urlParams: urlParams,
        };
        return this.callApi(opts, false);
    }

    getIncidentCoOccurrences(incidentId) {

        const urlParams = {
            su: '1',
        };
        const opts = {
            method: 'GET',
            url: this.withAccount(`/reports/metrics/incidentCooccurrences/${incidentId}`),
            urlParams,
            // mock: 'occurrences'
        };
        return this.callApi(opts, false);
    }

    getCorrelatedData(incidentId, identifierType) {
        const urlParams = {
            su: '1',
            identifierType
        };

        const opts = {
            method: 'GET',
            url: this.withAccount(`/reports/metrics/incidentCooccurrences/${incidentId}`),
            urlParams,
            // mock: 'correlationcharts'
        };
        return this.callApi(opts, false);
    }

    getIncidentTrendAnalysis(incidentId) {
        const opts = {
            method: 'GET',
            url: this.withAccount('/reports/incidentTrends/' + incidentId)
        };
        return this.callApi(opts, false);
    }

    getTimeline(data) {
        const timeLineUrl = data.timeLineUrl

        const urlParams = {
            userId: this.logindata.userId,
            datestr: data.dateRangeValue,
            filter: this.getFilter(data),
            sid: (data.systemValue === 'ALL') ? '' : data.systemValue,
        };

        const opts = {
            url: this.withAccount('/' + timeLineUrl),
            urlParams: urlParams,
            mock: 'timeLines'
        };
        return this.callApi(opts);
    }

    getKGS(data) {
        data.chartUrl = 'reports/kgs';
        return this.getChart(data);
    }

    getIncidentCounts(data) {
        data.chartUrl = 'reports/incidentcounts';
        return this.getChart(data);
    }

    updateKGIMetricWeight(data) {
        const urlParams = {
            userId: this.logindata.userId,
        };

        const opts = {
            url: this.withAccount('/kpi/metadata'),
            method: 'POST',
            urlParams: urlParams,
            body: JSON.stringify({
                weight: data.weight,
                kpi: data.kpiId
            })
        };
        return this.callApi(opts);
    }

    tips() {
        const opts = {
            url: this.withAccount('/tips/'),
            urlParams: { userId: this.logindata.userId },
        };
        return this.callApi(opts);
    }

    cta() {
        const opts = {
            url: this.withAccount('/cta/'),
            urlParams: { userId: this.logindata.userId },
        };
        return this.callApi(opts);
    }

    editCTA(data) {
        const opts = {
            method: 'POST',
            url: this.withAccount('/cta/' + data.id + "/"),
            body: JSON.stringify(data),
        };
        return this.callApi(opts);
    }

    mainMenu() {
        const opts = {
            method: 'GET',
            url: this.withAccount(this.withUser('/menu/main/')),
            urlParams: { userId: this.logindata.userId },
        };
        return this.callApi(opts);
    }


    tableHeaders() {
        const opts = {
            url: this.withAccount('/rctui/tableHeaders/'),
        };
        return this.callApi(opts);
    }

    createSAPSystem(data) {
        const opts = {
            method: 'PUT',
            url: this.withAccount('/systems/' + data.sysId + "/"),
            body: JSON.stringify(data),
        };
        return this.callApi(opts);
    }

    editSAPSystem(data) {
        const opts = {
            method: 'POST',
            url: this.withAccount('/systems/' + data.sysId + "/"),
            body: JSON.stringify(data),
        };
        return this.callApi(opts);
    }

    deleteSAPSystem(data) {
        const opts = {
            method: 'DELETE',
            url: this.withAccount('/systems/' + data + "/"),
        };
        return this.callApi(opts);
    }

    deploySAPSystem(data) {
        const opts = {
            method: 'POST',
            url: this.withAccount('/systems/' + data + '/deploy')
        };
        return this.callApi(opts);
    }

    deletePolicy(tableUrl, data) {
        const opts = {
            method: "DELETE",
            url: this.withAccount(`/${tableUrl}/${data.id}`),
        };
        return this.callApi(opts);
    }

    editPolicy(tableUrl, data) {
        let urlParams = {
            userId: this.logindata.userId
        };

        const opts = {
            method: 'POST',
            url: this.withAccount('/incidents/policy'),
            urlParams: urlParams,
            body: JSON.stringify(data),
        };

        return this.callApi(opts);
    }

    createPolicy(tableUrl, data) {
        let urlParams = {
            userId: this.logindata.userId
        };

        const opts = {
            method: 'POST',
            url: this.withAccount('/incidents/policy'),
            urlParams: urlParams,
            body: JSON.stringify(data),
        };
        return this.callApi(opts);
    }

    createService(data) {
        const opts = {
            method: 'POST',
            url: this.withAccount('/000/server'),
            body: JSON.stringify(data),
        };
        return this.callApi(opts);
    }

    deleteService(data) {
        const opts = {
            method: "DELETE",
            url: this.withAccount('/000/server'),
            body: JSON.stringify({name: data.name})
        };
        return this.callApi(opts);
    }

    editService(data) {
        const opts = {
            method: 'PUT',
            url: this.withAccount('/000/server'),
            body: JSON.stringify(data),
        };

        return this.callApi(opts);
    }

    systems() {
        const opts = {
            url: this.withAccount('/systems/'),
            urlParams: { userId: this.logindata.userId }
        };
        return this.callApi(opts);
    }

    getSettingsDownloadLink(name) {
        const userAutO = this.logindata;
        const url = base + "/accounts/" + userAutO.accountId + "/collectors/" + name + "?accessToken=" + userAutO.accessToken;

        return url;
    }

    getSystemDownloadLink(sysId) {
        const userAutO = this.logindata;
        const url = base + "/accounts/" + userAutO.accountId + "/systems/" + sysId + "?accessToken=" + userAutO.accessToken;
        return url;
    }

    workloadHourly(data) {
        const opts = {
            url: this.withAccount('/workload_stats/hourly/'),
            urlParams: data,
        };
        return this.callApi(opts);
    }

    switchAccount(orgName) {
        var cachedEmail = this.getItem("email");
        var cachedPassword =this.getItem("password");
        if(!cachedEmail || !cachedPassword){
            alert("Account switching failed to retrieve cached credentials. Please login again");
        }
        var logindata = {
            "email": this.getItem("email"),
            "password": this.getItem("password") 
            , "orgName": orgName
        };

        this.setItem(this.email + "defaultOrgname", orgName);

        const headers = new Headers({
            "Content-Type": "application/json",
        });

        const opts = {
            url: '/sessions/',
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(logindata),
        };

        return this.callApi(opts);


    }
    getAccountInfo(data) {
        const opts = {
            url: "/accounts/" + this.logindata.accountId,
            method: "GET"
        }
        return this.callApi(opts);
    }

    getAccountServiceProfiles() {
        const opts = {
            url: "/accounts/" + this.logindata.accountId + "/service-profile",
            method: "GET"
        }
        return this.callApi(opts);
    }


    updateAccountInfo(data) {
        const headers = new Headers({
            "Content-Type": "application/json",
            "accessToken": (this.logindata && this.logindata.accessToken) || ""
        });

        const opts = {
            url: '/accounts/' + this.logindata.accountId,
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        };

        return this.callApi(opts);
    }
    updateAccountServiceProfile(data) {
        const headers = new Headers({
            "Content-Type": "application/json",
            "accessToken": (this.logindata && this.logindata.accessToken) || ""
        });

        const opts = {
            url: '/accounts/' + this.logindata.accountId + "/service-profile",
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        };

        return this.callApi(opts);

    }
    updateUserPhoto(data) {
        const opts = {
            url: '/users/' + this.logindata.userId,
            method: 'POST',
            body: data,
        };

        return this.callApi(opts);

    }
    updateUserInfo(data) {
        const opts = {
            url: '/users/' + this.logindata.userId,
            method: 'POST',
            body: JSON.stringify(data)
        };

        return this.callApi(opts);
    }
    updateUserPassword(data) {
        const opts = {
            url: '/users/password/' + this.logindata.userId,
            method: 'POST',
            body: JSON.stringify(data)
        };

        return this.callApi(opts);
    }

    createUserPreference(data, props) {
        const opts = {
            url: this.withAccount(`/${props.tableUrl}`),
            method: 'PUT',
            urlParams: { userId: this.logindata.userId },
            body: JSON.stringify(data)
        };

        return this.callApi(opts);
    }

    editUserPreference(sysId, data, props) {
        const opts = {
            url: this.withAccount(`/${props.tableUrl}/${sysId}`),
            urlParams: { userId: this.logindata.userId },
            method: 'POST',
            body: JSON.stringify(data)
        };

        return this.callApi(opts);
    }

    deleteUserPreference(sysId, props) {
        const opts = {
            method: 'POST',
            url: this.withAccount(`/${props.tableUrl}/${sysId}`),
            urlParams: { userId: this.logindata.userId },
            body: JSON.stringify({filterpreferences: {}})
        };
        return this.callApi(opts);
    }

    login(email, password) {

        this.setItem("email",email);
        this.setItem("password",password);



        var logindata = {
            "email": email,
            "password": password
            // , "orgName": "FogLogic"
        };



        var defaultOrgName = this.getItem(email + "defaultOrgname");
        if (defaultOrgName) {
            logindata.orgName = defaultOrgName;
        }

        const headers = new Headers({
            "Content-Type": "application/json",
        });

        const opts = {
            url: '/sessions/',
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(logindata),
        };

        return this.callApi(opts);

    }

    signUp(data) {

        const headers = new Headers({
            "Content-Type": "application/json",
            "accessToken": (this.logindata && this.logindata.accessToken) || ""
        });

        const options = {
            url: '/accounts',
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data),
        };

        return this.callApi(options, false);

    }

    // /api/v1/index.php/users/password/michael@foglogic.com
    // /api/v1/index.php/users/password/michael@foglogic.com?cmd=json
    resetPassword(email) {

        let body = {
            email: email,
            resetPassword: 1
        };

        const headers = new Headers({
            "Content-Type": "application/json; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest"
        });

        let options = {
            url: '/users/password/' + email,
            method: 'POST',
            body: JSON.stringify(body),
            headess: headers
        };

        return this.callApi(options, false);

    }

    alertthresholds() {
        const opts = {
            method: 'GET',
            url: this.withAccount('/settings/alertthresholds/'),
        };
        return this.callApi(opts);
    }

    editThresholds(data) {
        const opts = {
            method: 'POST',
            url: this.withAccount('/settings/alertthresholds/'),
            body: JSON.stringify(data)
        };
        return this.callApi(opts);
    }

    changeJobSettings(data) {
        const opts = {
            method: 'POST',
            url: this.withAccount('/changeSetting'),
            body: JSON.stringify(data)
        };
        return this.callApi(opts);
    }

    callApi(opts, useCmd = true) {
        opts = Object.assign({},
            {
                url: '/',
                method: 'GET',
                headers: this.getHeaders(opts),
                urlParams: {},
            }, opts);

        if (useCmd) {
            opts.urlParams.cmd = 'json';
        }

        const apiurl = opts.url;

        opts.url = withQuery(opts.url
            , opts.urlParams
            , {
                stringifyOpt:
                    {
                        encode: false,
                        parseArray: false,
                    },
                parseOpt: {
                    parseArray: false,
                },
            }
        )
            ;


        let v = async () => {

            const fileToSend = opts.mock;
            if (fileToSend) {
                const resp = require("../server/" + fileToSend + ".json");
                // await delay(5000);
                return { json: () => (resp) };
            }

            var fullurl = base + opts.url
            var response = await fetch(fullurl, opts);
            return response;

        }

        return v;
    }
}

export let druidapi = new Druidapi();